---
layout: page
permalink: /faq/
title: FAQ
---

## Are there messaging protocols out there that you feel live up to your security and privacy Standards? Where does Signal fall in?

There are a lot of protocols out there and new ones come up every day, in terms of fitting our requirements on 
scalability, decentralization, security and privacy we've yet to find one that works just as is, which is why we are 
developing our own.

Signal is using a centralized server, but they provide many protocols. [Status](https://status.im) for example used a modified version of 
Signal's Double Ratchet and X3DH key exchange for encryption and forward secrecy in their app. 
So kudos to them for that work!

You can find this in status client specification [here](https://status-im.github.io/specs/status-secure-transport-spec).

## Are there any benefits to building messaging protocols for Ethereum? Is Waku a long term solution?

Waku is completely separate from Ethereum, the only overlap is that a lot of components such as P2P protocols are the 
same. Future incentivization schemes are likely to use Ethereum in terms of deposits and settlement, but that's it.

Waku is more scalable than Whisper, but it still has a lot of issues. We aim to address these in an incremental manner 
until it works as a long term solution and stands the test of time.

## What are the key privacy tradeoffs between Waku and Whisper?

First off, the privacy guarantees provided by Whisper are mostly theoretical at this stage. They've not received a lot 
of scrutiny from academic researchers and so on.

There are a few trade-offs that allow Waku to be more scalable and suitable for resource restricted devices than Whisper. 
It is worth noting that all of these are optional, and a Waku client can choose to get all the privacy benefits by turning these options off:

1. Light client means mobile nodes don't relay messages that aren't their own 
2. Mailserver for offline messaging means a mailserver knows which messages you are requesting and what your IP is
3. Fetching messages by topic instead of bloom filter means there's less (none) false positives, which reveal that you care about certain topics more
