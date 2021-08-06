---
layout: post
name:  "[Talk at COSCUP] Vac, Waku v2 and Ethereum Messaging"
title:  "[Talk at COSCUP] Vac, Waku v2 and Ethereum Messaging"
date:   2021-08-06 12:00:00 +0800
author: oskarth
published: true
permalink: /waku-v2-ethereum-coscup
categories: research
summary: Learn more about Waku v2, its origins, goals, protocols, implementation and ongoing research. Understand how it is used and how it can be useful for messaging in Ethereum.
image: /assets/img/coscup-waku/talk.png
discuss: https://forum.vac.dev/t/discussion-talk-at-coscup-vac-waku-v2-and-ethereum-messaging/95
---

*This is the English version of a talk originally given in Chinese at COSCUP in Taipei. There is a [video recording](https://www.youtube.com/watch?v=s0ATpQ4_XFc) with Chinese and English subtitles.*

---

## Introduction

Hi everyone!

Today I'll talk to you about Waku v2. What it is, what problems it is solving,
and how it can be useful for things such as messaging in Ethereum. First, let me
start with some brief background.

## Brief history and background

Back when Ethereum got started, there used to be this concept of the "holy
trinity". You had Ethereum for compute/consensus, Swarm for storage, and Whisper
for messaging. This is partly where the term Web3 comes from.

Status started out as an app with the goal of being a window onto Ethereum and
a secure messenger. As one of the few, if not the only, apps using Whisper in
production, not to mention on a mobile phone, we quickly realized there were
problems with the underlying protocols and infrastructure. Protocols such as
Whisper weren't quite ready for prime time yet when it came to things such as
scalability and working in the real world.

As we started addressing some of these challenges, and moved from app
developement to focusing on protocols, research and infrastructure, we created
Vac. Vac is an r&d unit doing protocol research focused on creating modular p2p
messaging protocols for private, secure, censorship resistant communication.

I won't go into too much detail on the issues with Whisper, if you are
interested in this check out this talk
[here](https://www.youtube.com/watch?v=6lLT33tsJjs) or this
[article](https://vac.dev/fixing-whisper-with-waku).

In a nutshell, we forked Whisper to address immediate shortcomings and this
became Waku v1. Waku v2 is complete re-thought implementation from scratch on top
of libp2p. This will be the subject of today's talk.

## Waku v2

### Overview

Waku v2 is a privacy-preserving peer-to-peer messaging protocol for resource
restricted devices. We can look at Waku v2 as several things:

- Set of protocols
- Set of implementations
- Network of nodes

Let's first look at what the goals are.

### Goals

Waku v2 provides a PubSub based messaging protocol with the following
characteristics:

1. **Generalized messaging**. Applications that require a messaging protocol to
   communicate human to human, machine to machine, or a mix.
2. **Peer-to-peer**. For applications that require a p2p solution.
3. **Resource restricted**. For example, running with limited bandwidth, being
   mostly-offline, or in a browser.
4. **Privacy**. Applications that have privacy requirements, such as pseudonymity,
   metadata protection, etc.

And to provide these properties in a modular fashion, where applications can
choose their desired trade-offs.

### Protocols

Waku v2 consists of several protocols. Here we highlight a few of the most
important ones:

- 10/WAKU2 - main specification, details how all the pieces fit together
- 11/RELAY - thin layer on top of GossipSub for message dissemination
- 13/STORE - fetching of historical messages
- 14/MESSAGE - message payload

This is the recommended subset for a minimal Waku v2 client.

In addition to this there are many other types of specifications at various
stages of maturity, such as: content based filtering, bridge mode to Waku v1,
JSON RPC API, zkSNARKS based spam protection with RLN, accounting and
settlements with SWAP, fault-tolerant store nodes, recommendations around topic
usage, and more.

See https://rfc.vac.dev/ for a full overview.

### Implementations

Waku v2 consists of multiple implementations. This allows for client diversity,
makes it easier to strengthen the protocols, and allow people to use Waku v2 in
different contexts.

- nim-waku - the reference client written in Nim, most full-featured.
- js-waku - allow usage of Waku v2 from browsers, focus on interacting with dapps.
- go-waku - subset of Waku v2 to ease integration into the Status app.

### Testnet Huilong and dogfooding

In order to test the protocol we have setup a testnet across all implementations
called Huilong. Yes, that's the Taipei subway station!

![](assets/img/coscup-waku/huilong.jpg)

Among us core devs we have disabled the main #waku Discord channel used for
development, and people run their own node connected to this toy chat application.

Feel free to join and say hi! Instructions can be found here:

- [nim-waku chat](https://github.com/status-im/nim-waku/blob/master/docs/tutorial/chat2.md)

- [js-waku chat](https://status-im.github.io/js-waku/)

- [go-waku chat](https://github.com/status-im/go-waku/tree/master/examples/chat2)

### Research

While Waku v2 is being used today, we are actively researching improvements.
Since the design is modular, we can gracefully introduce new capabilities. Some
of these research areas are:

- Privacy-preserving spam protection using zkSNARKs and RLN
- Accounting and settlement of resource usage to incentivize nodes to provide services with SWAP
- State synchronization for store protocol to make it easier to run a store node without perfect uptime
- Better node discovery
- More rigorous privacy analysis
- Improving interaction with wallets and dapp

## Use cases

Let's look at where Waku v2 is and can be used.

### Prelude: Topics in Waku v2

To give some context, there are two different types of topics in Waku v2. One is
a PubSub topic, for routing. The other is a content topic, which is used for
content based filtering. Here's an example of the default PubSub topic:

`/waku/2/default-waku/proto`

This is recommended as it increases privacy for participants and it is stored by
default, however this is up to the application.

The second type of topic is a content topic, which is application specific. For
example, here's the content topic used in our testnet:

`/toychat/2/huilong/proto`

For more on topics, see https://rfc.vac.dev/spec/23/

### Status app

In the Status protocol, content topics - topics in Whisper/Waku v1 - are used for several things:

- Contact code topic to discover X3DH bundles for perfect forward secrecy
	- Partitioned into N (currently 5000) content topics to balance privacy with efficiency
- Public chats correspond to hash of the plaintext name
- Negotiated topic for 1:1 chat with DHKE derived content topic

See more here https://specs.status.im/spec/10

Currently, Status app is in the process of migrating to and testing Waku v2.

### DappConnect: Ethereum messaging

It is easy to think of Waku as being for human messaging, since that's how it is
primarily used in the Status app, but the goal is to be useful for generalized
messaging, which includes Machine-To-Machine (M2M) messaging.

Recall the concept of the holy trinity with Ethereum/Swarm/Whisper and Web3 that
we mentioned in the beginning. Messaging can be used as a building block for
dapps, wallets, and users to communicate with each other. It can be used for
things such as:

- Multisig and DAO vote transactions only needing one on-chain operation
- Giving dapps ability to send push notifications to users
- Giving users ability to directly respond to requests from dapps
- Decentralized WalletConnect
- Etc

Basically anything that requires communication and doesn't have to be on-chain.

### WalletConnect v2

WalletConnect is an open protocol for connecting dapps to wallets with a QR
code. Version 2 is using Waku v2 as a communication channel to do so in a
decentralized and private fashion.

![](assets/img/coscup-waku/walletconnect.png)

See for more: https://docs.walletconnect.org/v/2.0/tech-spec

WalletConnect v2 is currently in late alpha using Waku v2.

### More examples

- Gasless voting and vote aggregation off-chain
- Dapp games using Waku as player discovery mechanism
- Send encrypted message to someone with an Ethereum key
- <Your dapp here>

These are all things that are in progress / proof of concept stage.

## Contribute

We'd love to see contributions of any form!

- You can play with it here: [nim-waku chat](https://github.com/status-im/nim-waku/blob/master/docs/tutorial/chat2.md) (/ [js-waku browser chat](https://status-im.github.io/js-waku/))
- Use Waku to build a dapp: [js-waku docs](https://status-im.github.io/js-waku/docs/)
- Contribute to code: [js-waku](https://github.com/status-im/js-waku) / [nim-waku](https://github.com/status-im/nim-waku)
- Contribute to specs: [vacp2p/rfc](https://github.com/vacp2p/rfc)
- We are hiring: Wallet & Dapp Integration Developer, Distributed Systems Engineer, Protocol Engineer, Protocol Researcher - all [job listings](https://status.im/our_team/jobs.html)
- Join our new [Discord](https://discord.gg/bJCTqS5H)

## Conclusion

In this talk we've gone over the original vision for Web3 and how Waku came to
be. We've also looked at what Waku v2 aims to do. We looked at its protocols,
implementations, the current testnet as well as briefly on some ongoing
research for Vac.

We've also looked at some specific use cases for Waku. First we looked at how
Status uses it with different topics. Then we looked at how it can be useful for
messaging in Ethereum, including for things like WalletConnect.

I hope this talk gives you a better idea of what Waku is, why it exists, and
that it inspires you to contribute, either to Waku itself or by using it in your
own project!
