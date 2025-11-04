# Rate Limiting Nullifier (RLN)

A privacy-preserving rate limiting protocol for decentralized systems, powered by ZK.

---

This document summarizes RLN's principles and provides reference materials for developers and researchers interested in privacy-preserving rate limiting.

## Why RLN

In decentralized systems, rate limiting must prevent spam without exposing identities or relying on central control.

RLN achieves this using zero-knowledge proofs and anonymous nullifiers, enabling fair participation that is **privacy-preserving**, **decentralized**, and **verifiable**.

## What is RLN

RLN is a zero-knowledge protocol that enables rate limiting without revealing **user identities**.

It prevents spam in anonymous systems by allowing each user to generate exactly one valid proof per time window named **Epoch**, maintaining anonymity.

## How RLN Works

1. A user joins a group (for example, a Merkle tree).
2. Each message includes a proof and a nullifier.
3. The proof is verified with nullifiers.
4. If a nullifier is reused within a time window, it indicates **spam**.
5. The system detects abuse without revealing the sender's identity.

Core Components:

| Concept | Description |
| --- | --- |
| Nullifiers | A unique message or TX tag per message window |
| Rate limit window (Epochs) | Defines how often a proof can be valid |
| Membership proof | Confirms user is part of an authorized group by tree |
| Proof system | Zero-knowledge circuit (Groth16) by [Zerokit](https://github.com/vacp2p/zerokit) |
| Secret | Extractable by an additional nullifier that exceeds the user's commitment |
| id-commitment | Commitment of the user message (TX) right for an epoch and secret. |

---

## Resources

### Docs

- [PSE RLN Notion](https://www.notion.so/1ced57e8dd7e809fae70dce3a4061118?pvs=21)
- [RLNv3 Blogpost](https://vac.dev/rlog/rln-v3)
- [RLNv2 RFC](https://rfc.vac.dev/vac/raw/rln-v2)
- [RLNv1 RFC (begin here!)](https://rfc.vac.dev/vac/32/rln-v1)
- [RLN github.io](https://rate-limiting-nullifier.github.io/rln-docs/)
- [RLN in Waku](https://vac.dev/rlog/rln-anonymous-dos-prevention)
- [RLN workshop](https://hackmd.io/rAdKbOfvQIqT5F_8QOvEFQ?both)

### Implementations

- [Zerokit](https://github.com/vacp2p/zerokit)
- [RLN GitHub Repository (PSE)](https://github.com/privacy-scaling-explorations/rln)

### Integrations / Use Cases

- [Status Gasless L2](https://docs.status.network/general-info/gasless-transactions#rln)
  In Status Network, RLN serves as the cryptographic rate-limiting layer that enables secure and fair gasless transactions. Instead of traditional gas fees, users are limited by cryptographic proofs based on RLN. Each user can send only a fixed number of transactions per epoch; exceeding this limit makes their secret key recoverable. RLN uses Sparse Merkle Trees for scalable membership management, supporting millions of accounts. The system operates through a Prover–Verifier model: the Prover generates an RLN proof for each transaction, while the Verifier in the Sequencer validates it. This architecture allows Status Layer 2 to process gasless, privacy-preserving, and spam-resistant transactions efficiently. See the implementation here: [rln.md](https://github.com/status-im/status-network-monorepo/blob/develop/status-network-contracts/docs/rln.md)
- [Waku-rln-relay](https://arxiv.org/pdf/2207.00117)
  In the Waku network, RLN is integrated into the gossip-based relay layer to enable privacy-preserving spam protection without relying on centralized moderation or heavy computational proof-of-work. The resulting protocol, WAKU-RLN-RELAY, limits the messaging rate of each peer through zero-knowledge proofs that verify group membership while keeping user identities private. If a participant exceeds the allowed message quota, their secret can be cryptographically revealed, resulting in a financial penalty, while honest peers who detect spammers are rewarded. This integration allows Waku to provide anonymous, decentralized, and spam-resistant messaging across heterogeneous networks. Check the [rln.waku.org](https://rln.waku.org/) RLN Membership on Linea Sepolia testnet.
- [Railgun](https://docs.railgun.org/wiki/learn/privacy-system/community-broadcasters)
  In the RAILGUN ecosystem, privacy is achieved fully on-chain through zero-knowledge cryptography, enabling users to interact privately with DeFi and smart contracts across Ethereum, BSC, Polygon, and Arbitrum without leaving their native chain. Since RAILGUN uses Waku as its communication layer, the same RLN-based anti-spam mechanisms described in the previous section apply here as well. This integration ensures that private transactions and messages remain secure, decentralized, and censorship-resistant while benefiting from Waku's efficient peer-to-peer messaging framework.
- [TheGraph](https://docs.graphops.xyz/graphcast/radios/listener-radio?_highlight=waku#advanced-configuration)
  In Graph ecosystem, Graphcast leverages Waku and RLN to enable real-time, spam-resistant, and privacy-preserving communication among Indexers. Instead of relying on costly on-chain broadcasts, Graphcast provides a peer-to-peer messaging layer where Indexers can exchange data such as subgraph integrity checks, query analytics, and coordination signals at near-zero cost. RLN ensures rate-limited, anonymous message delivery, preventing spam while maintaining low latency and privacy. Since Waku serves as the underlying communication protocol, the same RLN-based mechanisms described earlier apply, allowing The Graph network to scale coordination securely without incurring blockchain gas fees.

### Talks & References

- [Using RLN in a Peer to Peer Network | Aaryamann Challani | PROGCRYPTO](https://www.youtube.com/watch?v=7xDxv8F70Jg)
- [0xPARC RLN YT](https://www.youtube.com/watch?v=OGhf991iTPc)
- [Rate-Limiting Nullifier | Rasul Ibragimov | PROGCRYPTO](https://www.youtube.com/watch?v=3Lz8AqUl5AI)

