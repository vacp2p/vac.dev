---
layout: post
name:  "Remote log data sync"
title:  "Remote log data sync"
date:   2019-10-04 12:00:00 +0800
author: oskarth
published: false
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

The spec is in early draft stage.

There's a basic PoC/spike here (TODO link).

## Future work

Analyze/simulate further
Deploy
