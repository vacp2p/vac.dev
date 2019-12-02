---
layout: post
name:  "Waku - Fixing Whisper"
title:  "Waku - Fixing Whisper"
date:   2019-11-28 12:00:00 +0800
author: oskarth
published: true
permalink: /fixing-whisper-with-waku
categories: research
summary: A research log. Why Whisper can't scale and how to fix it.
image: /assets/img/whisper_scalability.png
---

This post will introduce Waku. Waku is a fork of Whisper that attempts to
addresses some of Whisper's shortcomings in an iterative fashion. We will also
introduce a theoretical scaling model for Whisper that shows why it doesn't
scale, and what can be done about it.

## Introduction

Whisper is a gossip-based communication protocol or an ephemeral key-value store
depending on which way you look at it. Historically speaking, it is the
messaging pilllar of [Web3](http://gavwood.com/dappsweb3.html), together with
Ethereum for consensus and Swarm for storage.

Whisper, being a somewhat esoteric protocol and with some fundamental issues,
haven't seen a lot of uptake. However, applications such as Status are using it,
and have been making minor ad hoc modifications to it to make it run on mobile
devices.

What are these fundamental issues? In short:
a) scalability, most immediately when it comes to bandwidth usage
b) spam-resistance, proof of work is a poor mechanism for heterogenerous nodes
c) no incentivized infrastructure, leading to centralized choke points
d) lack of formal and unambiguous specification makes it hard to analyze and implement

In this post, we'll focus on the first problem, which is bandwidth scalability.

## Whisper theoretical model

Whisper theoretical model. Attempts to encode characteristics of it. Specifically for use case such as one by Status (see [Status Whisper usage spec](https://github.com/status-im/specs/blob/master/status-whisper-usage-spec.md)).


### Goals
1. Ensure network scales by being user or usage bound, as opposed to bandwidth growing in proportion to network size.
2. Staying with in a reasonable bandwidth limit for limited data plans.
3. Do the above without materially impacting existing nodes.


```
Case 1. Only receiving messages meant for you [naive case]

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A4. Only receiving messages meant for you.

For 100 users, receiving bandwidth is 1000.0KB/day
For 10k users, receiving bandwidth is 1000.0KB/day
For  1m users, receiving bandwidth is 1000.0KB/day

------------------------------------------------------------
Case 2. Receiving messages for everyone [naive case]

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A5. Received messages for everyone.

For 100 users, receiving bandwidth is   97.7MB/day
For 10k users, receiving bandwidth is    9.5GB/day
For  1m users, receiving bandwidth is  953.7GB/day

------------------------------------------------------------
Case 3. All private messages go over one discovery topic

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A8. All private messages are received by everyone (same topic) (static).

For 100 users, receiving bandwidth is   49.3MB/day
For 10k users, receiving bandwidth is    4.8GB/day
For  1m users, receiving bandwidth is  476.8GB/day

------------------------------------------------------------
Case 4. All private messages are partitioned into shards [naive case]

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages partitioned across partition shards (static), n=5000

For 100 users, receiving bandwidth is 1000.0KB/day
For 10k users, receiving bandwidth is    1.5MB/day
For  1m users, receiving bandwidth is   98.1MB/day

------------------------------------------------------------

Case 5. 4 + Bloom filter with false positive rate

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages partitioned across partition shards (static), n=5000
- A10. Bloom filter size (m) (static): 512
- A11. Bloom filter hash functions (k) (static): 3
- A12. Bloom filter elements, i.e. topics, (n) (static): 100
- A13. Bloom filter assuming optimal k choice (sensitive to m, n).
- A14. Bloom filter false positive proportion of full traffic, p=0.1

For 100 users, receiving bandwidth is   10.7MB/day
For 10k users, receiving bandwidth is  978.0MB/day
For  1m users, receiving bandwidth is   95.5GB/day

NOTE: Traffic extremely sensitive to bloom false positives
This completely dominates network traffic at scale.
With p=1% we get 10k users ~100MB/day and 1m users ~10gb/day)
------------------------------------------------------------
Case 6. Case 5 + Benign duplicate receives

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages partitioned across partition shards (static), n=5000
- A10. Bloom filter size (m) (static): 512
- A11. Bloom filter hash functions (k) (static): 3
- A12. Bloom filter elements, i.e. topics, (n) (static): 100
- A13. Bloom filter assuming optimal k choice (sensitive to m, n).
- A14. Bloom filter false positive proportion of full traffic, p=0.1
- A15. Benign duplicate receives factor (static): 2
- A16. No bad envelopes, bad PoW, expired, etc (static).

For 100 users, receiving bandwidth is   21.5MB/day
For 10k users, receiving bandwidth is    1.9GB/day
For  1m users, receiving bandwidth is  190.9GB/day

------------------------------------------------------------

Case 7. 6 + Mailserver under good conditions; small bloom fp; mostly offline

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages partitioned across partition shards (static), n=5000
- A10. Bloom filter size (m) (static): 512
- A11. Bloom filter hash functions (k) (static): 3
- A12. Bloom filter elements, i.e. topics, (n) (static): 100
- A13. Bloom filter assuming optimal k choice (sensitive to m, n).
- A14. Bloom filter false positive proportion of full traffic, p=0.1
- A15. Benign duplicate receives factor (static): 2
- A16. No bad envelopes, bad PoW, expired, etc (static).
- A17. User is offline p% of the time (static) p=0.9
- A18. No bad request, dup messages for mailservers; overlap perfect (static).
- A19. Mailserver requests can change false positive rate to be p=0.01

For 100 users, receiving bandwidth is    3.9MB/day
For 10k users, receiving bandwidth is  284.8MB/day
For  1m users, receiving bandwidth is   27.8GB/day

------------------------------------------------------------

Case 8. No metadata protection w bloom filter; 1 node connected; static shard

Next step up is to either only use contact code, or shard more aggressively.
Note that this requires change of other nodes behavior, not just local node.

Assumptions:
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages partitioned across partition shards (static), n=5000

For 100 users, receiving bandwidth is 1000.0KB/day
For 10k users, receiving bandwidth is    1.5MB/day
For  1m users, receiving bandwidth is   98.1MB/day

------------------------------------------------------------
```

See [source](https://github.com/vacp2p/research/tree/master/whisper_scalability)
for more detail on the model and its assumptions.

### Takeaways

The results are summed up in the following graph. Notice the log-log scale. The
colored backgrounds correspond to the following bandwidth usage:

- Blue: <10mb/d (<~300mb/month)
- Green: <30mb/d (<~1gb/month)
- Yellow: <100mb/d (<~3gb/month)
- Red: >100mb/d(>3gb/month)

![](assets/img/whisper_scalability.png)

## Progress so far

,,,
## Motivation for a new protocol

- Why not new
- Iterative
- PRogress so far

- Description of Whisper and recap of its issues (gossip, 'darkness', pow, incentive, spec etc)
- Introduce model
- Motivation for a new protocol
- Progress so far

