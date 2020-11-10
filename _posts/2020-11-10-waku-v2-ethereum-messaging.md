---
layout: post
name:  "Vac, Waku v2 and Ethereum Messaging"
title:  "Vac, Waku v2 and Ethereum Messaging"
date:   2020-11-10 12:00:00 +0800
author: oskarth
published: true
permalink: /waku-v2-ethereum-messaging
categories: research
summary: Talk from Taipei Ethereum Meetup. Read on to find out about our journey from Whisper to Waku v2, as well as how Waku v2 can be useful for Etherum Messaging.
image: /assets/img/taipei_ethereum_meetup.png
discuss: https://forum.vac.dev/t/TODO
---

*The following post is a transcript of the talk given at the [Taipei Ethereum meetup, November 5](https://www.meetup.com/Taipei-Ethereum-Meetup/events/274033344/). There is also a [video recording]( https://www.youtube.com/watch?v=lUDy1MoeYnI).*

# Vac, Waku v2 and Ethereum Messaging

## 0. Introduction

Hi! My name is Oskar and I'm the protocol research lead at Vac. This talk will be divided into two parts. First I'll talk about the journey from Whisper, to Waku v1 and now to Waku v2. Then I'll talk about messaging in Ethereum. After this talk, you should have an idea of what Waku v2 is, the problems it is trying to solve, as well as where it can be useful for messaging in Ethereum.

## PART 1 - VAC AND THE JOURNEY FROM WHISPER TO WAKU V1 TO WAKU V2

## 1. Vac intro

First, what is Vac? Vac grew out of our efforts Status to create a window on to Ethereum and secure messenger. Vac is modular protocol stack for p2p secure messaging, paying special attention to resource restricted devices, privacy and censorship resistance.

Today we are going to talk mainly about Waku v2, which is the transport privacy / routing aspect of the Vac protocol stack. It sits "above" the p2p overlay, such as libp2p dealing with transports etc, and below a conversational security layer dealing with messaging encryption, such as using Double Ratchet etc.

## 2. Whisper to Waku v1

In the beginning, there was Whisper. Whisper was part of the holy trinity of Ethereum. You had Ethereum for consensus/computation, Whisper for messaging, and Swarm for storage.

However, for various reasons, Whisper didn't get the attention it deserved. Development dwindled, it promised too much and it suffered from many issues, such as being extremely inefficient and not being suitable for running on e.g. mobile phone. Despite this, Status used it in its app from around 2017 to 2019. As far as I know, it was one of very few, if not the only, production uses of Whisper.

In an effort to solve some of its immediate problems, we forked Whisper into Waku and formalized it with a proper specification. This solved immediate bandwidth issues for light nodes, introduced rate limiting for better spam protection, improved historical message support, etc.

If you are interested in this journey, checkout the EthCC talk Dean and I gave in Paris earlier this year https://www.youtube.com/watch?v=6lLT33tsJjs

Status upgraded to Waku v1 early 2020. What next?

## 3. Waku v1 to v2

We were far from done. The changes we had made were quite incremental and done in order to get tangible improvements as quickly as possible. This meant we couldn't address more fundamental issues related to full node routing scalability, running with libp2p for more transports, better security, better spam protection and incentivization.

This kickstarted Waku v2 efforts, which is what we've been working on since July. This work was and is initally centered around a few pieces:

(a) Moving to libp2p
(b) Better routing
(c) Accounting and user-run nodes

The general theme was: making the Waku network more scalable and robust.

We also did a scalability study to show at what point the network would run into issues, due to the inherent lack of routing that Whisper and Waku v1 provided.

You can read more about this here <https://vac.dev/waku-v2-plan>

## 3.5 Waku v2 - Design goals

Taking a step back, what problem does Waku v2 attempt to solve compared to all the other solutions that exists out there? What type of applications should use it and why? We have the following design goals:

1. **Generalized messaging**. Many applications requires some form of messaging protocol to communicate between different subsystems or different nodes. This messaging can be human-to-human or machine-to-machine or a mix.

2. **Peer-to-peer**. These applications sometimes have requirements that make them suitable for peer-to-peer solutions.

3. **Resource restricted**. These applications often run in constrained environments, where resources or the environment is restricted in some fashion. E.g.:

    - limited bandwidth, CPU, memory, disk, battery, etc
    - not being publicly connectable
    - only being intermittently connected; mostly-offline

4. **Privacy***. These applications have a desire for some privacy guarantees, such as pseudonymity, metadata protection in transit, etc.

As well as to do so in a modular fashion. Meaning you can find a reasonable trade-off depending on your exact requirements. For example, you usually have to trade off some bandwidth to get metadata protection, and vice versa.

The concept of designing for resource restricted devices also leads to the concept of adaptive nodes, where you have more of a continuum between full nodes and light nodes. For example, if you switch your phone from mobile data to WiFi you might be able to handle more bandwidth, and so on.

## 4. Waku v2 - Breakdown

Where is Waku v2 at now, and how is it structured?

It is running over libp2p and we had our second internal testnet last week or so. As a side note, we name our testnets after subway stations in Taipei, the first one being Nangang, and the most recent one being Dingpu.

The main implementation is written in Nim using nim-libp2p, which is also powering Nimbus, an Ethereum 2 client. There is also a PoC for running Waku v2 in the browser. On a spec level, we have the following specifications that corresponds to the components that make up Waku v2:

-   Waku v2 - this is the main spec that explains the goals of providing generalized messaging, in a p2p context, with a focus on privacy and running on resources restricted devices.
-   Relay - this is the main PubSub spec that provides better routing. It builds on top of GossipSub, which is what Eth2 heavily relies on as well.
-   Store - this is a 1-1 protocol for light nodes to get historical messages, if they are mostly-offline.
-   Filter - this is a 1-1 protocol for light nodes that are bandwidth restricted to only (or mostly) get messages they care about.
-   Message - this explains the payload, to get some basic encryption and content topics. It corresponds roughly to envelopes in Whisper/Waku v1.
-   Bridge - this explains how to do bridging between Waku v1 and Waku v2 for compatibility.

Right now, all protocols, with the exception of bridge, are in draft mode, meaning they have been implemented but are not yet being relied upon in production.

You can read more about the breakdown in this update here: https://vac.dev/waku-v2-update though some progress has been made since then, as well was in the main Waku v2 spec https://specs.vac.dev/specs/waku/v2/waku-v2.html

## 5. Waku v2 - Upcoming

What's coming up next? There are a few things.

For Status to use it in production, it needs to be integrated into the main app using the Nim Node API. The bridge also needs to be implemented and tested.

For other users, we are currently overhauling the API to allow usage from a browser, e.g. To make this experience great, there are also a few underlying infrastructure things that we need in nim-libp2p, such as a more secure HTTP server in Nim, Websockets and WebRTC support.

There are also some changes we made to at what level content encryption happens, and this needs to be made easier to use in the API. This means you can use a node without giving your keys to it, which is useful in some environments.

More generally, beyond getting to production-ready use, there are a few bigger pieces that we are working on or will work on soon. These are things like:

-   Better scaling, by using topic sharding.
-   Accounting and user-run nodes, to account for and incentives full nodes.
-   Stronger and more rigorous privacy guarantees, e.g. through study of GossipSub, unlinkable packet formats, etc.
-   Rate Limit Nullifier for privacy preserving spam protection, a la what Barry Whitehat has presented before.

As well as better support for Ethereum M2M Messaging. Which is what I'll talk about next.

## PART 2 - ETHEREUM MESSAGING

A lot of what follows is inspired by exploratory work that John Lea has done at Status, previously Head of UX Architecture at Ubuntu.

## 6. Ethereum Messaging - Why?

It is easy to think that Waku v2 is only for human to human messaging, since that's how Waku is currently primarily used in the Status app. However, the goal is to be useful for generalized messaging, which includes other type of information as well as machine to machine messaging.

What is Ethereum M2M messaging? Going back to the Holy Trinity of Ethereum/Whisper/Swarm, the messaging component was seen as something that could facilitate messages between dapps and acts as a building block. This can help with things such as:

-   Reducing on-chain transactions
-   Reduce latency for operations
-   Decentralize centrally coordinated services (like WalletConnect)
-   Improve UX of dapps
-   Broadcast live information
-   A message transport layer for state channels

And so on.

## 7. Ethereum Messaging - Why? (Cont)

What are some examples of practical things Waku as used for Ethereum Messaging could solve?

-   Multisig transfers only needing one on chain transaction
-   DAO votes only needing one one chain transaction
-   Giving dapps ability to direct push notifications to users
-   Giving users ability to directly respond to requests from daps
-   Decentralized Wallet Connect

Etc.

## 8. What's needed to deliver this?

We can break it down into our actors:

- Decentralized M2M messaging system (Waku)
- Native wallets (Argent, Metamask, Status, etc)
- Dapps that benefit from M2M messaging
- Users whose problems are being solved

Each of these has a bunch of requirements in turn. The messaging system needs to be decentralized, scalable, robust, etc. Wallets need support for messaging layer, dapps need to integrate this, etc.

This is a lot! Growing adoption is a challenge. There is a catch 22 in terms of justifying development efforts for wallets, when no dapps need it, and likewise for dapps when no wallets support Waku. In addition to this, there must be proven usage of Waku before it can be relied on, etc. How can we break this up into smaller pieces of work?

## 9. Breaking up the problem and a high level roadmap

We can start small. It doesn't and need to be used for critical features first. A more hybrid approach can be taken where it acts more as nice-to-haves.

1.  Forking Whisper and solving scalablity, spam etc issues with it.
    This is a work in progress. What we talked about in part 1.
2.  Expose messaging API for Dapp developers.
3.  Implement decentralized version of WalletConnect.
    Currently wallets connect ot dapps with centralized service. Great UX.
4.  Solve DAO/Multi-Sig coordination problem.
    E.g. send message to wallet-derived key when it is time to sign a transaction.
5.  Extend dapp-to-user and user-to-dapp communication to more dapps.
    Use lessons learned and examples to drive adoptation for wallets/dapps.

And then build up from there.

## 10. We are hiring!

A lot of this will happen in Javascript and browsers, since that's the primarily environment for a lot of wallets and dapps. We are currently hiring for a Waku JS Wallet integration lead to help push this effort further.

Come talk to me after or apply here https://status.im/our_team/open_positions.html?gh_jid=2385338

That's it! You can find us on Status, Telegram, vac.dev. I'm on twitter here: https://twitter.com/oskarth

Questions?

---
