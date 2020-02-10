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

# Where we are at with Waku?

Waku is our fork of Whisper where we address the shortcomings of Whisper in an iterative manner. We've seen in previous post that Whisper doesn't scale, and why. Here's an update on where we are at with Waku since that [last post](https://vac.dev/fixing-whisper-with-waku).

## Current state

**Specs:**

Specs are in version X, Y and can be found here

TODO: Add links

**Clients:**

We have two clients, both implement X spec

TODO: Add links

**Simulation:**

We've got a simulation that verifies scalability model, more on that below

TODO: Add link

## How many users does Waku support?

Recap what is said in Scalability post. Write it in a slightly more general form, i.e. less Status app specific.

https://discuss.status.im/t/scalability-estimate-how-many-users-can-waku-and-the-status-app-support/1514/1

One of the goals is to support Status app. Here are the bottlenecks:

- Bottlenecks 1 2 3
-- BW recv
-- dns discovery etc
-- full node -> problem statement next, kad

- Link to DNS discovery post

- Simulations
-- include data numbers (below raw data)

- Obvious test is real world

```
> ./build/start_network --topology:Star --amount:6 --test-node-peers:2

Send 10k random envelopes over random topics

Star simulation:

confirm invlaid

master node: connected peers 7 - 10001 / 0
full node 1: connected peers 3 - 10001 / 0
full node 2: connected peers 1 - 10001 / 0
full node 3: connected peers 1 - 10001 / 0
full node 4: connected peers 1 - 10001 / 0
full node 5: connected peers 1 - 10001 / 0 
light node 1: connected peers 2 - 815 / 0 (next run 1094)
waku light node 1: connected peers 2 - 1 / 0

- Why 10001?
- Which bloom filter used exactly?
- Why invalid envelopes 815 and 1 respectively for light/waku nodes, and nothing for other full nodes?

Ok think I got, also roughly ~100 1%
- what precise bloom filter used?

Full mesh:

peers / valid envelopes / invalid

full node 0: connected peers 7 - 10001 / 20676
full node 1: connected peers 7 - 10001 / 9554
full node 2: connected peers 5 - 10001 / 23304
full node 3: connected peers 5 - 10001 / 11983
full node 4: connected peers 5 - 10001 / 24425
full node 5: connected peers 5 - 10001 / 23472
light node 1: connected peers 2 - 803 / 803
waku light node 1: connected peers 2 - 1 / 1

```

## Difference between Waku and Whisper

XXX: Add this in section above or here? In-line? How much emphasize?

Highlight spec and stuff

## Next steps and future plans

- Kad routing etc

- Roadmap

- Better spam proof and incentive

-> Future posts
