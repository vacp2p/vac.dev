---
layout: post
name:  "Feasibility Study: Discv5"
title:  "Feasibility Study: Discv5"
date:   2020-04-27 12:00:00 +0800
author: dean
published: true
permalink: /feasibility-discv5
categories: research
summary: Looking at discv5 and the theoretical numbers behind finding peers.
discuss: https://discuss.status.im/t/discv5-feasibility-study/1632
---

> Disclaimer: some of the numbers found in this write-up could be inaccurate. They are based on the current understanding of theoretical parts of the protocol itself by the author and are meant to provide a rough overview rather than bindable numbers.

This post serves as a more authoritative overview of the discv5 study, for a discussionary post providing more context make sure to check out the corresponding [discuss post](https://discuss.status.im/t/discv5-feasibility-study/1632). Additionally, if you are unfamiliar with discv5, check out my previous write-up: ["From Kademlia to Discv5"](https://vac.dev/kademlia-to-discv5).

## Motivating Problem

The discovery method currently used by [Status](https://status.im), is made up of various components and grew over time to solve a mix of problems. We want to simplify this while maintaining some of the properties we currently have.

Namely, we want to ensure censorship resistance to state-level adversaries. One of the issues Status had which caused us them add to their discovery method was the fact that addresses from providers like AWS and GCP were blocked both in Russia and China. Additionally, one of the main factors required is the ability to function on resource restricted devices.

Considering we are talking about resource restricted devices, let's look at the implications and what we need to consider:

 - **Battery consumption** - constant connections like websockets consume a lot of battery life.
 - **CPU usage** - certain discovery methods may be CPU incentive, slowing an app down and making it unusable.
 - **Bandwidth consumption** - a lot of users will be using data plans, the discovery method needs to be efficient in order to accommodate those users without using up significant portions of their data plans.
 - **Short connection windows** - the discovery algorithm needs to be low latency, that means it needs to return results fast. This is because many users will only have the app open for a short amount of time.
 - **Not publicly connectable** - There is a good chance that most resource restricted devices are not publicly connectable.

For a node to be able to participate as both a provider, and a consumer in the discovery method. Meaning a node both reads from other nodes' stored DHTs and hosts the DHT for other nodes to read from, it needs to be publically connectable. This means another node must be able to connect to some public IP of the given node. 

With devices that are behind a NAT, this is easier said than done. Especially mobile devices, that when connected to 4G LTE networks are often stuck behind a symmetric NAT, drastically reducing the the succeess rate of NAT traversal. Keeping this in mind, it becomes obvious that most resource restricted devices will be consumers rather than providers due to this technical limitation.

In order to answer our questions, we formulated the problem with a simple method for testing. The "needle in a haystack" problem was formulated to figure out how easily a specific node can be found within a given network. This issue was fully formulated in [vacp2p/research#15](https://github.com/vacp2p/research/issues/15).

## Overview

The main things we wanted to investigate was the overhead on finding a peer. This means we wanted to look at both the bandwidth, latency and effectiveness of this. There are 2 methods which we can use to find a peer:
 - We can find a peer with a specific ID, using normal lookup methods as documented by Kademlia.
 - We can find a peer that advertises a capability, this is possible using either capabilities advertised in the ENR or through [topic tables](https://github.com/ethereum/devp2p/blob/master/discv5/discv5-theory.md#topic-advertisement).

## Feasbility

To be able to investigate the feasibility of discv5, we used various methods including rough calculations which can be found in the [notebook](https://vac.dev/discv5-notebook/), and a simulation isolated in [vacp2p/research#19](https://github.com/vacp2p/research/pull/19).

### CPU & Memory Usage

The experimental discv5 has already been used within Status, however what was noticed was that the CPU and memory usage was rather high. It therefore should be investiaged if this is still the case, and if it is, it should be isolated where this stems from. Additionally it is worth looking at whether or not this is the case with both the go and nim implementation.

See details: [vacp2p/research#31](https://github.com/vacp2p/research/issues/31)

### NAT on Cellular Data

If a peer is not publically connectable it can not participate in the DHT both ways. A lot of mobile phones are behind symmetric NATs which UDP hole-punching close to impossible. It should be investigated whether or not mobile phones will be able to participate both ways and if there are good methods for doing hole-punching.

See details: [vacp2p/research#29](https://github.com/vacp2p/research/issues/29)

### Topic Tables

Topic Tables allow us the ability to efficiently find nodes given a specific topic. However, they are not implemented in the [status-im/nim-eth](https://github.com/status-im/nim-eth/) implementation nor are they fully finalized in the spec. These are important if the network grows past a size where the concentration of specific nodes is relatively low making them hard to find.

See details: [vacp2p/research#26](https://github.com/vacp2p/research/issues/26)

### Finding a node

It is important to note, that given a network is relatively small sized, eg 100-500 nodes, then finding a node given a specific address is relatively managable. Additionally, if the concentration of a specific capability in a network is reasonable, then finding a node advertising its capabilities using an ENR rather than the topic table is also managable. A reasonable concentration for example would be 10%, which would give us an 80% chance of getting a node with that capability in the first lookup request. This can be explored more using our [discv5 notebook](https://vac.dev/discv5-notebook/#Needle-in-a-haystack-with-ENR-records-indicating-capabilities).

## Results

Research has shown that finding a node in the DHT has a relatively low effect on bandwidth, both inbound and outbound. For example when trying to find a node in a network of 100 nodes, it would take roughly 5668 bytes total. Additionally if we assume 100ms latency per request it would range at ≈ 300ms latency, translating to 3 requests to find a specific node.

## General Thoughts

One of the main blockers right now is figuring out what the CPU and memory usage of discv5 is on mobile phones, this is a large blocker as it affects one of the core problems for us. We need to consider whether discv5 is an upgrade as it allows us to simplify our current discovery process or if it is too much of an overhead for resource restricted devices. The topic table feature could largely enhance discovery however it is not yet implemented. Given that CPU and memory isn't too high, discv5 could probably be used as the other issues are more "features" than large scale issues. Implementing it would already reduce the ability for state level adversaries to censor our nodes.

## Acknowledgements
 - Oskar Thoren
 - Dmitry Shmatko
 - Kim De Mey
 - Corey Petty
