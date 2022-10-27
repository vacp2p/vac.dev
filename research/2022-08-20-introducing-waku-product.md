---
layout: post
name:  "Waku as a Product"
title:  "Waku as a Product"
date:   2022-11-01 00:00:00 +0000
author: franck
published: true
permalink: /waku-product
categories: waku, product, platform, operator
summary: Introduce Waku Product, a project to ensure that Waku is usable and used.
image: /img/black-waku-logo-with-name.png
discuss: TODO
---

# Waku for Web DApps

In 2021, we started to push for the adoption of Waku by projects other than the Status app.
Waku is the communication component of the Web3 trifecta,
which originally was Ethereum (contracts), Swarm (storage) and Whisper (communication).
Hence, it made sense to first target dApps which already uses one of the Web3 pillars: Ethereum. 

As most dApps are web apps,
we naturally started the development of [js-waku for the browser](https://vac.dev/presenting-js-waku).

Once ready,
we reached out to dApps to integrate Waku,
added [prizes to hackathons](https://twitter.com/waku_org/status/1451400128791605254?s=20&t=Zhc0BEz6RVLkE_SeE6UyFA)
and gave [talks](https://docs.wakuconnect.dev/docs/presentations/).

We also assumed that we would see patterns in the usage of Waku,
that we would facilitate with the help of [SDKs](https://github.com/status-im/wakuconnect-vote-poll-sdk).

Finally, we created a number of web apps:
[examples](https://docs.wakuconnect.dev/docs/examples/)
and [PoCs](https://github.com/status-iM/gnosis-safe-waku).

We branded this overall web app adoption effort as Waku Connect:
Waku Connect's goal was to create docs, SDKs, PoCs to promote and facilitate the usage of Waku in the browser.

By discussing with Waku users and watching it being adopted, we learned a few facts:

1. The potential use cases for Waku are varied and numerous,
2. Many projects are interested in having an embedded decentralized chat feature in their dApp,
3. There are a number of complex applications, which are not a simple web app, that need Waku as a solution.

(1) means that it is not that easy to create SDKs that facilitate using js-waku's usage.

(2) was a clear candidate for an SDK.
However, building a chat app is a complex task so the effort was done by the Status app team in the form of [Status Web](https://github.com/status-im/status-web/).

Finally, (3) was the most important lesson.
We learned that complex platforms which include mobile, web, backend and desktop software
need Waku for decentralized and censorship-resistant communications.
For these projects, js-waku is simply not enough.
Said projects need to integrate Waku in their Golang or NodeJS backend, in their C# desktop application and React Native mobile app.

As we tackled the effort to make Waku [multi](https://github.com/status-im/go-waku/tree/master/examples)-[platform](https://github.com/status-im/waku-react-native),
we realized we had to pivot the outreach effort beyond web dApps.

We understood that we should see the whole Waku software suite
([js-waku](https://github.com/waku-org/js-waku),
[nwaku](https://github.com/status-im/nwaku),
[go-waku](https://github.com/status-im/go-waku),
[waku-react-native](https://github.com/waku-org/waku-react-native)) as an asset for the success of Waku.
Outreach, marketing, documentation must not be limited to the web, but target all platforms, from mobile to desktop to the cloud to the web.

# Waku as a Product

In 2022, we shifted our focus to Waku as a Product by consolidating our efforts to make the various Waku implementations **usable and used**.

We are retiring the _Waku Connect_ branding in favour of the _Waku_ branding.
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
Nwaku's documentation, stability and performance has improved,
it is now easier to run your [own Waku node](https://github.com/status-im/nwaku/tree/master/docs/operators).

Today, operator wannabes are most likely running their own nodes to support or use the Waku network.

As we are [dogfooding](https://twitter.com/oskarth/status/1582027828295790593?s=20&t=DPEP6fXK6KWbBjV5EBCBMA)
[Waku RLN](https://github.com/status-im/nwaku/issues/827),
our novel economic spam protection protocol,
and looking at [incentivizing the Waku Store protocol](https://github.com/vacp2p/research/issues/99),
we are adding further reasons to run your own Waku node.

# In Conclusion

We are committed to make Waku, the communication layer of Web3, a success.
For this endeavour, the Vac program is focusing on inventing and improving the Waku protocols
(among other [topics](https://github.com/vacp2p/research/issues/112)).
And now, the Waku Product project is focusing on stabilizing, promoting, documenting Waku Software and supporting Waku users.

What you can expect next:

- [Scalability and performance studies](https://forum.vac.dev/t/waku-v2-scalability-studies/142/9) and improvement across Waku software,
- [New websites](https://github.com/waku-org/waku.org/issues/15) to easily find documentation about Waku and its implementations,
- Delivery of the latest Waku protocols in all code bases and cross client PoCs
  ([noise](https://rfc.vac.dev/spec/35/), [noise-sessions](https://rfc.vac.dev/spec/37/),
  [waku-rln-relay](https://rfc.vac.dev/spec/17/), etc),
- Easier to [run your own waku node](https://github.com/status-im/nwaku/issues/828),
- Improvement of existing protocols based on field-testing feedback and functional requirements
  (e.g. [Waku Filter](https://github.com/vacp2p/rfc/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc++12%2FWAKU2-FILTER)),
- Continue our focus on ensuring that Waku can run anywhere: Browser,
  [Raspberry Pi Zero](https://twitter.com/richardramos_me/status/1574405469912932355?s=20&t=DPEP6fXK6KWbBjV5EBCBMA) and other restricted-resource environments,
- More communication & marketing effort around Waku and the Waku developer community.

If you want to help us, we are [hiring](https://jobs.status.im/!
