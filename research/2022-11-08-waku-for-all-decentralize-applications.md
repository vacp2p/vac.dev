---
layout: post
name: "Waku for All Decentralized Applications and Infrastructures"
title: "Waku for All Decentralized Applications and Infrastructures"
date: 2022-11-08 00:00:00
author: franck
published: true
permalink: /waku-for-all
categories: waku, dapp, infrastructure, public good, platform, operator
summary: | 
  Waku is an open communication protocol and network. Decentralized apps and infrastructure can use Waku for their
  communication needs. It is designed to enable dApps and decentralized infrastructure projects to have secure, private,
  scalable communication. Waku is available in several languages and platforms, from Web to mobile to desktop to cloud. 
  Initially, We pushed Waku adoption to the Web ecosystem, we learned that Waku is usable in a variety of complex applications
  and infrastructure projects. We have prioritized our effort to make Waku usable on various platforms and environments.
image: /img/black-waku-logo-with-name.png
discuss: TODO
---

# Background

We have built Waku to be the communication layer for Web3. Waku is a collection of protocols to chose from for your
messaging needs. It enables secure, censorship-resistant, privacy-preserving, spam-protected communication for its user.
It is designed to run on any device, from mobile to the cloud.

Waku is available on many systems and environments and used by several applications and SDKs for decentralized communications.

This involved research efforts in various domains: conversational security, protocol incentivization, zero-knowledge,
etc.

Waku uses novel technologies. Hence, we knew that early dogfooding of Waku was necessary. Even if research
was still _in progress_ [[1]](#footnote1). Thus, as soon as Waku protocols and software were usable, we started to push
for the adoption of Waku. This started back in 2021.

Waku is the communication component of the Web3 trifecta. This trifecta was Ethereum (contracts), Swarm
(storage) and Whisper (communication). Hence, it made sense to first target dApps which already uses one of the pillars:
Ethereum. 

As most dApps are web apps, we started the development of [js-waku for the browser](https://vac.dev/presenting-js-waku).

Once ready, we reached out to dApps to integrate Waku, added [prizes to hackathons](https://twitter.com/waku_org/status/1451400128791605254?s=20&t=Zhc0BEz6RVLkE_SeE6UyFA)
and gave [talks](https://docs.wakuconnect.dev/docs/presentations/).

We also assumed we would see patterns in the usage of Waku, that we would facilitate with the help of
[SDKs](https://github.com/status-im/wakuconnect-vote-poll-sdk).

Finally, we created several web apps:
[examples](https://docs.wakuconnect.dev/docs/examples/)
and [PoCs](https://github.com/status-iM/gnosis-safe-waku).

By discussing with Waku users and watching it being used, we learned a few facts:

1. The potential use cases for Waku are varied and many:
  - Wallet <> dApp communication: [WalletConnect](https://medium.com/walletconnect/walletconnect-v2-0-protocol-whats-new-3243fa80d312), [XMTP](https://xmtp.org/docs/dev-concepts/architectural-overview/)
  - Off-chain (and private) marketplace:
    [RAILGUN](https://twitter.com/RAILGUN_Project/status/1556780629848727552?s=20&t=NEKQJiJAfg5WJqvuF-Ym_Q) & 
    [Decentralized Uber](https://twitter.com/TheBojda/status/1455557282318721026)
  - Signature exchange for a multi-sign wallet: [Gnosis Safe x Waku](https://github.com/status-im/gnosis-safe-waku)
  - Off-chain Game moves/actions: [Super Card Game (EthOnline 2021)](https://showcase.ethglobal.com/ethonline2021/super-card-game)
  - Decentralized Pastebin: [Debin](https://debin.io/)
2. Many projects are interested in having an embedded chat in their dApp,
3. There are complex applications that need Waku as a solution. Taking RAILGUN as an example:
  - Web wallet
  - \+ React Native mobile wallet
  - \+ NodeJS node/backend.

(1) means that it is not that easy to create SDKs for common use cases.

(2) was a clear candidate for an SDK. Yet, building a chat app is a complex task. Hence, the Status app team tackled
this in the form of [Status Web](https://github.com/status-im/status-web/).

Finally, (3) was the most important lesson. We learned that multi-tier applications need Waku for decentralized and
censorship-resistant communications. For these projects, js-waku is simply not enough. They need Waku to work in their
Golang backend, Unity desktop game and React Native mobile app.

We understood that we should see the whole Waku software suite
([js-waku](https://github.com/waku-org/js-waku),
[nwaku](https://github.com/status-im/nwaku),
[go-waku](https://github.com/status-im/go-waku),
[waku-react-native](https://github.com/waku-org/waku-react-native),
[etc](https://github.com/waku-org)) as an asset for its success.
That we should not limit outreach, marketing, documentation efforts to the web, but target all platforms.

From a market perspective, we identified several actors:

- platforms: Projects that uses Waku to handle communication,
- operators: Operators run Waku nodes and are incentivized to do so,
- developers: Developers are usually part of a platforms or solo hackers learning Web3,
- contributors: Developers and researchers with interests in decentralization, privacy, censorship-resistance,
  zero-knowledge, etc.

# Waku for All Decentralized Applications and Infrastructures

In 2022, we shifted our focus to make the various Waku implementations **usable and used**.

We made Waku [multi-plaform](https://github.com/status-im/go-waku/tree/master/examples).

We shifted Waku positioning to leverage all Waku implementations and better serve the user's needs:

- Running a node for your projects and want to use Waku? Use [nwaku](https://github.com/status-im/nwaku).
- Going mobile? Use [Waku React Native](https://github.com/status-im/waku-react-native).
- C++ Desktop Game? Use [go-waku's C-Bindings](https://github.com/status-im/go-waku/tree/master/examples/c-bindings).
- Web app? Use [js-waku](https://github.com/status-im/js-waku).

We are consolidating the documentation for all implementations on a single website ([work in progress](https://github.com/waku-org/waku.org/issues/15))
to improve developer experience.

This year, we also started the _operator outreach_ effort to push for users to run their own Waku nodes. We have
recently concluded our [first operator trial run](https://github.com/status-im/nwaku/issues/828).
[Nwaku](https://vac.dev/introducing-nwaku)'s documentation, stability and performance has improved. It is now easier to
run your [own Waku node](https://github.com/status-im/nwaku/tree/master/docs/operators).

Today, operator wannabes most likely run their own nodes to support or use the Waku network.
We are [dogfooding](https://twitter.com/oskarth/status/1582027828295790593?s=20&t=DPEP6fXK6KWbBjV5EBCBMA)
[Waku RLN](https://github.com/status-im/nwaku/issues/827), our novel economic spam protection protocol,
and looking at [incentivizing the Waku Store protocol](https://github.com/vacp2p/research/issues/99).
This way, we are adding reasons to run your own Waku node.

For those who were following us in 2021, know that we are retiring the _Waku Connect_ branding in favour of the _Waku_
branding.

# Waku for Your Project

As discussed, Waku is now available on various platforms. The question remains: How can Waku benefit **your** project?

Here are a couple of use cases we recently investigated:

## Layer-2 Decentralization

Most ([[2] [3]](#references) roll-ups use a centralized sequencer or equivalent. Running several sequencers is not as straightforward as running several execution nodes.
Waku can help:

- Provide a neutral marketplace for a mempool: If sequencers compete for L2 tx fees, they may not be incentivized to
  share transactions with other sequencers. Waku nodes can act as a neutral network to enable all sequences to access
  transactions.
- Enable censorship-resistant wallet<>L2 communication,
- Provide rate limiting mechanism for spam protection: Using [RLN](https://rfc.vac.dev/spec/32/) to prevent DDOS.

## Device pairing and communication

With [Waku Device Pairing](https://rfc.vac.dev/spec/43/), a user can setup a secure encrypted communication channel
between their devices. As this channel would operate over Waku, it would be censorship-resistant and privacy preserving.
These two devices could be:

- Ethereum node and mobile phone to access a remote admin panel,
- Alice's phone and Bob's phone for any kind of secure communication,
- Mobile wallet and desktop/browser dApp for transaction and signature exchange.

Check [js-waku#950](https://github.com/waku-org/js-waku/issues/950) for the latest update on this. 

# Get Involved

Developer? Grab any of the Waku implementations and integrate it in your app: https://waku.org/platform.

Researcher? See https://vac.dev/contribute to participate in Waku research.

Tech-savvy? Try to run your own node: https://waku.org/operator.

Otherwise, play around with the various [web examples](https://github.com/waku-org/js-waku-examples#readme).

If you want to help, we are [hiring](https://jobs.status.im/)!

# Moving Forward

What you can expect next:

- [Scalability and performance studies](https://forum.vac.dev/t/waku-v2-scalability-studies/142/9) and improvement across Waku software,
- [New websites](https://github.com/waku-org/waku.org/issues/15) to easily find documentation about Waku and its implementations,
- New Waku protocols implemented in all code bases and cross client PoCs
  ([noise](https://rfc.vac.dev/spec/35/), [noise-sessions](https://rfc.vac.dev/spec/37/),
  [waku-rln-relay](https://rfc.vac.dev/spec/17/), etc),
- Easier to [run your own waku node](https://github.com/status-im/nwaku/issues/828), more operator trials,
- Dogfooding and Improvement of existing protocols (e.g. [Waku Filter](https://github.com/vacp2p/rfc/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc++12%2FWAKU2-FILTER)),
- Continue our focus Waku portability: Browser,
  [Raspberry Pi Zero](https://twitter.com/richardramos_me/status/1574405469912932355?s=20&t=DPEP6fXK6KWbBjV5EBCBMA) and other restricted-resource environments,
- More communication & marketing effort around Waku and the Waku developer community.

---

## References

- <a id="footnote1">[1]</a> Waku is modular; it is a suite of protocols; hence some Waku protocols may be mature, while
  new protocols are still being designed. Which means that research continues to be _ongoing_ while
  Waku is already used in production. 
- [[2]](https://community.optimism.io/docs/how-optimism-works/#block-production) The Optimism Foundation runs the only block produce on the Optimism network.
- [[3]](https://l2beat.com/) Top 10 L2s are documented has having a centralized operator.
