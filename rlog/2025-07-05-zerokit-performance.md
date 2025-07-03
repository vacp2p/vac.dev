---
title: 'Zerokit optimizations: A performance journey'
date: 2025-07-05 18:30:00
authors: BenPH
published: false
slug: 2025-zerokit-perf
categories: research


toc_min_heading_level: 2
toc_max_heading_level: 5
---

[Zerokit](https://github.com/vacp2p/zerokit/) is a toolkit
providing powerful zero-knowledge utilities, including a
means to answer the question "How do you prevent spam when
every message is anonymous?". Its use of the Merkle hash
tree, combined Poseidon hasher are keys to the answer we
seek here, and with other questions that ask the improbable.
These technologies, however, can take a heavy toll on
resources if not used correctly. What follows is a window
into the efforts made to squeeze out optimizations, and
culling of redundant resource use. A story of cripplingly
slow performance meets engineering talent, we arrive at a
place where Zerokit comes through, fast and efficient, ready
to face the world.

## Background

Our friends over at [Waku](https://free.technology/waku) are
particularly enthusiastic about anonymous spam prevention
technologies. They have been using the Rate Limiting
Nullifier ([RLN](https://crates.io/crates/rln)) tooling that
Zerokit provides to enforce a message-rate policy among
users—a crucial feature unless we want a community bombarded
with "totally legit, not scams" messages on repeat. However,
as is often the case with new technology, some problematic
delays began to surface. Node recalculations, a common
operation, were taking tens of seconds at the scales being
tested and deployed—even exceeding 40 seconds at times.
These delays accumulate, leading to total delays on the
order of three hours under certain conditions.

Naturally, we couldn't just let this sit. While we've
touched on the issue of spam prevention, it's important to
recognize that this technology is foundational that
challenges conventional wisdom on how things must be done.
Does the idea of "smart contracts without gas" catch your
attention? Don't hold your breath just yet: the really
interesting applications of this tech will be dead in the
water, unless we can meet the challenge put to us.

## The Challenge

The plan of attack that the team put together was twofold:
get rid of redundant operations and data taking up precious
resources, and make the remaining operations go
[*Blazingly Fast™*.](https://old.reddit.com/r/rust/comments/1avf1d8/blazingly_fast_memory_vulnerabilities_written_in/)

Introducing the the star of the show for part 1: The main
point of having this tree is to generate proofs so that
peers can verify the claims being made. That doesn’t require
the whole Merkle tree, just a single path, from leaf to
root. The engineering work took us in a direction where
these paths were the primary context in which ZK proofs
operated, relegating the tree itself to an off-network
reference. This reduced the burden imposed on the network
significantly. Updating the data on the tree has similarly
reduced, with the exception being that the siblings of each
node were retained. This is called the **Stateless**
approach.

Well, stateless in the context of proof generation and
verification. This is the critical context when it comes to
performance, and the stateless approach does a great job,
but these proofs have to come from *somewhere*. Each
participant still needs to maintain the Merkle tree in their
local environment. Without this tree, one cannot generate
proofs or verify the proofs provided to them. Fortunately,
one does not need to track the entire tree, but can be
limited to a subset of the tree needed. With millions of
participants on-chain, this can make the difference needed
to make Zerokit empowered technologies accessible to those
running raspberry Pis. Combine this with the fact that the
heavy lifting operations of proof gen/verification being
modular and separate, each participant can optimise to run
things according to the strengths and requirements of their
native hardware, easing the way to allow each participants
to run their tree implementation at the speed of
mach-ludicrous.

Fortunately, the core of our already existing implementation
was sane and well put together. Double-lucky for us, the
talents of newly minted VAC/ACZ team member Sylvain were
readily available. With a solid background in the Rust
programming language, and having graduated from the most
challenging parts of its infamous learning curve, Sylvain
was able to zero in on some subtle performance pathologies.
Something as simple as using a mutable iterator to change
values directly. Clever use of references to avoid copying
data, and other memory optimization techniques that can be
hidden to those that cannot “see the matrix” when working in
Rust lead to very promising bench-marking results.

## The importance of benchmarks

No performance project is complete without high quality
benchmark data. Writing a quick benchmark for tracking
improvements through development is one thing, but having a
system of telemetry that allows you to credibly assert
claims of superior performance is what completes the
project. With such credible claims in hand, these efforts
can bring about significant impact on the field at large.
The key word being **credible**. Credibility cannot depend
on “trust me bro” (obviously). The truth of these claims
must come out of the directed efforts of a multitude of
thought-disciplines. The engineer must have a solid model to
understand the nature of the system. The statistician sets
the quality standards of the data. The Scientist must
diligently put relevant hypothesis to the test. The advocate
must see that the reports made reach out to where it makes
the most impact, the list goes on. Much of this is out of
scope for this article, and so I will treat you with
[a link](https://www.youtube.com/watch?v=qUN4Tln608Q&list=PLtoQeavghzr3nlXyJEXaTLU9Ca0DXWMnt).
Here’s your chance to see a hardcore OS engineer at the top
of their chosen field speak on the subject of their passion.

All this is to say we are not the only team implementing
Merkle tree tech, which also includes the Poseidon hash
function it needs. In order to be a premier research
destination, key aspect of why VAC exists, the fruits of our
labor is just the beginning. We must prove the merit of our
efforts through comparative benchmarks that satisfies the
skeptics and decision makers.

Comparative benchmarks are among the most high-stakes
element of performance critical projects. Get it right, and
quality research output can become industry standard
technology. Get it wrong, and be ready to lose the trust the
field has in you as your precious R&D fades into obscurity.

For the time being, our comparative benchmarks have been
used internally to inform decision-makers. As benchmarks
become standardised, independently verified and executed,
this initial effort may be the first of many steps to a
community-wide ecosystem. A thunderdome of benchmarks,
leaving us with a single champion that cannot be denied, but
which technology will claim this mantle? May the bits be
_ever_ in your favor...

## Benchmarking with Rusts `criterion` Crate

Rust, much like Nim, offers unadulterated, fine-grained, and
direct control over performance, but with Rust, this control
is even more immediate. With its sophisticated ownership
model, powerful type system, and comprehensive tooling, Rust
has earned an unrivaled reputation for enabling "fearless
concurrency," ease of refactoring, and providing tooling
that effectively "pair programs with you" to help avoid
common pitfalls, includeing those of the performance
veriety.

The [Criterion](https://crates.io/crates/criterion) crate is
considered the go-to library for micro-benchmarking within
the Rust ecosystem, and is generally regarded as an
invaluable tool for obtaining high-quality telemetry.
Through its ergonomic idioms and well-thought-out API,
writing high-quality benchmarks becomes straightforward once
you become familiar with its features. Criterion helps avoid
common traps such as inappropriate compiler optimizations,
improper performance sampling, and failing to prune
telemetry overhead. As is typical for the Rust ecosystem,
the documentation is thorough, leaving little to be desired,
and the examples are extensive, making the initial learning
process a pleasant experience.

Most importantly, it automatically generates tables and
graphs from this data, making the crucial task of analysis
straightforward and accessible. At this point, we are ready
to appreciate the results of our efforts.

## Promising results

When it comes to Merkle trees, we have two elements to
consider: The tree itself, and the hashing function that is
plugged into it. In the benchmarks we put together for the
benefit of internal processes, we put our implementation up
against a corresponding FOSS implementation. Scenarios were
developed to isolate key performance telemetry, obtain a
statistically usable sampling, with the resulting data
rendered into a human readable form that can be read with a
reasonable degree of confidence: enjoy! The brief summary:
It appears that our in house implementation consistently
outperforms others, and we’ve decided to continue committing
to the R&D of our in-house implementations. Congratulations
to the Zerokit team for this accomplishment.

Despite the promising results, these “micro-benchmarks” form
just some of the many pieces of the whole system performance
when it comes to product needs. How the system performs as a
whole is all that matters. This is a promising on it’s own,
but watching the performance benefits being realized in the
wild is the true goal.

Which brings us back to what started all this: Waku came to
us with concerns about performance issues within Zerokit
limiting the scope and scale in which it can be used. The
engineering talent brought to bear on this issue has
successfully achieved the performance goals needed, and the
results of these effort have demonstrated there is merit in
continuing our commitment to this project.

## Conclusion

We’ve covered a story that starts with crippling performance
bottlenecks in Waku, and ends on this high-note: The
problematic performance scaling issues are no more, and in
the process of resolving this critical pain-point, we have
established internal benchmarks that allow us to confidently
state that what we are doing, we are doing well. These
accomplishments come down to a solid team effort. The open
communication coming in from Waku, the talented engineers
working together to bring their skills and contributions to
bear, the community developed tools and prior works that
allowed it all to happen, and those working quietly in the
background providing the leadership, resources, and
coordination needed to bring this all together. Two VAC/ACZ
engineers in particular call for specific mention:
[Ekatrina](https://github.com/seemenkina) for her role in
taking lead in the R&D of the Zerokit ecosystem, and
[Sylvain](https://github.com/sydhds) for his efforts in
squeezing out some impressive optimizations.

Perhaps you want to get involved! Maybe you have some ideas
about what the community needs for standard benchmarks.
Would you like to see another implementation added to the
thunderdome?
[Raise an issue](https://github.com/vacp2p/zerokit/issues/new),
or join us on [our forum](https://forum.vac.dev/). We look
forward to seeing your voice added.

This is just one story, coming out of one relatively small
project from VAC research. The two driving directives of the
team is to be a conduit of expertise within IFT, and to be a
premier research destination within the domains we work in.
You might be independent of IFT with an interest in what we
do, an IFT core contributor, or anything in between: our
services are at your disposal. Join us on discord to start
the conversation, email one of our team members, or maybe
you might hear a knock on your door, should something in
your field of work catch our interest.
