---
layout: post
name:  "Waku v2 Ambient Peer Discovery"
title:  "Waku v2 Ambient Peer Discovery"
date: 2022-05-09 10:00:00 +0200
author: Daniel
published: true
permalink: /wakuv2-apd
categories: research
summary: Introducing and discussing ambient peer discovery methods currently used by Waku v2, as well as future plans in this area.
image: /assets/img/waku_v2_discv5_random_walk_estimation.svg
discuss: https://forum.vac.dev/t/discussion-waku-v2-ambient-peer-discovery/133
---

<script type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML">
</script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      processEscapes: true},
      jax: ["input/TeX","input/MathML","input/AsciiMath","output/CommonHTML"],
      extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js","AssistiveMML.js", "[Contrib]/a11y/accessibility-menu.js"],
      TeX: {
      extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"],
      equationNumbers: {
      autoNumber: "AMS"
      }
    }
  });
</script>

[Waku v2](https://rfc.vac.dev/spec/10/) comprises a set of modular protocols for secure, privacy preserving communication.
Avoiding centralization, these protocols exchange messages over a P2P network layer.
In order to build a P2P network, participating nodes first have to discover peers within this network.
This is where [*ambient peer discovery*](https://docs.libp2p.io/concepts/publish-subscribe/#discovery) comes into play:
it allows nodes to find peers, making it an integral part of any decentralized application.

In this post the term *node* to refers to *our* endpoint or the endpoint that takes action,
while the term *peer* refers to other endpoints in the P2P network.
These endpoints can be any device connected to the Internet: e.g. servers, PCs, notebooks, mobile devices, or applications like a browser.
As such, nodes and peers are the same. We use these terms for the ease of explanation without loss of generality.


In Waku's modular design, ambient peer discovery is an umbrella term for mechanisms that allow nodes to find peers.
Various ambient peer discovery mechanisms are supported, and each is specified as a separate protocol.
Where do these protocols fit into Waku's protocol stack?
The P2P layer of Waku v2 builds on [libp2p gossipsub](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/README.md).
Nodes participating in a gossipsub protocol manage a mesh network that is used for routing messages.
This mesh network is an [unstructured P2P network](https://en.wikipedia.org/wiki/Peer-to-peer#Unstructured_networks)
offering high robustness and resilience against attacks.
Gossipsub implements many improvements overcoming the shortcomings typically associated with unstructured P2P networks, e.g. inefficient flooding based routing.
The gossipsub mesh network is managed in a decentralized way, which requires each node to know other participating peers.
Waku v2 may use any combination of its ambient discovery protocols to find appropriate peers.

Summarizing, Waku v2 comprises a *peer management layer* based on libp2p gossipsub,
which manages the peers of nodes, and an *ambient peer discovery layer*,
which provides information about peers to the peer management layer.

We focus on ambient peer discovery methods that are in line with our goal of building a fully decentralized, generalized, privacy-preserving and censorship-resistant messaging protocol.
Some of these protocols still need adjustments to adhere to our privacy and anonymity requirements. For now, we focus on operational stability and feasibility.
However, when choosing techniques, we pay attention to selecting mechanisms that can feasibly be tweaked for privacy in future research efforts.
Because of the modular design and the fact that Waku v2 has several discovery methods at its disposal, we could even remove a protocol in case future evaluation deems it not fitting our standards.

This post covers the current state and future considerations of ambient peer discovery for Waku v2,
and gives reason for changes and modifications we made or plan to make.
The ambient peer discovery protocols currently supported by Waku v2 are a modified version of Ethereum's [Discovery v5](https://github.com/ethereum/devp2p/blob/6b0abc3d956a626c28dce1307ee9f546db17b6bd/discv5/discv5.md)
and [DNS-based discovery](https://vac.dev/dns-based-discovery).
Waku v2 further supports [gossipsub's peer exchange protocol](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/gossipsub-v1.1.md#prune-backoff-and-peer-exchange).
In addition, we plan to introduce protocols for general peer exchange and capability discovery, respectively.
The former allows resource restricted nodes to outsource querying for peers to stronger peers,
the latter allows querying peers for their supported capabilities.
Besides these new protocols, we are working on integrating capability discovery in our existing ambient peer discovery protocols.

## Static Node Lists

The simplest method of learning about peers in a P2P network is via static node lists.
These can be given to nodes as start-up parameters or listed in a config-file.
They can also be provided in a script-parseable format, e.g. in JSON.
While this method of providing bootstrap nodes is very easy to implement, it requires static peers, which introduce centralized elements.
Also, updating static peer information introduces significant administrative overhead:
code and/or config files have to be updated and released.
Typically, static node lists only hold a small number of bootstrap nodes, which may lead to high load on these nodes.


## DNS-based Discovery

Compared to static node lists,
[DNS-based discovery](https://vac.dev/dns-based-discovery) (specified in [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459))
provides a more dynamic way of discovering bootstrap nodes.
It is very efficient, can easily be handled by resource restricted devices and provides very good availability.
In addition to a naive DNS approach, Ethereum's DNS-based discovery introduces efficient authentication leveraging [Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree).

A further advantage over static node lists is the separation of code/release management and bootstrap node management.
However, changing and updating the list of bootstrap nodes still requires administrative privileges because DNS records have to be added or updated.

While this method of discovery still requires centralized elements,
node list management can be delegated to various DNS zones managed by other entities mitigating centralization.


## Discovery V5

A much more dynamic method of ambient peer discovery is [Discovery v5](https://github.com/ethereum/devp2p/blob/6b0abc3d956a626c28dce1307ee9f546db17b6bd/discv5/discv5.md), which is Ethereum's peer discovery protocol.
It is based on the [Kademlia](https://en.wikipedia.org/wiki/Kademlia) distributed hashtable (DHT).
An [introduction to discv5 and its history](https://vac.dev/kademlia-to-discv5), and a [discv5 Waku v2 feasibility study](https://vac.dev/feasibility-discv5)
can be found in previous posts on this research log.

We use Discovery v5 as an ambient peer discovery method for Waku v2 because it is decentralized, efficient, actively researched, and has web3 as its main application area.
Discv5 also offers mitigation techniques for various attacks, which we cover later in this post.

Using a DHT (structured P2P network) as a means for ambient peer discovery, while using the gossipsub mesh network (unstructured P2P network) for transmitting actual messages,
Waku v2 leverages advantages from both worlds.
One of the main benefits of DHTs is offering a global view over participating nodes. 
This, in turn, allows sampling random sets of nodes which is important for equally distributing load.
Gossipsub, on the other hand, offers great robustness and resilience against attacks.
Even if discv5 discovery should not work in advent of a DoS attack, Waku v2 can still operate switching to different discovery methods.

Discovery methods that use separate P2P networks still depend on bootstrapping,
which Waku v2 does via parameters on start-up or via DNS-based discovery.
This might raise the question of why such discovery methods are beneficial.
The answer lies in the aforementioned global view of DHTs. Without discv5 and similar methods, the bootstrap nodes are used as part of the gossipsub mesh.
This might put heavy load on these nodes and further, might open pathways to inference attacks.
Discv5, on the other hand, uses the bootstrap nodes merely as an entry to the discovery network and can provide random sets of nodes (sampled from a global view)
for bootstrapping or expanding the mesh.

### DHT Background

Distributed Hash Tables are a class of structured P2P overlay networks.
A DHT can be seen as a distributed node set of which each node is responsible for a part of the hash space.
In contrast to unstructured P2P networks, e.g. the mesh network maintained by gossipsub,
DHTs have a global view over the node set and the hash space (assuming the participating nodes behave well).

DHTs are susceptible to various kinds of attacks, especially [Sybil attacks](https://en.wikipedia.org/wiki/Sybil_attack)
and [eclipse attacks](https://www.usenix.org/conference/usenixsecurity15/technical-sessions/presentation/heilman).
While security aspects have been addressed in various research papers, general practical solutions are not available.
However, discv5 introduced various practical mitigation techniques.

### Random Walk Discovery

While discv5 is based on the Kademlia DHT, it only uses the *distributed node set* aspect of DHTs.
It does not map values (items) into the distributed hash space.
This makes sense, because the main purpose of discv5 is discovering other nodes that support discv5, which are expected to be Ethereum nodes.
Ethereum nodes that want to discover other Ethereum nodes simply query the discv5 network for a random set of peers.
If Waku v2 would do the same, only a small subset of the retrieved nodes would support Waku v2.

A first naive solution for Waku v2 discv5 discovery is

* retrieve a random node set, which is achieved by querying for a set of randomly chosen node IDs
* filter the returned nodes on the query path based on Waku v2 capability via the [Waku v2 ENR](https://rfc.vac.dev/spec/31/)
* repeat until enough Waku v2 capable nodes are found

This query process boils down to random walk discovery, which is very resilient against attacks, but also very inefficient if the number of nodes supporting the desired capability is small.
We refer to this as the needle-in-the-haystack problem.

### Random Walk Performance Estimation

This subsection provides a rough estimation of the overhead introduced by random walk discovery.

Given the following parameters:

* $n$ number of total nodes participating in discv5
* $p$ percentage of nodes supporting Waku
* $W$ the event of having at least one Waku node in a random sample
* $k$ the size of a random sample (default = 16)
* $\alpha$ the number of parallel queries started
* $b$ bits per hop
* $q$ the number of queries

A query takes $log_{2^b}n$ hops to retrieve a random sample of nodes.

$P(W) = 1 - (1-p/100)^k$ is the probability of having at least one Waku node in the sample.

$P(W^q) = 1 - (1-p/100)^{kq}$  is the probability of having at least one Waku node in the union of $q$ samples.

Expressing this in terms of $q$, we can write:
$$P(W^q) = 1 - (1-p/100)^{kq} \iff  q = log_{(1-p/100)^k}(1-P(W^q))$$

Figure 1 shows a log-log plot for $P(W^q) = 90\%$.

<p align="center">
    <img src="../assets/img/waku_v2_discv5_random_walk_estimation.svg"  width="75%" />
    <br />
    Figure 1: log-log plot showing the number of queries necessary to retrieve a Waku v2 node with a probability of 90% in relation to the Waku v2 node concentration in the network.
</p>

Assuming $p=0.1$, we would need

$$0.9 = 1 - (1-0.1/100)^{16q} => q \approx 144$$

queries to get a Waku node with 90% probability, which leads to $\approx 144 * 18 = 2592$ overlay hops.
Choosing $b=3$ would reduce the number to $\approx 144 * 6 = 864$.
Even when choosing $\alpha = 10$ we would have to wait at least 80 RTTs.
This effort is just for retrieving a single Waku node. Ideally, we want at least 3 Waku nodes for bootstrapping a Waku relay.

[The discv5 doc](https://github.com/ethereum/devp2p/blob/6b0abc3d956a626c28dce1307ee9f546db17b6bd/discv5/discv5-theory.md#ad-placement-and-topic-radius) roughly estimates $p=1%$ to be the threshold for acceptably efficient random walk discovery. 
This is in line with our estimation:

$$0.9 = 1 - (1-1/100)^{16q} => q \approx 14$$


The number of necessary queries is linearly dependent on the percentage $p$ of Waku nodes.
The number of hops per query is logarithmically dependent on $n$.
Thus, random walk searching is inefficient for small percentages $p$.
Still, random walks are more resilient against attacks.

We can conclude that a Waku node concentration below 1% renders vanilla discv5 unfit for our needs.
Our current solution and future plans for solving this issue are covered in the next subsections.


### Simple Solution: Separate Discovery Network

The simple solution we currently use for [Waku v2 discv5](https://rfc.vac.dev/spec/33/) is a separate discv5 network.
All (well behaving) nodes in this network support Waku v2, resulting in a very high query efficiency.
However, this solution reduces resilience because the difficulty of attacking a DHT scales with the number of participating nodes.


### Discv5 Topic Discovery

We did not base our solution on the [current version of discv5 topic discovery](https://github.com/ethereum/devp2p/blob/master/discv5/discv5-theory.md#topic-advertisement),
because, similar to random walk discovery, it suffers from poor performance for relatively rare capabilities/topics.

However, there is [ongoing research](https://github.com/harnen/service-discovery-paper) in discv5 topic discovery which is close to ideas we explored when pondering efficient and resilient Waku discv5 solutions.
We keep a close eye on this research, give feedback, and make suggestions, as we plan to switch to this version of topic discovery in the future.

In a nutshell, topic discovery will manage separate routing tables for each topic.
These topic specific tables are initialized with nodes from the discv5 routing table.
While the buckets of the discv5 routing table represent distance intervals from the node's `node ID`, the topic table buckets represent distance intervals from `topic ID`s.

Nodes that want to register a topic try to register that topic at one random peer per bucket.
This leads to registering the topic at peers in closer and closer neighbourhoods around the topic ID, which
yields a very efficient and resilient compromise between random walk discovery and DHT discovery.
Peers in larger neighbourhoods around the topic ID are less efficient to discover, however more resilient against eclipse attacks and vice versa.

Further, this works well with the overload and DoS protection discv5 employs.
Discv5 limits the amount of nodes registered per topic on a single peer. Further, discv5 enforces a waiting time before nodes can register topics at peers.
So, for popular topics, a node might fail to register the topic in a close neighbourhood.
However, because the topic is popular (has a high occurrence percentage $p$), it can still be efficiently discovered.

In the future, we also plan to integrate Waku v2 capability discovery, which will not only allow asking for nodes that support Waku v2,
but asking for Waku v2 nodes supporting specific Waku v2 protocols like filter or store.
For the store protocol we envision sub-capabilities reflecting message topics and time frames of messages.
We will also investigate related security implications.

### Attacks on DHTs

In this post, we only briefly describe common attacks on DHTs.
These attacks are mainly used for denial of service (DoS),
but can also used as parts of more sophisticated attacks, e.g. deanonymization attacks.
A future post on this research log will cover security aspects of ambient peer discovery with a focus on privacy and anonymity.

*Sybil Attack*

The power of an attacker in a DHT is proportional to the number of controlled nodes.
Controlling nodes comes at a high resource cost and/or requires controlling a botnet via a preliminary attack.

In a Sybil attack, an attacker generates lots of virtual node identities.
This allows the attacker to control a large portion of the ID space in a DHT at a relatively low cost.
Sybil attacks are especially powerful when the attacker can freely choose the IDs of generated nodes,
because this allows positioning at chosen points in the DHT.

Because Sybil attacks amplify the power of many attacks against DHTs,
making Sybil attacks as difficult as possible is the basis for resilient DHT operation.
The typical abstract mitigation approach is binding node identities to physical network interfaces.
To some extend, this can be achieved by introducing IP address based limits.
Further, generating node IDs can be bound by proof of work (PoW),
which, however, comes with a set of shortcomings, e.g. relatively high costs on resource restricted devices.
[The discv5 doc](https://github.com/ethereum/devp2p/blob/6b0abc3d956a626c28dce1307ee9f546db17b6bd/discv5/discv5-rationale.md#sybil-and-eclipse-attacks)
describes both Sybil and eclipse attacks, as well as concrete mitigation techniques employed by discv5.


*Eclipse Attack*

In an eclipse attack, nodes controlled by the attacker poison the routing tables of other nodes in a way that parts of the DHT become eclipsed, i.e. invisible.
When a controlled node is asked for the next step in a path,
it provides another controlled node as the next step,
effectively navigating the querying node around or away from certain areas of the DHT.
While several mitigation techniques have been researched, there is no definitive protection against eclipse attacks available as of yet.
One mitigation technique is increasing $\alpha$, the number of parallel queries, and following each concurrent path independently for the lookup.

The eclipse attack becomes very powerful in combination with a successful Sybil attack;
especially when the attacker can freely choose the position of the Sybil nodes.


The aforementioned new topic discovery of discv5 provides a good balance between protection against eclipse attacks and query performance.

## Peer Exchange Protocol

While discv5 based ambient peer discovery has many desirable properties, resource restricted nodes and nodes behind restrictive NAT setups cannot run discv5 satisfactory.
With these nodes in mind, we started working on a simple *peer exchange protocol* based on ideas proposed [here](https://github.com/libp2p/specs/issues/222).
The peer exchange protocol will allow nodes to ask peers for additional peers.
Similar to discv5, the peer exchange protocol will also support capability discovery.

The new peer exchange protocol can be seen as a simple replacement for the [Rendezvous protocol](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/rendezvous/README.md), which Waku v2 does not support.
While the rendezvous protocol involves nodes registering at rendezvous peers, the peer exchange protocol simply allows nodes to ask any peer for a list of peers (with a certain set of capabilities).
Rendezvous tends to introduce centralized elements as rendezvous peers have a super-peer role.

In the future, we will investigate resource usage of [Waku v2 discv5](https://rfc.vac.dev/spec/33/) and provide suggestions for minimal resources nodes should have to run discv5 satisfactory.


## Further Protocols Related to Discovery

Waku v2 comprises further protocols related to ambient peer discovery. We shortly mention them for context, even though they are not strictly ambient peer discovery protocols.


### Gossipsub Peer Exchange Protocol

Gossipsub provides an integrated [peer exchange](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/gossipsub-v1.1.md#prune-backoff-and-peer-exchange) mechanism which is also supported by Waku v2.
Gossipsub peer exchange works in a *push* manner. Nodes send peer lists to peers they prune from the active mesh.
This pruning is part of the gossipsub peer management, blurring the boundaries of *peer management* and *ambient peer discovery*.

We will investigate anonymity implications of this protocol and might disable it in favour of more anonymity-preserving protocols.
Sending a list of peers discloses information about the sending node.
We consider restricting these peer lists to cached peers that are currently not used in the active gossipsub mesh.


### Capability Negotiation

Some of the ambient peer discovery methods used by Waku2 will support capability discovery.
This allows to narrow down the set of retrieved peers to peers that support specific capabilities.
This is efficient because it avoids establishing connections to nodes that we are not interested in.

However, the ambient discovery interface does not require capability discovery, which will lead to nodes having peers with unknown capabilities in their peer lists.
We work on a *capability negotiation protocol* which allows nodes to ask peers

* for their complete list of capabilities, and
* whether they support a specific capability

We will investigate security implications, especially when sending full capability lists.

## NAT traversal

For [NAT traversal](https://docs.libp2p.io/concepts/nat/), Waku v2 currently supports the port mapping protocols [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play) and [NAT-PMP](https://datatracker.ietf.org/doc/html/rfc6886) / [PCP](https://datatracker.ietf.org/doc/html/rfc6887).

In the future, we plan to add support for parts of [ICE](https://datatracker.ietf.org/doc/html/rfc8445), e.g. [STUN](https://datatracker.ietf.org/doc/html/rfc7350).
We do not plan to support [TURN](https://www.rfc-editor.org/rfc/rfc5928) because TURN relays would introduce a centralized element.
A modified decentralized version of TURN featuring incentivization might be an option in the future;
strong peers could offer a relay service similar to TURN.

There are [plans to integrate more NAT traversal into discv5](https://github.com/ethereum/devp2p/issues/199), in which we might participate.
So far, the only traversal technique supported by discv5 is nodes receiving their external IP address in pong messages.

While NAT traversal is very important, adding more NAT traversal techniques is not a priority at the moment.
Nodes behind restrictive symmetric NAT setups cannot be discovered, but they can still discover peers in less restrictive setups.
While we wish to have as many nodes as possible to be discoverable via ambient peer discovery, two nodes behind a restrictive symmetric NAT can still exchange Waku v2 messages if they discovered a shared peer.
This is one of the nice resilience related properties of flooding based routing algorithms.

For mobile nodes, which suffer from changing IP addresses and double NAT setups, we plan using the peer exchange protocol to ask peers for more peers.
Besides saving resources on resource restricted devices, this approach works as long as peers are in less restrictive environments.


## Conclusion and Future Prospects

*Ambient peer discovery* is an integral part of decentralized applications. It allows nodes to learn about peers in the network.
As of yet, Waku v2 supports DNS-based discovery and a slightly modified version of discv5.
We are working on further protocols, including a peer exchange protocol that allows resource restricted nodes to ask stronger peers for peer lists.
Further, we are working on adding capability discovery to our ambient discovery protocols, allowing nodes to find peers with desired properties.

These protocols can be combined in a modular way and allow Waku v2 nodes to build a strong and resilient mesh network,
even if some discovery methods are not available in a given situation.

We will investigate security properties of these discovery mechanisms with a focus on privacy and anonymity in a future post on this research log.
As an outlook we can already state that DHT approaches typically allow inferring information about the querying node.
Further, sending peer lists allows inferring the position of a node within the mesh, and by extension information about the node.
Waku v2 already provides some mitigation, because the mesh for transmitting actual messages, and the peer discovery network are separate.
To mitigate information leakage by transmitting peer lists, we plan to only reply with lists of peers that nodes do not use in their active meshes.

---

## References

- [Waku v2](https://rfc.vac.dev/spec/10/)
- [libp2p gossipsub](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/README.md)
- [unstructured P2P network](https://en.wikipedia.org/wiki/Peer-to-peer#Unstructured_networks)
- [ambient peer discovery](https://docs.libp2p.io/concepts/publish-subscribe/#discovery)
- [Discovery v5](https://github.com/ethereum/devp2p/blob/6b0abc3d956a626c28dce1307ee9f546db17b6bd/discv5/discv5.md)
- [Kademlia](https://en.wikipedia.org/wiki/Kademlia)
- [Discv5 history](https://vac.dev/kademlia-to-discv5)
- [Discv5 Waku v2 feasibility study](https://vac.dev/feasibility-discv5)
- [DNS-based discovery](https://vac.dev/dns-based-discovery)
- [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459)
- [Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree)
- [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack)
- [eclipse attack](https://www.usenix.org/conference/usenixsecurity15/technical-sessions/presentation/heilman)
- [Waku v2 ENR](https://rfc.vac.dev/spec/31/)
- [Discv5 topic discovery](https://github.com/ethereum/devp2p/blob/6b0abc3d956a626c28dce1307ee9f546db17b6bd/discv5/discv5-theory.md#ad-placement-and-topic-radius)
- [Discv5 paper](https://github.com/harnen/service-discovery-paper)
- [Discv5 vs Sybil and eclipse attacks](https://github.com/ethereum/devp2p/blob/6b0abc3d956a626c28dce1307ee9f546db17b6bd/discv5/discv5-rationale.md#sybil-and-eclipse-attacks)
- [peer exchange idea](https://github.com/libp2p/specs/issues/222)
- [Rendezvous protocol](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/rendezvous/README.md)
- [Waku v2 discv5](https://rfc.vac.dev/spec/33/)
- [Gossipsub peer exchange](https://github.com/libp2p/specs/blob/10712c55ab309086a52eec7d25f294df4fa96528/pubsub/gossipsub/gossipsub-v1.1.md#prune-backoff-and-peer-exchange)
- [NAT traversal](https://docs.libp2p.io/concepts/nat/)
- [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)
- [NAT-PMP](https://datatracker.ietf.org/doc/html/rfc6886)
- [PCP](https://datatracker.ietf.org/doc/html/rfc6887).
- [Discv5 topic efficiency issue](https://github.com/ethereum/devp2p/issues/199)

