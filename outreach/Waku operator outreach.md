# Waku operator outreach

We want to push for operators to run and maintain their own Waku v2 nodes, preferably contributing to the default Waku v2 network as described by the default pubsub topic (`/waku/2/default-waku/proto`). Amongst other things, a large fleet of stable operator-run Waku v2 nodes will help secure the network, provide valuable services to a variety of platforms and ensure the future sustainability of both Vac as a research organization and the Waku suite of protocols.

Possible motivations for operators to run their own Waku v2 node, include:
1. **own use** - platforms and other users of the Waku v2 network that want to contribute to its usability
2. **incentives** - financial incentives can be tied to the provision of various services through an operator-run node
3. **altruism** - operators who support our principles and want to contribute to a decentralized, censorship-resistant network

We want to focus on all three these motivations in our operator outreach program.

## The role of `nwaku`

We are targeting the `nwaku` (formerly `nim-waku`) client as the main option for operator-run nodes.
Specifically our aim is to provide through `nwaku`:
1. a lightweight and robust Waku v2 client. This client must be first in line to support innovative and new Waku v2 protocols, but configurable enough to serve the adaptive needs of various operators.
2. an easy-to-follow guide for operators to configure, set up and maintain their own nodes
3. a set of operator-focused tools to monitor and maintain a running node


## Metrics

To measure our progress in reaching out to operators, we want to collect metrics that indicate how the stable "backbone" of the network grows over time. This is not necessarily an easy task, as at any given time we expect a large number of ephemeral peers in the network making use of, but not providing any, services themselves.
Two metrics that may give an indication:
1. Growth in `total connections` over time as measured by the set of known bootstrap nodes (our own, and those provided by Status).
2. Current `total content topics` in use, which gives an indication of the number of applications using the network at a given time.

As we incorporate ambient peer discovery mechanisms into `nwaku`, these will provide us with a better measurement of total discoverable nodes in the network. This could even be combined with aliveness checks, to get an idea of the number of _active_ nodes participating over time.