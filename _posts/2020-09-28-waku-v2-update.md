---
layout: post
name:  "Waku v2 Update"
title:  "Waku v2 Update"
date:   2020-09-28 12:00:00 +0800
author: oskarth
published: true
permalink: /waku-v2-update
categories: research
summary: A research log. Read on to find out what is going on with Waku v2, a messaging protocol. What has been happening? What is coming up next?
image: /assets/img/vac.png
discuss: https://forum.vac.dev/t/discussion-waku-v2-update/56
---

It has been a while since the last post. It is time for an update on Waku v2. Aside from getting more familiar with libp2p (specifically nim-libp2p) and some vacation, what have we been up to? In this post we'll talk about what we've gotten done since last time, and briefly talk about immediate next steps and future. But first, a recap.

# Recap

In the last post ([Waku v2 plan](https://vac.dev/waku-v2-plan)) we explained the rationale of Waku v2 - the current Waku network is fragile and doesn't scale. To solve this, Waku v2 aims to reduce amplification factors and get more user run nodes. We broke the work down into three separate tracks.

1. Track 1 - Move to libp2p
2. Track 2 - Better routing
3. Track 3 - Accounting and user-run nodes

As well as various rough components for each track. The primary initial focus is track 1. This means things like: moving to FloodSub, simplify the protocol, core integration, topic interest behavior, historical message caching, and Waku v1<>v2 bridge.

# Current state

Let's talk about the state of specs and our main implementation nim-waku. Then we'll go over our recent testnet, Nangang, and finish off with a Web PoC.

## Specs

After some back and forth on how to best structure things, we ended up breaking down the specs into a few pieces. While Waku v2 is best thought of as a cohesive whole in terms of its capabilities, it is made up of several protocols. Here's a list of the current specs and their status:

- [Main spec](https://rfc.vac.dev/spec/10/) (draft)
- [Relay protocol spec](https://rfc.vac.dev/spec/11/) (draft)
- [Filter protocol spec](https://rfc.vac.dev/spec/12) (raw)
- [Store protocol spec](https://rfc.vac.dev/spec/13) (raw)
- [Bridge spec](https://rfc.vac.dev/spec/15/) (raw)

Raw means there is not yet an implementation that corresponds fully to the spec, and draft means there is an implementation that corresponds to the spec. In the interest of space, we won't go into too much detail on the specs here except to note a few things:

- The relay spec is essentially a thin wrapper on top of PubSub/FloodSub/GossipSub
- The filter protocol corresponds to previous light client mode in Waku v1
- The store protocol corresponds to the previous mailserver construct in Waku v1

The filter and store protocol allow for adaptive nodes, i.e. nodes that have various capabilities. For example, a node being mostly offline, or having limited bandwidth capacity. The bridge spec outlines how to bridge the Waku v1 and v2 networks.

## Implementation

The main implementation we are working on is [nim-waku](https://github.com/status-im/nim-waku/). This builds on top of libraries such as [nim-libp2p](https://github.com/status-im/nim-libp2p) and others that the [Nimbus team](https://nimbus.team/) have been working on as part of their Ethereum 2.0 client.

Currently nim-waku implements the relay protocol, and is close to implementing filter and store protocol. It also exposes a [Nim Node API](https://github.com/status-im/nim-waku/blob/master/docs/api/v2/node.md) that allows libraries such as [nim-status](https://github.com/status-im/status-nim) to use it. Additionally, there is also a rudimentary JSON RPC API for command line scripting.

## Nangang testnet

Last week we launched a very rudimentary internal testnet called Nangang. The goal was to test basic connectivity and make sure things work end to end. It didn't have things like: client integration, encryption, bridging, multiple clients, store/filter protocol, or even a real interface. What it did do is allow Waku developers to "chat" via RPC calls and looking in the log output. Doing this meant we exposed and fixed a few blockers, such as connection issues, deployment, topic subscription management, protocol and node integration, and basic scripting/API usage. After this, we felt confident enough to upgrade the main and relay spec to "draft" status.

## Waku Web PoC

As a bonus, we wanted to see what it'd take to get Waku running in a browser. This is a very powerful capability that enables a lot of use cases, and something that libp2p enables with its multiple transport support.

Using the current stack, with nim-waku, would require quite a lot of ground work with WASM, WebRTC, Websockets support etc. Instead, we decided to take a shortcut and hack together a JS implementation called [Waku Web Chat](https://github.com/vacp2p/waku-web-chat/). This quick hack wouldn't be possible without the people behind [js-libp2p-examples](https://github.com/libp2p/js-libp2p-examples/) and [js-libp2p](https://github.com/libp2p/js-libp2p) and all its libraries. These are people like Jacob Heun, Vasco Santos, and Cayman Nava. Thanks!

It consists of a brower implementation, a NodeJS implementation and a bootstrap server that acts as a signaling server for WebRTC. It is largely a bastardized version of GossipSub, and while it isn't completely to spec, it does allow messages originating from a browser to eventually end up at a nim-waku node, and vice versa. Which is pretty cool.

# Coming up

Now that we know what the current state is, what is still missing? what are the next steps?

## Things that are missing

While we are getting closer to closing out work for track 1, there are still a few things missing from the initial scope:

1) Store and filter protocols need to be finished. This means basic spec, implementation, API integration and proven to work in a testnet. All of these are work in progress and expected to be done very soon. Once the store protocol is done in a basic form, it needs further improvements to make it production ready, at least on a spec/basic implementation level.

2) Core integration was mentioned in scope for track 1 initially. This work has stalled a bit, largely due to organizational bandwidth and priorities. While there is a Nim Node API that in theory is ready to be used, having it be used in e.g. Status desktop or mobile app is a different matter. The team responsible for this at Status ([status-nim](https://github.com/status-im/status-nim) has been making progress on getting nim-waku v1 integrated, and is expected to look into nim-waku v2 integration soon. One thing that makes this a especially tricky is the difference in interface between Waku v1 and v2, which brings
us too...

3) Companion spec for encryption. As part of simplifying the protocol, the routing is decoupled from the encryption in v2 ([1](https://github.com/vacp2p/specs/issues/158), [2](https://github.com/vacp2p/specs/issues/181)). There are multiple layers of encryption at play here, and we need to figure out a design that makes sense for various use cases (dapps using Waku on their own, Status app, etc).

4) Bridge implementation. The spec is done and we know how it should work, but it needs to be implemented.

5) General tightening up of specs and implementation.

While this might seem like a lot, a lot has been done already, and the majority of the remaining tasks are more amendable to be pursued in parallel with other efforts. It is also worth mentioning that part of track 2 and 3 have been started, in the form of moving to GossipSub (amplification factors) and basics of adaptive nodes (multiple protocols). This is in addition to things like Waku Web which were not part of the initial scope.

## Upcoming

Aside from the things mentioned above, what is coming up next? There are a few areas of interest, mentioned in no particular order. For track 2 and 3, see previous post for more details.

1) Better routing (track 2). While we are already building on top of GossipSub, we still need to explore things like topic sharding in more detail to further reduce amplification factors.

2) Accounting and user-run nodes (track 3). With store and filter protocol getting ready, we can start to implement accounting and light connection game for incentivization in a bottom up and iterative manner.

3) Privacy research. Study better and more rigorous privacy guarantees. E.g. how FloodSub/GossipSub behaves for common threat models, and how custom packet
format can improve things like unlinkability.

4) zkSnarks RLN for spam protection and incentivization. We studied this [last year](https://vac.dev/feasibility-semaphore-rate-limiting-zksnarks) and recent developments have made this relevant to study again. Create an [experimental spec/PoC](https://github.com/vacp2p/specs/issues/189) as an extension to the relay protocol. Kudos to Barry Whitehat and others like Kobi Gurkan and Koh Wei Jie for pushing this!

5) Ethereum M2M messaging. Being able to run in the browser opens up a lot of doors, and there is an opportunity here to enable things like a decentralized WalletConnect, multi-sig transactions, voting and similar use cases. This was the original goal of Whisper, and we'd like to deliver on that.

As you can tell, quite a lot of thing! Luckily, we have two people joining as protocol engineers soon, which will bring much needed support for the current team of ~2-2.5 people. More details to come in further updates.

---

If you are feeling adventurous and want to use early stage alpha software, check out the [docs](https://github.com/status-im/nim-waku/tree/master/docs). If you want to read the specs, head over to [Waku spec](https://rfc.vac.dev/spec/10/). If you want to talk with us, join us on [Status](https://get.status.im/chat/public/vac) or on [Telegram](https://t.me/vacp2p) (they are bridged).
