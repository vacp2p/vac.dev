---
layout: post
name:  "Waku v2 update"
title:  "Waku v2 update"
date:   2020-09-25 12:00:00 +0800
author: oskarth
published: true
permalink: /waku-v2-update
categories: research
summary: TODO
image: /assets/img/TODO
discuss: TODO
---

It has been a while since the last post. It is time for an update on Waku v2.
Aside from getting more familiar with libp2p (specifically nim-libp2p) and some
vacation, what have we been up to? In this post we'll talk about what we've
gotten done since last time, and briefly talk about immediate next steps and
future. But first, a recap.

# Recap

In the last post ([Waku v2 plan](https://vac.dev/waku-v2-plan)) we explained the
rationale of Waku v2 - the current Waku network is fragile and doesn't scale. To
solve this, Waku v2 aims to reduce amplification factors and get more user run
nodes. We broke the work down into three separate tracks.

1) Track 1 - Move to libp2p
2) Track 2 - Better routing
3) Track 3 - Accounting and user-run nodes

As well as various rough components for each track. The primary inital focus is
track 1. This means things like: moving to FloodSub, simplify the protocol, core
integration, topic interest behavior, historical message caching, and Waku
v1<>v2 bridge.

# Current state

Let's talk about specs and the main implementation, nim-waku.

## Specs

After some back and forth on how to best structure things, we ended up breaking
down the specs into a few pieces. While Waku v2 is best though of as a cohesive
whole in terms of its capabilities, it is made up of several protocols. Here's a
list of the current specs and their status:

- [Main spec](https://specs.vac.dev/specs/waku/v2/waku-v2.html) (draft)
- [Relay protocol spec](https://specs.vac.dev/specs/waku/v2/waku-relay.html) (draft)
- [Filter protocol spec](https://specs.vac.dev/specs/waku/v2/waku-filter.html) (raw)
- [Store protocol spec](https://specs.vac.dev/specs/waku/v2/waku-store.html) (raw)
- [Bridge spec](https://specs.vac.dev/specs/waku/v2/waku-bridge.html) (raw)

Raw means there is not yet an implementation that corresponds fully to the spec,
and draft means there is an implementation that corresponds to the spec. In the
interest of space, we won't go into too much detail on the specs here except to
note a few things:

- The relay spec is essentially a thin wrapper on top of PubSub/FloodSub/GossipSub
- The filter protocol corresponds to previous light client mode in Waku v1
- The store protocol corresponds to the previous mailserver construct in Waku v1

The filter and store protocol allow for adaptive nodes, i.e. nodes that have
various capabilities. For example, a node being mostly offline, or having
limited bandwidth capacity. The bridge spec outlines how to bridge the Waku v1
and v2 networks.

## Implementation

The main implementation we are working on is
[nim-waku](https://github.com/status-im/nim-waku/). This builds on top of
libraries such as [nim-libp2p](https://github.com/status-im/nim-libp2p) and
others that the [Nimbus team](https://nimbus.team/) have been creating as an
Ethereum 2.0 client.

Currently nim-waku implements the relay protocol, and is close to implementing
filter and store protocol. It also exposes a [Nim Node
API](https://github.com/status-im/nim-waku/blob/master/docs/api/v2/node.md) that
allows libraries such as [nim-status](https://github.com/status-im/status-nim)
to use it. There is also a rudimentary JSON RPC API for command line scripting.

## Nangang testnet

Last week we launched a very rudimentary internal testnet called Nangang. The
goal was to test basic connectivity and make sure things work end to end. It
didn't have things like: client integration, encryption, bridging, multiple
clients, tore/filter protocol, or even a real interface. What it did do is allow
Waku developers to "chat" via RPC calls and looking in the log output. Doing
this meant we exposed and fixed a few blockers, such as connection issues,
deployment, topic subscription management, protocol and node integration, and
basic scripting/API usage. After this, we felt confident enough to upgrade the
main and relay spec to "draft" status.

## Waku Web PoC

As a bonus, we wanted to see what it'd take to get Waku running in a browser.
This is a very powerful capability that enables a lot of use cases, and
something that libp2p enables with its multiple transport support.

Using the current stack with nim-waku, would require quite a lot of ground work
with WASM, WebRTC, Websockets support etc. Instead, we decided to take a
shortcut and hack together a JS implementation called [Waku Web
Chat](https://github.com/vacp2p/waku-web-chat/). This quick hack wouldn't be
possible without the people behind
[js-libp2p-examples](https://github.com/libp2p/js-libp2p-examples/) and
[js-libp2p](https://github.com/libp2p/js-libp2p) and all its libraries.

It consists of a brower implementation, a NodeJS implementation and a bootstrap
server that acts as a signaling server for WebRTC. It is largely a bastardized
version of GossipSub, and while it isn't completely to spec, it does allow
messages from a browser to eventually end up at a nim-waku node, and vice
versa. Which is pretty cool.

# Coming up

## Immediate next steps

## Some things missing

While we are close to closing out track 1, there are still a few things missing.

TODO

From track 1

Core integration has been lacking, bandwidth concerns but also different interface.

We are also not sure about companion spec exactly.

Bridge not actively pursued right now.

## Medium term

## Integration and use


** 1 Intro
Last post a while ago. Getting more familiar with working with libp2p
(specifically nim-libp2p) and short vacation. So what have we gotten done?
** 2 Recap
As a recap, here is what we said last update. Three tracks...

** 3 Current state / what's done
We have experimental implementation in nim-waku. Specs basic draft for main and relay. WIP for store and filter. Adaptive node idea.
** 4 Nangang testnet
Last week had a very small testnet to ensure we could talk to each other, etc.
** 5 Web PoC
We did a basic testnet. Kudos to Cayman and Vasco et al for doing all the hard work here!
** 6 Immediate next steps
Store and filter WIP. Testnet upcoming.

** 7 Medium term
Incentivizes, more scaling, RLN.

** 8 Integration and use
CTA...

Also btw 1-2 people joining
