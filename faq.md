---
layout: page
permalink: /faq/
title: FAQ
---

## Are there messaging protocols out there that you feel live up to your security and privacy Standards? Where does Signal fall in?

There are a lot of protocols out there and new ones come up every day, in terms of fitting our requirements on scalability, decentralization, security and privacy we've yet to find one that works just as is, which is why we are developing our own.

Signal is using a centralized server, but they provide many protocols. For end to end encryption and forward secrecy we use a modified version of Signal's Double Ratchet and X3DH key exchange in the Status app. So kudos to them for that work!

https://github.com/status-im/specs/blob/master/status-secure-transport-spec.md

(This requires communicating difference between different layers and what they achieve in terms of properties, see "Vac rough overview" for more on this)

## Are there any benefits to building messaging protocols for Ethereum? Is Waku a long term solution?

Waku is completely separate from Ethereum, the only overlap is that a lot of components such as P2P protocols are the same. Future incentivization schemes are likely to use Ethereum in terms of deposits and settlement, but that's it.

Waku is more scalable than Whisper, but it still has a lot of issues. We aim to address these in an incremental manner until it works as a long term solution and stands the test of time.

## What are the key privacy tradeoffs between Waku and Whisper?

First of, the privacy guarantees provided by Whisper are mostly theoretical at this stage. They've not received a lot of scrutiny from academic researchers and so on.

There are a few trade-off that allow Waku to be more scalable and suitable for resource restricted devices than Whisper. It is worth noting that all of these are optional, and a Waku client can choose to get all the privacy benefits by turning these options off:

1. Light client means mobile nodes don't relay messages that aren't their own 
2. Mailserver for offline messaging means a mailserver knows which messages you are requesting and what your IP is
3. Fetching messages by topic instead of bloom filter means there's less (none) false positives, which reveal that you care about certain topics more

(This is a bit too much to describe in detail without writing a long essay, so sketch to suffice here, I suggest we turn this into an FAQ that Core can contribute to as well since a lot of people can answer these)

(Re-iterate privacy benefits of pseudoanymity)