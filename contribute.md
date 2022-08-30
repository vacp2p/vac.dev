# Contribute

## How to Contribute

Get in touch with us by
[joining our Discord](https://discord.gg/PQFdubGt6d),
[opening a thread in our forum](https://forum.vac.dev/),
or [opening issues / PRs on GitHub](https://github.com/vacp2p).

Also, see our [Current Job Openings](https://jobs.status.im/?search=Vac),
and the [Waku contribute page](https://waku.org/contribute).

## What to Contribute

We are interested in both research and code contributions.

For research contributions,
see our [open research problems page](https://vac.dev/open-problems),
or browse our [research areas](https://vac.dev/research-areas).

For code contributions, see our "good first issue" lists for various Vac related code bases:

* [nwaku](https://github.com/status-im/nwaku/labels/good%20first%20issue)
* [js-waku](https://github.com/status-im/js-waku/labels/good%20first%20issue)
* [go-waku](https://github.com/status-im/go-waku/labels/good%20first%20issue)
* [zerokit](https://github.com/vacp2p/zerokit/labels/good%20first%20issue)

# Contribute Pseudonymously

We welcome everyone to contribute to our projects by submitting an issue or a pull request to any of the repository hosted in our [Vac](https://github.com/vacp2p) GitHub page.

**We consider and encourage anonymous contributions!**

For this reason, we collect some advice on how to contribute pseudonymously to Vac.

## Setting-up a new Github account

Having a GitHub account will enormously simplify your contribution process,
since you will be able to open issues and PRs directly in the repository of your interest and interact with other contributors. 

We acknowledge that this implies that GitHub, in order to provide you its services,
needs to process some (potentially sensitive) information about you, like your IP address, e-mail address, browser configuration, cookies, and so on
(for a complete list see [here](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement#what-information-github-collects)).

To mitigate leakage of such potentially sensitive information, you might:

- use a [VPN](https://en.wikipedia.org/wiki/Virtual_private_network) or [TOR](https://www.torproject.org/);
- register a new dedicated e-mail address with a privacy-focused provider (e.g., [Proton](https://proton.me))
- register a new GitHub account with such dedicated e-mail address;
- eventually setup 2FA using hardware keys or an open source authenticator app that does not collect personal information
  (e.g., [andOTP](https://github.com/andOTP/andOTP) for Android and [Tofu](https://github.com/calleluks/Tofu) for iOS);
- generate a new and dedicated public key to sign commits with the newly created account;

Be aware of [device fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint)!
To mitigate this, you could:

- use a dedicated browser which minimizes fingerprint leakages (e.g., TOR browser);
- navigate from a dedicated live or virtual machine running an
  [open-source and privacy-oriented operating system](https://en.wikipedia.org/wiki/Security-focused_operating_system) (e.g., by using the [QEMU](https://github.com/qemu/qemu)/[KVM](https://www.linux-kvm.org) stack) 

## Contribute by e-mail

If you are not interested in setting up a dedicated GitHub account or you plan to contribute occasionally,
you can send us your commits in the form of [*mail patches*](https://git-scm.com/docs/git-format-patch).

After cloning the repository of your interest, remember to run

```
git config user.name "Anonymous"
git config user.email anonymous@example.com
```

to override the username and mail address used in local commits to the repository.

If you plan to contribute to a specific branch `<branch>`,
we suggest you to create and locally work on a new branch `<new_branch>` based on it, i.e. 

```
git checkout <branch>
git branch <new_branch>
git checkout <new_branch>
```

Once your local contribution is ready to be published, run

```
git format-patch <branch> -o <folder>
```

to store in `<folder>` all patch files corresponding to your commits that will update `<branch>` to the latest state of `<new_branch>`.

Once done, send us an email to **`contribute@vac.dev`** providing as
- object: the repository name you have worked on and the commit hash at the time of your local branch creation; 
- body message: a short description of your contribution; 
- attachments: all `.patch` files in `<folder>`.

Note that we automatically discard e-mails containing one or more attachments which do not have a `.patch` extension.

Once received, we will review your contribution and eventually create a pull request on your behalf.

#### E-Mail Encryption

Our `contribute@vac.dev` e-mail address is based on [Proton](https://proton.me) services.

When you write us from a (dedicated) Proton e-mail address, your messages and attachments will be [automatically](https://proton.me/support/how-to-use-pgp) end-to-end encrypted using PGP.

If you don't have a Proton e-mail address, you can directly encrypt the contents of your message using our PGP public key:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: ProtonMail

xjMEYwzUChYJKwYBBAHaRw8BAQdAzX1ufoJ+z6dUosOPOii9aEaYwhZNCWqU
wriQdMEAQljNJ2NvbnRyaWJ1dGVAdmFjLmRldiA8Y29udHJpYnV0ZUB2YWMu
ZGV2PsKPBBAWCgAgBQJjDNQKBgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEA
IQkQV6JpsiVjmGEWIQT7kJ5FSNOtNxLMjIlXommyJWOYYd9lAP9eqhdPrSKu
cTz9JVcSInzxQ0Wz8Amv49qw/GPjPzMbnQEA89XHuCga8kxcROqpHy4ujrKR
hH6xeGbWB7JEg7hyEAvOOARjDNQKEgorBgEEAZdVAQUBAQdA8NNP/jk+nu0P
UaXeF1Xy50rMLNXWgoJi/rdH3HQJDwQDAQgHwngEGBYIAAkFAmMM1AoCGwwA
IQkQV6JpsiVjmGEWIQT7kJ5FSNOtNxLMjIlXommyJWOYYeLzAQCCcjwoRrj2
wycds7sWIJAuHR2i/79O04teUN2/rjtOUwEAmOHTJtfY9kpMBnpyomYiDdVs
GiOytfFQQCDNkGE0RAo=
=SlIb
-----END PGP PUBLIC KEY BLOCK-----
```


This public key can be also downloaded [here](https://mail-api.proton.me/pks/lookup?op=get&search=contribute@vac.dev),
by using Proton public APIs.

Since a bad encryption will result in our impossibility to access your contribution,
we invite you to check the official documentation of your e-mail client or provider in order to correctly setup the appropriate PGP keys
and automate message encryption and decryption.
