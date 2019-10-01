---
layout: post
name:  "Remote log"
title:  "P2P Data Sync with a Remote Log"
date:   2019-10-01 12:00:00 +0800
author: oskarth
published: true
permalink: /remote-log
categories: research
summary: A research log. Reliable and decentralized, pick two.
image: /assets/img/remote_log.png
---

A big problem when doing end-to-end data sync between mobile nodes is that most
devices are offline most of the time. With a naive approach, you quickly run
into issues of 'ping-pong' behavior, where messages have to be constantly
retransmitted. We saw some basic calculations of what this bandwidth multiplier
looks like in a [previous post](https://vac.dev/p2p-data-sync-for-mobile).

While you could do some background processing, this is really draining the
battery, and on iOS these capabilities are limited. A better approach instead is
to loosen the constraint that two nodes need to be online at the same time. How
do we do this? There are two main approaches, one is the *store and forward
model*, and the other is a *remote log*.

In the *store and forward* model, we use an intermediate node that forward
messages on behalf of the recipient. In the *remote log* model, you instead
replicate the data onto some decentralized storage, and have a mutable reference
to the latest state, similar to DNS. While both work, the latter is somewhat
more elegant and "pure", as it has less strict requirements of an individual
node's uptime. Both act as a highly-available cache to smoothen over
non-overlapping connection windows between endpoints.

In this post we are going to describe how such a remote log schema could work.
Specifically, how it enhances p2p data sync and takes care of the [following
requirements](https://vac.dev/p2p-data-sync-for-mobile):

> 3. MUST allow for mobile-friendly usage. By mobile-friendly we mean devices
>    that are resource restricted, mostly-offline and often changing network.

> 4. MAY use helper services in order to be more mobile-friendly. Examples of
>    helper services are decentralized file storage solutions such as IPFS and
>    Swarm. These help with availability and latency of data for mostly-offline
>    devices.

## Remote log

A remote log is a replication of a local log. This means a node can read data
from a node that is offline.

The spec is in an early draft stage and can be found
[here](https://github.com/vacp2p/specs/pull/16). A very basic spike can be found
[here](https://github.com/vacp2p/research/tree/master/remote_log).

### Definitions

| Term        | Definition                                                                                   |
| ----------- | --------------------------------------------------------------------------------------       |
| CAS         | Content-addressed storage. Stores data that can be addressed by its hash.                    |
| NS          | Name system. Associates mutable data to a name.                                              |
| Remote log  | Replication of a local log at a different location.                                          |

### Payloads

Payloads are implemented using [protocol buffers v3](https://developers.google.com/protocol-buffers/).

**CAS service**:

```protobuf
syntax = "proto3";

package vac.cas;

service CAS {
  rpc Add(Content) returns (Address) {}
  rpc Get(Address) returns (Content) {}
}

message Address {
  bytes id = 1;
}

message Content {
  bytes data = 1;
}
```

<!-- XXX/TODO: Can we get rid of the id/data complication and just use bytes? -->

**NS service**:

```protobuf
syntax = "proto3";

package vac.cas;

service NS {
  rpc Update(NameUpdate) returns (Response) {}
  rpc Fetch(Query) returns (Content) {}
}

message NameUpdate {
  string name = 1;
  bytes content = 2;
}

message Query {
  string name = 1;
}

message Content {
  bytes data = 1;
}

message Response {
  bytes data = 1;
}
```

<!-- XXX: Response and data type a bit weird, Ok/Err enum? -->
<!-- TODO: Do we want NameInit here? -->

**Remote log:**

```protobuf
syntax = "proto3";

package vac.cas;

message RemoteLog {
  repeated Pair pair = 1;
  bytes tail = 2;

  message Pair {
    bytes remoteHash = 1;
    bytes localHash = 2;
    bytes data = 3;
  }
}
```

<!-- TODO: Better name for Pair, Mapping? -->

<!-- TODO: Extend pair with (optional) data -->

## Synchronization

### Roles

There are four fundamental roles:

1. Alice
2. Bob
2. Name system (NS)
3. Content-addressed storage (CAS)

The *remote log* protobuf is what is stored at the Name system.

"Bob" can represent anything from 0 to N participants. Unlike Alice, Bob only needs read-only access to NS and CAS.

### Flow

<!-- diagram -->

<p align="center">
    <img src="{{site.baseurl}}/assets/img/remote-log.png">
    <br />
    Figure 1: Remote log data synchronization.
</p>

### Remote log

The remote log lets receiving nodes know what data they are missing. Depending
on the specific requirements and capabilities of the nodes and name system, the
information can be referred to differently. We distinguish between three rough
modes:

1. Fully replicated log
2. Normal sized page with CAS mapping
3. "Linked list" mode - minimally sized page with CAS mapping

**Data format:**

```
| H1_3 | H2_3 |
| H1_2 | H2_2 |
| H1_1 | H2_1 |
| ------------|
| next_page   |
```

Here the upper section indicates a list of ordered pairs, and the lower section
contains the address for the next page chunk. `H1` is the native hash function,
and `H2` is the one used by the CAS. The numbers corresponds to the messages.

To indicate which CAS is used, a remote log SHOULD use a multiaddr.

**Embedded data:**

A remote log MAY also choose to embed the wire payloads that corresponds to the
native hash. This bypasses the need for a dedicated CAS and additional
round-trips, with a trade-off in bandwidth usage.

```
| H1_3 | | C_3 |
| H1_2 | | C_2 |
| H1_1 | | C_1 |
| -------------|
| next_page    |
```

Here `C` stands for the content that would be stored at the CAS.

Both patterns can be used in parallel, e,g. by storing the last `k` messages
directly and use CAS pointers for the rest. Together with the `next_page` page
semantics, this gives users flexibility in terms of bandwidth and
latency/indirection, all the way from a simple linked list to a fully replicated
log. The latter is useful for things like backups on durable storage.

### Next page semantics

The pointer to the 'next page' is another remote log entry, at a previous point
in time.

<!-- TODO: Determine requirement re overlapping, adjacent, and/or missing entries -->

### Interaction with MVDS

TBD.

<!-- TODO: Elaborate on interaction with MVDS, especially with what messages are synced, etc -->


## Future work

TBD.
