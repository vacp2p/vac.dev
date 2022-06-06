---
layout: post
name:  "DNS Based Discovery"
title:  "DNS Based Discovery"
date:   2020-02-7 12:00:00 +0100
author: dean
published: true
permalink: /dns-based-discovery
categories: research
summary: A look at EIP-1459 and the benefits of DNS based discovery.
---

Discovery in p2p networks is the process of how nodes find each other and specific resources they are looking for. Popular discovery protocols, such as [Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) which utilizes a [distributed hash table](https://en.wikipedia.org/wiki/Distributed_hash_table) or DHT, are highly inefficient for resource restricted devices. These methods use short connection windows, and it is quite battery intensive to keep establishing connections. Additionally, we cannot expect a mobile phone for example to synchronize an entire DHT using cellular data.

Another issue is how we do the initial bootstrapping. In other words, how does a client find its first node to then discover the rest of the network? In most applications, including Status right now, this is done with a [static list of nodes](https://specs.status.im/spec/1#bootstrapping) that a client can connect to.

In summary, we have a static list that provides us with nodes we can connect to which then allows us to discover the rest of the network using something like Kademlia. But what we need is something that can easily be mutated, guarantees a certain amount of security, and is efficient for resource restricted devices. Ideally our solution would also be robust and scalable.

How do we do this? 

[EIP 1459: Node Discovery via DNS](https://eips.ethereum.org/EIPS/eip-1459), which is one of the strategies we are using for discovering waku nodes. [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459) is a DNS-based discovery protocol that stores [merkle trees](https://en.wikipedia.org/wiki/Merkle_tree) in DNS records which contain connection information for nodes.

*Waku is our fork of Whisper. Oskar recently wrote an [entire post](https://vac.dev/fixing-whisper-with-waku) explaining it. In short, Waku is our method of fixing the shortcomings of Whisper in a more iterative fashion. You can find the specification [here](https://rfc.vac.dev/spec/6/)*

DNS-based methods for bootstrapping p2p networks are quite popular. Even Bitcoin uses it, but it uses a concept called DNS seeds, which are just DNS servers that are configured to return a list of randomly selected nodes from the network upon being queried. This means that although these seeds are hardcoded in the client, the IP addresses of actual nodes do not have to be.

```console
> dig dnsseed.bluematt.me +short
129.226.73.12
107.180.78.111
169.255.56.123
91.216.149.28
85.209.240.91
66.232.124.232
207.55.53.96
86.149.241.168
193.219.38.57
190.198.210.139
74.213.232.234
158.181.226.33
176.99.2.207
202.55.87.45
37.205.10.3
90.133.4.73
176.191.182.3
109.207.166.232
45.5.117.59
178.211.170.2
160.16.0.30
```

The above displays the result of querying on of these DNS seeds. All the nodes are stored as [`A` records](https://simpledns.plus/help/a-records) for the given domain name. This is quite a simple solution which Bitcoin almost soley relies on since removing the [IRC bootstrapping method in v0.8.2](https://en.bitcoin.it/wiki/Network#IRC).

What makes this DNS based discovery useful? It allows us to have a mutable list of bootstrap nodes without needing to ship a new version of the client every time a list is mutated. It also allows for a more lightweight method of discovering nodes, something very important for resource restricted devices.

Additionally, DNS provides us with a robust and scalable infrastructure. This is due to its hierarchical architecture. This hierarchical architecture also already makes it distributed such that the failure of one DNS server does not result in us no longer being able to resolve our name.

As with every solution though, there is a trade-off. By storing the list in DNS name an adversary would simply need to censor the DNS records for a specific name. This would prevent any new client trying to join the network from being able to do so.

One thing you notice when looking at [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459) is that it is a lot more technically complex than Bitcoin's way of doing this. So if Bitcoin uses this simple method and has proven that it works, why did we need a new method?

There are multiple reasons, but the main one is **security**. In the Bitcoin example, an attacker could create a new list and no one querying would be able to tell. This is however mitigated in [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459) where we can verify the integrity of the entire returned list by storing an entire merkle tree in the DNS records.

Let's dive into this. Firstly, a client that is using these DNS records for discovery must know the public key corresponding to the private key controlled by the entity creating the list. This is because the entire list is signed using a secp256k1 private key, giving the client the ability to authenticate the list and know that it has not been tampered with by some external party.

So that already makes this a lot safer than the method Bitcoin uses. But how are these lists even stored? As previously stated they are stored using **merkle trees** as follows:
 - The root of the tree is stored in a [`TXT` record](https://simpledns.plus/help/txt-records), this record contains the tree's root hash, a sequence number which is incremented every time the tree is updated and a signature as stated above. 
 
    Additionally, there is also a root hash to a second tree called a **link tree**, it contains the information to different lists. This link tree allows us to delegate trust and build a graph of multiple merkle trees stored across multiple DNS names.

    The sequence number ensures that an attacker cannot replace a tree with an older version because when a client reads the tree, they should ensure that the sequence number is greater than the last synchronized version.
    
- Using the root hash for the tree, we can find the merkle tree's first branch, the branch is also stored in a `TXT` record. The branch record contains all the hashes of the branch's leafs.

- Once a client starts reading all the leafs, they can find one of two things: either a new branch record leading them further down the tree or an Ethereum Name Records (ENR) which means they now have the address of a node to connect to! To learn more about ethereum node records you can have a look at [EIP-778](https://eips.ethereum.org/EIPS/eip-778), or read a short blog post I wrote explaining them [here](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/#enr).

Below is the zone file taken from the [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459), displaying how this looks in practice.

```
; name                        ttl     class type  content
@                             60      IN    TXT   enrtree-root:v1 e=JWXYDBPXYWG6FX3GMDIBFA6CJ4 l=C7HRFPF3BLGF3YR4DY5KX3SMBE seq=1 sig=o908WmNp7LibOfPsr4btQwatZJ5URBr2ZAuxvK4UWHlsB9sUOTJQaGAlLPVAhM__XJesCHxLISo94z5Z2a463gA
C7HRFPF3BLGF3YR4DY5KX3SMBE    86900   IN    TXT   enrtree://AM5FCQLWIZX2QFPNJAP7VUERCCRNGRHWZG3YYHIUV7BVDQ5FDPRT2@morenodes.example.org
JWXYDBPXYWG6FX3GMDIBFA6CJ4    86900   IN    TXT   enrtree-branch:2XS2367YHAXJFGLZHVAWLQD4ZY,H4FHT4B454P6UXFD7JCYQ5PWDY,MHTDO6TMUBRIA2XWG5LUDACK24
2XS2367YHAXJFGLZHVAWLQD4ZY    86900   IN    TXT   enr:-HW4QOFzoVLaFJnNhbgMoDXPnOvcdVuj7pDpqRvh6BRDO68aVi5ZcjB3vzQRZH2IcLBGHzo8uUN3snqmgTiE56CH3AMBgmlkgnY0iXNlY3AyNTZrMaECC2_24YYkYHEgdzxlSNKQEnHhuNAbNlMlWJxrJxbAFvA
H4FHT4B454P6UXFD7JCYQ5PWDY    86900   IN    TXT   enr:-HW4QAggRauloj2SDLtIHN1XBkvhFZ1vtf1raYQp9TBW2RD5EEawDzbtSmlXUfnaHcvwOizhVYLtr7e6vw7NAf6mTuoCgmlkgnY0iXNlY3AyNTZrMaECjrXI8TLNXU0f8cthpAMxEshUyQlK-AM0PW2wfrnacNI
MHTDO6TMUBRIA2XWG5LUDACK24    86900   IN    TXT   enr:-HW4QLAYqmrwllBEnzWWs7I5Ev2IAs7x_dZlbYdRdMUx5EyKHDXp7AV5CkuPGUPdvbv1_Ms1CPfhcGCvSElSosZmyoqAgmlkgnY0iXNlY3AyNTZrMaECriawHKWdDRk2xeZkrOXBQ0dfMFLHY4eENZwdufn1S1o
```

All of this has already been introduced into go-ethereum with the pull request [#20094](https://github.com/ethereum/go-ethereum/pull/20094), created by Felix Lange. There's a lot of tooling around it that already exists too which is really cool. So if your project is written in Golang and wants to use this, it's relatively simple! Additionally, here's a proof of concept that shows what this might look like with libp2p on [github](https://github.com/decanus/dns-discovery).

I hope this was a helpful explainer into DNS based discovery, and shows [EIP-1459](https://eips.ethereum.org/EIPS/eip-1459)'s benefits over more traditional DNS-based discovery schemes.
