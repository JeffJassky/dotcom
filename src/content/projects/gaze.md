FEATURED: true
TAGS: Vue, TypeScript, MediaPipe, WebRTC, Biofeedback, Machine Learning, Web Speech API, Software
YEAR: 2025
HOVER_VIDEO: /video/gaze.mov
PRIORITY: 8

# **Interactive Hypnosis Through Biofeedback**

### GAZE (2025–Present)

Most meditation apps talk _at_ you. GAZE listens _to_ you - through your camera, your microphone, and optionally an accelerometer - to create a hypnosis experience that responds to your body in real-time.

→ [Try GAZE](https://gazedeep.space)

---

## The Concept

Traditional guided meditation is a one-way broadcast. The audio plays, you follow along, and if you're not in sync - too tense, too distracted, breathing too fast - the session just keeps going without you.

GAZE flips this. By tracking subtle physiological cues, the app knows when you're relaxing, when you're drifting, when you're ready to go deeper. The session adapts to _your_ state, not the other way around.

It's not about watching a screen. It's about the screen watching you.

---

## Somatic Triggers

The app tracks a constellation of biometric signals, each one a window into your state of mind:

### Eyes & Attention

- **Blink Rate** - Slower blinking correlates with relaxation and trance states
- **Eyelid Heaviness** - Detected when eyes are open but openness drops below 60%
- **Gaze Tracking** - Where your eyes are focused on screen

### Head & Posture

- **Head Heaviness** - The gradual forward drop as relaxation deepens
- **Stillness** - Movement velocity tracked frame-by-frame
- **Nod Detection** - Non-verbal "yes/no" responses to prompts

### Body & Breath

- **Breath Monitoring** - Inferred from subtle head bobbing and facial movement
- **Jaw Relaxation** - Mouth openness indicating muscle release
- **Dynamic Pacing** - Session rhythm adapts to your breath rate

### Voice

- **Verbal Affirmations** - Speech recognition captures spoken responses
- **Real-time Validation** - App confirms when affirmations are correctly spoken

![Biofeedback dashboard - eyes, blink rate, head tracking, stability, mouth state](/img/gaze-biofeedback-dashboard.png)

---

## The Technical Foundation

### MediaPipe Face Mesh

The vision system is built on **Google's MediaPipe Face Mesh**, which provides 478 3D facial landmarks in real-time from a standard webcam. These landmarks are the raw data - GAZE's intelligence comes from interpreting their geometry and movement.

The application organizes detection into specialized **Regions**:

| Region           | What It Tracks                  | Signals Produced                            |
| :--------------- | :------------------------------ | :------------------------------------------ |
| **EyesRegion**   | Landmarks around eyes           | `eyeOpenness`, `blink` events, `isDrooping` |
| **HeadRegion**   | 3D head pose (pitch, yaw, roll) | `isStable`, `nod`, `turn`, `headDrop`       |
| **MouthRegion**  | Lip landmarks                   | `mouthOpenness`, `isRelaxed`, `tongueOut`   |
| **BreathRegion** | Fused facial signals            | `breathSignal`, `breathRate`                |

### Eye Aspect Ratio

Blink detection uses the **Eye Aspect Ratio (EAR)** - a ratio of the eye's height to its width:

$$\text{EAR} = \frac{||p_2 - p_6|| + ||p_3 - p_5||}{2 \cdot ||p_1 - p_4||}$$

A blink is a sharp drop in EAR followed by quick recovery. Eyelid heaviness is detected when EAR stays low without the rapid recovery pattern of a blink.

### Stillness & Stability

The `HeadRegion` calculates frame-to-frame velocity of stable landmarks (like the nose tip):

$$\text{velocity} = \frac{\text{distance\_moved}}{\Delta t}$$

This is smoothed and inverted to create a stillness score. When velocity stays near zero for a sustained period, `isStable` triggers.

### Breath Signal Fusion

Breath rate is the hardest signal to extract from video. The `BreathRegion` fuses multiple weak signals:

- Subtle head bobbing (`headPitch` oscillation)
- Chest/shoulder rise and fall (when visible)
- Nostril flare and facial micro-movements

These are combined through weighted averaging or Kalman filtering to produce a reliable respiration signal.

![Motion tuner - hardware registers, physics settings, impact detection](/img/gaze-motion-tuner.png)

---

## Behavior Detection

Scenes in a GAZE session can require specific behaviors before proceeding. The behavior system maps high-level intents to low-level signals:

| Behavior       | Detection Logic                                              |
| :------------- | :----------------------------------------------------------- |
| `head:still`   | `headState.isStable === true` for specified duration         |
| `head:nod`     | Rapid down-then-up pattern in `headPitch` within ~500ms      |
| `eyes:close`   | `eyeOpenness` below threshold                                |
| `eyes:blink`   | Rapid close-open sequence detected                           |
| `mouth:relax`  | `mouthOpenness` above relaxation threshold                   |
| `speech:speak` | Final transcript from Web Speech API matches expected phrase |

This allows sessions to be genuinely interactive. The app can say "nod when you're ready" and actually wait for the nod.

---

## Privacy Architecture

**All processing happens in your browser.** No video frames, no audio, no biometric data ever leaves your device.

- Camera feed is processed by MediaPipe JavaScript running locally
- Speech recognition uses the browser's native Web Speech API
- No data is recorded, stored, or transmitted
- A green indicator shows when the camera is active

This isn't just a privacy feature - it's a trust requirement. Hypnosis requires vulnerability. GAZE had to be built so that vulnerability is safe.

---

## Optional Hardware

GAZE supports an external **Bluetooth accelerometer** for detecting:

- **Body stillness** - More accurate than camera-based detection
- **Sleep state** - Prolonged motionlessness
- **Impact events** - Sudden movements that might break trance
- **Worn detection** - Distinguishing "device on body" from "device on table"

The accelerometer data is processed through a state machine that interprets raw movement into high-level states.

---

## Session Architecture

Content is structured into **Sessions** (complete programs) and **Scenes** (atomic steps):

```typescript
interface SceneConfig {
  voice?: string;        // Audio prompt
  text?: string;         // Visual prompt
  duration?: number;     // Time limit
  audio?: AudioConfig;   // Background/binaural
  behavior?: BehaviorSuggestion[];  // Required actions
  onCompleteCallback?: () => SceneConfig;  // Branching logic
}
```

Each scene operates as a state machine: `INSTRUCTING` → `VALIDATING` → `REINFORCING` → `FINISHED`. The app presents a prompt, waits for the biometric validation, provides feedback, and proceeds.

---

## What Makes It Different

**Responsive, not scripted.** The session meets you where you are. If your breath is fast, it paces to match. If you're not relaxing, it slows down.

**Non-verbal interaction.** Nod for yes. Shake for no. Close your eyes when ready. The app responds to your body, not just your clicks.

**Measurable depth.** The debug tools show exactly what the app sees - your stability, your breath rate, your eyelid droop. You can watch yourself relax.

**Zero server dependency.** Works offline. Works without accounts. Works without trusting anyone with your biometric data.

---

## Technical Details

**Frontend:** Vue 3 (Composition API), TypeScript

**Vision:** MediaPipe Face Mesh (478 landmarks), WebRTC camera access

**Audio:** Web Speech API for recognition, Web Audio API for binaural generation

**Hardware:** Web Bluetooth API for accelerometer integration

**Architecture:** Region-based signal processing, behavior state machines, scene-driven session flow

**Privacy:** 100% client-side processing, no data transmission
