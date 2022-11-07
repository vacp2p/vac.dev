---
layout: post
name:  "Waku for All Decentralized Applications and Infrastructures"
title:  "Waku for All Decentralized Applications and Infrastructures"
date:   2022-11-09 00:00:00 +0000
author: franck
published: true
permalink: /waku-for-all
categories: waku, dapp, infrastructure, public good, platform, operator
summary: | 
  Waku is an open communication protocol and network that decentralized apps and infrastructure can use for their
  communication needs. It is designed to enable dApps and decentralized infrastructure projects to have secure, private,
  scalable communication. Waku is available in several languages and platforms, from Web to mobile to desktop to cloud. 
  We initially pushed Waku adoption to the Web ecosystem, we learned that Waku is usable in a variety of complex applications
  and infrastructure projects. We have prioritized our effort to make Waku usable on various platforms and environments.
image: /img/black-waku-logo-with-name.png
discuss: TODO
---

<!--
  Audience: Reader curious about Waku/following Waku
  Goal:
    - Trigger Ha-ha moment for Waku possibilities
      - Explain shift from Web to all dApps
    - Make it clear that Waku is being field tested, it is more than a research project
    - Ideas on how to contribute/participate/play with Waku
-->

# Background

We have built Waku to be a communication layer for Web3. Waku is a collection of protocols to chose from for your
messaging needs. It enables secure, censorship-resistant, privacy-preserving, spam-protected communication for its user.
It is designed to run on any device, from mobile to the cloud.


<!-- TODO: more about Waku Readiness -->

This involves research efforts in various domains: conversational security, protocol incentivization, zero-knowledge,
anonymity to name a few.

To ensure we reach our goals, we knew that early dogfooding of Waku was necessary, even if research was still
_in progress_ [[1]](#footnote1). Thus, as soon as Waku protocols and software were usable, we started to push for the
adoption of Waku. This started back in 2021.

Waku is the communication component of the Web3 trifecta, which originally was Ethereum (contracts), Swarm (storage)
and Whisper (communication). Hence, it made sense to first target dApps which already uses one of the Web3 pillars: Ethereum. 

As most dApps are web apps, we naturally started the development of [js-waku for the browser](https://vac.dev/presenting-js-waku).

Once ready, we reached out to dApps to integrate Waku, added [prizes to hackathons](https://twitter.com/waku_org/status/1451400128791605254?s=20&t=Zhc0BEz6RVLkE_SeE6UyFA)
and gave [talks](https://docs.wakuconnect.dev/docs/presentations/).

We also assumed that we would see patterns in the usage of Waku, that we would facilitate with the help of
[SDKs](https://github.com/status-im/wakuconnect-vote-poll-sdk).

Finally, we created a number of web apps:
[examples](https://docs.wakuconnect.dev/docs/examples/)
and [PoCs](https://github.com/status-iM/gnosis-safe-waku).

By discussing with Waku users and watching it being adopted, we learned a few facts:

1. The potential use cases for Waku are varied and numerous:
  - Wallet <> dApp communication: [WalletConnect](https://medium.com/walletconnect/walletconnect-v2-0-protocol-whats-new-3243fa80d312), [XMTP](https://xmtp.org/docs/dev-concepts/architectural-overview/)
  - Off-chain (and private) marketplace:
    [RAILGUN](https://twitter.com/RAILGUN_Project/status/1556780629848727552?s=20&t=NEKQJiJAfg5WJqvuF-Ym_Q) & 
    [Decentralized Uber](https://twitter.com/TheBojda/status/1455557282318721026)
  - Signature exchange for a multi-sign wallet: [Gnosis Safe x Waku](https://github.com/status-im/gnosis-safe-waku)
  - Off-chain Game moves/actions: [Super Card Game (EthOnline 2021)](https://showcase.ethglobal.com/ethonline2021/super-card-game)
  - Decentralized Pastebin: [Debin](https://debin.io/)
2. Many projects are interested in having an embedded decentralized chat feature in their dApp,
3. There are a number of complex applications, which are not a simple web app, that need Waku as a solution. Taking RAILGUN as an example:
  - Web wallet
  - + React Native mobile wallet
  - + NodeJS node/backend.

(1) means that it is not that easy to create SDKs that facilitate using js-waku's usage.

(2) was a clear candidate for an SDK.
However, building a chat app is a complex task so the effort was done by the Status app team in the form of [Status Web](https://github.com/status-im/status-web/).

Finally, (3) was the most important lesson.
We learned that complex platforms which include mobile, web, backend and desktop software
need Waku for decentralized and censorship-resistant communications.
For these projects, js-waku is simply not enough.
Said projects need to integrate Waku in their Golang or NodeJS backend, in their C# desktop application and React Native mobile app.

From a business angle, we were also able to identify several actors and to better position Waku as a product:

- platforms: Projects that uses Waku to handle communication, projects have their own end users,
- operators: Operators run Waku nodes and are incentivized to do so because they are also platforms or they use Waku's incentivization protocols,
- developers: Developers are usually part of a platforms or solo hackers learning Web3,
- contributors: Developers and researchers keen to contribute to Waku due to their interest in the domain of decentralization, privacy, censorship-resistance, zero-knowledge, etc.

As we tackled the effort to make Waku [multi](https://github.com/status-im/go-waku/tree/master/examples)-[platform](https://github.com/status-im/waku-react-native),
we realized we had to pivot the outreach effort beyond web dApps.

We understood that we should see the whole Waku software suite
([js-waku](https://github.com/waku-org/js-waku),
[nwaku](https://github.com/status-im/nwaku),
[go-waku](https://github.com/status-im/go-waku),
[waku-react-native](https://github.com/waku-org/waku-react-native),
[etc](https://github.com/waku-org)) as an asset for the success of Waku.
Outreach, marketing, documentation must not be limited to the web, but target all platforms, from mobile to desktop to the cloud to the web.

# Waku for All Decentralized Applications and Infrastructures

In 2022, we shifted our focus to make the various Waku implementations **usable and used**.

When promoting, documenting or discussing Waku with Web3 projects,
we are able to leverage all Waku implementations to better serve the user's needs:

- Running a node for your projects and want to use Waku? Use [nwaku](https://github.com/status-im/nwaku).
- Going mobile? Use [Waku React Native](https://github.com/status-im/waku-react-native).
- C++ Desktop Game? Use [go-waku's C-Bindings](https://github.com/status-im/go-waku/tree/master/examples/c-bindings).
- And of course, web app? Use [js-waku](https://github.com/status-im/js-waku).

We are also consolidating the documentation for all implementations on a single website (work in progress)
so it is easier for a developer to find the right information.

This year, we also started the _operator outreach_ effort to push for users to run their own Waku nodes.
We have recently concluded our [first operator trial run](https://github.com/status-im/nwaku/issues/828).
[Nwaku](https://vac.dev/introducing-nwaku)'s documentation, stability and performance has improved,
it is now easier to run your [own Waku node](https://github.com/status-im/nwaku/tree/master/docs/operators).

Today, operator wannabes most likely run their own nodes to support or use the Waku network.
As we are [dogfooding](https://twitter.com/oskarth/status/1582027828295790593?s=20&t=DPEP6fXK6KWbBjV5EBCBMA)
[Waku RLN](https://github.com/status-im/nwaku/issues/827),
our novel economic spam protection protocol,
and looking at [incentivizing the Waku Store protocol](https://github.com/vacp2p/research/issues/99),
we are adding further reasons to run your own Waku node.

For those who were following us in 2021, note that we are retiring the web focused _Waku Connect_ branding in favour of the _Waku_ branding.

# Waku for Your Project

As discussed, Waku is now available on various platforms. The question remains: How can Waku benefit **your** project?

Here are a couple of use cases we recently investigated:

## Layer-2 Decentralization

Most ([[2] [3]](#references) roll-ups use a centralized sequencer or equivalent. Running several sequencers is not as straightforward as running several execution nodes.
Waku can help:

- Provide a neutral marketplace for a mempool: If sequencers compete for L2 tx fees, they may not be incentivized to share user transactions with other sequencers.
  Waku nodes can act as a neutral network to enable all sequences to access transactions (as Waku nodes are agnostic to message payloads).
- Enable censorship-resistant wallet<>L2 communication: By integration Waku in user wallets and sequencers, interaction with the L2 could be done in a decentralized manner, avoiding the usage of a single point of failure (RPC URL).
- Provide rate limiting mechanism for spam protection: If the data exchanged between sequencers/nodes is encrypted or split (block chunks), then a rate limit mechanism may be needed to avoid DDOS attacks. [RLN](https://rfc.vac.dev/spec/32/) can provide this.

## Device pairing and communication

Using [Waku Device Pairing](https://rfc.vac.dev/spec/43/), it will be possible for a user to pair devices and enable a secure encrypted communication channel between them.
As this channel would operate over Waku, it would be censorship-resistant and privacy preserving.
This two devices could be:

- Ethereum node and mobile phone to access a remote admin panel,
- Alice's phone and Bob's phone for any kind of secure communication,
- Mobile wallet and desktop/browser dApp for transaction and signature exchange.

Check [js-waku#950](https://github.com/waku-org/js-waku/issues/950) for the latest update on this. 

# Get Involved

If you are a developer, grab any of the Waku implementations and integrate it in your app: https://waku.org/platform.

Researcher? See https://vac.dev/contribute on how to participate to Waku research.

Not a developer but techie enough? Try to run your own node: https://waku.org/operator.

Otherwise, you can play around with the various web examples: https://github.com/waku-org/js-waku-examples#readme.

If you want to help, we are [hiring](https://jobs.status.im/)!

# Moving Forward

What you can expect next:

- [Scalability and performance studies](https://forum.vac.dev/t/waku-v2-scalability-studies/142/9) and improvement across Waku software,
- [New websites](https://github.com/waku-org/waku.org/issues/15) to easily find documentation about Waku and its implementations,
- Delivery of the latest Waku protocols in all code bases and cross client PoCs
  ([noise](https://rfc.vac.dev/spec/35/), [noise-sessions](https://rfc.vac.dev/spec/37/),
  [waku-rln-relay](https://rfc.vac.dev/spec/17/), etc),
- Easier to [run your own waku node](https://github.com/status-im/nwaku/issues/828), more operator trials,
- Improvement of existing protocols based on field-testing feedback and functional requirements
  (e.g. [Waku Filter](https://github.com/vacp2p/rfc/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc++12%2FWAKU2-FILTER)),
- Continue our focus on ensuring that Waku can run anywhere: Browser,
  [Raspberry Pi Zero](https://twitter.com/richardramos_me/status/1574405469912932355?s=20&t=DPEP6fXK6KWbBjV5EBCBMA) and other restricted-resource environments,
- More communication & marketing effort around Waku and the Waku developer community.

---

## References

- <a id="footnote1">[1]</a> Waku is modular, composed of several protocols, hence some Waku protocols may be mature and widely used while new protocols are still being designed.
  Which means that research continues to be _ongoing_ while Waku is already used in production. 
- [[2]](https://community.optimism.io/docs/how-optimism-works/#block-production) The Optimism Foundation runs the only block produce on the Optimism network.
- [[3]](https://l2beat.com/) Top 10 L2s are documented has having a centralized operator.
