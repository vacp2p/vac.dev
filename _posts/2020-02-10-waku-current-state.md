---
layout: post
name:  "Waku current state"
title:  "Waku current state"
date:   2020-02-10 12:00:00 +0800
author: oskarth
published: false
permalink: /waku-current-state
categories: research
summary: A research log. Waku current state.
image: /assets/img/TODOFIXME.png
discuss: https://forum.vac.dev/t/TODOFIXME
---

TODO: Picture for bottleneck or Waku

# Where we are at with Waku?

Waku is our fork of Whisper where we address the shortcomings of Whisper in an iterative manner. We've seen in previous post that Whisper doesn't scale, and why. Here's an update on where we are at with Waku since that [last post](https://vac.dev/fixing-whisper-with-waku).

## Current state

**Specs:**

We've cut the spec up into three components. These are:

- Waku (main spec), currently in [version 0.2.0](https://specs.vac.dev/waku/waku.html)
- Waku envelope data field, currently in [version 0.1.0](https://specs.vac.dev/waku/envelope-data-format.html)
- Waku mailserver, currently in [version 0.2.0](https://specs.vac.dev/waku/mailserver.html)

TODO: Update Waku spec to 0.3

**Clients:**

There are currently two clients that implement Waku, these are [Nimbus](https://github.com/status-im/nimbus/tree/master/waku) in Nim and [status-go](https://github.com/status-im/status-go) in Go.

At the time of this writing the Nimbus client implements the spec fully, but lacks mail server and mail client capability. The status-go client implements everything except bridging mode, which is currently a work in progress.

For more details, see [implementation matrix](https://specs.vac.dev/waku/waku.html#appendix-b-implementation-notes).

In terms of end user applications, work is currently in progress to integrate it into the [Status core app](https://github.com/status-im/status-react/pull/9949) and is expected to be released in their upcoming 1.1 release.

TODO: Fact check this with Adam and Kim

**Simulation:**

We've got a [simulation](https://github.com/status-im/nimbus/tree/master/waku#testing-waku-protocol) in the Nimbus client that verifies - or rather, fails to falsify - the scalability model posted in an [earlier post](https://vac.dev/fixing-whisper-with-waku). More on this below.

## How many users does Waku support?

This is our current understanding of how many users a network running the Waku protocol can support. Specifically in the context of the Status chat app, since that's the most immediate consumer of Waku. It should generalize fairly well to most deployments, but YMMW.

**tldr (for Status app):**
- beta: 100 DAU
- v1: 1k DAU
- v1.1 (waku only): 10k DAU (up to x10 with deployment hotfixes)
- v1.2 (waku+dns): 100k DAU (can optionally be folded into v1.1)

*Assuming 10 concurrent users = 100 DAU. Estimate uncertainty increases for each order of magnitude until real-world data is observed.*

As far as we know right now, there is one immediate bottleneck, a very likely bottleneck after that, and a third bottleneck that is still conjecture but not unlikely to appear. These are:

- Bottleneck 1 - Receive bandwidth for end user clients (aka ‘Fixing Whisper with Waku’)
- Bottleneck 2 - Nodes and cluster capacity (aka ‘DNS based node discovery’)
- Bottleneck 3 - Full node traffic (aka ‘the routing / partition problem’)

We've already seen the first bottleneck being discussed in the initial post. Dean wrote a post on [DNS based discovery](https://vac.dev/dns-based-discovery) which explains how we will address the likely second bottleneck. More on the third one in future posts.

For more details on these bottlenecks, uncertainty and mitigations, see [Scalability estimate: How many users can Waku and the Status app support?](https://discuss.status.im/t/scalability-estimate-how-many-users-can-waku-and-the-status-app-support/1514).

TODO: Elaborate on bottleneck 3, kad etc

## Simulation

The ultimate test is real-world usage. Until then, we have a simulation. Here's some data on this.

![](assets/img/waku_simulation.jpeg)

Here we outline two network topologies, Star and full mesh, with 6 randomly connected nodes and 2 X, sending 10000 random envelopes over random topics, including invalid envelopes.

For light node, bloom filter is set to 1% false positive. It shows the number of valid and invalid envelopes received for the different nodes.

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
- Whisper light node with 1% false positive gets 1% of total traffic
- Waku light node gets ~1000x less envelopes than Whisper light node
- Full mesh results in a lot more duplicate messages, expect for Waku light node

Run the simulation yourself [here](https://github.com/status-im/nimbus/tree/master/waku#testing-waku-protocol). The parameters are configurable, and it is integrated with Prometheus and Grafana.

## Difference between Waku and Whisper

XXX: Add this in section above or here? In-line? How much emphasize?

Highlight spec and stuff

## Next steps and future plans

- Kad routing etc

- Roadmap

- Better spam proof and incentive

-> Future posts
