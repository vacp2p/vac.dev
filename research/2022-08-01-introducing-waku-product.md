---
layout: post
name:  "Waku Product"
title:  "Waku Product"
date:   2022-08-01 00:00:00 +0000
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

Hence, it made sense to first target dApps which already uses one of the Web3 pillar: Ethereum. 

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

We branded this overall web app outreach effort as Waku Connect:
Waku Connect's goal was to create docs, SDKs, PoCs to promote and facilitate the usage of Waku in the browser.

As we discussed with Waku userse and watch it being adopted, we learn a few facts:

1. The potential use cases for Waku are varied, complex and numerous,
2. Many projects are interested in having an embedded decentralized chat feature in their dApp,
3. There are a number of complex applications, which are not a simple web app, that needs a solution like Waku

(1) means that it is not that easy to create SDKs that makes using js-waku easier.

(2) was a clear candidate for an SDK.
However, building a chat app is a complex task so the effort was done by the app team in the form of [Status Web](https://github.com/status-im/status-web/).

Finally, (3) was the most important lesson.
We learned that complex platforms which include mobile, web, backend and desktop software
need Waku for decentralized and censorship-resistant communications.
For these projects, js-waku is simply not enough.
Said projects need to integrate Waku in their Golang or NodeJS backend, in their C# desktop application and React Native mobile app.

As we tackled the effort to make Waku [multi](https://github.com/status-im/go-waku/tree/master/examples)-[platform](https://github.com/status-im/waku-react-native),
we realized we had to pivot the outreach effort beyond web dApps.

We understood that we should see the whole Waku software Suite (js-waku, nwaku, go-waku) as an asset for the success of Waku.
Outreach, marketing, documentation must not be limited to the web, but target all platforms, from mobile to desktop to the cloud to the web.

# Waku Product

The Waku Product project is born from the need of having a consolidated effort to make the various Waku implementations **usable and used**.

We are retiring the _Waku Connect_ branding in favour of the _Waku_ branding.
When promoting, documenting or discussing Waku with Web3 projects,
we are able to leverage all Waku implementations to better serve the user's needs:

- Running a node for your projects and want to use Waku? Use nwaku.
- Going mobile? Use Waku React Native.
- C++ Desktop Game? Use Waku C-Bindings.
- And of course, web app? Use js-waku.

We are also consolidating the documentation for all implementations on a single website (work in progress)
so it is easier for a developer to find the right information.

We call the task of pushing for Waku to be used by other projects _platform outreach_.

This year, we will also start the _operator outreach_ effort to push for users to run their own Waku nodes.
Nwaku's documentation, stability and performance has improved,
it is now easier to run your [own Waku node](https://github.com/status-im/nwaku/tree/master/docs/operators).

Today, operators wannabes are most likely running their own nodes to support or use the Waku network.

As we are [dogfooding Waku RLN](https://github.com/status-im/nwaku/issues/827), our novel economic spam protection protocol
and looking at [incentivizating the Waku Store protocol](https://github.com/vacp2p/research/issues/99),
we are adding further reasons to run your own Waku node.

# In Conclusion

We are committed to make Waku, the communication layer of Web3, a success.
For this endeavour, the Vac program is focusing on inventing and improving the Waku protocols
(among other [topics](https://github.com/vacp2p/research/issues/112)).
And now, the Waku Product project is focusing on stabilizing, promoting, documenting Waku Software and supporting Waku users.
