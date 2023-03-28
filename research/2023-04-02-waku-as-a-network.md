

We are getting Waku ready for production
focus is on the Status Communities use case.

We are looking at DOS protection that would work now for Status Communities.

RLN is still the go to DOS protection because it is privacy preserving, and censorship resistant.

There is more work to be done on RLN and we are glad it is a [collaborative effort with PSE (Privacy & Scaling Explorations)](https://twitter.com/CPerezz19/status/1640373940634939394?s=20)

We are starting to see how heterogeneous the Waku network would be

As previously mentioned in this [forum post](https://forum.vac.dev/t/waku-payment-models/166/3), the Waku protocol incentivization model needs to be flexible.
Flexible meaning that it needs to enable several business models.
so that projects can decide how they want to use Waku depending on their own business model.

Stepping back about incentivization.

this terminology asks the question "how can we incentivize operators to run node"

I would like to reverse the question and instead ask "How do we pay for the infrastructure"

There is no such thing as a free lunch and WAku does not intend to change this.

Ethereum's infrastructure is supported by transaction fee. Users pay for each transaction they push on the network.

This models does not suite a communication network. Users and platforms would not pay for every single message they send.
It also does not fit for other reasons as Waku aims to support instant ephemeral messages, there is no consensus involved
or long storage needed.

Projects that wishes to use Waku, to enable interaction between their users, whether it's for chat messages, gaming,
zero-knowledge smart contract enabling privacy on defi, notification or inter-wallet communication.
May have different model on how they receive value from their users.
Maybe some users are service provider for the project and expect to receive value by running node,
or maybe all users pay for the product, or maybe users run the infra as they use the product.

Waku aims to enable each of this use cases. Which means that there will be various way to "pay for the infrastructure"

In this talk, Oskar addressed two strategies: RLN and service credentials.

RLN enables DOS protection across the network in a privacy preserving and permission less manner: stake in a contract,
you can now send messages.

Service credentials enables a customer-provider relationship. Maybe each user will pay to have messages they are
interested in stored and served by this provider.
Or possibly, a _community owner_ could be paying a service provider to host their community.

Providers, could provide trial or free limited services to Waku users. Similar to Slack or Discord.
Once a trial is outgrown, a community owner could pay a la Slack to have more storage or bandwidth available.
Or individual useres could financially chip in a la Discord Server Boost, or by sharing their own resources to the community.

We expect to witness the two end of the spectrum: from users that share resources to users that pay for access to the network and
maybe scenario in between.

Another way to think about it is to wonder whether the Waku network will be more like Ethereum or Cosmos.
We want Waku to be decentralized so it can provide censorship resistance and privacy preserving communication.
If each application have to deploy their own network, then we will not achieve this goal. Which is why we are aiming more for a decentralized network a la Ethereum.
However, the fee model is different and varied, and hence we are likely to see a mix: Separate gossipsub networks with different funding models.
Yet, there is no consensus on Waku, meaning that each individual operator will be able to decide what network they will support, allowing Waku to retain a permission-less property. 

The Waku network will be heteregeneous and node operators will be able to choose which model they prefer to support.

The flow of messages in the waku network will be split to enables scalability: not every node of the network can be expected
to forward every messages of the network.
This will be enabled by discovery protocols that allows users to find the right node to receive the messages they are interested in.

I also see marketplace protocol being developed, to help operators understand how they can best support the network,
where would their resources be most needed. We are far away from a marketplace for operators.

What defines the "Waku Network" will most likely change over time.
In the near future, it will move from a single gossipsub network to a sharded set of networks brought together
by a common discovery layer.
