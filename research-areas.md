---
title: Research areas
---

# Overview

Vac has several research areas it is interested in and has or is developing expertise in.
Here’s an overview of some of these areas along with motivation and what type of topics are included.
Note that a lot of areas are overlapping in terms of specific projects.

## Incentivization

In an open p2p network, nodes have to be incentivized for services provided to the network.
Additionally, these should be privacy-preserving and as trust-minimized as possible.
This research area includes (but is not limited to):
RLN, service credentials, peer reputation, and protocol revenue.

## Applied ZK

Applied ZK opens up the door to many new constructs, especially related to privacy.
This research area includes the development of primitives like RLN, Unirep and similar novel constructs,
but also research and development related to zero-knowledge technology, such as ZK frameworks like Circom and Halo2, ZK-VM, WASM in the browser, and efficient zk proof systems running on restricted-resource devices.
Done in close collaboration with other teams in the space.

## Privacy/Anonymity

Specifically metadata privacy.
This includes anonymity studies and providing a modular suite of protocols with clear trade-offs and threat models.

[Privacy/Anonymity Roadmap](https://github.com/vacp2p/research/issues/107)

## Scalability

Making the network scalable in terms of number of nodes, message rate, discovering of nodes, caching of historical messages etc.
Largely focused on Waku right now, but things like scalable group chats also relevant here.

## Data synchronization

End-to-end data application synchronization protocols, [FT Store](https://rfc.vac.dev/spec/21/), interfacing with long term storage, message bus guarantees, possibly CRDTs etc.
Guiding principle is to provide additional guarantees for users of Waku (etc) in terms of user experience.

## P2P/Networking

R&D related to P2P protocols and networking, including usage of WebRTC,
Discovery for resource restricted devices,
and new p2p protocols with different trade-offs.

[Ambient Peer Discovery Roadmap](https://github.com/vacp2p/research/issues/116)

## Censorship resistance

Censorship resistance at all layers of the stack, including obfuscated transports and running in hostile environments.

## Identity/Trust

Identity and key management required for non-trivial secure messaging.
This includes multi device management, group management, trust, and reputation.
Especially in a private and secure fashion.
