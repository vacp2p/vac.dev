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

Waku protocols are designed in such a way that resource-limited devices can make up for their lack of resources by relying on the more powerful peers in the network.
This can be seen at all the layers of the Waku protocol stack.
One such layer is the Waku relay protocol in which peers voluntarily join the routing layer of Waku and aid message propagation.
Some peers may have altruistic reasons for contributing or are stakeholders in some higher-level application requiring reliable infrastructure to deliver a high-quality service.
However, this cannot be generalized to all, therefore peers need to be incentivized for their participation and contribution in the network regardless of being tied to any specific application, or necessarily having altruistic wills.

One of the most challenging protocols of Waku for incentivization is the Waku Relay protocol.
This is because the supplied service is in the form of bandwidth, and due to the Gossip-based nature of the routing protocol it is hard to verify which peers are the legit routers and hence are eligible for any designated reward.
Also, there is no trivial requester-responder relationship in that protocol. 
The reason is that every published message is routed by every other peer in the network.
Thus we face a one-to-many relationship.
In this research problem, researchers and engineers are asked to design and develop an incentivization mechanism that would account for the said issues and also is game theoretically sound, in the sense that all the participants would be rationally incentivized to follow the protocol description. 



### Devising novel applications of the Waku protocol stack

Waku provides a suite of modular p2p protocols to enable the realization of web2 applications in the decentralized web3 world in the form of DApps. 
Waku protocol stack features all the necessary components for the DApp developers namely, the networking/routing layer, and multiple discovery methods.
It also provides various request-response protocols to allow resource provisioning for resource-limited devices. 
For example, store protocol (to account for storage limitations), and filter and lightpush protocols (to aid bandwidth-constrained peers).
It means that literally any famous web2 services e.g., email, social networking, and e-voting systems, for which typically a large and powerful infrastructure is needed, can now be translated to their corresponding decentralized and p2p and privacy-preserving version by relying on Waku. 
Here, Waku allows individual peers with limited capacities to accumulate their resources to form the required infrastructure for the intended service.
One of the greatest products built on top of Waku is the decentralized messaging application of [Status](status.im).
However, we believe that the usage of Waku is not limited to messaging applications, and in this research problem, we would like to encourage researchers and developers to design and build other decentralized systems on top of Waku.
Below is just a sample list of use cases. We strongly recommend getting creative and building what it means the most to you and your community.
* P2P social network
* E-voting system
* P2P Email service
* Online p2p Games
* P2P scoring and recommendation systems

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
nodes should be incentivized to join and reliably provide services to users
like [Relay](https://rfc.vac.dev/spec/11/), [Store](https://rfc.vac.dev/spec/13/), [Filter](https://rfc.vac.dev/spec/12/), and so on.

However, providing services costs network nodes computational and hardware resources.

In this topic we would like to design a protocol that, tailored to Waku, can:

- incentivize Waku nodes to provide services (e.g., economically); 
- provide a high level of privacy and anonimyty for both users consuming services and nodes providing them;
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

### Peer scoring in peer-to-peer networks

Peer-to-peer networks are made of multiple nodes or peers, typically in the range of hundreds or even thousands. This makes it impossible to keep all nodes connected in a full-mesh network since it would involve an exponentially increasing number of connections. This means that each node has to just connect to a small subset of all nodes, which has to be chosen wisely. Some unanswered questions:
* Which nodes do we connect to? Based on what criteria?
* How do we keep quality peers while being forgiving with nodes with fewer resources or that are syncing?
* Can we handle our peers in a way that prevents eclipse attacks?
* Can we give each peer a score and select the best one based on it?
* Can we integrate Waku-specific features into the score and/or the bad-behavior metric?

This not only involves an efficient peer discovery strategy, which gives us a pool of peers to select from, but also strategies to select the ones we are interested in and drop connections with the ones we are not. Protocols like GossipSub have their [score](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#the-score-function)](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md#the-score-function) and it's something that can be used as a baseline, but unfortunately does not take into account Waku specifics.


# Further Research Collaboration Opportunities

Besides the open research problems listed in the section above,
you may browse our [Research Areas](https://vac.dev/research-areas) page
and check our roadmaps for various research topics.


