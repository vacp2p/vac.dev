---
title: Open Research Problems
---

# Open Research Problems

We are seeking to collaborate with researchers in the following topic areas.
Feel free to join our [Discord](https://discord.gg/PQFdubGt6d) for discussion.

### DHT (distributed hash table) security / privacy / anonymity

Compared to unstructured P2P overlay networks, DHTs offer efficient and (theoretically) reliable discovery.
However, they are prone to eclipse attacks and [typically offer weak privacy properties](https://github.com/gpestana/notes/issues/8).
This topic comprises researching novel techniques mitigating or even thwarting [eclipse attacks](https://www.gemini.com/cryptopedia/eclipse-attacks-defense-bitcoin#section-what-is-an-eclipse-attack) against DHTs.
A focus on [Node Discovery Protocol v5 (discv5)](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md) is of special interest to the Vac team.

Further background on the usage of discv5 in Waku can be found in our [research log](https://vac.dev/wakuv2-apd).
A new version of discv5 that is both efficient and provides eclipse mitigation is [currently being researched](https://github.com/harnen/service-discovery-paper).


### Privacy-Preserving Incentivizations of waku protocols

* Incentivise relay

### Devising novel applications of the Waku protocol stack

examples comprise

* p2p social network
* evoting system

### Halo2 in a browser

[Halo2](https://halo2.dev) is an emerging proof system that,
in combination with [PLONK](https://eprint.iacr.org/2019/953) and a polynomial commitment scheme [based on the Inner Product Argument](https://zcash.github.io/halo2/design/proving-system/inner-product.html), 
allows creation of short zero-knowledge proofs for arbitrary statements.
Halo2 gained interest from the community because, 
in contrast to the well enstablished [Groth16](https://eprint.iacr.org/2016/260.pdf) proof system, 
it doesn't require a trusted setup 
and allows proof recursion, 
that is the possibility to compute an efficiently-verifiable ZK proof that attests correctness of an arbitrary number of other ZK proofs.

However, at the [current stage](https://github.com/zcash/halo2), Halo2 requires more research and engineering work to make it work efficiently as Groth16 in practice.

This topic focuses on researching and implementing all those possible optimiziations to PLONK/Halo2 in order to ultimately allow proof computations and verification in the browser, using WASM.

### Meshnet transports and libp2p

Waku protocols are built on top of [libp2p's modular network stack](https://libp2p.io/).
This in essence allows the Waku network to be overlayed on existing network links. 
Several transports are already supported:
depending on the specific underlying libp2p implementation,
supported transports could include WebSockets, QUIC, TCP, WebRTC, etc. 
However, currently all transports are IP-based
and require Waku nodes to have an active Internet connection to communicate outside of the local IP network.
Not only does this presuppose access to reliable Internet connectivity,
but such links are vulnerable to data profiling and censorship by ISPs or other entities.

This topic focuses on using Waku over non-IP routed networks,
such as [Wireless Mesh Networks](https://www.pcworld.com/article/407165/mesh-network-explained.html)
to improve accessibility and strengthen resistance against censorship.
It also investigates how appropriate the libp2p network stack is for such environments
and if Waku could benefit from using different networking stacks
that may function better in very restrictive environments.

### Applied ZK

To help scale and secure Waku network,
nodes should be incentivezed to join and thoroughly provide services to users
like [Relay](https://rfc.vac.dev/spec/11/), [Store](https://rfc.vac.dev/spec/13/), [Filter](https://rfc.vac.dev/spec/12/), and so on.

However, providing services costs network nodes computational and hardware resources.

In this topic we would like to design a protocol that, tailored to Waku, can:
- incentivize Waku nodes to provide services (e.g., economically); 
- provide an high level of privacy and anonimyty for both users consuming services and nodes providing them;
- disincentivize non protocol-compliant behaviours;

We envision a private fungible settlment among consumers and service providers 
based on zero-knowledge proofs for high privacy guarantees 
and on-chain smart-contracts to economically incentivize protocol-compliant behaviours.

### Robust P2P network - NAT traversal

[Waku relay](https://rfc.vac.dev/spec/11/), Waku's core protocol, is based on a [gossipsub mesh](https://github.com/libp2p/specs/tree/master/pubsub/gossipsub),
while [Waku discv5](https://rfc.vac.dev/spec/33/) uses a [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) overlay.
Both significantly benefit from robust and reliable P2P connections.
Better connectivity allows nodes to contribute more to the network and improve overall availability, efficiency, and by extension, anonymity ([see k-anonymity](https://en.wikipedia.org/wiki/K-anonymity)).

[NAT](https://en.wikipedia.org/wiki/Network_address_translation) is a well known problem to P2P connectivity.
There are various types of NATs whose behaviours are described in [RFC 4787](https://www.rfc-editor.org/rfc/rfc4787).
[Carrier-Grade NATs](https://www.rfc-editor.org/rfc/rfc6888) add another layer of indirection, which complicates the matter further.
Various [NAT traversal](https://en.wikipedia.org/wiki/NAT_traversal) protocols have been developed to overcome the different types of NATs.
[RFC 8445](https://www.rfc-editor.org/rfc/rfc8445) specifies Interactive Connectivity Establishment (ICE), which integrates a set of NAT traversal techniques.
Waku currently uses [libp2p NAT traversal](https://docs.libp2p.io/concepts/nat/),
specifically [STUN](https://docs.libp2p.io/concepts/nat/#hole-punching-stun) (leveraging the [identify protocol](https://docs.libp2p.io/concepts/protocols/#identify))
and [AutoNAT](https://docs.libp2p.io/concepts/nat/#hole-punching-stun#autonat).

The main focus of this topic is on researching novel ICE-complementary NAT traversal techniques that are decentralized and have desirable privacy and anonymity properties.
The topic also comprises integrating and specifying ICE for [Waku v2](https://rfc.vac.dev/spec/10/).

# Further Research Collaboration Opportunities

Besides the open research problems listed in the section above,
you may browse our [Research Areas](https://vac.dev/research-areas) page
and check our roadmaps for various research topics.


