FEATURED: true
TAGS: Vue, TypeScript, Web Audio, Music Theory, MIDI, Creative Tools
YEAR: 2025
HOVER_VIDEO: /video/no-wrong-notes.mov

![No Wrong Notes - ScalePad interface](/img/no-wrong-notes/2.png)

# **Learning Music Theory by Making It Impossible to Play Wrong**

### No Wrong Notes (2025)

I've always learned by ear. But I wanted to understand the mechanics - break music theory down to its fundamentals. So I built a tool where every button plays something that works, and the act of building it taught me more than any tutorial could.

→ [Try No Wrong Notes](https://no-wrong-notes.jeffjassky.com/)

---

## The Problem

I'm more skilled at technical production than composing. I can mix, process, and shape sound all day - but when it comes to writing chord progressions, I get bogged down. I second-guess myself. I play something that sounds wrong and lose momentum.

I wanted a tool where I could experiment with compositions quickly, without the fear of hitting a bad note. A sandbox where exploration is safe.

---

## The Concept

**No Wrong Notes.** Literally.

The app locks everything into known, defined music theory. Pick a key. Pick a scale. Now every button you press produces something that belongs - a chord that fits, an extension that works, a note that's in key.

You can't press a single button to mess up.

Yet you still have full control over the composition: root notes, chord qualities, extensions from triads up through 13ths. The constraints don't limit expression - they eliminate the cognitive overhead of avoiding mistakes.

![Scale degree pads - play chords with A-K keys](/img/no-wrong-notes/5.png)

---

## The Interface

### The Chord Wheel

The circular chord wheel lets you quickly select chord qualities - major, minor, diminished, augmented, sus2, sus4, and more.

The wheel design was intentional: every chord is equidistant from the center. You can transition from any quality to any other without accidentally passing through something else. Hover to preview, click to lock.

(In retrospect, adding dead space in the center where your cursor can rest without selecting anything might be even better. Future version.)

![Chord quality wheel - 8 qualities, hover to select, click to lock](/img/no-wrong-notes/3.png)

### Extensions

Stack notes to add color - from simple triads up through rich 13th chords:

![Extensions - Triad, 7th, Add 9, 9+11, 9+11+13](/img/no-wrong-notes/4.png)

### The Keyboard Mapping

- **A S D F G H J** - Scale degrees 1 through 7
- **1 2 3 4 5** - Extensions (Triad → 7th → add9 → 9+11 → 9+11+13)
- **Esc** - Stop and reset

The computer keyboard becomes a musical instrument. No MIDI controller needed, though you can route the output to external synths via Web MIDI.

### The Mini Keyboard

A visualization shows exactly which notes are sounding, mapped to a piano keyboard. You can watch the theory in action - see the intervals, understand why certain combinations sound the way they do.

---

## The Technical Build

**Framework:** Vue 3 with TypeScript

**Audio:** Web Audio API polysynth built from scratch, with multiple sound options

**MIDI:** Web MIDI API for routing to external instruments and DAWs

**Everything runs in the browser.** No backend, no accounts, no installation. Open the URL and play.

---

## The Aha Moment

Building this taught me something that years of playing by ear never did:

**Music theory is decomposable.**

- **Key** - Which note is home (C, D, E♭, etc.)
- **Mode** - Which scale pattern (major, minor, dorian, etc.)
- **Chord** - Which scale degree is the root (I, IV, V, etc.)
- **Quality** - Major, minor, diminished, etc.
- **Extension** - How many notes to stack (triad, 7th, 9th, etc.)

Each of these is completely distinct. Each has a limited range of options. They combine in predictable ways.

Music theory isn't mysterious or infinitely complex. It's a system with finite components that interact according to rules. Once you see it that way, it becomes *knowable*.

That's the real value of building things to learn. You can't hide from the fundamentals when you have to implement them in code.

---

## Who It's For

- **People learning music theory** who want to hear concepts, not just read about them
- **Experienced musicians** exploring ideas quickly without a DAW
- **Composers with technical production skills** who want to sketch chord progressions without getting bogged down
- **Anyone curious** about why certain chords sound good together

---

## What I Learned

**Constraints enable creativity.** Removing the possibility of wrong notes didn't limit what I could express - it freed me to explore without hesitation.

**Building is the best way to learn.** I understood music theory concepts intellectually before. Building a tool that implements them forced me to understand them mechanically.

**Decomposition reveals simplicity.** Things that seem complex often aren't. They're just multiple simple systems layered together. Pull them apart and each piece is manageable.

---

## Technical Details

**Frontend:** Vue 3, TypeScript, Vite

**Audio:** Web Audio API, custom polysynth with multiple waveforms

**MIDI:** Web MIDI API for external instrument output

**Deployment:** Static site, GitHub Pages

**Status:** Active development, open for experimentation
