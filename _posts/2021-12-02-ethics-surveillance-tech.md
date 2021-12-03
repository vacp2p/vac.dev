---
layout: post
name:  "Opinion: Pseudo-ethics in the Surveillance Tech Industry"
title:  "Opinion: Pseudo-ethics in the Surveillance Tech Industry"
date:   2021-12-02 10:00:00 +0200
author: circe
published: true
permalink: /ethics-surveillance-tech
categories: research
summary: A look at typical ethical shortfalls in the global surveillance tech industry.
image: /assets/img/vac.png
discuss:
---

_This is an opinion piece by pseudonymous contributor, circe._ 

## Preface

The Vac team aims to provide a public good in the form of freely available, open source tools and protocols for decentralized communication.
As such, we value our independence and the usefulness of our protocols for a wide range of applications.
At the same time, we realize that all technical development, including ours, has a moral component.
As a diverse team we are guided by a shared devotion to the principles of human rights and liberty.
This explains why we place such a high premium on security, censorship-resistance and privacy -
a stance we [share with the wider Status Network](https://our.status.im/our-principles/).
The post below takes a different approach from our usual more technical analyses,
by starting to peel back the curtain on the ethical shortfalls of the global surveillance tech industry.

## Spotlight on an industry

[Apple's announcement](https://www.apple.com/newsroom/2021/11/apple-sues-nso-group-to-curb-the-abuse-of-state-sponsored-spyware/) of their lawsuit against Israel's NSO Group
marks the latest in a series of recent setbacks for the surveillance tech company.
In early November, the [United States blacklisted the firm](https://public-inspection.federalregister.gov/2021-24123.pdf),
citing concerns about the use of their spyware by foreign governments targeting civilians such as "journalists, businesspeople, activists" and more.
The company is already [embroiled in a lawsuit with Whatsapp](https://www.reuters.com/article/us-facebook-cyber-whatsapp-nsogroup-idUSKBN1X82BE)
over their exploit of the chat app's video calling service to install malware on target devices.
NSO Group's most infamous product, [Pegasus](https://forbiddenstories.org/case/the-pegasus-project/), operates as a hidden exploit installed on victims' mobile phones,
sometimes without even requiring as much as an unguarded click on a malicious link.
It has the potential to lay bare, and report to its owners, _everything_ within the reach of the infected device.
For most people this amounts to a significant portion of their private lives and thoughts.
Pegasus can read your private messages (even encrypted), collect your passwords, record calls, track your location and access your device's microphone and camera.
No activity or application on an infected phone would be hidden.

The latest controversies are perhaps less because of the novelty of the revelations -
the existence of Pegasus has been known to civil activists [since at least 2016](https://www.bbc.com/news/technology-37192670).
Rather, the public was reminded again of the potential scope of surveillance tech
in the indiscriminate use of Pegasus on private citizens.
This has far-reaching implications for human freedoms worldwide.
Earlier this year, a [leaked list of over 50,000 targets](https://www.theguardian.com/world/2021/jul/18/revealed-leak-uncovers-global-abuse-of-cyber-surveillance-weapon-nso-group-pegasus), or possible targets, of Pegasus included
the phone numbers of human rights advocates, independent journalists, lawyers and political activists.
This should have come as no surprise.
The type of autocratically inclined agents, and governments, who would venture to buy and use such invasive cyber-arms often target those they find politically inconvenient.
Pegasus, and similar technologies, simply extend the reach and capacity of such individuals and governments -
no border or distance, no political rank or social advantage, no sanctity of profession or regard for dignity,
provide any indemnity from becoming a victim.
Your best hope is to remain uninteresting enough to escape consideration.

The NSO Group has, of course, denied allegations of culpability and questions the authenticity of the list.
At this stage, the latter is almost beside the point:
Amnesty International's cybersecurity team, Security Lab, _did_ find [forensic evidence of Pegasus](https://www.amnesty.org/en/latest/research/2021/07/forensic-methodology-report-how-to-catch-nso-groups-pegasus/#_ftn1) on the phones of several volunteers whose numbers appeared on the original list,
including those of journalists and human rights activists.
(Security Lab has since opened up their [infection finding tool](https://github.com/mvt-project/mvt) to the public.)
French intelligence has similarly [inspected and confirmed](https://www.theguardian.com/news/2021/aug/02/pegasus-spyware-found-on-journalists-phones-french-intelligence-confirms) infection of at least three devices belonging to journalists.
The phones of several people who were close to the Saudi-American journalist, Jamal Khashoggi, were [confirmed hacked](https://www.bbc.com/news/world-57891506)
both before and after Khashoggi's brutal murder at the Saudi embassy in Istanbul in 2018.
[More reports](https://www.theguardian.com/news/2021/sep/21/hungary-journalist-daniel-nemeth-phones-infected-with-nso-pegasus-spyware) of confirmed Pegasus hacks are still published with some regularity.
It is now an open secret that many authoritarian governments have bought Pegasus.
It's not difficult to extrapolate from existing reports and such clients' track records
what the potential injuries to human freedoms are that they can inflict with access to such a powerful cyberweapon.

## A typical response

[NSO's response](https://www.theguardian.com/news/2021/jul/18/response-from-nso-and-governments) to the allegations follows a textbook approach
of avoiding earnest ethical introspection on the manufacturing, and selling, of cyber-arms.
Firstly, shift ethical responsibility to a predetermined process, a list of checkboxes of your own making.
The Group, for example, claims to sell only to "vetted governments", following a classification process
of which they have now [published some procedural details](https://www.nsogroup.com/wp-content/uploads/2021/06/ReportBooklet.pdf) but no tangible criteria.
The next step is to reaffirm continuously, and repetitively, your dedication to the _legal_ combat against crime,
["legitimate law enforcement agencies"](https://www.nsogroup.com/wp-content/uploads/2021/06/ReportBooklet.pdf) (note the almost tautological phrasing),
adherence to international arms trade laws,
compliance clauses in customer contracts, etc.
Thirdly, having been absolved of any moral suspicions that might exist about product and process,
from conception to engineering to trade,
distance yourself from the consequences of its use in the world.
["NSO does not operate its technology, does not collect, nor possesses, nor has any access to any kind of data of its customers."](https://www.theguardian.com/news/2021/jul/18/response-from-nso-and-governments)
It is interesting that directly after this statement they claim with contradictory confidence that
their "technology was not associated in any way with the heinous murder of Jamal Khashoggi".
The unapologetic tone seems hardly appropriate when the same document confirms that the Group had to
shut down customers' systems due to "confirmed misuse" and have had to do so "multiple times" in the past.
Given all this, the response manages to evade any serious interrogation of the "vetting" process itself,
which forced the company to reject "approximately 15% of potential new opportunities for Pegasus" in one year.
Courageous.

We have heard this all before.
There exists a multi-billion dollar industry of private companies and engineering firms [thriving on proceeds](https://www.economist.com/business/2019/12/12/offering-software-for-snooping-to-governments-is-a-booming-business) from
selling surveillance tools and cyber-arms to dubious agencies and foreign governments.
In turn, the most power-hungry and oppressive regimes often _rely_ on such technological innovations -
for which they lack the in-country engineering expertise -
to maintain control, suppress uprisings, intimidate opposing journalists, and track their citizens.
It's a lucrative business opportunity, and resourceful companies have sprung up everywhere to supply this demand,
often in countries where citizens, including employees of the company, would be horrified if they were similarly subject to the oppressions of their own products.
When, in 2014, Italy's _HackingTeam_ were pulsed by the United Nations about their (then alleged) selling of spyware to Sudan,
which would have been a contravention of the UN's weapon export ban,
they simply replied that their product was not controlled as a weapon and therefore not subject to such scrutiny.
They remained within their legal bounds, technically.
Furthermore, they similarly shifted ethical responsibility to external standards of legitimacy,
claiming their ["software is not sold to governments that are blacklisted by the EU, the US, NATO, and similar international organizations"](https://citizenlab.ca/2014/02/mapping-hacking-teams-untraceable-spyware/).
When the company themselves were [hacked in 2015](https://www.wired.com/2015/07/hacking-team-breach-shows-global-spying-firm-run-amok/),
revelations (confirmations, that is) of widespread misuse by repressive governments were damaging enough to force them to disappear and rebrand as Memento Labs.
[Their website](https://www.mem3nt0.com/en/) boasts an impressive list of statutes, regulations, procedures, export controls and legal frameworks,
all of which the rebranded hackers proudly comply with.
Surely no further ethical scrutiny is necessary?

## Ethics != the law

### The law is trailing behind

Such recourse to the _legality_ of your action as ethical justification is moot for several reasons.
The first is glaringly obvious -
our laws are ill-equipped to address the implications of modern technology.
Legal systems are a cumbersome inheritance built over generations.
This is especially true of the statutes and regulations governing international trade, behind which these companies so often hide.
Our best legal systems are trailing miles behind the technology for which we seek guidelines.
Legislators are still struggling to make sense of technologies like face recognition,
the repercussions of smart devices acting "on their own" and biases in algorithms.
To claim you are performing ethical due diligence by resorting to an outdated and incomplete system of legal codes is disingenuous.

### The law depends on ethics

The second reason is more central to my argument,
and an important flaw in these sleight of hand justifications appearing from time to time in the media.
Ethics can in no way be confused as synonymous with legality or legitimacy.
These are incommensurable concepts.
In an ideal world, of course, the law is meant to track the minimum standards of ethical conduct in a society.
Laws are often drafted exactly from some ethical, and practical, impulse to minimize harmful conduct
and provide for corrective and punitive measures where transgressions do occur.
The law, however, has a much narrower scope than ethics.
It can be just or unjust.
In fact, it is in need of ethics to constantly reform.
Ethics and values are born out of collective self-reflection.
It develops in our conversation with ourselves and others about the type of society we strive for.
As such, an ethical worldview summarizes our deepest intuitions about how we should live and measure our impact on the world.
For this reason, ethics is primarily enforced by social and internal pressures, not legal boundaries -
our desire to do what _ought_ to be done, however we define that.
Ethics is therefore a much grander scheme than global legal systems
and the diplomatic frameworks that grants legitimacy to governments.
These are but one limited outflow of the human aspiration to form societies in accordance with our ideologies and ethics.

### International law is vague and exploitable

Of course, the cyber-arms trade has a favorite recourse, _international_ law, which is even more limited.
Since such products are seldomly sold to governments and agencies within the country of production,
it enables a further distancing from consequences.
Many private surveillance companies are based in fairly liberal societies with (seemingly) strict emphases on human rights in their domestic laws.
International laws are much more complicated - for opportunists a synonym for "more grey areas in which to hide".
Company conduct can now be governed, and excused, by a system that follows
the whims of autocrats with exploitative intent and vastly different ethical conceptions from the company's purported aims.
International law, and the ways it is most often enforced by way of, say, UN-backed sanctions,
have long been shaped by the compromises of international diplomacy.
To be blunt: these laws are weak and subject to exactly the sort of narrow interests behind which mercenaries have always hidden.
The surveillance tech industry is no exception.

## Conclusion

My point is simple:
selling cyber-arms with the potential to become vast tools of oppression to governments and bodies with blatant histories of human rights violations,
and all but the publicly announced intention to continue operating in this way,
is categorically unconscionable.
This seems obvious no matter what ethics system you argue from,
provided it harbors any consideration for human dignity and freedom.
It is a sign of poor moral discourse that such recourses to law and legitimacy are often considered synonymous with ethical justification.
"_I have acted within the bounds of law_", _"We supply only to legitimate law enforcement agencies"_, etc. are no substitutes.
Ethical conduct requires an honest evaluation of an action against some conception of "the good",
however you define that.
Too often the surveillance tech industry precisely sidesteps this question,
both in internal processes and external rationalisations to a concerned public.

John Locke, he of the life-liberty-and-property, articulated the idea that government exists solely through the consent of the governed.
Towards the end of the 17th century, he wrote in his _Second Treatise on Civil Government_,
"[w]henever legislators endeavor to take away,
and destroy the property of the people, or to reduce them to slavery under arbitrary power,
they put themselves in a state of war with the people, who are thereupon absolved from any further obedience".
The inference is straightforward and humanist in essence:
legitimacy is not something that is conferred by governments and institutions.
Rather, they derive their legitimacy from us, their citizens, holding them to standards of ethics and societal ideals.
This legitimacy only remains in tact as long as this mandate is honored and continuously extended by a well-informed public.
This is the principle of informed consent on which all reciprocal ethics is based.

The surveillance tech industry may well have nothing more or less noble in mind than profit-making within legal bounds
when developing and selling their products.
However, when such companies are revealed again and again to have supplied tools of gross human rights violations to known human rights violators,
they will do well to remember that ethics always _precedes_ requirements of legality and legitimacy.
It is a fallacy to take normative guidance from the concept of "legitimacy"
if the concept itself depends on such normative guidelines for definition.
Without examining the ethical standards by which institutions, governments, and laws, were created,
no value-judgements about their legitimacy can be made.
Hiding behind legal compliance as substitute for moral justification is not enough.
Targets of increasingly invasive governmental snooping are too often chosen precisely to suppress the mechanisms from which the legitimacy of such governments flow -
the consent of ordinary civilians.
Free and fair elections, free speech, free media, freedom of thought are all at risk.


## References

- [Status Principles](https://our.status.im/our-principles/)
- [Federal Register: Addition of Certain Entities to the Entity List](https://public-inspection.federalregister.gov/2021-24123.pdf)
- [forbiddenstories.org: The Pegasus Project](https://forbiddenstories.org/case/the-pegasus-project/)
- [theguardian.com: The Pegasus Project](https://www.theguardian.com/news/series/pegasus-project)
- [amnesty.org Forensic Methodology Report: How to catch NSO Group’s Pegasus](https://www.amnesty.org/en/latest/research/2021/07/forensic-methodology-report-how-to-catch-nso-groups-pegasus/#_ftn1)
- [Apple sues NSO Group to curb the abuse of state-sponsored spyware](https://www.apple.com/newsroom/2021/11/apple-sues-nso-group-to-curb-the-abuse-of-state-sponsored-spyware/)
- [bbc.com: Who are the hackers who cracked the iPhone?](https://www.bbc.com/news/technology-37192670)
- [bbc.com: Pegasus: Who are the alleged victims of spyware targeting?](https://www.bbc.com/news/world-57891506)
- [citizenlab.ca: Mapping Hacking Team’s “Untraceable” Spyware](https://citizenlab.ca/2014/02/mapping-hacking-teams-untraceable-spyware/)
- [economist.com: Offering software for snooping to governments is a booming business](https://www.economist.com/business/2019/12/12/offering-software-for-snooping-to-governments-is-a-booming-business)
- [Memento Labs](https://www.mem3nt0.com/en/)
- [Mobile Verification Toolkit to identify compromised devices](https://github.com/mvt-project/mvt)
- [NSO Group: Transparency and Responsibility Report 2021](https://www.nsogroup.com/wp-content/uploads/2021/06/ReportBooklet.pdf)
- [reuters.com: WhatsApp sues Israel's NSO for allegedly helping spies hack phones around the world](https://www.reuters.com/article/us-facebook-cyber-whatsapp-nsogroup-idUSKBN1X82BE)
- [wired.com: Hacking Team Breach Shows a Global Spying Firm Run Amok](https://www.wired.com/2015/07/hacking-team-breach-shows-global-spying-firm-run-amok/)
