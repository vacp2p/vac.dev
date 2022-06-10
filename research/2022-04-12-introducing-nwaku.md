---
layout: post
name:  "Introducing nwaku"
title:  "Introducing nwaku"
date:   2022-04-12 10:00:00
author: hanno
published: true
permalink: /introducing-nwaku
categories: research
summary: Introducing nwaku, a Nim-based Waku v2 client, including a summary of recent developments and preview of current and future focus areas.
image: /img/vac.png
discuss: https://forum.vac.dev/
---

## Background

If you've been following our [research log](https://vac.dev/research-log/),
you'll know that many things have happened in the world of Waku v2 since [our last general update](/waku-v2-ethereum-coscup).
In line with our [long term goals](https://vac.dev/#about),
we've introduced new protocols,
tweaked our existing protocols
and expanded our team.
We've also shown [in a series of practical experiments](/waku-v1-v2-bandwidth-comparison) that Waku v2 does indeed deliver on some of the [theoretical advantages](/waku-v2-plan) it was designed to have over its predecessor, Waku v1.
A [sustainability and business workshop](https://forum.vac.dev/t/vac-sustainability-and-business-workshop/116) led to the formulation of a clearer vision for Vac as a team.

From the beginning, our protocol development has been complemented by various client implementations of these protocols,
first in [Nim](https://github.com/status-im/nim-waku),
but later also in [JavaScript](https://github.com/status-im/js-waku)
and [Go](https://github.com/status-im/go-waku).
A follow-up post will clarify the purposes, similarities and differences between these three clients.
The [Nim client](https://github.com/status-im/nim-waku/tree/d2fccb5220144893f994a67f2cc26661247f101f/waku/v2), is our reference implementation,
developed by the research team in parallel with the specs
and building on a home-grown implementation of [`libp2p`](https://github.com/status-im/nim-libp2p).
The Nim client is suitable to run as [a standalone adaptive node](/waku-update),
managed by individual operators
or as an encapsulated service node in other applications.
This post looks at some recent developments within the Nim client.

## 1. _**nim-waku**_ is now known as _**nwaku**_

Pronounced NWHA-koo.
You may already have seen us refer to "`nwaku`" on Vac communication channels,
but it is now official:
The `nim-waku` Waku v2 client has been named `nwaku`.
Why? Well, we needed a recognizable name for our client that could easily be referred to in everyday conversations
and `nim-waku` just didn't roll off the tongue.
We've followed the example of the closely related [`nimbus` project](https://github.com/status-im/nimbus-eth2) to find a punchier name
that explicitly links the client to both the Waku set of protocols and the Nim language.

## 2. Improvements in stability and performance

The initial implementation of Waku v2 demonstrated how the suite of protocols can be applied
to form a generalized, peer-to-peer messaging network,
while addressing a wide range of adaptive requirements.
This allowed us to lift several protocol [specifications](https://rfc.vac.dev/) from `raw` to `draft` status,
indicating that a reference implementation exists for each.
However, as internal dogfooding increased and more external applications started using `nwaku`,
we stepped up our focus on the client's stability and performance.
This is especially true where we want `nwaku` to run unsupervised in a production environment
without any degradation in the services it provides.

Some of the more significant productionization efforts over the last couple of months included:

1. Reworking the `store` implementation to maintain stable memory usage
while storing historical messages
and serving multiple clients querying history simultaneously.
Previously, a `store` node would see gradual service degradation
due to inefficient memory usage when responding to history queries.
Queries that often took longer than 8 mins now complete in under 100 ms.

2. Improved peer management.
For example, `filter` nodes will now remove unreachable clients after a number of connection failures,
whereas they would previously keep accumulating dead peers.

3. Improved disk usage.
`nwaku` nodes that persist historical messages on disk now manage their own storage size based on the `--store-capacity`.
This can significantly improve node start-up times.

More stability issues may be addressed in future as `nwaku` matures,
but we've noticed a marked improvement in the reliability of running `nwaku` nodes.
These include environments where `nwaku` nodes are expected to run with a long uptime.
Vac currently operates two long-running fleets of `nwaku` nodes, `wakuv2.prod` and `wakuv2.test`,
for internal dogfooding and
to serve as experimental bootstrapping nodes.
Status has also recently deployed similar fleets for production and testing based on `nwaku`.
Our goal is to have `nwaku` be stable, performant and flexible enough
to be an attractive option for operators to run and maintain their own Waku v2 nodes.
See also the [future work](#future-work) section below for more on our general goal of _`nwaku` for operators_.

## 3. Improvements in interoperability

We've implemented several features that improve `nwaku`'s usability in different environments
and its interoperability with other Waku v2 clients.
One major step forward here was adding support for both secure and unsecured WebSocket connections as `libp2p` transports.
This allows direct connectivity with `js-waku`
and paves the way for native browser usage.
We've also added support for parsing and resolving DNS-type `multiaddrs`,
i.e. multiaddress protocol schemes [`dns`, `dns4`, `dns6` and `dnsaddr`](https://github.com/multiformats/multiaddr/blob/b746a7d014e825221cc3aea6e57a92d78419990f/protocols.csv#L8-L11).
A `nwaku` node can now also be [configured with its own IPv4 DNS domain name](https://github.com/status-im/nim-waku/tree/d2fccb5220144893f994a67f2cc26661247f101f/waku/v2#configuring-a-domain-name) 
allowing dynamic IP address allocation without impacting a node's reachability by its peers.

## 4. Peer discovery

_Peer discovery_ is the method by which nodes become aware of each other’s existence.
The question of peer discovery in a Waku v2 network has been a focus area since the protocol was first conceptualized.
Since then several different approaches to discovery have been proposed and investigated.
We've implemented three discovery mechanisms in `nwaku` so far:

### DNS-based discovery

`nwaku` nodes can retrieve an authenticated, updateable list of peers via DNS to bootstrap connection to a Waku v2 network.
Our implementation is based on [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459).

### GossipSub peer exchange

[GossipSub Peer Exchange (PX)](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/gossipsub-v1.1.md#prune-backoff-and-peer-exchange) is a GossipSub v1.1 mechanism
whereby a pruning peer may provide a pruned peer with a set of alternative peers
where it can connect to reform its mesh.
This is a very suitable mechanism to gradually discover more peers
from an initial connection to a small set of bootstrap peers.
It is enabled in a `nwaku` node by default.

### Waku Node Discovery Protocol v5

This is a DHT-based discovery mechanism adapted to store and relay _node records_.
Our implementation is based on [Ethereum's Discovery v5 protocol](https://github.com/ethereum/devp2p/blob/fa6428ada7385c13551873b2ae6ad2457c228eb8/discv5/discv5-theory.md)
with some [minor modifications](https://rfc.vac.dev/spec/33/) to isolate our discovery network from that of Ethereum.
The decision to separate the Waku Discovery v5 network from Ethereum's was made on considerations of lookup efficiency.
This comes at a possible tradeoff in network resilience.
We are considering merging with the Ethereum Discovery v5 network in future,
or even implement a hybrid solution.
[This post](https://forum.vac.dev/t/waku-v2-discv5-roadmap-discussion/121/8) explains the decision and future steps.

## 5. Spam protection using RLN

An early addition to our suite of protocols was [an extension of `11/WAKU-RELAY`](https://rfc.vac.dev/spec/32/)
that provided spam protection using [Rate Limiting Nullifiers (RLN)](https://rfc.vac.dev/spec/32/).
The `nwaku` client now contains a working demonstration and integration of RLN relay.
Check out [this tutorial](https://github.com/status-im/nim-waku/blob/ee96705c7fbe4063b780ac43b7edee2f6c4e351b/docs/tutorial/rln-chat2-live-testnet.md) to see the protocol in action using a toy chat application built on `nwaku`.
We'd love for people to join us in dogfooding RLN spam protection as part of our operator incentive testnet.
Feel free to join our [Vac Discord](https://discord.gg/KNj3ctuZvZ) server
and head to the `#rln` channel for more information.

## Future work

As we continue working towards our goal of a fully decentralized, generalized and censorship-resistant messaging protocol,
these are some of the current and future focus areas for `nwaku`:

### Reaching out to operators:

We are starting to push for operators to run and maintain their own Waku v2 nodes,
preferably contributing to the default Waku v2 network as described by the default pubsub topic (`/waku/2/default-waku/proto`).
Amongst other things, a large fleet of stable operator-run Waku v2 nodes will help secure the network,
provide valuable services to a variety of applications
and ensure the future sustainability of both Vac as a research organization and the Waku suite of protocols.

We are targeting `nwaku` as the main option for operator-run nodes.  
Specifically, we aim to provide through `nwaku`:

1.  a lightweight and robust Waku v2 client.
This client must be first in line to support innovative and new Waku v2 protocols,
but configurable enough to serve the adaptive needs of various operators.
2.  an easy-to-follow guide for operators to configure,
set up and maintain their own nodes
3.  a set of operator-focused tools to monitor and maintain a running node

### Better conversational security layer guarantees

Conversational security guarantees in Waku v2 are currently designed around the Status application.
Developers building their own applications on top of Waku would therefore
either have to reimplement a set of tools similar to Status
or build their own security solutions on the application layer above Waku.
We are working on [a set of features](https://github.com/vacp2p/research/issues/97) built into Waku
that will provide the general security properties Waku users may desire
and do so in a modern and simple way.
This is useful for applications outside of Status that want similar security guarantees.
As a first step, we've already made good progress toward [integrating noise handshakes](https://forum.vac.dev/t/noise-handshakes-as-key-exchange-mechanism-for-waku2/130) as a key exchange mechanism in Waku v2.

### Protocol incentivization

We want to design incentivization around our protocols to encourage desired behaviors in the Waku network,
rewarding nodes providing costly services
and punishing adversarial actions.
This will increase the overall security of the network
and encourage operators to run their own Waku nodes.
In turn, the sustainability of Vac as an organization will be better guaranteed.
As such, protocol incentivization was a major focus in our recent [Vac Sustainability and Business Workshop](https://forum.vac.dev/t/vac-sustainability-and-business-workshop/).
Our first step here is to finish integrating RLN relay into Waku
with blockchain interaction to manage members,
punish spammers
and reward spam detectors.
After this, we want to design monetary incentivization for providers of `store`, `lightpush` and `filter` services.
This may also tie into a reputation mechanism for service nodes based on a network-wide consensus on service quality.
A big challenge for protocol incentivization is doing it in a private fashion,
so we can keep similar metadata protection guarantees as the Waku base layer.
This ties into our focus on [Zero Knowledge tech](https://forum.vac.dev/t/vac-3-zk/97).

### Improved store capacity

The `nwaku` store currently serves as an efficient in-memory store for historical messages,
dimensioned by the maximum number of messages the store node is willing to keep.
This makes the `nwaku` store appropriate for keeping history over a short term
without any time-based guarantees,
but with the advantage of providing fast responses to history queries.
Some applications, such as Status, require longer-term historical message storage
with time-based dimensioning
to guarantee that messages will be stored for a specified minimum period.
Because of the relatively high cost of memory compared to disk space,
a higher capacity store, with time guarantees, should operate as a disk-only database of historical messages.
This is an ongoing effort.

### Multipurpose discovery

In addition to [the three discovery methods](#4-peer-discovery) already implemented in `nwaku`,
we are working on improving discovery on at least three fronts:

#### _Capability discovery:_

Waku v2 nodes may be interested in peers with specific capabilities, for example:

1. peers within a specific pubsub topic mesh,
2. peers with **store** capability,
3. **store** peers with x days of history for a specific content topic, etc.

Capability discovery entails mechanisms by which such capabilities can be advertised and discovered/negotiated.
One major hurdle to overcome is the increased complexity of finding a node with specific capabilities within the larger network (a needle in a haystack).
See the [original problem statement](https://github.com/vacp2p/rfc/issues/429) for more.

#### _Improvements in Discovery v5_

Of the implemented discovery methods,
Discovery v5 best addresses our need for a decentralized and scalable discovery mechanism.
With the basic implementation done,
there are some improvements planned for Discovery v5,
including methods to increase security such as merging with the Ethereum Discovery v5 network,
introducing explicit NAT traversal
and utilizing [topic advertisement](https://github.com/ethereum/devp2p/blob/fa6428ada7385c13551873b2ae6ad2457c228eb8/discv5/discv5-theory.md#topic-advertisement).
The [Waku v2 Discovery v5 Roadmap](https://forum.vac.dev/t/waku-v2-discv5-roadmap-discussion/121) contains more details.

#### _Generalized peer exchange_

`nwaku` already implements [GossipSub peer exchange](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/gossipsub-v1.1.md#prune-backoff-and-peer-exchange).
We now need a general request-response mechanism outside of GossipSub
by which a node may learn about other Waku v2 nodes
by requesting and receiving a list of peers from a neighbor.
This could, for example, be a suitable way for resource-restricted devices to request a stronger peer
to perform a random Discovery v5 lookup on their behalf
or simply to be informed of a subset of the peers known to that neighbor.
See [this issue](https://github.com/vacp2p/rfc/issues/495) for more.

---

This concludes a general outline of some of the main recent developments in the `nwaku` client
and a summary of the current and future focus areas.
Much more is happening behind the scenes, of course,
so for more information, or to join the conversation,
feel free to join our [Vac Discord](https://discord.gg/KNj3ctuZvZ) server
or to check out the [`nwaku` repo on Github](https://github.com/status-im/nim-waku).
You can also view the changelog for past releases [here](https://github.com/status-im/nim-waku/releases).

## References

- [17/WAKU-RLN-RELAY](https://rfc.vac.dev/spec/17/)
- [32/RLN](https://rfc.vac.dev/spec/32/)
- [33/WAKU2-DISCV5](https://rfc.vac.dev/spec/33/)
- [Capabilities advertising](https://github.com/vacp2p/rfc/issues/429)
- [Configuring a domain name](https://github.com/status-im/nim-waku/tree/d2fccb5220144893f994a67f2cc26661247f101f/waku/v2#configuring-a-domain-name)
- [Conversational security](https://github.com/vacp2p/research/issues/97)
- [Discovery v5 Topic Advertisement](https://github.com/ethereum/devp2p/blob/fa6428ada7385c13551873b2ae6ad2457c228eb8/discv5/discv5-theory.md#topic-advertisement)
- [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459)
- [GossipSub Peer Exchange](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/gossipsub-v1.1.md#prune-backoff-and-peer-exchange)
- [go-waku](https://github.com/status-im/go-waku)
- [js-waku](https://github.com/status-im/js-waku)
- [`multiaddr` formats](https://github.com/multiformats/multiaddr/blob/b746a7d014e825221cc3aea6e57a92d78419990f/protocols.csv#L8-L11)
- [nimbus-eth2](https://github.com/status-im/nimbus-eth2)
- [nim-libp2p](https://github.com/status-im/nim-libp2p)
- [nim-waku](https://github.com/status-im/nim-waku)
- [nim-waku releases](https://github.com/status-im/nim-waku/releases)
- [Node Discovery Protocol v5 - Theory](https://github.com/ethereum/devp2p/blob/fa6428ada7385c13551873b2ae6ad2457c228eb8/discv5/discv5-theory.md)
- [Noise handshakes](https://forum.vac.dev/t/noise-handshakes-as-key-exchange-mechanism-for-waku2/130)
- [RLN tutorial](https://github.com/status-im/nim-waku/blob/ee96705c7fbe4063b780ac43b7edee2f6c4e351b/docs/tutorial/rln-chat2-live-testnet.md)
- [Vac <3 ZK](https://forum.vac.dev/t/vac-3-zk/97)
- [Vac About page](https://vac.dev/#about)
- [Vac Research log](https://vac.dev/research-log/)
- [Vac RFC site](https://rfc.vac.dev/)
- [Vac Sustainability and Business Workshop](https://forum.vac.dev/t/vac-sustainability-and-business-workshop/)
- [Waku Update](/waku-update)
- [Waku v1 vs Waku v2: Bandwidth Comparison](/waku-v1-v2-bandwidth-comparison)
- [Waku v2 Peer Exchange](https://github.com/vacp2p/rfc/issues/495)
- [Waku v2 Discovery v5 Roadmap](https://forum.vac.dev/t/waku-v2-discv5-roadmap-discussion/121)
- [What's the Plan for Waku v2?](/waku-v2-plan)
