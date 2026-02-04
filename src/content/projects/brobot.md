FEATURED: true
TAGS: Kickstarter, Robotics, MIDI, 3D Printing, Arduino, Hardware, Music, Software
YEAR: 2014
HOVER_VIDEO: /video/brobot.mp4
PRIORITY: 5

![Brobot drum mechanism close-up](/img/IMG_6414.jpg)

# **Our Drummer Was Too Flaky, So We Built a Robot**

### Brobot (2014)

"We have dealt with some drummers in the past that were a little difficult to work with. They're so flaky, they never show up. Brobot? Far more reliable."

We built a MIDI-controlled robotic drum kit for our band Pole Shadow, funded it on Kickstarter, got featured on the news, and installed it in a storefront window where strangers could play it with a Super Nintendo controller from the sidewalk.

→ [Kickstarter Campaign](https://www.kickstarter.com/projects/poleshadow/brobot-open-source-robotic-drummer-sci-fi-fantasy) · [View the code on GitHub](https://github.com/JeffJassky/Brobot)

---

## The Backstory (The Fake One)

For Kickstarter, we created an elaborate sci-fi mythology:

> _"We are known as Pole Shadow, and we come from the future. During our last rematerialization in our time machine, we had a little accident. Brobot here didn't fully make it. He's only a three-piece drum set now."_

The campaign was picked as a **Kickstarter Staff Pick** and featured on their official blog. Local news picked it up too. People connected with the story of a band trying to rebuild their injured robot friend.

<div class="video-container">
  <iframe src="https://www.youtube.com/embed/x2ONfXU2eVo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div class="video-container">
  <iframe src="https://www.youtube.com/embed/Q1x29ApfRPA" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## The Backstory (The Real One)

Human drummers are unreliable. They don't show up to practice. They have opinions. They take up space in the van.

We wanted a drummer who would play exactly what we programmed, never miss a show, and fit in a few road cases. So we built one.

---

## The Build

Once the Kickstarter funded and Fat Cat Fab Lab was fully operational, the real work began. Four months of:

- Designing parts in Fusion 360
- 3D printing prototypes
- Testing until they broke
- Redesigning
- Ordering new components
- Trying new mechanisms

![3D printed solenoid mount](/img/IMG_6423.jpg)

![Drum stick mechanism](/img/IMG_6426.jpg)

The final system: solenoid actuators driving real drum sticks, hitting real drums. Each solenoid controlled by an Arduino, orchestrated by MIDI software I wrote in C and JavaScript. A 24V 40-amp power supply feeding the whole thing through custom circuit boards.

---

## The MOSFET Mystery

About four or five MOSFETs into the project, we had a problem.

Everything would work fine for several minutes. Then, mysteriously, a MOSFET would fry open - clamping the solenoid down at full power until we killed the whole system. We'd check the solder joints, replace the component, and it would happen again.

I was stuck. But I wasn't working alone - I was building this at Fat Cat Fab Lab, surrounded by people who knew things I didn't.

I described the problem to friends at the space. They immediately knew: **reverse transient voltage**. When you cut current to a solenoid, the magnetic field collapses and sends a voltage spike backwards through the wire. That spike was frying the MOSFETs.

The fix was a correctly-sized flyback diode between the MOSFET and solenoid. One Digi-Key order later, the problem was solved forever. The MOSFETs now run for hours and stay cool.

![The electrical system - power supply and wiring](/img/image-asset.jpeg)

This is why makerspaces matter.

---

## The Timing Problem

Here's the thing about robotic drums: every mechanism has its own latency.

Solenoids mounted vertically behave differently than ones mounted horizontally - gravity pulls differently. Different drum sticks have different weights. Different drum heads bounce differently. And the delay changes based on how hard you're hitting.

The result: nothing played in sync. A snare hit and a kick hit triggered at the same moment would land at different times.

I could have tried to model the physics - magnetic field strength, material properties, spring constants, gravitational vectors. Instead, I wrote a simple MIDI plugin that applied **velocity-dependent delay curves** to each solenoid.

Hit soft? Add X milliseconds of pre-delay. Hit hard? Add Y milliseconds. Each drum got its own curve, calibrated by ear until everything locked in.

Simple math instead of complex physics. And it worked perfectly.

![MIDI latency compensation interface](/img/Screen+Shot+2017-11-28+at+4.20.24+AM.png)

---

## The Result

Brobot sounds completely natural. And fast as hell.

Here's Peter Hartmann - the jazz musician/engineer from Fat Cat Fab Lab - playing Radiohead's "Black Star" on guitar while Brobot handles the drums:

<iframe src="https://www.instagram.com/p/BJPQC8Sj4hk/embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>

Brobot shredding a complex pattern:

<iframe src="https://www.instagram.com/p/BHSUNj7jTe0/embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>

And here's double bass kick metal speed:

<iframe src="https://www.instagram.com/p/BHARIYGG1wR/embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>

---

## The Window Installation

For almost eight years, I lived in an art space called DRTY SMMR in Bushwick, Brooklyn - the same space where I built the Reflx mirror prototype. At one point, we installed Brobot in the storefront window.

A "PLAY WITH ME" sign. A Super Nintendo controller sitting on the window ledge outside, connected with a 20-foot USB extension cable. Passersby could walk up and trigger the drums from the sidewalk.

![Brobot installed at DRTY SMMR with "Play with me" sign](/img/brobot-drty-smmr.png)

---

## On the Road

Brobot was designed for setup and teardown - reliable enough to travel.

We played shows around the area and took Brobot to **FORM Arcosanti** - a music festival at the experimental architecture site in Arizona. Load in, set up, perform, tear down, load out. The robot handled it.

---

## Where Brobot Lives Now

Brobot still exists. It's currently at my sister's house in Arizona - she was also in the band.

I'd love to bring Brobot back around someday. Set it up for people to play with, or just as a demonstration of what's possible when you're tired of flaky drummers.

---

## What I Learned

**Community solves problems you can't.** The MOSFET issue would have taken me weeks to figure out alone. At the makerspace, it took one conversation. Building in community isn't just more fun - it's faster.

**Simple solutions beat complex ones.** I could have modeled solenoid physics. Instead, I wrote delay curves. The elegant solution isn't always the sophisticated one.

**Elaborate stories get attention.** The time-traveling robot backstory got us a Kickstarter Staff Pick and news coverage. The technology was cool, but the narrative made people care.

**Robots are more reliable than drummers.** This one's just true.

---

## Technical Details

**Actuation:** Solenoid linear actuators with Rep Band return mechanism

**Control:** Arduino with custom MOSFET driver boards, flyback diodes for transient protection

**Power:** 24V 40A power supply

**Software:** MIDI processing in C/JavaScript, velocity-dependent latency compensation

**Fabrication:** 3D printed (ABS) and CNC machined parts, Fusion 360 design

**Shows:** Local venues, FORM Arcosanti (Arizona)

**Status:** Still functional, currently in Arizona
