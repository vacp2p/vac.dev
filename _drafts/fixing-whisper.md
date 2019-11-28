---
layout: post
name:  "Fixing Whisper for great profit"
title:  "Fixing Whisper for great profit"
date:   2019-11-26 12:00:00 +0800
author: oskarth
published: true
permalink: /fixing-whisper
categories: research
summary: A research log.
image: /assets/img/whisper_scalability.png
---

## Intro

TODO: Take this as base https://discuss.status.im/t/fixing-whisper-for-great-profit/1419

## Whisper theoretical model

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

### Summary

![](assets/img/whisper_scalability.png)


------------------------------------------------------------
