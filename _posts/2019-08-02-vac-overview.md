---
layout: post
name:  "Vac - A Rough Overview"
title:  "Vac - A Rough Overview"
date:   2019-08-02 12:00:00 +0800
author: oskarth
published: true
permalink: /vac-overview
categories: research
summary: Vac is a modular peer-to-peer messaging stack, with a focus on secure messaging. Overview of terms, stack and open problems.
---

Vac is a **modular peer-to-peer messaging stack, with a focus on secure messaging**. What does that mean? Let's unpack it a bit.

## Basic terms

*messaging stack*. While the initial focus is on [data sync](https://vac.dev/p2p-data-sync-for-mobile), we are concerned with all layers in the stack. That means all the way from underlying transports, p2p overlays and routing, to initial trust establishment and semantics for things like group chat. The ultimate goal is to give application developers the tools they need to provide secure messaging for their users, so they can focus on their domain expertise.

*modular*. Unlike many other secure messaging applications, our goal is not to have a tightly coupled set of protocols, nor is it to reinvent the wheel. Instead, we aim to provide options at each layer in the stack, and build on the shoulders of giants, putting a premimum on interoperability. It's similar in philosophy to projects such as [libp2p](https://libp2p.io/) or [Substrate](https://www.parity.io/substrate/) in that regard. Each choice comes with different trade-offs, and these look different for different applications.

*peer-to-peer*. The protocols we work on are pure p2p, and aim to minimize centralization. This too is in opposition to many initiatives in the secure messaging space.

*messaging*. By messaging we mean messaging in a generalized sense. This includes both human to human communication, as well machine to machine communication. By messaging we also mean something more fundamental than text messages, we also include things like transactions (state channels, etc) under this moniker.

*secure messaging*. Outside of traditional notions of secure messaging, such as ensuring end to end encryption, forward secrecy, avoiding MITM-attacks, etc, we are also concerned with two other forms of secure messaging. We call these *private messaging* and *censorship-resistance*. Private messaging means viewing privacy as a security property, with all that entails. Censorship resistance ties into being p2p, but also in terms of allowing for transports and overlays that can't easily be censored by port blocking, traffic analysis, and similar.

*Vāc*. Is a Vedic goddess of speech. It also hints at being a vaccine.

## Protocol stack

What does this stack look like? We take inspiration from [core](https://tools.ietf.org/html/rfc793) [internet architecture](https://www.ietf.org/rfc/rfc1122.txt), existing [survey work](https://css.csail.mit.edu/6.858/2020/readings/secure-messaging.pdf) and other [efforts](https://code.briarproject.org/briar/briar/wikis/A-Quick-Overview-of-the-Protocol-Stack) that have been done to decompose the problem into orthogonal pieces. Each layer provides their own set of properties and only interact with the layers it is adjacent to. Note that this is a rough sketch.

| Layer / Protocol  | Purpose                           | Examples             |
|-------------------|-----------------------------------|----------------------|
| Application layer | End user semantics                | 1:1 chat, group chat |
| Data Sync         | Data consistency                  | MVDS, BSP            |
| Secure Transport  | Confidentiality, PFS, etc         | Double Ratchet, MLS  |
| Transport Privacy | Transport and metadata protection | Whisper, Tor, Mixnet |
| P2P Overlay       | Overlay routing, NAT traversal    | devp2p, libp2p       |
| | |
| Trust Establishment | Establishing end-to-end trust   | TOFU, web of trust   |

As an example, end user semantics such as group chat or moderation capabilities can largely work regardless of specific choices further down the stack. Similarly, using a mesh network or Tor doesn't impact the use of Double Ratchet at the Secure Transport layer.

Data Sync plays a similar role to what TCP does at the transport layer in a traditional Internet architecture, and for some applications something more like UDP is likely to be desirable.

In terms of specific properties and trade-offs at each layer, we'll go deeper down into them as we study them. For now, this is best treated as a rough sketch or mental map.

## Problems and rough priorities

With all the pieces involved, this is quite an undertaking. Luckily, a lot of pieces are already in place and can be either incorporated as-is or iterated on. In terms of medium and long term, here's a rough sketch of priorities and open problems.

1. **Better data sync.** While the current [MVDS](https://rfc.vac.dev/spec/2/) works, it is lacking in a few areas:
- Lack of remote log for mostly-offline offline devices
- Better scalability for multi-user chat contexts
- Better usability in terms of application layer usage and supporting more transports

2. **Better transport layer support.** Currently MVDS runs primarily over Whisper, which has a few issues:
- scalability, being able to run with many nodes
- spam-resistance, proof of work is a poor mechanism for heterogeneous devices
- no incentivized infrastructure, leading to centralized choke points

In addition to these most immediate concerns, there are other open problems. Some of these are overlapping with the above.

3. **Adaptive nodes.** Better support for resource restricted devices and nodes of varying capabilities. Light connection strategy for resources and guarantees. Security games to outsource processing with guarantees.

4. **Incentivized and spam-resistant messaging.** Reasons to run infrastructure and not relying on altruistic nodes. For spam resistance, in p2p multicast spam is a big attack vector due to amplification. There are a few interesting directions here, such as EigenTrust, proof of burn with micropayments, and leveraging zero-knowledge proofs.

5. **Strong privacy guarantees at transport privacy layer**. More rigorous privacy guarantees and explicit trade-offs for metadata protection. Includes Mixnet.
   
6. **Censorship-resistant and robust P2P overlay**. NAT traversal; running in the browser; mesh networks; pluggable transports for traffic obfuscation.

7. **Scalable and decentralized secure conversational security.** Strong security guarantees such as forward secrecy, post compromise security, for large group chats. Includes projects such MLS and extending Double Ratchet.

8. **Better trust establishment and key handling**. Avoiding MITM attacks while still enabling a good user experience. Protecting against ghost users in group chat and providing better ways to do key handling.

There is also a set of more general problems, that touch multiple layers:

9. **Ensuring modularity and interoperability**. Providing interfaces that allow for existing and new protocols to be at each layer of the stack.

10. **Better specifications**. Machine-readable and formally verified specifications. More rigorous analysis of exact guarantees and behaviors. Exposing work in such a way that it can be analyzed by academics.

11. **Better simulations**. Providing infrastructure and tooling to be able to test protocols in adverse environments and at scale.

12. **Enabling excellent user experience**. A big reason for the lack of widespread adoption of secure messaging is the fact that more centralized, insecure methods provide a better user experience. Given that incentives can align better for users interested in secure messaging, providing an even better user experience should be doable.

---

We got some work to do. Come help us if you want. See you in the next update!
