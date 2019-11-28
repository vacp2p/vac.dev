---
layout: post
name:  "Fixing Whisper for great profit"
title:  "Fixing Whisper for great profit"
date:   2019-11-26 12:00:00 +0800
author: oskarth
published: true
permalink: /fixing-whisper
categories: research
summary: A research log. Why Whisper can't scale and how to fix it.
image: /assets/img/whisper_scalability.png
---

**tldr: Whisper currently can’t scale. This post shows why, and how to fix it.**

<!-- What is whisper? -->

Very few people use Whisper. One of the major consumers of it, Status, has major isues with bandwidth.

While the general confidence that Whisper will scale is low, the reasons aren't quite clear.
code
s an end user, most people care more about being able to use the thing at all than theoretical (and somewhat unrigorous) metadata protection guarantees. Additionally, the proposed solutions will still enable hardcore users to get stronger receiver-anonymity guarantees if they so wish.

It is also worth pointing out that, unlike apps like Signal, we don’t tie users to their identity by a phone number or email address. This is already huge when it comes to privacy. Other apps like Briar also outsource the metadata protection to running on Tor. Now, this comes with issues regarding spam resistance, but that’s a topic for another time.

In terms of the Anonymity 1 Trilemma 1, we are likely in a suboptimal spot.

### Why try to fix Whisper if we are going to replace it?

Technically, this argument is correct. However, reality disagrees. If we are going to start pushing user acquisitions, we need to retain users. This needs to happen soon, on the order of few weeks, and not several months, coupled with more uncertainity and compatibility issues.

It doesn’t make sense to replace Whisper with a semi-half assed medium term thing if it’ll take months to get in production, and then replace that thing with a generalized, scalable, decentralized, incentivized network.

## Theoretical model

### Caveats

First, some caveats: this model likely contains bugs, has wrong assumptions, or completely misses certain dimensions. However, it acts as a form of existence proof for unscalability, with clear reasons.

If certain assumptions are wrong, then we can challenge them and reason about them in isolation. It doesn’t mean things will definitely work as the model predicts, and that there aren’t unknown unknowns.

The model also only deals with receiving bandwidth for end nodes, uses mostly static assumptions of averages, and doesn’t deal with spam resistance, privacy guarantees, accounting, intermediate node or network wide failures.

### On the model and its goals

The theoretical model for Whisper attempts to encode characteristics of it.

Goals:

1. Ensure network scales by being user or usage bound, as opposed to bandwidth growing in proportion to network size.
2. Staying with in a reasonable bandwidth limit for limited data plans.
3. Do the above without materially impacting existing nodes.

It proceeds through various case with clear assumptions behind them, starting from the most naive assumptions. It prints results for 100 users, 10k users and 1m users.

The colorized report assumes <10mb/day (300mb/month) is good, <30mb/day (1gb/month) is ok, <100mb/day (3gb/month) is bad and above is a complete failure. See bandwidth usage too high 2 for comparative numbers with other apps.
Results

A colorized report can be found here 5 and source code is here.

The colorized report is easier to scan, but for completeness the report is also embedded below.

## Whisper theoretical model / Results

Attempts to encode characteristics of it. Here's a summary:

#### Goals:
1. Ensure network scales by being user or usage bound, as opposed to bandwidth growing in proportion to network size.
2. Staying with in a reasonable bandwidth limit for limited data plans.
3. Do the above without materially impacting existing nodes.

#### Case 1. Only receiving messages meant for you [naive case]

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A4. Only receiving messages meant for you.

**Results:**

- For 100 users, receiving bandwidth is 1000.0KB/day. **Good!**
- For 10k users, receiving bandwidth is 1000.0KB/day. **Good!**
- For  1m users, receiving bandwidth is 1000.0KB/day. **Good!**

#### Case 2. Receiving messages for everyone [naive case]

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A5. Received messages for everyone.

**Results:**
- For 100 users, receiving bandwidth is   97.7MB/day. **Terrible!**
- For 10k users, receiving bandwidth is    9.5GB/day. **Terrible!**
- For  1m users, receiving bandwidth is  953.7GB/day. **Terrible!**

#### Case 3. All private messages go over one discovery topic

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A8. All private messages are received by everyone (same topic) (static).


**Results:**
- For 100 users, receiving bandwidth is   49.3MB/day. **Bad.**
- For 10k users, receiving bandwidth is    4.8GB/day. **Terrible!**
- For  1m users, receiving bandwidth is  476.8GB/day. **Terrible!**

#### Case 4. All private messages partitioned into shards [naive case]

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages are partitioned evenly across partition shards (static), n=5000

**Results**:
- For 100 users, receiving bandwidth is 1000.0KB/day. **Good!**
- For 10k users, receiving bandwidth is    1.5MB/day. **Good!**
- For  1m users, receiving bandwidth is   98.1MB/day. **Terrible!**

#### Case 5. Case 4 + All messages passed through bloom filter

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages are partitioned evenly across partition shards (static), n=5000
- A10. Bloom filter size (m) (static): 512
- A11. Bloom filter hash functions (k) (static): 3
- A12. Bloom filter elements, i.e. topics, (n) (static): 100
- A13. Bloom filter assuming optimal k choice (sensitive to m, n).
- A14. Bloom filter false positive proportion of full traffic, p=0.1

**Results:**
- For 100 users, receiving bandwidth is   10.7MB/day. **Ok.**
- For 10k users, receiving bandwidth is  978.0MB/day. **Terrible!**
- For  1m users, receiving bandwidth is   95.5GB/day. **Terrible!**

*NOTE: Traffic extremely sensitive to bloom false positives
This completely dominates network traffic at scale.*

*With p=1% we get 10k users ~100MB/day and 1m users ~10gb/day)*

#### Case 6. Case 5 + Benign duplicate receives

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages are partitioned evenly across partition shards (static), n=5000
- A10. Bloom filter size (m) (static): 512
- A11. Bloom filter hash functions (k) (static): 3
- A12. Bloom filter elements, i.e. topics, (n) (static): 100
- A13. Bloom filter assuming optimal k choice (sensitive to m, n).
- A14. Bloom filter false positive proportion of full traffic, p=0.1
- A15. Benign duplicate receives factor (static): 2
- A16. No bad envelopes, bad PoW, expired, etc (static).

**Results:**
- For 100 users, receiving bandwidth is   21.5MB/day. **Ok.**
- For 10k users, receiving bandwidth is    1.9GB/day. **Terrible!**
- For  1m users, receiving bandwidth is  190.9GB/day. **Terrible!**

#### Case 7. Case 6 + Mailserver case under good conditions with smaller bloom false positive and mostly offline

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages are partitioned evenly across partition shards (static), n=5000
- A10. Bloom filter size (m) (static): 512
- A11. Bloom filter hash functions (k) (static): 3
- A12. Bloom filter elements, i.e. topics, (n) (static): 100
- A13. Bloom filter assuming optimal k choice (sensitive to m, n).
- A14. Bloom filter false positive proportion of full traffic, p=0.1
- A15. Benign duplicate receives factor (static): 2
- A16. No bad envelopes, bad PoW, expired, etc (static).
- A17. User is offline p% of the time (static) p=0.9
- A18. No bad request, duplicate messages for mailservers, and overlap/retires are perfect (static).
- A19. Mailserver requests can change false positive rate to be p=0.01

**Results**:

- For 100 users, receiving bandwidth is    3.9MB/day. **Good!**
- For 10k users, receiving bandwidth is  284.8MB/day. **Terrible!**
- For  1m users, receiving bandwidth is   27.8GB/day. **Terrible!**

#### Case 8. Waku mode - no metadata protection with bloom filter and one node connected; still static shard

Next step up is to either only use contact code, or shard more aggressively.
Note that this requires change of other nodes behavior, not just local node.

**Assumptions:**
- A1. Envelope size (static): 1024kb
- A2. Envelopes / message (static): 10
- A3. Received messages / day (static): 100
- A6. Proportion of private messages (static): 0.5
- A7. Public messages only received by relevant recipients (static).
- A9. Private messages are partitioned evenly across partition shards (static), n=5000

**Results:**
- For 100 users, receiving bandwidth is 1000.0KB/day. **Good!**
- For 10k users, receiving bandwidth is    1.5MB/day. **Good!**
- For  1m users, receiving bandwidth is   98.1MB/day. **Terrible!**

### Takeaways

![](assets/img/whisper_scalability.png)

1. Whisper as it currently works doesn’t scale, and we quickly run into unacceptable bandwidth usage.
2. There are a few factors of this, but largely it boils down to noisy topics usage and use of bloom filters.
   - Duplicate (e.g. see Whisper vs PSS) and bad envelopes are also fundamental factors, but this depends a bit more on specific deployment configurations.
3. Waku mode (case 8) is a proposed solution that doesn’t require other nodes to change, and extends capabilities for nodes that puts a premium on performance. Essentially it’s a form of Infura for chat.
4. The next bottleneck after this is the partitioned topics, which either needs to gracefully (and potentially quickly) grow, or an alternative way of consuming those messages needs to be deviced.

## Waku mode

- Doesn’t impact existing clients, it’s just a separate node and capability. A bit like Infura for chat.
- Other nodes can still use Whisper as is, like a full node.
- Sacrifices metadata protection and incurs higher connectivity/availability requirements for scalbility

Requirements:

- Exposes API to get messages from a set of list of topics (no bloom filter)
- Way of being identified as a Waku node (e.g. through version string)
- Option to statically encode this node in app, e.g. similar to custom bootnodes/mailserver
- Only node that needs to be connected to, possibly as Whisper relay / mailserver hybrid

Provides:

- likely provides scalability of up to 10k users and beyond
- with some enhancements to partition topic logic, can possibly scale up to 1m users

Caveats:

- hasn’t been tested in a large-scale simulation
- other network and intermediate node bottlenecks might become apparent (e.g. full bloom filter and cluster capacity; can likely be dealt with in isolation using known techniques, e.g. load balancing)

## Next steps

The proposed Waku mode can be implemented as a proof of concept on the order of a few weeks, which works well with current marketing plans and, if successful, could be used in a 1.1 app release.

A spec proposal is in early draft mode 8 with associated issue 4. This will be enhanced as discussions here progress.

The main steps / requirements at this stage is:

(a) Buy-in from Core to give users the option to use this mode

(b) One or possibly two people to implement Waku mode as a proof of concept mode that can be used end to end

As well as any refinements to the assumptions and model necessary.

Additionally for performance improvements, there’s a more engineering focused effort on optimizing mailservers retries/locality/queries, that is out of scope of this post.

To tie this to more long term research work, we also want to use these nodes to do accounting of resources (i.e. bandwidth). This will inform more incentive modelling work.

Fin.


## Waku progress so far

TODO: https://forum.vac.dev/t/waku-project-and-progress/24
