FEATURED: true
TAGS: TypeScript, Vue, Simulation, Neuroscience, ODE Solver, Web Workers
YEAR: 2024-2026
HOVER_VIDEO: /video/kynetic.mov

![Kynetic Bio - Understand your body. Minute by minute.](/img/kynetic-hero.png)

# **Building a Simulation Engine to Understand My Own Brain And Body**

### KyneticBio (2024–Present)

I was three weeks into an ADHD protocol - light therapy, cold plunges, supplements, high protein - and something was wrong. My mood was crashing. I was irritable, and ruminating on negative thoughts that I didn't usually have...

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

You can add anything - medications, supplements, food, exercise, social interaction, light exposure, meditation. Each intervention has modeled pharmacokinetics and effects on the underlying signals.

![Add interventions by type or goal](/img/kynetic-add-intervention.png)

![50+ supplements with real pharmacokinetics](/img/kynetic-supplements-list.png)

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

![Dopamine chart with ADHD condition profile showing -18% D2 density and active contributors](/img/kynetic-dopamine-adhd.png)

---

## The Scientific Foundation

This isn't a rule-based model or a statistical approximation. KyneticBio uses a **unified Ordinary Differential Equation (ODE) architecture** to simulate the continuous-time evolution of biological states.

### The Math

The core is a vectorized **Runge-Kutta 4 (RK4)** integration engine. The state of the system at time $t$ is represented as a high-dimensional vector $\mathbf{S}$, and the engine solves for:

$$\frac{d\mathbf{S}}{dt} = f(\mathbf{S}, t, \mathbf{P})$$

where $\mathbf{P}$ represents external parameters and interventions.

Signals follow mean-reverting dynamics towards a time-varying setpoint $\mu(t)$, governed by a time constant $\tau$:

$$\frac{dS}{dt} = \frac{\mu(t) - S}{\tau} + \sum \text{Production} - \sum \text{Clearance}$$

To achieve real-time performance in the browser, everything is flattened into a `Float64Array` - signals, auxiliary variables, receptor states. Definitions are pre-resolved to avoid lookups during integration.

### Biological Systems

The engine organizes 50+ signals into interconnected systems:

| System             | Key Signals                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------------- |
| **Nervous**        | Dopamine, Serotonin, GABA, Glutamate, Acetylcholine, Norepinephrine, BDNF, Histamine, Orexin |
| **Endocrine**      | Cortisol, Adrenaline, Melatonin, Growth Hormone, Oxytocin, Thyroid                           |
| **Metabolic**      | Glucose, Insulin, Glucagon, Ketones, GLP-1, Leptin, Ghrelin, mTOR, AMPK                      |
| **Reproductive**   | Testosterone, Estrogen, Progesterone, LH, FSH                                                |
| **Cardiovascular** | Blood Pressure, HRV, Vagal Tone                                                              |
| **Nutritional**    | Magnesium, Vitamin D3, Zinc, B12, Folate, Iron, Choline                                      |

### Receptor Pharmacology

Drugs don't just "increase dopamine." They bind to specific receptors with specific dynamics. The engine uses the **Operational Model of Agonism** (Black & Leff):

$$E = \frac{E_{max} \cdot \tau \cdot [L]}{(\tau + 1)[L] + K_d}$$

And models receptor adaptation - tolerance and sensitization - through density and sensitivity dynamics:

$$\frac{dR}{dt} = k_{rec}(R_0 - R) - k_{down} \cdot \text{Occupancy} \cdot R$$

This is how the system models why your second cup of coffee doesn't hit as hard, or why stimulants lose effectiveness over time.

### Transporters & Enzymes

Synaptic concentrations depend on reuptake transporters:

- **DAT** (Dopamine Transporter) - primary dopamine clearance, target of stimulants
- **NET** (Norepinephrine Transporter) - targeted by SNRIs
- **SERT** (Serotonin Transporter) - primary target for SSRIs

And enzymatic breakdown:

- **MAO-A/B** - degrades monoamines (serotonin, dopamine, norepinephrine)
- **COMT** - degrades catecholamines, particularly in the prefrontal cortex
- **MTHFR** - converts folate to methylfolate for neurotransmitter synthesis

These aren't abstract concepts in the model - they're actual parameters that genetic variants like COMT Val158Met or MTHFR C677T modify.

### Pharmacokinetics

The engine uses real PK models:

- **1-Compartment** for most supplements and meals
- **2-Compartment** for distribution into peripheral tissues (e.g., methylphenidate)
- **Michaelis-Menten** for saturable elimination: $\frac{dC}{dt} = -\frac{V_{max} \cdot C}{K_m + C}$ (alcohol)
- **Bateman Equation** for first-order absorption and elimination

### Modeling Conditions

Conditions aren't labels - they're mechanistic modifications:

- **ADHD:** Transporter hyperfunction (upregulated DAT/NET) leading to low tonic dopamine/norepinephrine
- **Autism:** E/I imbalance (reduced GABA-A density, enhanced NMDA sensitivity), reduced oxytocin receptor density
- **POTS:** NET dysfunction and alpha-1 receptor supersensitivity causing autonomic instability
- **MCAS:** Mast cell instability through chronic histamine excess and DAO enzyme deficiency

### Individual Scaling

Everything scales to the individual:

- **Metabolic Rate (BMR):** Mifflin-St Jeor equation scales metabolic clearance
- **Fluid Volumes:** Watson formula for Total Body Water determines drug concentrations ($C = \text{Dose} / V_d$)
- **Menstrual Cycle:** 28-day mathematical model using Gaussian pulses to simulate Estrogen, Progesterone, LH, and FSH phases

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

![Full dashboard showing nervous, endocrine, and metabolic system charts](/img/kynetic-full-dashboard.png)

Each intervention shows its biological effects - what signals it affects, through what pathways, with what magnitude. The system is also educational: click any signal to understand what it does and what's currently influencing it.

![Alpha-GPC editing panel with biological effects on acetylcholine, growth hormone, and more](/img/kynetic-alpha-gpc-effects.png)

Everything runs client-side. No data leaves your browser. The simulation happens in a web worker so the UI stays responsive even during heavy computation.

---

## What I Learned Building It

**Dopamine and serotonin aren't the same system.** Everyone talks about dopamine for ADHD. But if you also have rumination, depression, or compulsive behaviors, you need serotonin support too. The model made this obvious in a way that reading articles never did.

**Carbs aren't the enemy.** Very low-carb breaks sugar addiction, but it also tanks serotonin production. Tryptophan competes with other amino acids to cross the blood-brain barrier, and without insulin (from carbs), tryptophan loses. Strategic carbs at dinner support serotonin and melatonin.

**Everything is connected.** You can't optimize one signal in isolation. The simulation forced me to think systemically - how does this intervention affect everything else, not just the target?

**Building is thinking.** The act of encoding physiology into code made me understand it better than any amount of reading. When you have to specify the exact response curve of a receptor, you learn how it actually works.

![A complete day with all intervention lanes - environment, medications, supplements, exercise, food, social, wellness](/img/kynetic-timeline-full.png)

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

![Medications library including anxiolytics, psychedelics, and stimulants](/img/kynetic-medications-list.png)

![Food database with macro tracking](/img/kynetic-food-search.png)

I use it every day. It's become a tool for thinking about my own biology - a way to ask "what if" questions and see the systemic consequences before I actually take something.

---

## Technical Details

**Core Engine:** TypeScript, vectorized RK4 ODE solver, Float64Array state vectors, zero dependencies

**Simulation:** 50+ endogenous signals, 7 biological systems, circadian oscillators, PK/PD models, receptor binding dynamics, transporter/enzyme kinetics

**Pharmacology:** Operational Model of Agonism, 1/2-compartment PK, Michaelis-Menten kinetics, receptor adaptation

**Conditions:** ADHD, Autism, POTS, MCAS, menstrual cycle - modeled as mechanistic parameter modifications

**Studio:** Vue 3, Vite, Pinia, Web Workers, Canvas-based timeline

**Testing:** Vitest (160+ unit tests), Playwright E2E

**Deployment:** Static site, runs entirely client-side, no data leaves the browser
