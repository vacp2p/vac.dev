---
layout: post
name:  "From Kademlia to Discv5"
title:  "From Kademlia to Discv5"
date:   2020-04-9 16:00:00 +0100
author: dean
published: true
permalink: /kademlia-to-discv5
categories: research
summary: A quick history of discovery in peer-to-peer networks, along with a look into discv4 and discv5, detailing what they are, how they work and where they differ.
---

If you've been working on Ethereum or adjacent technologies you've probably heard of [discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) or [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md). But what are they actually? How do they work and what makes them different? To answer these questions, we need to start at the beginning, so this post will assume that there is little knowledge on the subject so the post should be accessible for anyone.

## The Beginning

Let's start right at the beginning: the problem of discovery and organization of nodes in peer-to-peer networks.

Early P2P file sharing technologies, such as Napster, would share information about who holds what file using a single server. A node would connect to the central server and give it a list of the files it owns. Another node would then connect to that central server, find a node that has the file it is looking for and contact that node. This however was a flawed system -- it was vulnerable to attacks and left a single party open to lawsuits.

It became clear that another solution was needed, and after years of research and experimentation, we were given the distributed hash table or DHT.

## Distributed Hash Tables

In 2001 4 new protocols for such DHTs were conceived, [Tapestry](https://pdos.csail.mit.edu/~strib/docs/tapestry/tapestry_jsac03.pdf), [Chord](https://pdos.csail.mit.edu/papers/chord:sigcomm01/chord_sigcomm.pdf), [CAN](https://people.eecs.berkeley.edu/~sylvia/papers/cans.pdf) and [Pastry](http://rowstron.azurewebsites.net/PAST/pastry.pdf), all of which made various trade-offs and changes in their core functionality, giving them unique characteristics.

But as said, they're all DHTs. So what is a DHT?

A distributed hash table (DHT) is essentially a distributed key-value list. Nodes participating in the DHT can easily retrieve the value for a key.

If we have a network with 9 key-value pairs and 3 nodes, ideally each node would store 3 (optimally 6 for redundancy) of those key-value pairs, meaning that if a key-value pair were to be updated, only part of the network would responsible for ensuring that it is. The idea is that any node in the network would know where to find the specific key-value pair it is looking for based on how things are distributed amongst the nodes.

## Kademlia

So now that we know what DHTs are, let's get to Kademlia, the predecessor of discv4. Kademlia was created by Petar Maymounkov and David Mazières in 2002. I will naively say that this is probably one of the most popular and most used DHT protocols. It's quite simple in how it works, so let's look at it.

In Kademlia, nodes and values are arranged by distance (in a very mathematical definition). This distance is not a geographical one, but rather based on identifiers. It is calculated how far 2 identifiers are from eachother using some distance function.

Kademlia uses an `XOR` as its distance function. An `XOR` is a function that outputs `true` only when inputs differ. Here is an example with some binary identifiers:

```
XOR 10011001
    00110010
    --------
    10101011
```

The top in decimal numbers means that the distance between `153` and `50` is `171`.

There are several reasons why `XOR` was taken:
 1. The distance from one ID to itself will be `0`.
 2. Distance is symmetric, A to B is the same as B to A.
 3. Follows triangle inequality, if `A`, `B` and `C` are points on a triangle then the distance `A` to `B` is closer or equal to that of `A` to `C` plus the one from `B` to `C`.

In summary, this distance function allows a node to decide what is "close" to it and make decisions based on that "closeness".

Kademlia nodes store a routing table. This table contains multiple lists. Each subsequent list contains nodes which are a little further distanced than the ones included in the previous list. Nodes maintain detailed knowledge about nodes closest to them, and the further away a node is, the less knowledge the node maintains about it.

So let's say I want to find a specific node. What I would do is go to any node which I already know and ask them for all their neighbours closest to my target. I repeat this process for the returned neighbours until I find my target.

The same thing happens for values. Values have a certain distance from nodes and their IDs are structured the same way so we can calculate this distance. If I want to find a value, I simply look for the neighbours closest to that value's key until I find the one storing said value.

For Kademlia nodes to support these functions, there are several messages with which the protocol communicates.

- `PING` - Used to check whether a node is still running.
- `STORE` - Stores a value with a given key on a node.
- `FINDNODE` - Returns the closest nodes requested to a given ID.
- `FINDVALUE` - The same as `FINDNODE`, except if a node stores the specific value it will return it directly.

*This is a **very** simplified explanation of Kademlia and skips various important details. For the full description, make sure to check out the [paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) or a more in-depth [design specification](http://xlattice.sourceforge.net/components/protocol/kademlia/specs.html)*

## Discv4

Now after that history lesson, we finally get to discv4 (which stands for discovery v4), Ethereum's current node discovery protocol. The protocol itself is essentially based off of Kademlia, however it does away with certain aspects of it. For example, it does away with any usage of the value part of the DHT. 

Kademlia is mainly used for the organisation of the network, so we only use the routing table to locate other nodes. Due to the fact that discv4 doesn't use the value portion of the DHT at all, we can throw away the `FINDVALUE` and `STORE` commands described by Kademlia.

The lookup method previously described by Kademlia describes how a node gets its peers. A node contacts some node and asks it for the nodes closest to itself. It does so until it can no longer find any new nodes.

Additionally, discv4 adds mutual endpoint verification. This is meant to ensure that a peer calling `FINDNODE` also participates in the discovery protocol.

Finally, all discv4 nodes are expected to maintain up-to-date ENR records. These contain information about a node. They can be requested from any node using a discv4-specific packet called `ENRRequest`.

*If you want some more details on ENRs, check out one of my posts ["Network Addresses in Ethereum"](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/)*

Discv4 comes with its own range of problems however. Let's look at a few of them.

Firstly, the way discv4 works right now, there is no way to differentiate between node sub-protocols. This means for example that an Ethereum node could add an Ethereum Classic Node, Swarm or Whisper node to its DHT without realizing that it is invalid until more communication has happened. This inability to differentiate sub-protocols makes it harder to find specific nodes, such as Ethereum nodes with light-client support.

Next, in order to prevent replay attacks, discv4 uses timestamps. This however can lead to various issues when a host's clock is wrong. For more details, see the ["Known Issues"](https://github.com/ethereum/devp2p/blob/master/discv4.md#known-issues-in-the-current-version) section of the discv4 specification.

Finally, we have an issue with the way mutual endpoint verification works. Messages can get dropped and there is no way to tell if both peers have verified eachother. This means that we could consider our peer verified while it does not consider us so making them drop the `FINDNODE` packet.

## Discv5

Finally, let's look at discv5. The next iteration of discv4 and the discovery protocol which will be used by Eth 2.0. It aims at fixing various issues present in discv4.

The first change is the way `FINDNODE` works. In traditional Kademlia as well as in discv5, we pass an identifier. However, in discv5 we instead pass the logarithmic distance, meaning that a `FINDNODE` request gets a response containing all nodes at the specified logarithmic distance from the called node.

Logarithmic distance means we first calculate the distance and then run it through our log base 2 function. See:

```
log2(A xor B)
```

And the second, more important change, is that discv5 aims at solving one of the biggest issues of discv4: the differentiation of sub-protocols. It does this by adding topic tables. Topic tables are [first in first out](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)) lists that contain nodes which have advertised that they provide a specific service. Nodes get themselves added to this list by registering `ads` on their peers. 

As of writing, there is still an issue with this proposal. There is currently no efficient way for a node to place `ads` on multiple peers, since it would require separate requests for every peer which is inefficient in a large-scale network.

Additionally, it is unclear how many peers a node should place these `ads` on and exactly which peers to place them on. For more details, check out the issue [devp2p#136](https://github.com/ethereum/devp2p/issues/136).

There are a bunch more smaller changes to the protocol, but they are less important hence they were ommitted from this summary.

Nevertheless, discv5 still does not resolve a couple issues present in discv4, such as unreliable endpoint verification. As of writing this post, there is currently no new method in discv5 to improve the endpoint verification process.

As you can see discv5 is still a work in progress and has a few large challenges to overcome. However if it does, it will most likely be a large improvement to a more naive Kademlia implementations.

---

Hopefully this article helped explain what these discovery protocols are and how they work. If you're interested in their full specifications you can find them on [github](https://github.com/ethereum/devp2p).
