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
