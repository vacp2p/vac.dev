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

A big problem when doing p2p data sync over mobilephones is that most devices
are offline. With a naive approach, you quickly run into issues of 'ping-pong'
behavior.

This problem was identified in the previous post on data sync (TODO: link).
Recall that some requirements weren't fully satisfied. In this post we outline
an extension that solves his.

> 3. MUST allow for mobile-friendly usage. By mobile-friendly we mean devices
>    that are resource restricted, mostly-offline and often changing network.

> 4. MAY use helper services in order to be more mobile-friendly. Examples of
>    helper services are decentralized file storage solutions such as IPFS and
>    Swarm. These help with availability and latency of data for mostly-offline
>    devices.

We wrote the following:

> The problem above hints at the requirements 3 and 4 above. While we did get
> reliable syncing (requirement 1), it came at a big cost.

> There are a few ways of getting around this issue. One is having a *store and
> forward* model, where some intermediary node picks up (encrypted) messages and
> forwards them to the recipient. This is what we have in production right now
> at Status.

> Another, arguably more pure and robust, way is having a *remote log*, where
> the actual data is spread over some decentralized storage layer, and you have
> a mutable reference to find the latest messages, similar to DNS.

> What they both have in common is that they act as a sort of highly-available
> cache to smooth over the non-overlapping connection windows between two
> endpoints. Neither of them are *required* to get reliable data transmission.

In this post, we'll outline this remote log in a bit more detail.

# Remote log

