---
layout: post
name:  "Waku Product"
title:  "Waku Product"
date:   2022-08-01 00:00:00 +0000
author: franck
published: true
permalink: /waku-product
categories: product, platform, operator
summary: Introduce Waku Product, a project to ensure that Waku is usable and used.
image: /img/black-waku-logo-with-name.png
discuss: TODO
---

# Waku for Web DApps

In 2021, we started to push the adoption of Waku by projects other than the Status app.

Waku is the communication component of the Web3 trifecta,
which originally was Ethereum (contracts), Swarm (storage) and Whisper (communication).

Hence, it makes sense to first target dApps which already uses one of the Web3 pillar: Ethereum. 

As most dApps are web apps, we naturally started the development of js-waku for the browser.

Once ready, we reached out to dApps to integrate Waku, added [prizes to hackathons](todo) and gave [talks](todo).

We also assumed that we would some patterns in the usage of Waku, that we would facilitate with the help of [SDKs](waku connect voting polling sdk).

Finally, we created a number of web apps: [examples](todo) and [PoCs](todo).

We branded this overall web app outreach effort as Waku Connect:
Waku Connect's goal was to create docs, SDKs, PoCs to promote and facilitate the usage of js-waku.

As we discussed with various projects in the Ethereum and multi-chain ecosystem, we learn few facts:

1. The potential use cases for Waku are varied, complex and numerous,
2. Many projects are interested in having an embedded decentralized chat feature in their dApp,
3. There are a number of complex project, which are not a simple web app, that needs a solution like Waku

(1) means that it is not that easy to create SDKs that makes using js-waku easier.

(2) became a candidate for an SDK, however, it demanded a lot of work and functionalities, so Status Web was created to implement the existing Status Chat protocols.

Regarding (3), we learned that complex platforms which include mobile, web, backend and desktops software needed Waku for decentralized and censorship-resistant communications.
For these projects, js-waku was simply not enough.
Said projects need to integrate Waku in their Golang or NodeJS backend, in their C# desktop application and React Native mobile app.
As we tackled the effort to make Waku [multiplatform](link to go-waku), we realized we had to look beyond web dApps.

Because we organically attracted platforms that do not fall in the definition of web dApps,
we understood that we should see the whole Waku software Suite (js-waku, nwaku, go-waku) as an asset for the success of Waku.

Outreach, marketing, documentation must not be limited to the web, but target all platforms, from mobile to desktop to the cloud to the web.

# Waku Product

The Waku Product project is born from the need of having a consolidated effort to make the various Waku implementations **usable and used**.

We are retiring the _Waku Connect_ branding in favour for the _Waku_ branding.
When promoting, documenting or discussing Waku with Web3 projects,
we are able to leverage all Waku implementations to better serve the user's need.
Running a node for your projects and want to use Waku? Use nwaku.
Going mobile? Use Waku React Native.
C++ Desktop Game? Use Waku C-Bindings.
And of course, web app? Use js-waku.

We are also consolidating the documentation for all implementations on a single website (work in progress)
so it is easier for a developer to find the right information for their needs.

We call this effort to push Waku to be used by other projects _platform outreach_.

This year, we will also start the _operator outreach_ effort to push for operators to run Waku nodes.
As nwaku's [documentation](todo), [stability](todo) and [performance](todo) has improved,
it is now easier for those interested in supporting and using the Waku network to run their own nodes.

We are also [dogfooding Waku RLN](todo), a novel economic spam protection protocol
and looking at [incentivizating the Waku Store protocol](todo),
these will be added reasons as for why one might want to participate in the Waku network.

# In Conclusion

We are committed to make Waku, the communication layer of Web3, a success.
For this endeavour, the Vac program is focusing on inventing and improving the Waku protocols (among other [topics](todo)).
And now, the Waku Product project is focusing on stabilizing, promoting, documenting Waku Software and supporting Waku users.
