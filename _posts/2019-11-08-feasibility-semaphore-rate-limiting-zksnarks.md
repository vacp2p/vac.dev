---
layout: post
name:  "Feasibility Study: Semaphore rate limiting through zkSNARKs"
title:  "Feasibility Study: Semaphore rate limiting through zkSNARKs"
date:   2019-11-08 12:00:00 +0800
author: oskarth
published: true
permalink: /feasibility-semaphore-rate-limiting-zksnarks
categories: research
summary: A research log. Zero knowledge signaling as a rate limiting mechanism to prevent spam in p2p networks.
image: /assets/img/peacock-signaling.jpg
discuss: https://forum.vac.dev/t/discussion-feasibility-study-semaphore-rate-limiting-through-zksnarks/21
---

**tldr: Moon math promising for solving spam in Whisper, but to get there we need to invest more in performance work and technical upskilling.**

## Motivating problem

In open p2p networks for messaging, one big problem is spam-resistance. Existing solutions, such as Whisper's proof of work, are insufficient, especially for heterogeneous nodes. Other reputation-based approaches might not be desirable, due to issues around arbitrary exclusion and privacy.

One possible solution is to use a right-to-access staking-based method, where a node is only able to send a message, signal, at a certain rate, and otherwise they can be slashed. One problem with this is in terms of privacy-preservation, where we specifically don't want a user to be tied to a specific payment or unique fingerprint.

### Related problems

In addition to above, there are a lot of related problems that share similarities in terms of their structure and proposed solution.

- Private transactions ([Zcash](https://z.cash/), [AZTEC](https://www.aztecprotocol.com/))
- Private voting ([Semaphore](https://github.com/kobigurk/semaphore))
- Private group membership (Semaphore)
- Layer 2 scaling, poss layer 1 ([ZK Rollup](https://ethresear.ch/t/on-chain-scaling-to-potentially-500-tx-sec-through-mass-tx-validation/3477); StarkWare/Eth2-3)

## Overview

## Basic terminology

A *zero-knowledge proof* allows a *prover* to show a *verifier* that they know something, without revealing what that something is. This means you can do trust-minimized computation that is also privacy preserving. As a basic example, instead of showing your ID when going to a bar you simply give them a proof that you are over 18, without showing the doorman your id.

*zkSNARKs* is a form of zero-knowledge proofs. There are many types of zero-knowledge proofs, and the field is evolving rapidly. They come with various trade-offs in terms of things such as: trusted setup, cryptographic assumptions, proof/verification key size, proof/verification time, proof size, etc. See section below for more.

*Semaphore* is a framework/library/construct on top of zkSNARks. It allows for zero-knowledge signaling, specifically on top of Ethereum. This means an approved user can broadcast some arbitrary string without revealing their identity, given some specific constraints. An approved user is someone who has been added to a certain merkle tree. See [current Github home](https://github.com/kobigurk/semaphore) for more.

*Circom* is a DSL for writing arithmetic circuits that can be used in zkSNARKs, similar to how you might write a NAND gate. See [Github](https://github.com/iden3/circom) for more.

## Basic flow

We start with a private voting example, and then extend it to the slashable rate limiting example.

1. A user registers an identity (arbitrary keypair), along with a small fee, to a smart contract. This adds them to a merkle tree and allows them to prove that they are member of that group, without revealing who they are.

2. When a user wants to send a message, they compute a zero-knowledge proof. This ensures certain invariants, have some *public outputs*, and can be verified by anyone (including a smart contract).
   
3. Any node can verify the proof, including smart contracts on chain (as of Byzantinum HF). Additionally, a node can have rules for the public output. In the case of voting, one such rule is that a specific output hash has to be equal to some predefined value, such as "2020-01-01 vote on Foo Bar for president".
   
4. Because of how the proof is constructed, and the rules around output values, this ensures that: a user is part of the approved set of voters and that a user can only vote once.
   
5. As a consequence of above, we have a system where registered users can only vote once, no one can see who voted for what, and this can all be proven and verified.
   
### Rate limiting example

In the case of rate limiting, we do want nodes to send multiple messages. This changes step 3-5 above somewhat.

*NOTE: It is a bit more involved than this, and if we precompute proofs the flow might look a bit different. But the general idea is the same*.

1. Instead of having a rule that you can only vote once, we have a rule that you can only send a message per epoch. Epoch here can be every second, as defined by UTC date time +-20s.
   
2. Additionally, if a users sends more than one message per epoch, one of the public outputs is a random share of a private key. Using Shamir's Secret Sharing (similar to a multisig) and 2/3 key share as an example threshold: in the normal case only 1/3 private keys is revealed, which is insufficient to have access. In the case where two messages are sent in an epoch, probabilistically 2/3 shares is sufficient to have access to the key (unless you get the same random share of the key).
   
3. This means any untrusted user who detects a spamming user, can use it to access their private key corresponding to funds in the contract, and thus slash them.

4. As a consequence of above, we have a system where registered users can only messages X times per epoch, and no one can see who is sending what messages. Additionally, if a user is violating the above rate limit, they can be punished and any user can profit from it.
   
### Briefly on scope of 'approved users'

In the case of an application like Status, this construct can either be a global StatusNetwork group, or one per chat, or network, etc. It can be applied both at the network and user level. There are no specific limitations on where or who deploys this, and it is thus more of a UX consideration.

## Technical details

For a fairly self-contained set of examples above, see exploration in [Vac research repo](https://github.com/vacp2p/research/blob/master/zksnarks/semaphore/src/hello.js). Note that the Shamir secret sharing is not inside the SNARK, but out-of-band for now.

The [current version](https://github.com/kobigurk/semaphore) of Semaphore is using NodeJS and [Circom](https://github.com/iden3/circom) from Iden3 for Snarks.

For more on rate limiting idea, see [ethresearch post](https://ethresear.ch/t/semaphore-rln-rate-limiting-nullifier-for-spam-prevention-in-anonymous-p2p-setting/5009/).

## Feasibility

The above repo was used to exercise the basic paths and to gain intution of feasibility. Based on it and related reading we outline a few blockers and things that require further study.

### Technical feasibility

#### Proof time

Prove time for Semaphore (<https://github.com/kobigurk/semaphore>) zKSNARKs using circom, groth and snarkjs is currently way too long. It takes on the order of ~10m to generate a proof. With Websnark, it is likely to take 30s, which might still be too long. We should experiment with native code on mobile here.

See [details](https://github.com/vacp2p/research/issues/7).

#### Proving key size

Prover key size is ~110mb for Semaphore. Assuming this is embedded on mobile device, it bloats the APK a lot. Current APK size is ~30mb and even that might be high for people with limited bandwidth.

See [details](https://github.com/vacp2p/research/issues/8).

#### Trusted setup

Using zkSNARKs a trusted setup is required to generate prover and verifier keys. As part of this setup, a toxic parameter lambda is generated. If a party gets access to this lambda, they can prove anything. This means people using zKSNARKs usually have an elaborate MPC ceremony to ensure this parameter doesn't get discovered.

See [details](https://github.com/vacp2p/research/issues/9).

#### Shamir logic in SNARK

For [Semaphore RLN](https://ethresear.ch/t/semaphore-rln-rate-limiting-nullifier-for-spam-prevention-in-anonymous-p2p-setting/5009) we need to embed the Shamir logic inside the SNARK in order to do slashing for spam. Currently the [implementation](https://github.com/vacp2p/research/blob/master/zksnarks/semaphore/src/hello.js#L450) is trusted and very hacky.

See [details](https://github.com/vacp2p/research/issues/10).

#### End to end integation

[Currently](https://github.com/vacp2p/research/blob/master/zksnarks/semaphore/src/hello.js) is standalone and doesn't touch multiple users, deployed contract with merkle tree and verification, actual transactions, a mocked network, add/remove members, etc. There are bound to be edge cases and unknown unknowns here.

See [details](https://github.com/vacp2p/research/issues/11).

#### Licensing issues

Currently Circom [uses a GPL license](https://github.com/iden3/circom/blob/master/COPYING ), which can get tricky when it comes to the App Store etc.

See [details](https://github.com/vacp2p/research/issues/12).

#### Alternative ZKPs?

Some of the isolated blockers for zKSNARKs ([#7](https://github.com/vacp2p/research/issues/7), [#8](https://github.com/vacp2p/research/issues/8), [#9](https://github.com/vacp2p/research/issues/9)) might be mitigated by the use of other ZKP technology. However, they likely have their own issues.

See [details](https://github.com/vacp2p/research/issues/13).

### Social feasibility

#### Technical skill

zkSNARKs and related technologies are quite new. To learn how they work and get an intuition for them requires individuals to dedicate a lot of time to studying them. This means we must make getting competence in these technologies if we wish to use them to our advantage.

#### Time and resources

In order for this and related projects (such as private transaction) to get anywhere, it must be made an explicit area of focus for an extend period of time.

## General thoughts

Similar to Whisper, and in line with moving towards protocol and infrastructure, we need to upskill and invest resources into this. This doesn't mean developing all of the technologies ourselves, but gaining enough competence to leverage and extend existing solutions by the growing ZKP community.

For example, this might also include leveraging largely ready made solutions such as AZTEC for private transaction; more fundamental research into ZK rollup and similar; using Semaphore for private group membership and private voting; Nim based wrapper aronud Bellman, etc.

## Acknowledgement

Thanks to Barry Whitehat for patient explanation and pointers. Thanks to WJ for helping with runtime issues.

*Peacock header image from [Tonos](https://en.wikipedia.org/wiki/File:Flickr_-_lo.tangelini_-_Tonos_(1).jpg).*
