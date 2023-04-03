---
layout: post
name:  "The Future of Waku Network: Scaling, Incentivization, and Heterogeneity"
title:  "The Future of Waku Network: Scaling, Incentivization, and Heterogeneity"
date:   2023-04-03 00:00:00
author: franck
published: true
permalink: /future-of-waku-network
categories: platform, operator, network
summary: Learn how the Waku Network is evolving through scaling, incentivization, and diverse ecosystem development and what the future might look like.
image: /img/black-waku-logo-with-name.png
discuss: TODO
---

# The Future of Waku Network: Scaling, Incentivization, and Heterogeneity

Waku is preparing for production with a focus on the Status Communities use case. In this blog post, we will provide an
overview of recent discussions and research outputs, aiming to give you a better understanding of how the Waku network
may look like in terms of scaling and incentivization.

## DOS Mitigation for Status Communities

Waku is actively exploring DOS mitigation mechanisms suitable for Status Communities. While RLN
(Rate Limiting Nullifiers) remains the go-to DOS protection solution due to its privacy-preserving and
censorship-resistant properties, there is still more work to be done. We are excited to collaborate with PSE
(Privacy & Scaling Explorations) in this endeavor. Learn more about their latest progress in this [tweet](https://twitter.com/CPerezz19/status/1640373940634939394?s=20).

## A Heterogeneous Waku Network

As we noted in a previous [forum post](https://forum.vac.dev/t/waku-payment-models/166/3), Waku's protocol
incentivization model needs to be flexible to accommodate various business models. Flexibility ensures that projects
can choose how they want to use Waku based on their specific needs.

### Reversing the Incentivization Question

Traditionally, the question of incentivization revolves around how to incentivize operators to run nodes. We'd like to
reframe the question and instead ask, "How do we pay for the infrastructure?"

Waku does not intend to offer a free lunch.
Ethereum's infrastructure is supported by transaction fees and inflation, with validators receiving rewards from both sources.
However, this model does not suit a communication network like Waku.
Users and platforms would not want to pay for every single message they send. Additionally, Waku aims to support instant
ephemeral messages that do not require consensus or long-term storage.

Projects that use Waku to enable user interactions, whether for chat messages, gaming, private DeFi, notifications, or
inter-wallet communication, may have different value extraction models. Some users might provide services for the
project and expect to receive value by running nodes, while others may pay for the product or run infrastructure to
contribute back. Waku aims to support each of these use cases, which means there will be various ways to "pay for the
infrastructure."

In [his talk](https://vac.dev/building-privacy-protecting-infrastructure), Oskar addressed two strategies: RLN and service credentials.

### RLN and Service Credentials

RLN enables DOS protection across the network in a privacy-preserving and permission-less manner: stake in a contract,
and you can send messages.

Service credentials establish a customer-provider relationship. Users might pay to have messages they are interested in
stored and served by a provider. Alternatively, a community owner could pay a service provider to host their community.

Providers could offer trial or limited free services to Waku users, similar to Slack or Discord. Once a trial is expired or outgrown,
a community owner could pay for more storage or bandwidth, similar to Slack's model.
Alternatively, individual users could contribute financially, akin to Discord's Server Boost, or by sharing their own
resources with their community.

We anticipate witnessing various scenarios across the spectrum: from users sharing resources to users paying for access to the network and everything in between.

## Waku Network: Ethereum or Cosmos?

Another perspective is to consider whether the Waku network will resemble Ethereum or Cosmos.

For those not familiar with the difference between both, in a very concise manner:
- Ethereum is a set of protocols and software that are designed to operate on one common network and infrastructure
- Cosmos is a set of protocols and software (SDKs) designed to be deployed in separate yet interoperable networks and infrastructures by third parties

We want Waku to be decentralized to provide censorship resistance and privacy-preserving communication.
If each application has to deploy its own network, we will not achieve this goal.
Therefore, we aim Waku to be not only an open source set of protocols, but also a shared infrastructure that anyone can leverage to build applications on top, with some guarantees in terms of decentralization and anonymity.
This approach is closer in spirit to Ethereum than Cosmos.
Do note that, similarly to Ethereum, anyone is free to take Waku software and protocols and deploy their own network.

Yet, because of the difference in the fee model, the Waku Network is unlikely to be as unified as Ethereum's.
We currently assume that there will be separate gossipsub networks with different funding models.
Since there is no consensus on Waku, each individual operator can decide which network to support, enabling Waku to maintain its permission-less property.

Most likely, the Waku network will be heterogeneous, and node operators will choose the incentivization model they prefer.

# Scalability and Discovery Protocols

To enable scalability, the flow of messages in the Waku network will be divided in shards,
so that not every node has to forward every message of the whole network.
Discovery protocols will facilitate users connecting to the right nodes to receive the messages they are interested in.

Different shards could be subject to a variety of rate limiting techniques (globally, targeted to that shard or something in-between).

Marketplace protocols may also be developed to help operators understand how they can best support the network and where
their resources are most needed. However, we are still far from establishing or even assert that such a marketplace will be needed.

## Open Problems

Splitting traffic between shards reduces bandwidth consumption for every Waku Relay node.
This improvement increases the likelihood that users with home connections can participate and contribute to the gossipsub network without encountering issues.

However, it does not cap traffic.
There are still open problems regarding how to guarantee that someone can use Waku with lower Internet bandwidth or run critical services, such as a validation node, on the same connection.

We have several ongoing initiatives:

- Analyzing the Status Community protocol to confirm efficient usage of Waku [[4]](https://github.com/vacp2p/research/issues/177)
- Simulating the Waku Network to measure actual bandwidth usage [[5]](https://github.com/waku-org/pm/issues/2)
- Segregating chat messages from control and media messages [[6]](https://rfc.vac.dev/spec/57/#control-message-shards)

The final solution will likely be a combination of protocols that reduce bandwidth usage or mitigate the risk of DOS attacks, providing flexibility for users and platforms to enable the best experience.

# The Evolving Waku Network

The definition of the "Waku Network" will likely change over time. In the near future, it will transition from a single
gossipsub network to a sharded set of networks unified by a common discovery layer. This change will promote scalability
and allow various payment models to coexist within the Waku ecosystem.

In conclusion, the future of Waku Network entails growth, incentivization, and heterogeneity while steadfastly
maintaining its core principles. As Waku continues to evolve, we expect it to accommodate a diverse range of use cases
and business models, all while preserving privacy, resisting censorship, avoiding surveillance, and remaining accessible
to devices with limited resources.

# References

1. [51/WAKU2-RELAY-SHARDING](https://rfc.vac.dev/spec/51/)
2. [57/STATUS-Simple-Scaling](https://rfc.vac.dev/spec/57/)
3. [58/RLN-V2](https://rfc.vac.dev/spec/58/)
4. [Scaling Status Communities: Potential Problems](https://github.com/vacp2p/research/issues/177)
5. [Waku Network Testing](https://github.com/waku-org/pm/issues/2)
6. [51/WAKU2-RELAY-SHARDING: Control Message Shards](https://rfc.vac.dev/spec/57/#control-message-shards)
