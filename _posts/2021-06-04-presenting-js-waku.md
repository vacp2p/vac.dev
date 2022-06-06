---
layout: post
name: "Presenting JS-Waku: Waku v2 in the Browser"
title: "Presenting JS-Waku: Waku v2 in the Browser"
date: 2021-06-04 12:00:00 +0800
author: franck
published: true
permalink: /presenting-js-waku
categories: platform
summary: "JS-Waku is bringing Waku v2 to the browser. Learn what we achieved so far and what is next in our pipeline!"
image: /assets/img/js-waku-gist.png
discuss: https://forum.vac.dev/t/discussion-presenting-js-waku-waku-v2-in-the-browser/81 
---

For the past 3 months, we have been working on bringing Waku v2 to the browser.
Our aim is to empower dApps with Waku v2, and it led to the creation of a new library.
We believe now is good time to introduce it!

## Waku v2

First, let's review what Waku v2 is and what problem it is trying to solve.

Waku v2 comes from a need to have a more scalable, better optimised solution for the Status app to achieve decentralised
communications on resource restricted devices (i.e., mobile phones).

The Status chat feature was initially built over Whisper.
However, Whisper has a number of caveats which makes it inefficient for mobile phones.
For example, with Whisper, all devices are receiving all messages which is not ideal for limited data plans.

To remediate this, a Waku mode (then Waku v1), based on devp2p, was introduced.
To further enable web and restricted resource environments, Waku v2 was created based on libp2p.
The migration of the Status chat feature to Waku v2 is currently in progress.

We see the need of such solution in the broader Ethereum ecosystem, beyond Status.
This is why we are building Waku v2 as a decentralised communication platform for all to use and build on.
If you want to read more about Waku v2 and what it aims to achieve,
checkout [What's the Plan for Waku v2?](/waku-v2-plan).

Since last year, we have been busy defining and implementing Waku v2 protocols in [nim-waku](https://github.com/status-im/nim-waku),
from which you can build [wakunode2](https://github.com/status-im/nim-waku#wakunode).
Wakunode2 is an adaptive and modular Waku v2 node,
it allows users to run their own node and use the Waku v2 protocols they need.
The nim-waku project doubles as a library, that can be used to add Waku v2 support to native applications.

## Waku v2 in the browser

We believe that dApps and wallets can benefit from the Waku network in several ways.
For some dApps, it makes sense to enable peer-to-peer communications.
For others, machine-to-machine communications would be a great asset.
For example, in the case of a DAO,
Waku could be used for gas-less voting.
Enabling the DAO to notify their users of a new vote,
and users to vote without interacting with the blockchain and spending gas.

[Murmur](https://github.com/status-im/murmur) was the first attempt to bring Whisper to the browser,
acting as a bridge between devp2p and libp2p.
Once Waku v2 was started and there was a native implementation on top of libp2p,
a [chat POC](https://github.com/vacp2p/waku-web-chat) was created to demonstrate the potential of Waku v2
in web environment.
It showed how using js-libp2p with few modifications enabled access to the Waku v2 network.
There was still some unresolved challenges.
For example, nim-waku only support TCP connections which are not supported by browser applications.
Hence, to connect to other node, the POC was connecting to a NodeJS proxy application using websockets,
which in turn could connect to wakunode2 via TCP. 

However, to enable dApp and Wallet developers to easily integrate Waku in their product,
we need to give them a library that is easy to use and works out of the box:
introducing [JS-Waku](https://github.com/status-im/js-waku).

JS-Waku is a JavaScript library that allows your dApp, wallet or other web app to interact with the Waku v2 network.
It is available right now on [npm](https://www.npmjs.com/package/js-waku):

`npm install js-waku`.

As it is written in TypeScript, types are included in the npm package to allow easy integration with TypeScript, ClojureScript and other typed languages that compile to JavaScript.

Key Waku v2 protocols are already available:
[message](https://rfc.vac.dev/spec/14/), [store](https://rfc.vac.dev/spec/13/), [relay](https://rfc.vac.dev/spec/11/) and [light push](https://rfc.vac.dev/spec/19/),
enabling your dApp to:

- Send and receive near-instant messages on the Waku network (relay),
- Query nodes for messages that may have been missed, e.g. due to poor cellular network (store),
- Send messages with confirmations (light push).

JS-Waku needs to operate in the same context from which Waku v2 was born:
a restricted environment were connectivity or uptime are not guaranteed;
JS-Waku brings Waku v2 to the browser.

## Achievements so far

We focused the past month on developing a [ReactJS Chat App](https://status-im.github.io/js-waku/).
The aim was to create enough building blocks in JS-Waku to enable this showcase web app that
we now [use for dogfooding](https://github.com/status-im/nim-waku/issues/399) purposes.

Most of the effort was on getting familiar with the [js-libp2p](https://github.com/libp2p/js-libp2p) library
that we heavily rely on.
JS-Waku is the second implementation of Waku v2 protocol,
so a lot of effort on interoperability was needed.
For example, to ensure compatibility with the nim-waku reference implementation,
we run our [tests against wakunode2](https://github.com/status-im/js-waku/blob/90c90dea11dfd1277f530cf5d683fb92992fe141/src/lib/waku_relay/index.spec.ts#L137) as part of the CI.

This interoperability effort helped solidify the current Waku v2 specifications:
By clarifying the usage of topics
([#327](https://github.com/vacp2p/rfc/issues/327), [#383](https://github.com/vacp2p/rfc/pull/383)),
fix discrepancies between specs and nim-waku
([#418](https://github.com/status-im/nim-waku/issues/418), [#419](https://github.com/status-im/nim-waku/issues/419))
and fix small nim-waku & nim-libp2p bugs
([#411](https://github.com/status-im/nim-waku/issues/411), [#439](https://github.com/status-im/nim-waku/issues/439)).

To fully access the waku network, JS-Waku needs to enable web apps to connect to nim-waku nodes.
A standard way to do so is using secure websockets as it is not possible to connect directly to a TCP port from the browser.
Unfortunately websocket support is not yet available in [nim-libp2p](https://github.com/status-im/nim-libp2p/issues/407) so 
we ended up deploying [websockify](https://github.com/novnc/websockify) alongside wakunode2 instances.

As we built the [web chat app](https://github.com/status-im/js-waku/tree/main/examples/web-chat),
we were able to fine tune the API to provide a simple and succinct interface.
You can start a node, connect to other nodes and send a message in less than ten lines of code:

```javascript
import { Waku } from 'js-waku';

const waku = await Waku.create({});

const nodes = await getStatusFleetNodes();
await Promise.all(nodes.map((addr) => waku.dial(addr)));

const msg = WakuMessage.fromUtf8String("Here is a message!", "/my-cool-app/1/my-use-case/proto")
await waku.relay.send(msg);
```

We have also put a bounty at [0xHack](https://0xhack.dev/) for using JS-Waku
and running a [workshop](https://www.youtube.com/watch?v=l77j0VX75QE).
We were thrilled to have a couple of hackers create new software using our libraries.
One of the projects aimed to create a decentralised, end-to-end encrypted messenger app,
similar to what the [ETH-DM](https://rfc.vac.dev/spec/20/) protocol aims to achieve.
Another project was a decentralised Twitter platform.
Such projects allow us to prioritize the work on JS-Waku and understand how DevEx can be improved.

As more developers use JS-Waku, we will evolve the API to allow for more custom and fine-tune usage of the network
while preserving this out of the box experience.

## What's next?

Next, we are directing our attention towards [Developer Experience](https://github.com/status-im/js-waku/issues/68).
We already have [documentation](https://www.npmjs.com/package/js-waku) available but we want to provide more:
[Tutorials](https://github.com/status-im/js-waku/issues/56), various examples
and showing how [JS-Waku can be used with Web3](https://github.com/status-im/js-waku/issues/72).

By prioritizing DevEx we aim to enable JS-Waku integration in dApps and wallets.
We think JS-Waku builds a strong case for machine-to-machine (M2M) communications.
The first use cases we are looking into are dApp notifications:
Enabling dApp to notify their user directly in their wallets!
Leveraging Waku as a decentralised infrastructure and standard so that users do not have to open their dApp to be notified
of events such as DAO voting.

We already have some POC in the pipeline to enable voting and polling on the Waku network,
allowing users to save gas by **not** broadcasting each individual vote on the blockchain.

To facilitate said applications, we are looking at improving integration with Web3 providers by providing examples
of signing, validating, encrypting and decrypting messages using Web3.
Waku is privacy conscious, so we will also provide signature and encryption examples decoupled from users' Ethereum identity.

As you can read, we have grand plans for JS-Waku and Waku v2.
There is a lot to do, and we would love some help so feel free to
check out the new role in our team:
[js-waku: Wallet & Dapp Integration Developer](https://status.im/our_team/jobs.html?gh_jid=3157894).
We also have a number of [positions](https://status.im/our_team/jobs.html) open to work on Waku protocol and nim-waku.

If you are as excited as us by JS-Waku, why not build a dApp with it?
You can find documentation on the [npmjs page](https://www.npmjs.com/package/js-waku).

Whether you are a developer, you can come chat with us using [WakuJS Web Chat](https://status-im.github.io/js-waku/)
or [chat2](https://github.com/status-im/nim-waku/blob/master/docs/tutorial/chat2.md).
You can get support in #dappconnect-support on [Vac Discord](https://discord.gg/j5pGbn7MHZ) or [Telegram](https://t.me/dappconnectsupport).
If you have any ideas on how Waku could enable a specific dapp or use case, do share, we are always keen to hear it.
