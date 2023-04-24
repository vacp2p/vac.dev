---
layout: post
name:  "Device Pairing in Js-waku and Go-waku"
title:  "Device Pairing in Js-waku and Go-waku"
date:   2023-04-24 12:00:00
author: rramos
published: true
permalink: /device-pairing-in-js-waku-and-go-waku
categories: platform
summary: Device pairing and secure message exchange using Waku and noise protocol
---


# Device Pairing in Js-waku and Go-waku

As the world becomes increasingly connected through the internet, the need for secure and reliable communication becomes paramount. In [this article](https://vac.dev/wakuv2-noise) it is described how the Noise protocol can be used as a key-exchange mechanism for Waku.

Recently, this feature was introduced in [js-waku](https://github.com/waku-org/js-noise) and [go-waku](https://github.com/waku-org/go-waku), providing a simple API for developers to implement secure communication protocols using the Noise Protocol framework. These open-source libraries provide a solid foundation for building secure and decentralized applications that prioritize data privacy and security.

This functionality is designed to be simple and easy to use, even for developers who are not experts in cryptography. The library offers a clear and concise API that abstracts away the complexity of the Noise Protocol framework and provides an straightforward interface for developers to use. Using this, developers can effortlessly implement secure communication protocols on top of their JavaScript and Go applications, without having to worry about the low-level details of cryptography.

One of the key benefits of using Noise is that it provides end-to-end encryption, which means that the communication between two parties is encrypted from start to finish. This is essential for ensuring the security and privacy of sensitive information

### Device Pairing

In today's digital world, device pairing has become an integral part of our lives. Whether it's connecting our smartphones with other computers or web applications, the need for secure device pairing has become more crucial than ever. With the increasing threat of cyber-attacks and data breaches, it's essential to implement secure protocols for device pairing to ensure data privacy and prevent unauthorized access. 

To demonstrate how device pairing can be achieved using Waku and Noise, we have examples available at https://examples.waku.org/noise-js/. You can try pairing different devices, such as mobile and desktop, via a web application. This can be done by scanning a QR code or opening a URL that contains the necessary data for a secure handshake.

The process works as follows:

Actors:
    a.  Alice the initiator
    b.  Bob the responder
    
1. The first step in achieving secure device pairing using Noise and Waku is for Bob generate the pairing information which could be transmitted out-of-band. For this, Bob opens https://examples.waku.org/noise-js/ and a QR code is generated, containing the data required to do the handshake. This pairing QR code is timeboxed, meaning that after 2 minutes, it will become invalid and a new QR code must be generated
2. Alice scans the QR code using a mobile phone. This will open the app with the QR code parameters initiating the handshake process which is described in [43/WAKU2-DEVICE-PAIRING](https://rfc.vac.dev/spec/43/#protocol-flow). These messages are exchanged between two devices over Waku to establish a secure connection. The handshake messages consist of three main parts: the initiator's message, the responder's message, and the final message, which are exchanged to establish a secure connection. While using js-noise, the developer is abstracted of this process, since the messaging happens automatically depending on the actions performed by the actors in the pairing process.
3. Both Alice and Bob will be asked to verify each other's identity. This is done by confirming if an 8-digits authorization code match in both devices. If both actors confirm that the authorization code is valid, the handshake concludes succesfully
4. Alice and Bob receive a set of shared keys that can be used to start exchanging encrypted messages. The shared secret keys generated during the handshake process are used to encrypt and decrypt messages sent between the devices. This ensures that the messages exchanged between the devices are secure and cannot be intercepted or modified by an attacker.

The above example demonstrates device pairing using js-waku. Additionally, You can also try building and experimenting with other noise implementations like nwaku, or go-waku, with an example available at https://github.com/waku-org/go-waku/tree/master/examples/noise in which the same flow described before is done with Bob (the receiver) using go-waku instead of js-waku.

### Conclusion
With its easy to use API built on top of the Noise Protocol framework and the LibP2P networking stack, if you are a developer looking to implement secure messaging in their applications that are both decentralized and censorship resistant, Waku is definitely an excellent choice worth checking out!

Waku is also Open source with a MIT and APACHEv2 licenses, which means that developers are encouraged to contribute code, report bugs, and suggest improvements to make it even better.

Don't hesitate to try the live example at https://examples.waku.org/noise-js and build your own webapp using https://github.com/waku-org/js-noise, https://github.com/waku-org/js-waku and  https://github.com/waku-org/go-waku. This will give you a hands-on experience of implementing secure communication protocols using the Noise Protocol framework in a practical setting. Happy coding!

### References
- [Noise handshakes as key-exchange mechanism for Waku](https://vac.dev/wakuv2-noise)
- [Noise Protocols for Waku Payload Encryption](https://rfc.vac.dev/spec/35/)
- [Session Management for Waku Noise](https://rfc.vac.dev/spec/37/)
- [Device pairing and secure transfers with Noise](https://rfc.vac.dev/spec/43/)
- [go-waku Noise's example](https://github.com/waku-org/go-waku/tree/master/examples/noise)
- [js-waku Noise's example](https://github.com/waku-org/js-waku-examples/tree/master/examples/noise-js)
- [js-noise](https://github.com/waku-org/js-noise/)
- [go-noise](https://github.com/waku-org/js-noise/)
