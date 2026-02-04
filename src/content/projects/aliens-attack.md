FEATURED: true
TAGS: Experiential Marketing, Game Design, NodeJS, Raspberry Pi, Arduino, Laser Cutting, Hardware, Software
YEAR: 2016
HOVER_VIDEO: /video/aliens-attack.mp4
PRIORITY: 3

![Aliens Attack arcade game at Fat Cat Fab Lab](/img/MVI_7736-1.jpg)

# **Building a Physical Arcade Game From Scratch**

### Aliens Attack!! (2016)

Seven makers. One pneumatic ping pong cannon. A horde of laser-cut pixel aliens that pop up, get shot, and fall down. We built a real-life Space Invaders shooting gallery to show the world what a makerspace could do - and kids at Maker Faire lost their minds over it.

→ [View the code on GitHub](https://github.com/JeffJassky/Space-Invaders-Shooting-Gallery)

---

## The Context

Fat Cat Fab Lab is a makerspace I helped build in Manhattan's West Village - a community of artists, engineers, and makers sharing tools and collaborating on projects. By 2016, we had the space, the equipment, and the community. What we needed was a way to show people what we were about.

We decided to build something impossible to ignore: a full-scale arcade shooting gallery where you fire ping pong balls at physical aliens that actually respond when you hit them.

The project would demonstrate everything a makerspace enables - laser cutting, electronics, fabrication, programming, sound design - all integrated into one ridiculous, playable experience.

---

## The Team

Seven people, each responsible for a component:

- **The blaster** - A custom pneumatic ping pong ball cannon
- **The targets** - Servo-mounted aliens with hit detection
- **The scoreboard** - Large LED display for points and timer
- **The music** - Original chiptune soundtrack
- **The structure** - Physical frame and mounting
- **The aesthetics** - Laser-cut pixel art aliens

My role was **systems integrator**. Each team member built their piece with its own interface - motors, sensors, displays, audio. I wrote the game logic that glued everything together: when an alien should pop up, how to detect a hit, when to award points, how to sequence the waves, when to play which sound.

The game brain was a Raspberry Pi running Node.js, orchestrating an ecosystem of peripheral systems.

---

## The Aliens

The targets were 8-bit style Space Invaders sprites, laser-cut from colorful acrylic. They looked like they'd stepped right out of a 1978 arcade cabinet - but physical, tangible, three inches tall and mounted on servo motors.

Each alien could pop up and drop down. When a wave started, aliens would rise into position. When hit, they'd fall. The servo speed was fast enough that the motion felt snappy and responsive, like the original game.

![Laser-cut acrylic pixel aliens](/img/MVI_7717-1.jpg)

---

## Hit Detection

Behind each alien sat a piezo vibration sensor. When a ping pong ball struck the target, the impact registered as a voltage spike that the Arduino could read.

The pneumatic blaster was powerful enough that real hits were unambiguous - no issues with false positives from nearby vibration or false negatives from glancing shots. A solid hit rang the piezo clearly.

The challenge was latency. There's a delay between the ball hitting the target and the alien falling - the piezo has to register, the signal has to travel to the Arduino, the Arduino has to tell the Raspberry Pi, the Pi has to update the game state, and the Pi has to tell the servo to drop. Initially this felt sluggish.

We fixed it two ways: stripped the detection loop down to the minimum code path, and cranked up the processor speed. The result was snappy enough that cause and effect felt immediate - hit the alien, alien falls, points awarded.

---

## The Blaster

One team member built the pneumatic cannon entirely from scratch. No kits, no modifications - custom fabrication.

It used compressed air to fire ping pong balls with surprising force and accuracy. A trigger mechanism controlled the valve, and a vacuum system automatically loaded the next ball. You could fire repeatedly without manually reloading.

The blaster connected to the game system so the Pi knew when shots were fired - useful for tracking accuracy and timing sound effects.

![The pneumatic ping pong ball blaster](/img/MVI_7768-1.jpg)

---

## The Soundtrack

My sister, Jennifer Jassky (XIAJA), composed an original chiptune soundtrack for the game. It captures the 8-bit arcade aesthetic perfectly - driving, energetic, and nostalgic without being a direct copy of any existing game music.

<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A284742318&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>

---

## The Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Raspberry Pi                        │
│                   (Node.js)                          │
│                                                      │
│   ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│   │ Game Logic  │  │   Scoring   │  │   Audio    │  │
│   └──────┬──────┘  └──────┬──────┘  └─────┬──────┘  │
└──────────┼────────────────┼───────────────┼─────────┘
           │                │               │
     ┌─────▼─────┐    ┌─────▼─────┐   ┌─────▼─────┐
     │  Arduino  │    │ LED Score │   │  Speakers │
     │  (I/O)    │    │  Display  │   │           │
     └─────┬─────┘    └───────────┘   └───────────┘
           │
    ┌──────┴──────┐
    │             │
┌───▼───┐   ┌────▼────┐
│Servos │   │ Piezo   │
│(move) │   │ Sensors │
└───────┘   └─────────┘
```

Node.js handled the game state, wave sequencing, scoring, and audio triggers. The Arduino handled the real-time I/O - reading piezo sensors and controlling servo positions. The separation kept timing-critical operations on dedicated hardware while the Pi managed higher-level logic.

---

## Taking It Public

We debuted the game at **Maker Faire NYC** at the New York Hall of Science in Queens - one of the biggest maker events in the country.

Kids lost their minds. There was a constant line. The combination of physical shooting (not a screen!), immediate feedback (the alien actually falls!), and arcade aesthetics (the sounds! the sprites!) was irresistible. Adults loved it too, but watching kids light up was the best part.

The game was reliable enough that we took it to other events, including **Figment NYC** on Governors Island. It survived transport, setup, teardown, and hundreds of players without major issues.

![Game setup at event](/img/Screen+Shot+2017-11-28+at+6.02.55+AM.png)

---

## What Made It Work

**Physical beats digital for spectacle.** A shooting game on a screen is forgettable. A pneumatic cannon firing real projectiles at physical targets that actually fall down - that stops people in their tracks. The physicality was the whole point.

**Distributed building, integrated system.** Seven people couldn't have built this if everyone needed to understand every component. By defining clear interfaces between pieces, each person could focus on their specialty. My job was making the interfaces work together.

**Reliability through simplicity.** The game logic was straightforward - aliens appear, player shoots, hits register, points accumulate, waves progress. No complex state machines or edge cases. That simplicity made it robust enough for public events.

---

## What I Learned

**Integration is its own skill.** Building a component is different from making components work together. The game logic wasn't complex, but understanding every interface, handling timing issues, and debugging across multiple systems required a different kind of thinking.

**Maker culture is about showing, not telling.** We could have made flyers explaining what Fat Cat Fab Lab does. Instead, we built something that demonstrated it instantly. One game showed more about makerspace culture than any amount of marketing copy.

**Collaborative building is joyful.** Seven people, each bringing their specialty, creating something none of us could have built alone. The game was fun to play, but building it together was the real reward.

---

## Technical Details

**Compute:** Raspberry Pi running Node.js game engine

**I/O:** Arduino for real-time sensor reading and servo control

**Detection:** Piezo vibration sensors mounted behind laser-cut acrylic targets

**Motion:** Servo motors for alien pop-up/drop-down movement

**Display:** LED scoreboard with points and timer

**Audio:** Original chiptune soundtrack by Jennifer Jassky (XIAJA)

**Blaster:** Custom pneumatic ping pong ball cannon with vacuum auto-reload

**Events:** Maker Faire NYC (New York Hall of Science), Figment NYC (Governors Island)
