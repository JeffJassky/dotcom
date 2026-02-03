FEATURED: true
TAGS: TypeScript, Vue, Simulation, Neuroscience, ODE Solver, Web Workers
YEAR: 2024-2026

![Kynetic Bio - Understand your body. Minute by minute.](/img/kynetic-hero.png)

# Building a Simulation Engine to Understand My Own Brain And Body

### KyneticBio (2024–Present)

I was three weeks into an ADHD protocol - light therapy, cold showers, supplements, high protein - and something wasn't working. The dopamine optimization was helping with focus, but my mood was crashing. I was irritable, stuck on negative thoughts, couldn't let things go.

I'd been researching obsessively (as ADHD brains do). Dopamine vs. serotonin. Seven types of ADHD. Tryptophan transport across the blood-brain barrier. Why very low-carb might tank your mood even when it fixes your cravings.

The information was everywhere - Reddit threads, PubMed papers, biohacker forums - but none of it connected. I couldn't see the whole system. I couldn't understand why eating rice at dinner made me feel better, or why combining carbs with stimulants made me feel worse, or how all these interventions interacted across a 24-hour cycle.

So I built software to model it.

---

## What KyneticBio Does

KyneticBio is a real-time physiological simulation engine. You compose a 24-hour day - sleep, food, supplements, medications, light exposure, exercise - and the system models how those interventions ripple through your neurochemistry, minute by minute.

![User persona selection - Optimizer, Neurodiverse, Cycle Syncer](/img/kynetic-personas.png)

![Primary focus selection](/img/kynetic-focus.png)

The studio shows you what's actually happening: dopamine rising after your morning coffee, cortisol spiking at wake, serotonin dipping if you skip carbs at dinner, adenosine accumulating throughout the day until sleep clears it.

![Kynetic Studio - Timeline with interventions and biological system charts](/img/kynetic-studio.png)

It's not a calorie counter or a habit tracker. It's a mechanistic model of the signals inside you.

---

## The Technical Problem

Human physiology is a system of coupled differential equations. Every signal influences every other signal, with different delays, different magnitudes, different response curves.

Caffeine blocks adenosine receptors. That increases dopamine and norepinephrine. Which affects cortisol. Which affects blood sugar. Which affects insulin. Which affects tryptophan transport. Which affects serotonin. Which affects melatonin at night. Which affects sleep quality. Which affects adenosine clearance. Which changes how you respond to caffeine the next morning.

To model this properly, I needed:

1. **ODE-based simulation** - Ordinary differential equations that step forward through time, updating every signal based on its current state and all its inputs
2. **Pharmacokinetics** - How drugs absorb, distribute, and clear from the body (1-compartment and 2-compartment models)
3. **Pharmacodynamics** - How drugs actually affect receptors (agonism, antagonism, receptor saturation)
4. **Circadian rhythms** - The master clock in the suprachiasmatic nucleus that modulates everything
5. **Condition profiles** - Mechanistic models of ADHD, autism, POTS that adjust baseline receptor densities and transporter efficiencies

---

## The Architecture

**@kyneticbio/core** is the simulation engine - pure TypeScript, zero dependencies, runs in Node or browser. It exposes an optimized ODE solver that can step through a full 24-hour simulation in milliseconds.

The core models:

- 50+ endogenous signals (neurotransmitters, hormones, metabolites)
- Circadian oscillators and sleep homeostasis
- Pharmacokinetics for common interventions (caffeine, stimulants, supplements)
- Receptor binding dynamics with competitive inhibition
- Condition profiles (ADHD, autism) as baseline adjustments

**Kynetic Studio** is the visual interface - Vue 3, Vite, Web Workers. The timeline lets you drag interventions onto a 24-hour canvas. The charts update in real-time as you compose your day, showing how each change propagates through the system.

Everything runs client-side. No data leaves your browser. The simulation happens in a web worker so the UI stays responsive even during heavy computation.

---

## What I Learned Building It

**Dopamine and serotonin aren't the same system.** Everyone talks about dopamine for ADHD. But if you also have rumination, depression, or compulsive behaviors, you need serotonin support too. The model made this obvious in a way that reading articles never did.

**Carbs aren't the enemy.** Very low-carb breaks sugar addiction, but it also tanks serotonin production. Tryptophan competes with other amino acids to cross the blood-brain barrier, and without insulin (from carbs), tryptophan loses. Strategic carbs at dinner support serotonin and melatonin.

**Everything is connected.** You can't optimize one signal in isolation. The simulation forced me to think systemically - how does this intervention affect everything else, not just the target?

**Building is thinking.** The act of encoding physiology into code made me understand it better than any amount of reading. When you have to specify the exact response curve of a receptor, you learn how it actually works.

---

## Two Products, One System

**@kyneticbio/core** is the open-source simulation engine. Pure TypeScript, zero dependencies, 160+ unit tests. Anyone can use it to build their own physiology tools.

→ [GitHub](https://github.com/kyneticbio/core) ・ [Documentation](https://kyneticbio.github.io/core/)

**Kynetic Studio** is the product I built on top of it - a visual interface for composing and simulating your day. This is what I use myself, and what I'm developing as a consumer-facing tool.

→ [Try Kynetic Studio](https://physim.jeffjassky.com)

---

## What's Built

The system now includes:

- **Condition profiles** for ADHD, Autism, POTS, MCAS, and menstrual cycle dynamics
- **Genetic variant modeling** (COMT, MTHFR, etc.) that adjusts enzyme activity and baseline signal levels
- **Multi-day simulations** that model adaptation, tolerance, and recovery across weeks
- **50+ interventions** from caffeine and stimulants to supplements, food timing, light exposure, and exercise

I use it every day. It's become a tool for thinking about my own biology - a way to ask "what if" questions and see the systemic consequences before I actually take something.

---

## Technical Details

**Core Engine:** TypeScript, ODE solver (Euler with adaptive step), zero dependencies

**Simulation:** 50+ signals, circadian rhythms, PK/PD models, receptor dynamics

**Studio:** Vue 3, Vite, Pinia, Web Workers, Canvas-based timeline

**Testing:** Vitest (160+ unit tests), Playwright E2E

**Deployment:** Static site, runs entirely client-side
