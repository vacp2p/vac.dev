---
layout: post
name:  "Waku Update"
title:  "Waku Update"
date:   2020-02-14 12:00:00 +0800
author: oskarth
published: true
permalink: /waku-update
categories: research
summary: A research log. What's the current state of Waku? How many users does it support? What are the bottlenecks? What's next?
image: /img/waku_infrastructure_sky.jpg
discuss: https://forum.vac.dev/t/waku-update-where-are-we-at/34
---

Waku is our fork of Whisper where we address the shortcomings of Whisper in an iterative manner. We've seen a in [previous post](https://vac.dev/fixing-whisper-with-waku) that Whisper doesn't scale, and why. In this post we'll talk about what the current state of Waku is, how many users it can support, and future plans. 

## Current state

**Specs:**

We released [Waku spec v0.3](https://rfc.vac.dev/spec/6) this week! You can see the full changelog [here](https://rfc.vac.dev/spec/6/#changelog).

The main change from 0.2 is making the handshake more flexible. This enables us to communicate topic interest immediately without ambiguity. We also did the following:

- added recommendation for DNS based discovery
- added an upgradability and compatibility policy
- cut the spec up into several components

We cut the spec up in several components to make Vac as modular as possible. The components right now are:

- Waku (main spec), currently in [version 0.3.0](https://rfc.vac.dev/spec/6)
- Waku envelope data field, currently in [version 0.1.0](https://rfc.vac.dev/spec/7)
- Waku mailserver, currently in [version 0.2.0](https://rfc.vac.dev/spec/8)

We can probably factor these out further as the main spec is getting quite big, but this is good enough for now.

**Clients:**

There are currently two clients that implement Waku v0.3, these are [Nimbus (Update: now nim-waku)](https://github.com/status-im/nim-waku) in Nim and [status-go](https://github.com/status-im/status-go) in Go.

For more details on what each client support and don't, you can follow the [work in progress checklist](https://github.com/vacp2p/pm/issues/7).

Work is currently in progress to integrate it into the [Status core app](https://github.com/status-im/status-react/pull/9949). Waku is expected to be part of their upcoming 1.1 release (see [Status app roadmap (link deprecated)](https://trello.com/b/DkxQd1ww/status-app-roadmap)).

**Simulation:**

We have a [simulation](https://github.com/status-im/nim-waku/blob/master/waku/v1/node/quicksim.nim) that verifies - or rather, fails to falsify - our [scalability model](https://vac.dev/fixing-whisper-with-waku). More on the simulation and what it shows below.

## How many users does Waku support?

This is our current understanding of how many users a network running Waku can support. Specifically in the context of the Status chat app, since that's the most immediate consumer of Waku. It should generalize fairly well to most deployments.

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

For more details on these bottlenecks, see [Scalability estimate: How many users can Waku and the Status app support?](https://discuss.status.im/t/scalability-estimate-how-many-users-can-waku-and-the-status-app-support/1514).

## Simulation

The ultimate test is real-world usage. Until then, we have a simulation thanks to Kim De Mey from the Nimbus team!

![](assets/img/waku_simulation.jpeg)

We have two network topologies, Star and full mesh. Both networks have 6 full nodes, one traditional light node with bloom filter, and one Waku light node.

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

Run the simulation yourself [here](https://github.com/status-im/nim-waku/blob/master/waku/v1/node/quicksim.nim). The parameters are configurable, and it is integrated with Prometheus and Grafana.

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

Several challenges remain to make Waku a robust and suitable base
communication protocol. Here we outline a few challenges that we are addressing and will continue to work on:

- scalability of the network
- incentived infrastructure and spam-resistance
- build with resource restricted devices in mind, including nodes being mostly offline

For the third bottleneck, a likely candidate for fixing this is Kademlia routing. This is similar to what is done in [Swarm's](https://www.ethswarm.org/) PSS. We are in the early stages of experimenting with this over libp2p in [nim-libp2p](https://github.com/status-im/nim-libp2p). More on this in a future post!

## Acknowledgements

*Image from "caged sky" by mh.xbhd.org is licensed under CC BY 2.0 (https://ccsearch.creativecommons.org/photos/a9168311-78de-4cb7-a6ad-f92be8361d0e)*
