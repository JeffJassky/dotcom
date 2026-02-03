FEATURED: true
TAGS: Hardware, Software, Product Design, Startup, ElectronJS, React Native, AWS, IoT
YEAR: 2017-2021

![Aura Mirror on stand with ring light glowing](/img/aura-mirror-stand.png)

# From Art Project to Hardware Startup

### Reflx → Aura Mirrors (2017–2021)

What started as an architectural accident became a hardware startup that got to the edge of launch before COVID shut everything down.

---

## The Origin

In 2015, I moved into a room behind a handmade clothing and art boutique in Brooklyn called DRTY SMMR. The building had been a tire shop; my room was the old manager's office. Connecting my room to the store was a massive one-way mirror - I could see out, but visitors only saw their reflection.

I started building things into it. A TV behind the glass. A camera. LIDAR sensors for body tracking. Photo lights disguised as sculptures in the store. Eventually I had an interactive system where visitors could take portraits using hand gestures, and the photos would show up on their phones. Nobody knew I was three feet away, or that any of it was happening.

At the time, it felt like pure play - just improvising with photo gear and spare electronics. I wasn't trying to build a company. I was a guy in a new city, surrounded by creative people, using the tools I knew to make something that felt a little bit like magic.

Looking back, I see it differently. The one-way mirror was a pretty accurate metaphor for how I related to the world back then - drawn to people, wanting to connect, but more comfortable capturing idealized reflections than actually being seen. Art has a way of exposing things you don't intend.

But the thing I built was real, and people responded to it. So I kept going.

<div class="video-container">
  <iframe src="https://player.vimeo.com/video/274183204" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Making It Feel Like Magic

### The House of Yes

The clearest proof that we'd built something special came at House of Yes, the legendary Brooklyn venue, for an interactive theatrical interpretation of _Scream_.

We set up the mirror in the lobby. Guests would walk up, take photos, enter their phone numbers, and receive their images via text. Standard photo booth stuff, seemingly.

Then, in the middle of the show - at the exact moment when the killer says _"the call is coming from inside the house"_ - we triggered a program that called every single phone in the audience from **(666) 666-6666**.

Anyone who picked up heard Ghostface's voice.

The room lost its mind. Nobody connected that we'd collected their numbers from the mirror in the lobby an hour earlier. It felt like actual magic - because the technology had completely disappeared.

That moment crystallized what I was actually building: not a photo booth, but a platform for experiences people couldn't explain.

---

## The Input Problem

The original prototype used a Microsoft Kinect for gesture tracking - wave your hand to navigate, no touching required. It worked, but the Kinect was bulky and Microsoft was discontinuing support.

I tried everything:

- **Intel RealSense** depth cameras - better form factor, but inconsistent tracking
- **Machine vision** from the camera stream - the onboard compute couldn't handle real-time pose detection while also running the UI and processing photos
- **Capacitive touch film** - this seemed like the answer until I discovered that mirror glass is metalized, and the metal coating killed the entire capacitive field

That last one cost me weeks. I'd sourced the touch film, built the assembly, and... nothing. No touch response at all.

The fix required finding non-dielectric (non-conductive) mirror glass - a specialty product that maintains reflectivity without interfering with capacitive sensing. Eventually I connected with a manufacturer who could produce the entire front glass assembly with the touch panel embedded directly into it. Clean room manufacturing, minimum order quantities, the whole deal.

The final product used that integrated touch glass. No visible sensors, no gestures to learn. Just touch a mirror and it responds.

---

## From Events to Product

Reflx started as an event rental company. Photo mirrors for parties, brand activations, fashion events. House of Yes loved us. We did events around Brooklyn and Manhattan.

<div class="video-container">
  <iframe src="https://player.vimeo.com/video/297819424" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

But event rentals are a grind. You're competing on price, hauling equipment, troubleshooting at 11pm, and your revenue resets to zero every month. I wanted something with recurring revenue - something that could scale without me being physically present at every activation.

I started talking to salon owners.

### The Salon Insight

Salons live and die by referrals and social media. Every client who walks out looking great is a potential marketing moment - but capturing it is awkward. Asking clients to take selfies feels forced. Posting consistently is exhausting. And tracking which clients actually refer new business? Nearly impossible.

The mirror solved all of this. Clients _want_ to take photos when they look good. The mirror made it effortless. And because every interaction was tracked, salon owners could finally see which clients were driving referrals.

**Shannon King** of Hair & Co Brooklyn became an early believer. He put a prototype in his salon and helped me get into ISSE, a major hair industry conference in Long Beach, to connect with potential customers and partners. That kind of support from someone who actually understood the industry was invaluable.

<div class="video-container">
  <iframe src="https://player.vimeo.com/video/330253250" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

I rebranded to Aura Mirrors and started building a real product.

---

## Building Aura Mirrors

<div class="video-container">
  <iframe src="https://player.vimeo.com/video/339829105" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

### Industrial Design

The mirror had to look like it belonged in a high-end salon - not a piece of tech bolted to the wall. I designed a wall-mounted unit with a machined aluminum enclosure, leather hanging strap, and wooden wall peg.

![Product render - front view](/img/aura-mirror-front.png)

![Product render - back view showing speaker grilles and ventilation](/img/aura-mirror-back.png)

![Detail of leather strap and wooden mounting peg](/img/aura-strap-detail.jpg)

### Hardware

The electrical system centered on an NVidia Jetson Nano driving the display, camera, integrated capacitive touch glass, LED ring light, and audio.

![Electrical block diagram](/img/aura-electrical-diagram.png)

I designed a custom PCB to handle power distribution, LED control, and peripheral connections.

![Custom PCB design - Reflx Aura v1.0.0](/img/aura-pcb-design.png)

![Manufactured PCB](/img/aura-pcb-photo.jpg)

### Software

**AuraOS** ran on BalenaOS - Docker containers on embedded Linux, with separate containers for the Electron.js GUI and Node.js API.

![AuraOS system architecture](/img/aura-os-stack.png)

**Cloud Platform** - AWS infrastructure (Lambda, AppSync, Cognito, DynamoDB, S3) connected the mirror to a dashboard where salon owners could manage content, track referrals, and monitor reviews.

![System overview - Dashboard, API, and Mirror](/img/aura-system-overview.png)

**Client Experience** - Photos delivered via SMS linked to a branded page where clients could share to social, follow the salon, leave reviews, and refer friends.

![Client app - appointments and photo history](/img/aura-app-appointments.png)

![Client app - referral and social sharing](/img/aura-app-referral.png)

### Go-to-Market

I built a 3,000+ member Facebook community of salon owners to validate features and build pre-launch interest. The Kickstarter campaign was ready. Manufacturing partners were lined up.

Then COVID hit.

---

## What Happened

March 2020. Salons across the country shut down overnight. The ones that survived were fighting for their lives - nobody was buying nice-to-have marketing tools. The entire customer base I'd spent two years cultivating had their capital gutted and their futures uncertain.

I ran out of runway and had to pivot to other work. Aura Mirrors has been dormant since.

---

## What I Took From It

**The magic is in the disappearing.** The best technology doesn't announce itself. The House of Yes moment worked because nobody thought about the mirror - they just used it. That's the standard I hold every project to now.

**Hardware is unforgiving.** Software bugs can be patched remotely. When your touch film doesn't work because you didn't understand the electrical properties of mirror glass, you eat the cost and start over. Every hardware decision has to be right the first time, or close to it.

**Timing matters more than product.** Aura Mirrors was ready. The product worked, the market existed, the community was built. Sometimes the world just isn't ready for what you're building.

The project isn't dead - it's waiting. The salon industry recovered. The problem still exists. The hardware designs and software are all still there. Maybe it comes back someday.

---

## Technical Details

**Hardware:** NVidia Jetson Nano, 4K camera, integrated capacitive touch mirror glass, RGBW LED ring, custom interconnect PCB, aluminum enclosure

**Embedded:** BalenaOS, Docker, Node.js API container, Electron.js GUI container

**Cloud:** AWS (Lambda, AppSync, Cognito, DynamoDB, S3), Twilio, Facebook Graph API

**Web:** React, GraphQL, Node.js

**Tools:** KiCad (PCB design), Fusion 360 (CAD), PartsBox (BOM management)
