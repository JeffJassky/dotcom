FEATURED: true
TAGS: Kickstarter, Mechanical, Electrical & Software Engineering, 3D Printing & Design, MIDI Music Software
YEAR: 2014
HOVER_VIDEO: /video/brobot.mp4

# **Building a Robotic Drummer**

### _2014_

The project was a midi controlled robotic drum kit designed to sound as natural as reasonably possible given the budget constraints. The hardware and electrical system needed to be reliable enough for the setup/tear down nature of a professional music tour. The midi software was written in C and Javascript. The electrical system consisted of several power supplies, solenoids, XLR power/signal cables, Arduino, and a custom circuit board with a variety of mosfets, resistors and diodes. Physical hardware, mostly steel and ABS plastic, is mostly 3D printed  and cut on a CNC machine.

[**Download the code**](https://github.com/JeffJassky/Brobot)

Read more ↓

---

# Design

After many design iterations I settled on a combination of 3D printed and CNC machined parts out of ABS. A variety of ball bearings, thumb screws for adjustments, and steel tooth clamps for mounting to drum rims.

[View fullsize](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1511863691667-QGKP34H1DGQ04DMZ6OVT/IMG_6414.jpg)

![IMG_6414.jpg](/img/IMG_6414.jpg)

[View fullsize](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1511863691985-K5QWPWOHHB9TMOXRLQMT/IMG_6423.jpg)

![IMG_6423.jpg](/img/IMG_6423.jpg)

[View fullsize](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1511863699069-YO9B4QD1EI9CJXBQLUMA/IMG_6426.jpg)

![IMG_6426.jpg](/img/IMG_6426.jpg)

---

# Software

Due to the configuration of the hardware sometimes solenoids would be mounted vertically, horizontally, or at weird random angles. This meant that the force of gravity was working on each drum stick and solenoid at a different angle. This caused some instruments to be delayed more than others. Not all of the percussion pieces were playing in sync. To make it worse the delay variable would change depending on how hard each solenoid was hitting. Though it sounded chaotic, it was a simple mathematics problem. I wrote a simple midi plugin that applied a very simple pre-delay function curve to each solenoid depending on the input velocity. This put everything perfectly in sync.

![Screen Shot 2017-11-28 at 4.20.24 AM.png](/img/Screen+Shot+2017-11-28+at+4.20.24+AM.png)

---

# Electrical

### Mosfet / Solenoid

The Mosfet and solenoid did not cause much trouble to be honest. That is until mysteriously, after several minutes of playing, sometimes a mosfet would fry open, clamping the solenoid down at full power until we unplug the entire system to analyze what happened. This happened several times. The first several times we thought it might be a fluke or a bad solder. It wasn't until coming across an article about reverse transient voltage where the problem became clear.

When current is removed from a solenoid, the magnetic field collapses, sending a pulse of electrically backwards through the power wires. Since the power wires ran directly from the solenoid to the mosfet the mosfet was receiving all of that power in reverse which was causing the chip to overheat and fry. A simple correctly sized diode was put in place between the mosfet and solenoid which prevented reverse transient voltage from reaching the mosfet. Now they would run for hours and stay cool.

### Sizing the power supply

Another issue was the power consumption. Each drum, cymbal, or percussion instrument had its own drum stick and each drum stick had its own solenoid to control it. With a kick, snare, toms, ride, crash, hats, and aux gear that's possibly up to 10 solenoids. Each solenoid, when engaged, can pull up to 5 amps. We noticed that during playback if multiple instruments were triggered simultaneously the current would spike and the voltage would drop. Our power supply was undersized. Eventually we ended up with a 24v 40 amp power supply.

![](/img/image-asset.jpeg)

---

# Hardware

### The Down Stroke

When creating a robotic musician the musical dynamics are key. Being to tone, velocity, sound, volume, etc. That means that control is really the key. We experimented with a number of different control systems. Pneumatics, servos, stepper motors and solenoids. Pneumatics are loud. Servos are weak. Stepper motors are electrically complex and inefficient. We ended up settling on solenoids which act as linear actuators.

Solenoids are great at a few things. When paired with a mosfet, pulse width modulation, which is then modulated over time you have a very simple electrical system. A solenoid (shown in Figure A.) is an incredibly simple mechanism with only a single moving part - a solid steel plunger that moves linearly to the left when the surrounding coil is electrified (the down stroke)

### The Up Stroke

When the electrical current is removed the spring around the plunger returns the plunger to its resting state (the up stroke). One problem with the spring is that it's not easily adjustable or tunable. Another problem is that as the solenoid heats up (which it does after several minutes of use) the spring gets weaker.

I experimented with a variety of different return mechanisms. Springs over the coil, springs outside the coil, and bands of rubber, silicone, latex. I ended up finding a material called Rep Band that had a perfect amount of adjustability, strength, and did not change tension in different temperature conditions.

These result is a reliable, quiet, controllable, powerful, mechanism for repeat impacts with very few moving parts.

Figure A.

[Figure A.](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1511747183397-RHS3LO7I5Y40CEDX0CAZ/Figu)

---

![](https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14350522_1208426875855507_1898477808_n.jpg)

[New #robotic #drum set #interactive #installation @drtysmmr 1198 Myrtle Ave #bushwick #newyork #nyc. Come #play with it from outside using a #custom #programmed Super #Nintendo controller.](https://scontent-iad3-1.cdninstagram.com/t51.2885-15/e35/14350522_1208426875855507_1898477808_n.jpg)

48 Likes, 2 Comments - 🗽 NYC Maker 🔧 (@jeffjassky) on Instagram: "New #robotic #drum set #interactive #installation @drtysmmr 1198 Myrtle Ave #bushwick #newyork..."

[\*\*Facebook](http://www.facebook.com/jeffjassky)      [Instagram](http://www.instagram.com/jeffjassky)     [GitHub](http://www.github.com/jeffjassky)     [LinkedIn](https://www.linkedin.com/in/jassky)\*\*
