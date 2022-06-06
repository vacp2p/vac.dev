---
layout: post
name:  "What Would a WeChat Replacement Need?"
title:  "What Would a WeChat Replacement Need?"
date:   2020-04-16 12:00:00 +0800
author: oskarth
published: true
permalink: /wechat-replacement-need
categories: research
summary: What would a self-sovereign, private, censorship-resistant and open alternative to WeChat look like?
image: /assets/img/tianstatue.jpg
discuss: https://forum.vac.dev/t/discussion-what-would-a-wechat-replacement-need/42
---

What would it take to replace WeChat? More specifically, what would a self-sovereign, private, censorship-resistant and open alternative look like? One that allows people to communicate, coordinate and transact freely.

## Background

### What WeChat provides to the end-user

Let's first look at some of the things that WeChat providers. It is a lot:

- **Messaging:** 1:1 and group chat. Text, as well as voice and video. Post gifs. Share location.
- **Group chat:** Limited to 500 people; above 100 people people need to verify with a bank account. Also has group video chat and QR code to join a group.
- **Timeline/Moments:** Post comments with attachments and have people like/comment on it.
- **Location Discovery:** See WeChat users that are nearby.
- **Profile:** Nickname and profile picture; can alias people.
- **"Broadcast" messages:** Send one message to many contacts, up to 200 people (spam limited).
- **Contacts:** Max 5000 contacts (people get around it with multiple accounts and sim cards).
- **App reach:** Many diferent web apps, extensions, native apps, etc. Scan QR code to access web app from phone.
- **Selective posting:** Decide who can view your posts and who can view your comments on other people's post.
- **Transact:** Send money gifts through red envelopes.
- **Transact:** Use WeChat pay to transfer money to friends and businesses; linked account with Alipay that is connected to your bank account.
- **Services:** Find taxis and get notifications; book flights, train tickets, hotels etc.
- **Mini apps:** API for all kinds of apps that allow you to provide services etc.
- **Picture in picture:** allowing you to have a video call while using the app.

And much more. Not going to through it all in detail, and there are probably many things I don't know about WeChat since I'm not a heavy user living in mainland China.

### How WeChat works - a toy model

This is an overly simplistic model of how WeChat works, but it is sufficient for our purposes. This general design applies to most traditional client-server apps today.

To sign up for account you need a phone number or equivalent. To get access to some features you need to verify your identity further, for example with official ID and/or bank account.

When you signup this creates an entry in the WeChat server, from now on treated as a black box. You authenticate with that box, and thats where you get your messages from. If you go online the app asks that box for messages you have received while you were offline. If you login from a different app your contacts and conversations are synced from that box.

The box gives you an account, it deals with routing to your contacts, it stores messages and attachments and gives access to mini apps that people have uploaded. For transacting money, there is a partnership with a different company that has a different box which talks to your bank account.

This is done in a such a way that they can support a billion users with the features above, no sweat.

Whoever controls that box can sees who you are talking with and what the content of those messages are. There is no end to end encryption. If WeChat/Tencent disagrees with you for some reason they can ban you. This means you can't interact with the box under that name anymore.

## What do we want?

We want something that is self-sovereign, private, censorship-resistant and open that allows individuals and groups of people to communicate and transact freely. To explore what this means in more detail, without getting lost in the weeds, we provide the following list of properties. A lot of these are tied together, and some fall out of the other requirements. Some of them stand in slight opposition to each other.

**Self-sovereignity identity**. Exercises authority within your own sphere. If you aren't harming anyone, you should be able to have an account and communicate with other people.

**Pseudonymity, and ideally total anonymity**. Not having your identity tied to your real name (e.g. through phone number, bank account, ID, etc). This allows people to act more freely without being overly worried about censorship and coercion in the real world. While total anonymity is even more desirable - especially to break multiple hops to a true-name action - real-world constraints sometimes makes this more challenging.

**Private and secure communication**. Your communication and who you transact with should be for your eyes only. This includes transactions (transfer of value) as a form of communication.

**Censorship-resistance**. Not being able to easily censor individuals on the platform. Both at an individual, group and collective level. Not having single points of failure that allow service to be disrupted.

**Decentralization**. Partly falls out of censorship-resistance and other properties. If infrastructure isn't decentralized it means there's a single point of failure that can be disrupted. This is more of a tool than a goal on its own, but it is an important tool.

**Built for mass adoption**. Includes scalabiltiy, UX (latency, reliability, bandwidth consumption, UI etc), and allowing for people to stick around. One way of doing this is to allow users to discover people they want to talk to.

**Scalability**. Infrastructure needs to support a lot of users to be a viabile alternative. Like, a billion of them (eventually).

**Fundamentals in place to support great user experience**. To be a viable alternative, aside from good UI and distribution, fundamentals such as latency, bandwidth usage, consistency etc must support great UX to be a viable alternative.

**Works for resource restricted devices, including smartphones**. Most people will use a smartphone to use this. This means it has to work well on them and similar devices, without becoming a second-class citizen where we ignore properties such as censorship-resistance and privacy. Some concession to reality will be necessary due to additional constraints, which leads us to...

**Adaptive nodes**. Nodes will have different capabilities, and perhaps at different times. To maintain a lot of the properties described here it is desirable if as many participants as possible are first-class citizens. If a phone is switching from a limited data plan to a WiFi network or from battery to AC power it can do more useful work, and so on. Likewise for a laptop with a lot of free disk space and spare compute power, etc.

**Sustainable**. If there's no centralized, top down ad-driven model, this means all the infrastructure has to be sustainable somehow. Since these are individual entitites, this means it has to be paid for. While altruistic modes and similar can be used, this likely requires some form of incentivization scheme for useful services provided in the network. Related: free rider problem.

**Spam resistant**. Relates to sustainability, scalability and built for mass adoption. Made more difficult by pseudonymous identity due to whitewashing attacks.

**Trust-minimized**. To know that properties are provided for and aren't compromised, various ways of minimizing trust requirements are useful. This also related to mass adoption and social cohesion. Examples include: open and audited protocols, open source, reproducible builds, etc. This also relates to how mini apps are provided for, since we may not know their source but want to be able to use them anyway.

**Open source**. Related to above, where we must be able to inspect the software to know that it functions as advertised and hasn't been compromised, e.g. by uploading private data to a third party.

Some of these are graded and a bit subtle, i.e.:
- Censorship resistance would ideally be able to absorb Internet shutdowns. This would require an extensive MANET/meshnet infrastructure, which while desirable, requires a lot of challenges to be overcome to be feasible.
- Privacy would ideally make all actions (optionally) totally anoymous, though this may incur undue costs on bandwidth and latency, which impacts user experience.
- Decentralization, certain topologies, such as DHTs, are efficient and quite decentralized but still have some centralized aspects, which makes it attackable in various ways. Ditto for blockchains compared with bearer instruments which requires some coordinating infrastructure, compared with naturally occuring assets such as precious metals.
- "Discover people" and striving for "total anonymity" might initially seem incompatible. The idea is to provide for sane defaults, and then allow people to decide how much information they want to disclose. This is the essence of privacy.
- Users often want *some* form of moderation to get a good user experience, which can be seen as a form of censorship. The idea to raise the bar on the basics, the fundamental infrastructure. If individuals or specific communities want certain moderation mechanisms, that is still a compatible requirement.

### Counterpoint 1

We could refute the above by saying that the design goals are undesirable. We want a system where people can censor others, and where everyone is tied to their real identity. Or we could say something like, freedom of speech is a general concept, and it doesn't apply to Internet companies, even if they provide a vital service. You can survive without it and you should've read the terms of service. This roughly charactericizes the mainstream view.

Additional factor here is the idea that a group of people know more about what's good for you then you do, so they are protecting you.

### Counterpoint 2

We could agree with all these design goals, but think they are too extreme in terms of their requirements. For example, we could operate as a non profit, take donations and volunteers, and then host the whole infrastructure ourselves. We could say we are in a friendly legislation, so we won't be a single point of failure. Since we are working on this and maybe even our designs are open, you can trust us and we'll provide service and infrastructure that gives you what you want without having to pay for it or solve all these complex decentralized computation and so on problems. If you don't trust us for some reason, you shouldn't use us regardless. Also, this is better than status quo. And we are more likely to survive by doing this, either by taking shortcuts or by being less ambituous in terms of scope.

## Principal components

There are many ways to skin a cat, but this is one way of breaking down the problem. We have a general direction with the properties listed above, together with some understanding of how WeChat works for the everday user. Now the question is, what infrastructure do we need to support this? How do we achieve the above properties, or at least get closer to them? We want to figure out the necessary building blocks, and one of doing this is to map out likely necessary components.

### Background: Ethereum and Web3 stack

It is worth noting that a lot of the required infrastructure has been developed, at least as concepts, in the original Ethereum / Web3 vision. In it there is Ethereum for consensus/compute/transact, storage through Swarm, and communication through Whisper. That said, the main focus has been on the Ethereum blockchain itself, and a lot of things have happened in the last 5y+ with respect to technology around privacy and scalabilty. It is worth revisiting things from a fresh point of view, with the WeChat alternative in mind as a clear use case.

### Account - self-sovereign identity and the perils of phone numbers

Starting from the most basic: what is an account and how do you get one? With most internet services today, WeChat and almost all popular messaging apps included, you need to signup with some centralized authority. Usually you also have to verify this with some data that ties this account to you as an individual. E.g. by requiring a phone number, which in most jurisdictions [^1] means giving out your real ID. This also means you can be banned from using the service by a somewhat arbitrary process, with no due process.

Now, we could argue these app providers can do what they want. And they are right, in a very narrow sense. As apps like WeChat (and Google) become general-purpose platforms, they become more and more ingrained in our everyday lives. They start to provide utilities that we absolutely require to work to go about our day, such as paying for food or transportation. This means we need higher standard than this.

Justifications for requiring phone numbers are usually centered around three claims:
1) Avoiding spam
2) Tying your account to your real name, for various reasons
3) Using as a commonly shared identifier as a social network discovery mechanism

Of course, many services require more than phone numbers. E.g. email, other forms of personal data such as voice recording, linking a bank account, and so on.

In contrast, a self-sovereign system would allow you to "create an account" completely on your own. This can easily be done with public key cryptograpy, and it also paves the way for end-to-end encryption to make your messages private.

The main issue with this that you need to get more creative about avoiding spam (e.g. through white washing attacks), and ideally there is some other form of social discovery mechanism.

Just having a public key as an account isn't enough though. If it goes through a central server, then nothing is stopping that server from arbitrarly blocking requests related to that public key. Of course, this also depends on how transparent such requests are. Fundamentally, lest we rely completely on goodwill, there needs to be multiple actors by which you can use the service. This naturally points to decentralization as a requirement. See counterpoint.

Even so, if the system is closed source we don't know what it is doing. Perhaps the app communicating is also uploading data to another place, or somehow making it possible to see who is who and act accordingly.

You might notice that just one simple property, self-sovereign identity, leads to a slew of other requirements and properties. You might also notice that WeChat is far from alone in this, even if their identity requirements might be a bit stringent than, say, Telegram. Their control aspects are also a bit more extreme, at least for someone with western sensibilities [^2].

Most user facing applications have similar issues, Google Apps/FB/Twitter etc. For popular tools that have this built in, we can look at git - which is truly decentralized and have keypair at the bottom. It is for a very specific technical domain, and even then people rely on Github. Key management is fairly difficult even for technical people, and for normal people even more so. Banks are generally far behind on this tech, relying on arcane procedures and special purpose hardware for 2FA. That's another big issue.

Let's shift gears a bit and talk about some other functional requirements.

### Routing - packets from A to B

In order to get a lot of the features WeChat provides, we need the ability to do three things: communicate, store data, and transact with people. We need a bit more than that, but let's focus on this for now.

To communicate with people, in the base case, we need to go from one phone to another phone that is separated by a large distance. This requires some form of routing. The most natural platform to build this on is the existing Internet, though not the only one. Most phones are resource restricted, and are only "on" for brief periods of time. This is needed to preserve battery and bandwidth. Additionally, Internet uses IPs as endpoints, which change as a phones move through space. NAT punching etc isn't always perfect either. This means we need a way to get a message from one public key to another, and through some intermediate nodes. We can think of these nodes as a form of service network. Similar to how a power grid works, or phone lines, or collection of ISPs.

One important property here is to ensure we don't end up in a situation like the centralized capture scenario above, something we've seen with centralized ISPs [^3] [^4] where they can choose which traffic is good and which is bad. We want to allow the use of different service nodes, just like if a restaurant gives you food poisioning you can go to the one next door and then the first one goes out of business after a while. And the circle of life continues.

We shouldn't be naive though, and think that this is something nodes are likely to do for free. They need to be adequately compensated for their services, in some of incentivization scheme. That can either be monetary, or as in the case of Bittorrent, more of a barter situation where you use game theory to coordinate with strangers [^5], and some form of reputation attached to it (for private trackers).

There are many ways of doing routing, and we won't go into too much technical detail here. Suffice to say is that you likely want both a structured and unstructured alternative, and that these comes with several trade-offs when it comes to efficiency, metadata protection, ability to incentivize, compatibility with existing topologies, and suitability for mobilephones (mostly offline, bandwidth restricted, not directly connectable). Expect more on this in a future article.

Some of these considerations naturally leads us into the storage and transaction components.

### Storage - available and persistant for later

If mobile phones are mostly offline, we need some way to store these messages so they can be retrieved when online again. The same goes for various kinds attachments as well, and for when people are switching devices. A user might control their timeline, but in the WeChat case that timeline is stored on Tencent's servers, and queried from there as well. This naturally needs to happen by some other service nodes. In the WeChat case, and for most IMs, the way these servers are paid for is through some indirect ad mechanism. The entity controlling these ads and so on is the same one as the one operating the servers for storage. A more direct model with different entities would see these services being compensated for their work.

We also need storage for attachments, mini-apps, as well as a way of understanding the current state of consensus when it comes to the compute/transact module. In the WeChat case, this state is completely handled by the bank institution or one of their partners, such as Alibaba. When it comes to bearer instruments like cash, no state needs to be kept as that's a direct exchange in the physical world. This isn't directly compatible with transfering value over a distance.

All of this state requires availability and persistance. It should be done in a trust minimized fashion and decentralized, which requires some form of incentivization for keeping data around. If it isn't, you are relying on social cohesion which breaks down at very large scales.

Since data will be spread out across multiple nodes, you need a way to sync data and transfer it in the network. As well as being able to add and query data from it. All of this requires a routing component.

To make it more censorship resistant it might be better to keep it as a general-purpose store, i.e. individuals don't need to know what they storing. Otherwise, you naturally end up in a situation where individual nodes can be pressured to not store certain content.

### Messaging - from me to you to all of us (not them)

This builds on top of routing, but it has a slightly different focus. The goal is to allow for individuals and groups to communicate in a private, secure and censorship-resistant manner.

It also needs to provide a decent interface to the end user, in terms of dealing seamlessly with offline messages, providing reliable and timely messaging.

In order to get closer to the ideal of total anonymity, it is useful to be able to hide metadata of who is talking to whom. This applies to both normal communication as well as for transactions. Ideally, no one but the parties involved can see who is taking part in a conversation. This can be achieved through various techniques such as mixnets, anonymous credentials, private information retrieval, and so on. Many of these techniques have a fundamental trade-off with latency and bandwidth, something that is a big concern for mobilephones. Being able to do some form of tuning, in an adaptive node manner, depending on your threat model and current capabilities is useful here.

The baseline here is pseudonymity, and having tools to allow individuals to "cut off" ties to their real world identity and transactions. People act different in different circles in the real world, and this should be mimicked online as well. Your company, family or government shouldn't be able to know what exactly you use your paycheck for, and who you are talking to.

### Compute - transact, contract and settle

The most immediate need here is transaction from A to B. Direct exchange. There is also a more indirect need for private lawmaking and contracting.

We talked about routing and storage and how they likely need to be incentivized to work properly. How are they going to be compensated? While this could in theory work via existing banking system and so on, this would be rather heavy. It'd also very likely require tying your identifier to your legal name, something that goes against what we want to achieve. What we want is something that acts more as right-to-access, similar to the way cash functions in a society [^6]. I pay for a fruit with something that is valuable to you and then I'm on my way.

While there might be other candidates, such as pre-paid debit cards and so on, this transaction mode pretty much requires a cryptocurrency component. The alternative is to do it on a reputation basis, which might work for small communities, due to social cohesion, but quickly detoriates for large ones [^7]. Ad hoc models like private Bittorrent trackers are centralized and easy to censor.

Now, none of the existing cryptocurrency models are ideal. They also all suffer from lack of widespread use, and it is difficult to get onboarded to them in the first place. Transactions in Bitcoin are slow. Ethereum is faster and has more capabilities, but it still suffers from linking payments over time, which makes the privacy part of this more difficult. Zcash, Monero and similar are interesting, but also require more use. For Zcash, shielded transactions appear to only account for less than 2% of all transactions in 2019 [^8] [^9].

Another dimension is what sets general purpose cryptocurrencies like Ethereum apart. Aside from just paying from A to B, you can encode rules about when something should be paid out and not. This is very useful for doing a form of private lawmaking, contracting, for setting up service agreements with these nodes. If there's no trivial recourse as in the meatspace world, where you know someone's name and you can sue them, you need a different kind of model.

What makes something like Zcash interesting is that it works more like digital cash. Instead of leaving a public trail for everyone, where someone can see where you got the initial money from and then trace you across various usage, for Zcash every hop is privacy preserving.

To fulfill the general goals of being censorship resistance and secure, it is also vital that the system being used stays online and can't be easily disrupted. That points to disintermediation, as opposed to using gateways and exchanges. This is a case where something like cash, or gold, is more direct, since no one can censor this transaction without being physically present where this direct exchange is taking place. However, like before, this doesn't work over distance.

### Secure chat - just our business

Similar to the messaging module above. The distinction here is that we assume the network part has already taken place. Here we are interested in keeping the contents of messages private, so that means confidentiality/end-to-end encryption, integrity, authentication, as well as forward secrecy and plausible deniability. This means that even if there's some actor that gets some private key material, or confiscated your phone, there is some level of...ephemerality to your conversations. Another issue here in terms of scalable private group chat.

### Extensible mini apps

This relates to the compute and storage module above. Essentially we want to provide mini apps as in WeChat, but to do so in a way that is compatible with what we want to achieve more generally. This allows individuals and small businesses to create small tools for various purposes, and coordinate with strangers. E.g. booking a cab or getting an insurance, and so on.

This has a higher dependency on the contracting/general computation aspect. I.e. often it isn't only a transaction, but you might want to encode some specific rules here that strangers can abide by without having too high trust requirements. As a simple example: escrows.

This also needs an open API that anyone can use. It should be properly secured, so using one doesn't compromise the rest of the system it is operating in. To be censorship resistant it requires the routing and storage component to work properly.

## Where are we now?

Let's look back at some of desirable properties we set out in the beginning and see how close we are to building out the necessary components. Is it realistic at all or just a pipe dream? We'll see that there are many building blocks in place, and there's reason for hope.

**Self-sovereignity identity**. Public key crypto and web of trust like constructs makes this possible.

**Pseudonymity, and ideally total anonymity**. Pseudonymity can largely be achieved with public key crypto and open systems that allow for permissionless participation. For transactions, pseudonymity exists in most cryptocurrencies. The challenge is linkage across time, especially when interfacing with other "legacy" system. There are stronger constructs that are actively being worked on and are promising here, such as mixnets (Nym), mixers (Wasabi Wallet, Tornado.Cash) and zero knowledge proofs (Zcash, Ethereum, Starkware). This area of applied research has exploded over the last few years.

**Private and secure communication**. Signal has pioneered a lot of this, following OTR. Double Ratchet, X3DH. E2EE is minimum these days, and properties like PFS and PD are getting better. For metadata protection, you have Tor, with its faults, and more active research on mixnets and private information retrieval, etc.

**Censorship-resistance**. This covers a lot of ground across the spectrum. You have technologies like Bittorrent, Bitcoin/Ethereum, Tor obfuscated transports, E2EE by default, partial mesh networks in production, abilit to move/replicate host machines more quickly have all made this more of a reality than it used to be. this easier. Of course, techniques such as deep packet inspection and internet shutdowns have increased.

**Decentralization**. Cryptocurrencies, projects like libp2p and IPFS. Need to be mindful here of many projects that claim decentralization but are still vulnerable to single points of failures, such as relying on gateways.

**Built for mass adoption**. This one is more subjective. There's definitely a lot of work to be done here, both when it comes to fundamental performance, key management and things like social discoverability. Directionally these things are improving and becoming easier for the average person but there is a lot ot be done here.

**Scalability**. With projects like Ethereum 2.0 and IPFS more and more resources are a being put into this, both at the consensus/compute layer as well as networking (gossip, scalable Kademlia) layer. Also various layer 2 solutions for transactions.

**Fundamentals in place to support great user experience**. Similar to built for mass adoption. As scalability becomes more important, more applied research is being done in the p2p area to improve things like latency, bandwidth.

**Works for resource restricted devices, including smartphones**. Work in progress and not enough focus here, generally an after thought. Also have stateless clients etc.

**Adaptive nodes**. See above. With subprotocols and capabilities in Ethereum and libp2p, this is getting easier.

**Sustainable**. Token economics is a thing. While a lot of it won't stay around, there are many more projects working on making themselves dispensable. Being open source, having an engaged community and enabling users run their own infrastructure. Users as stakeholders.

**Spam resistant**. Tricky problem if you want to be pseudonymous, but some signs of hope with incentivization mechanisms, zero knowledge based signaling, etc. Together with various forms of rate limiting and better controlling of topology and network amplification. And just generally being battle-tested by real world attacks, such as historical Ethereum DDoS attacks.

**Trust minimized**. Bitcoin. Zero knowledge provable computation. Open source. Reproducible builds. Signed binaries. Incentive compatible structures. Independent audits. Still a lot of work, but getting better.

**Open source**. Big and only getting bigger. Including mainstream companies.

## What's next?

We've look at what WeChat provides and what we'd like an alternative to look like. We've also seen a few principal modules that are necessary to achieve those goals. To achieve all of this is a daunting task, and one might call it overly ambitiuous. We've also seen how far we've come with some of the goals, and how a lot of the pieces are there, in one form or another. Then it is a question of putting them all together in the right mix.

The good news is that a lot of people are working all these building blocks and thinking about these problems. Compared to a few years ago we've come quite far when it comes to p2p infrastructure, privacy, security, scalability, and general developer mass and mindshare. If you want to join us in building some of these building blocks, and assembling them, check out our forum.

PS. We are [hiring protocol engineers](https://status.im/our_team/open_positions.html). DS

## Acknowledgements

Corey, Dean, Jacek.

## References

[^1]: Mandatory SIM card registration laws: https://privacyinternational.org/long-read/3018/timeline-sim-card-registration-laws

[^2]: On WeChat keyword censorship: https://citizenlab.ca/2016/11/wechat-china-censorship-one-app-two-systems/

[^3]: Net Neutrality: https://www.eff.org/issues/net-neutrality

[^4]: ISP centralization: https://ilsr.org/repealing-net-neutrality-puts-177-million-americans-at-risk/

[^5]: Incentives Build Robustness in BitTorrent bittorrent.org/bittorrentecon.pdf

[^6]: The Case for Electronic Cash:  https://coincenter.org/files/2019-02/the-case-for-electronic-cash-coin-center.pdf

[^7]: Money, blockchains, and social scalability: http://unenumerated.blogspot.com/2017/02/money-blockchains-and-social-scalability.html

[^8]: Zcash private transactions (partial paywall): https://www.theblockcrypto.com/genesis/48413/an-analysis-of-zcashs-private-transactions

[^9]: Shielded transactions usage (stats page 404s): https://z.cash/support/faq/
