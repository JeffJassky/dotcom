FEATURED: true
TAGS: NodeJS, AWS, Backbone/Marionette, DRM Video, Load Testing, Payment Processing
YEAR: 2017
HOVER_VIDEO: /video/mayweather-vs-mcgregor.mov

![Mayweather vs McGregor promotional banner](/img/1320x560-e6cefd6016.jpg)

# **When 4.6 Million People Press Play at the Same Time**

### Mayweather vs McGregor PPV (2017)

We built the Pay-Per-View streaming service for the biggest boxing match in history. 4.6 million purchases. $600 million in revenue. And when the fight started, the system didn't flinch - because we'd spent weeks attacking it ourselves.

→ [Showtime PPV](https://showtimeppv.com/)

---

## The Event

August 26, 2017. Floyd Mayweather Jr. vs Conor McGregor. A boxing legend against an MMA champion crossing over. The trash talk had been building for months. The media coverage was inescapable.

Showtime had the broadcast rights. They needed a streaming PPV service that could handle what everyone knew was coming: millions of people, all pressing play at the exact same moment.

The traditional PPV model - cable boxes and satellite - could handle the load because it's broadcast. One signal, many receivers. Streaming is the opposite. Every viewer is a separate connection, a separate video stream, a separate authentication check. Millions of simultaneous one-to-one relationships with your servers.

We had a few months to build it.

---

## Standing on Three Years of Work

This wasn't starting from zero. The PPV service was built on infrastructure my team had spent years constructing.

Since 2014, we'd rebuilt Showtime's entire streaming platform from Flash to HTML5 - a page-by-page reconstruction that improved load times by 5x and navigation by 10x. When Google announced Flash deprecation, we migrated the video player to native HTML5 with cross-browser DRM support using Google's Shaka Player.

That work had solved the hard problems:

- **DRM across every platform** - Apple's FairPlay, Google's Widevine, Microsoft's PlayReady. Each browser has its own proprietary encryption, and we'd already built abstractions that handled all of them.
- **The video player itself** - Custom-skinned, quality-adaptive, with multiple audio tracks and closed captioning.
- **The streaming architecture** - CDN distribution, adaptive bitrate, failover handling.

For PPV, we needed to add payment processing, a new purchase flow, and authentication that could handle the spike. The video delivery infrastructure was already battle-tested.

---

## The Scale Problem

Subscription streaming has predictable load patterns. People watch TV in the evening, traffic ramps up gradually, peaks around 9pm, tapers off. You can scale for it.

PPV is a cliff. Zero viewers, then millions, all at once. The fight was scheduled for 9pm Pacific. At 8:59pm, the system would be idle. At 9:01pm, every single customer who'd paid $99.95 would be demanding their stream simultaneously.

The failure modes were everywhere:

- **Authentication** - 4 million login checks in 60 seconds
- **Payment verification** - Confirming every purchase is valid before granting access
- **Stream initialization** - DRM license requests, CDN routing, bitrate negotiation
- **Concurrent connections** - Raw socket and bandwidth capacity

Any one of these bottlenecks would mean millions of angry customers, a flood of refunds, and a PR disaster during the most-watched boxing match in history.

---

## Building Our Own Attack Tool

You can't test for 4 million simultaneous users with normal load testing tools. The scale is too large, and the pattern is too specific. We needed to simulate the exact spike we'd face on fight night.

So we built custom load testing software that could effectively DDOS our own infrastructure on command.

The tool could:

- **Spawn millions of synthetic users** across distributed nodes
- **Simulate the full user journey** - authentication, payment verification, stream initialization
- **Hit specific endpoints** with configurable request patterns
- **Ramp instantly** to simulate the fight-start cliff, not gradual scaling
- **Monitor everything** - response times, error rates, resource utilization, bottleneck identification

We ran these attacks repeatedly. Find a bottleneck, optimize the code, run again. The database query that took 50ms at normal load but 2 seconds under spike? Fixed. The authentication service that started dropping requests at 100k concurrent? Horizontally scaled and retested. The CDN configuration that couldn't handle the initial burst? Reconfigured with edge caching.

Every time the system broke, we fixed it and attacked again. By fight night, we'd already seen every failure mode and eliminated it.

---

## The Architecture

**Frontend:** Backbone/Marionette single-page application - the same foundation we'd built for Showtime Anytime, extended with purchase flows and PPV-specific UI.

**API:** Node.js services on auto-scaling AWS infrastructure. Stateless design so any instance could handle any request, with load balancers distributing traffic.

**Video:** HTML5 player with multi-DRM support (Widevine, FairPlay, PlayReady), adaptive bitrate streaming, CDN-distributed delivery.

**Payments:** Recurly for credit card processing, with our own verification layer to handle the volume and confirm purchases before granting stream access.

**Clients:** Web, iOS, Apple TV, Android - all hitting the same API, all needing to handle the same authentication and playback flow.

---

## Fight Night

The fight started. 4.6 million paying customers hit play.

The dashboards showed exactly what we expected. Traffic spiked vertically. Authentication requests flooded in. Streams initialized. The auto-scaling kicked in, spinning up capacity. Response times stayed flat.

Nothing broke.

Stephen Espinoza, EVP and General Manager of Showtime Sports, later reported that the fight "generated four times the number of streaming buys than we projected" and that "overall, the streaming was a high point."

Four times projections. And the system handled it without drama because we'd already stress-tested beyond that level.

---

## The Boring Victory

There's no war story here. No 3am panic, no emergency hotfix, no moment where everything almost fell apart. The fight happened, the streams played, the money processed.

That's the point.

When you spend weeks attacking your own system, finding every weakness, fixing every bottleneck - the actual event is anticlimactic. You've already seen the failure modes. You've already fixed them. The real work happened in the load testing, not on fight night.

The most successful launches are the boring ones.

---

## What I Learned

**Test at real scale or don't bother.** Load testing at 10% of expected traffic tells you nothing about what happens at 100%. We built tools specifically to hit the actual numbers we'd face. That investment paid for itself completely.

**Foundational work compounds.** The PPV service was possible because we'd spent three years rebuilding Showtime's streaming infrastructure. When the high-stakes project arrived, we weren't starting from scratch - we were extending proven systems.

**Spiky traffic is a different problem than high traffic.** Gradual load lets you scale reactively. Instant load requires you to be pre-scaled, pre-warmed, and pre-tested. The shape of the traffic matters as much as the volume.

---

## Technical Details

**Frontend:** Backbone/Marionette, custom HTML5 video player with Shaka

**Backend:** Node.js API on AWS (EC2 auto-scaling groups, ELB, ElastiCache)

**Video:** Multi-DRM (Widevine, FairPlay, PlayReady), adaptive bitrate, CDN-distributed

**Payments:** Recurly integration, custom verification layer

**Clients:** Web, iOS, Apple TV, Android

**Testing:** Custom distributed load testing framework, synthetic user simulation, automated bottleneck detection

**Scale:** 4.6 million purchases, $600 million revenue, 4x projected streaming volume
