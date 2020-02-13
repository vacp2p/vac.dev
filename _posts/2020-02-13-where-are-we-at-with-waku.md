---
layout: post
name:  "Where Are We at with Waku?"
title:  "Where Are We at with Waku?"
date:   2020-02-14 12:00:00 +0800
author: oskarth
published: true
permalink: /where-are-we-at-with-waku
categories: research
summary: A research log. Where are we at with Waku?
image: /assets/img/TODOFIXME.png
discuss: https://forum.vac.dev/t/TODOFIXME
---

TODO: Picture for bottleneck or Waku
TODO: Fix discuss link
TODO: Fix date

# Where we are at with Waku?

Waku is our fork of Whisper where we address the shortcomings of Whisper in an iterative manner. We've seen a in [previous post](https://vac.dev/fixing-whisper-with-waku) that Whisper doesn't scale, and why. Here's an update on where we are at with Waku since then.

## Current state

**Specs:**

We've cut the spec up into three components. These are:

- Waku (main spec), currently in [version 0.3.0](https://specs.vac.dev/waku/waku.html)
- Waku envelope data field, currently in [version 0.1.0](https://specs.vac.dev/waku/envelope-data-format.html)
- Waku mailserver, currently in [version 0.2.0](https://specs.vac.dev/waku/mailserver.html)

**Clients:**

There are currently two clients that implement Waku, these are [Nimbus](https://github.com/status-im/nimbus/tree/master/waku) in Nim and [status-go](https://github.com/status-im/status-go) in Go.

At the time of writing the Nimbus client implements the spec fully, but lacks mail server/client, rate limiting and confirmations capability. The status-go client implements everything except bridging mode, which is currently a work in progress.

For more details, see [implementation matrix](https://specs.vac.dev/waku/waku.html#appendix-b-implementation-notes).

In terms of end user applications, work is currently in progress to integrate it into the [Status core app](https://github.com/status-im/status-react/pull/9949) and is expected to be released in their upcoming 1.1 release.

TODO: Fact check this with Adam and Kim

**Simulation:**

We've got a [simulation](https://github.com/status-im/nimbus/tree/master/waku#testing-waku-protocol) in the Nimbus client that verifies - or rather, fails to falsify - the scalability model described in an [earlier post](https://vac.dev/fixing-whisper-with-waku). More on this below.

## How many users does Waku support?

This is our current understanding of how many users a network running the Waku protocol can support. Specifically in the context of the Status chat app, since that's the most immediate consumer of Waku. It should generalize fairly well to most deployments, but YMMW.

**tl;dr (for Status app):**
- beta: 100 DAU
- v1: 1k DAU
- v1.1 (waku only): 10k DAU (up to x10 with deployment hotfixes)
- v1.2 (waku+dns): 100k DAU (can optionally be folded into v1.1)

*Assuming 10 concurrent users = 100 DAU. Estimate uncertainty increases for each order of magnitude until real-world data is observed.*

As far as we know right now, these are the bottlenecks we have:

- Immediate bottleneck - Receive bandwidth for end user clients (aka ‘Fixing Whisper with Waku’)
- Very likely bottleneck - Nodes and cluster capacity (aka ‘DNS based node discovery’)
- Conjecture but not unlikely to appear- Full node traffic (aka ‘the routing / partition problem’)

We've already seen the first bottleneck being discussed in the initial post. Dean wrote a post on [DNS based discovery](https://vac.dev/dns-based-discovery) which explains how we will address the likely second bottleneck. More on the third one in future posts.

For more details on these bottlenecks, uncertainty and mitigations, see [Scalability estimate: How many users can Waku and the Status app support?](https://discuss.status.im/t/scalability-estimate-how-many-users-can-waku-and-the-status-app-support/1514).

TODO: Elaborate on bottleneck 3, kad etc

## Simulation

The ultimate test is real-world usage. Until then, we have a simulation thanks to Kim De Mey from the Nimbus team!

![](assets/img/waku_simulation.jpeg)

We have two network topologies, Star and full mesh, with 6 randomly connected nodes, one traditional light node with bloom filter (Whisper style) and one Waku light node.

One of the full nodes sends 1 envelope over 1 of the 100 topics that the two light nodes subscribe to. After that, it sends 10000 envelopes over random topics.

For light node, bloom filter is set to almost 10% false positive (bloom filter: n=100, k=3, m=512). It shows the number of valid and invalid envelopes received for the different nodes.

**Star network:**

| Description     | Peers | Valid | Invalid |
|-----------------|-------|-------|---------|
| Master node     |     7 | 10001 |       0 |
| Full node 1     |     3 | 10001 |       0 |
| Full node 2     |     1 | 10001 |       0 |
| Full node 3     |     1 | 10001 |       0 |
| Full node 4     |     1 | 10001 |       0 |
| Full node 5     |     1 | 10001 |       0 |
| Light node      |     2 |   815 |       0 |
| Waku light node |     2 |     1 |       0 |

**Full mesh:**

| Description     | Peers | Valid | Invalid |
|-----------------|-------|-------|---------|
| Full node 0     |     7 | 10001 |   20676 |
| Full node 1     |     7 | 10001 |    9554 |
| Full node 2     |     5 | 10001 |   23304 |
| Full node 3     |     5 | 10001 |   11983 |
| Full node 4     |     5 | 10001 |   24425 |
| Full node 5     |     5 | 10001 |   23472 |
| Light node      |     2 |   803 |     803 |
| Waku light node |     2 |     1 |       1 |

Things to note:
- Whisper light node with ~10% false positive gets ~10% of total traffic
- Waku light node gets ~1000x less envelopes than Whisper light node
- Full mesh results in a lot more duplicate messages, expect for Waku light node

Run the simulation yourself [here](https://github.com/status-im/nimbus/tree/master/waku#testing-waku-protocol). The parameters are configurable, and it is integrated with Prometheus and Grafana.

## Difference between Waku and Whisper

Summary of main differences between Waku v0 spec and Whisper v6, as described in [EIP-627](https://eips.ethereum.org/EIPS/eip-627):

- Handshake/Status message not compatible with shh/6 nodes; specifying options as association list
- Include topic-interest in Status handshake
- Upgradability policy
- `topic-interest` packet code
- RLPx subprotocol is changed from shh/6 to waku/0.
- Light node capability is added.
- Optional rate limiting is added.
- Status packet has following additional parameters: light-node, confirmations-enabled and rate-limits
- Mail Server and Mail Client functionality is now part of the specification.
- P2P Message packet contains a list of envelopes instead of a single envelope.

## Next steps and future plans

There are a lot of remaining challenges to make Waku a robust and suitable base
communication protocol. Here we outline a few challenges that we aim to address:

- scalability of the network
- incentived infrastructure and spam-resistance
- build with resource restricted devices in mind, including nodes being mostly offline

When it comes to the third bottleneck, a likely candidate for addressing this
is using Kademlia routing. Stay tuned.
