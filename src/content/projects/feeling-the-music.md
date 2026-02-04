FEATURED: true
TAGS: Product Design, Digital Signal Processing, Circuit Design, Raspberry Pi, Hardware, Experiential, Biology, Wellness
YEAR: 2017
PRIORITY: 10

![Inscape meditation dome with custom lighting](/img/dome-studio.jpg)

# **Adding Touch to a Space Designed for Every Other Sense**

### Inscape Meditation Studio (2017)

Inscape had spent millions crafting a meditation experience that engaged sight, sound, smell, and taste. They asked me to complete the picture with touch - vibration pillows that would sync wirelessly to their 360-degree audio system, letting clients physically feel the low frequencies of the soundscape.

→ [Book a session at Inscape](https://inscape.life/)

---

## The Fifth Sense

Inscape's meditation studio in Manhattan's Flatiron district is one of the most thoughtfully designed sensory environments I've ever been in. Every detail is intentional:

- **Sight** - Warm amber light and natural wood grain at floor level create safety and groundedness. Cool blues and geometric patterns above open the space upward, giving the mind room to expand.
- **Sound** - A 360-degree immersive audio system surrounds you, placing sounds precisely in three-dimensional space.
- **Smell** - A subtle herbal blend diffuses through the room.
- **Taste** - Citrus-infused water refreshes before and after sessions.

Four senses, meticulously orchestrated. But meditation is a full-body experience, and the body wasn't being addressed.

They wanted tactile engagement - something clients could physically feel that was integrated with the audio, not separate from it. The vibration had to feel like an extension of the sound, not a gimmick layered on top.

---

## The Technical Challenge

The requirements were demanding:

- **25+ simultaneous devices** - Each session seats up to 25 people, each with their own pillow
- **Perfect sync** - Vibration had to be phase-locked with the audio; even 50ms of latency would feel disconnected
- **Frequency-matched** - The vibration should correspond to the bass frequencies in the soundtrack, not just pulse randomly
- **Adjustable intensity** - Each client should be able to control their own vibration level
- **Wireless** - No cables across the meditation floor
- **Battery-powered** - Long enough runtime for a full day of sessions
- **Comfortable** - The electronics had to disappear inside a soft pillow

The hardest constraint was the sync. Wireless audio protocols introduce latency. Bluetooth is 40-200ms late. Even AirPlay has buffering delays. When you're trying to make someone _feel_ what they're _hearing_, milliseconds matter.

---

## The Solution

### Audio Distribution

The studio's audio system already used AirPlay for wireless distribution. I built receivers around the **Raspberry Pi Zero W**, which could join the AirPlay stream and decode it in real-time.

But AirPlay's latency varies based on network conditions and buffering. To achieve consistent sync, I implemented a **timestamp-based alignment system** - the Pi would receive timing metadata along with the audio and adjust playback to match the master clock. This kept all 25+ devices within a few milliseconds of each other.

### Signal Processing

Raw audio isn't the same as vibration. You can't just pipe the audio signal to a motor and expect it to feel right. The processing chain:

1. **Low-pass filter** - Extract only the sub-bass frequencies (below ~80Hz) that translate well to tactile sensation
2. **Envelope follower** - Convert the oscillating audio signal into a smooth amplitude curve
3. **Dynamic compression** - Narrow the dynamic range so quiet passages still register and loud ones don't overwhelm
4. **Motor response compensation** - Adjust for the physical characteristics of the vibration motor (inertia, resonance)

This DSP pipeline ran on the Pi in real-time, transforming the audio stream into motor control signals.

### Hardware

Each pillow contained:

- **Raspberry Pi Zero W** - AirPlay receiver and DSP processing
- **Custom driver board** - PWM motor control with adjustable intensity
- **Vibration motors** - Low-frequency transducers chosen for their bass response
- **Li-Ion battery pack** - Sized for 8+ hours of continuous operation
- **Soft enclosure** - All electronics wrapped in foam and fabric to be comfortable against the body

I designed the circuit boards to be as compact as possible. The entire electronics package fit inside a bolster pillow without creating pressure points or hard edges.

### Intensity Control

Each pillow had a simple dial that clients could adjust without looking - turn it up to feel more, turn it down for subtlety. The control was analog and immediate, no menus or buttons.

---

## Making It Disappear

The goal was for clients to not think about the technology at all. They should lie down, adjust the dial to their preference, close their eyes, and simply _feel_ the meditation.

This meant:

- **No pairing process** - Pillows auto-connected when powered on
- **No charging anxiety** - Staff could swap batteries between sessions
- **No learning curve** - One dial, obvious function
- **No maintenance complexity** - Modular design so any component could be replaced

The technology succeeded when it became invisible. Clients would describe feeling "enveloped" by the sound, feeling it "in their chest" - without realizing there was a separate system creating that sensation. The vibration and audio fused into a single experience.

---

## What I Learned

**Sync is everything in multi-sensory work.** The brain is incredibly sensitive to timing mismatches between senses. Even small latency makes things feel "off" in a way people can't articulate but definitely notice. Getting the timing right was harder than any other part of the project.

**Constraints force elegance.** The pillow had to be soft, wireless, battery-powered, and work for 25 people simultaneously. Every constraint eliminated options until only the cleanest solution remained.

**Disappearing is the goal.** The best experiential technology doesn't announce itself. If clients are thinking about the pillow, I failed. If they're simply having a deeper meditation experience, I succeeded.

---

## Technical Details

**Compute:** Raspberry Pi Zero W running custom Linux image

**Audio:** AirPlay receiver, real-time DSP (low-pass filtering, envelope following, compression)

**Hardware:** Custom PCB for motor driver and power management, PWM control, Li-Ion battery pack

**Connectivity:** WiFi mesh for AirPlay distribution, timestamp-based sync protocol

**Physical:** Vibration transducers, foam-encased electronics, fabric pillow integration
