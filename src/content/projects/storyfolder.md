FEATURED: true
TAGS: NodeJS, Python, Vue.JS, OpenCV, AWS, Computer Vision, SaaS, Software, Film & Video
YEAR: 2020-2021
HOVER_VIDEO: /video/storyfolder.mp4
PRIORITY: 7

![StoryFolder interface showing scene breakdown](/img/Screen+Shot+2020-11-20+at+2.37.29+PM.png)

# **From Weekend Hack to Hollywood Tool**

### StoryFolder (2020–2021)

I needed to storyboard a Kickstarter video for Aura Mirrors. By the time I finished my coffee, I'd written a script that would eventually be used by Apple, Netflix, HBO, and Sony.

→ [Try StoryFolder](https://storyfolder.com)

---

## The Problem Over Breakfast

I was at a coffee shop trying to storyboard a Kickstarter video. My friends at Wazer had raised over $1M with their desktop waterjet cutter campaign, and their video had exactly the tone I wanted for Aura Mirrors. I needed to study it - break it down shot by shot, understand the rhythm, the pacing, the visual language.

Storyboarding by hand is tedious. You're scrubbing through video, pausing, sketching or screenshotting, annotating, organizing. It takes hours to deconstruct a three-minute video.

Sitting there with my coffee, I had a thought: every cut in a video is just a sudden change in pixel values between frames. Motion detection algorithms have been doing this for years. Could I use the same technique to automatically find every edit point and extract a frame from each shot?

I went home and wrote the prototype in twenty minutes.

---

## The Technical Approach

The core insight was simple: video editing creates discontinuities. When a director cuts from one shot to another, the visual content changes dramatically between adjacent frames. This shows up as a spike in frame-to-frame difference.

### Scene Detection

Using Python and OpenCV, the algorithm:

1. **Reads frames sequentially** from the video file
2. **Computes frame differences** using pixel-wise comparison
3. **Detects cut points** where the difference exceeds a threshold
4. **Extracts representative frames** from each detected scene
5. **Generates a visual storyboard** with timing information

The tricky part wasn't detecting hard cuts - those are obvious. The challenge was handling:

- **Fade transitions** - Gradual changes that don't spike the same way
- **Flash frames** - Brief white or black frames used for impact
- **Similar consecutive shots** - Same location, different angle
- **Motion blur** - Fast camera movement that looks like scene changes

Each of these required tuning. Fades needed a different detection window. Flash frames needed to be filtered. Similar shots needed content-aware comparison, not just pixel difference.

```python
# Simplified core logic
def detect_scenes(video_path, threshold=30):
    cap = cv2.VideoCapture(video_path)
    prev_frame = None
    scenes = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        if prev_frame is not None:
            diff = cv2.absdiff(prev_frame, gray)
            score = np.mean(diff)

            if score > threshold:
                scenes.append(current_frame_num)

        prev_frame = gray
```

The real implementation was more sophisticated - histogram comparison, edge detection, temporal smoothing - but this captures the core idea.

---

## Validation in 24 Hours

I had a working prototype, but I had no idea if anyone else wanted this. Before building anything more, I needed to find out.

I joined several Facebook groups for indie filmmakers and posted a simple question: "I built a tool that automatically generates storyboards from video files. Anyone want to try it?"

I went to bed.

The next morning: hundreds of replies. Within a week, over 600 people had asked to try it.

That was the signal. People didn't just think it was interesting - they wanted to use it immediately. The problem I'd solved for myself was a problem lots of other people had.

---

## The MVP

I have a tendency to over-engineer. This time I forced myself to ship the simplest possible thing:

- **One file type:** MP4 only
- **One size limit:** 50MB maximum
- **One button:** "Select MP4 file"
- **No accounts:** No signup, no login
- **No paywall:** Completely free

The entire interface was a single button. Click it, select a video, wait, download your storyboard. Nothing else.

The backend was Vue + Express + Node, deployed to AWS. When a user uploaded a video, it went to S3, got processed by OpenCV in a Docker container on ECS, and the resulting storyboard (images + HTML) got zipped and returned.

I built and deployed it in 48 hours.

---

## Scaling Challenges

Video processing is computationally expensive. A three-minute video at 30fps is 5,400 frames to analyze. A feature film is over 100,000 frames. And the processing had to happen server-side because browser-based OpenCV wasn't viable in 2020.

The architecture had to handle:

- **CPU-intensive workloads** - Each video maxes out a core during processing
- **Variable processing times** - A 30-second clip processes in seconds; a 2-hour film takes minutes
- **Concurrent users** - Multiple uploads happening simultaneously
- **Large file transfers** - Videos going up, storyboards coming down

I set up auto-scaling on ECS - containers spun up when load increased, spun down when idle. S3 handled the storage. CloudFront cached the static assets. The system could handle spikes without me babysitting it.

---

## From Free Tool to Studio Product

The free version proved the concept. But the feedback kept pointing toward more:

- "Can it handle longer videos?"
- "Can I get timecodes with each frame?"
- "Can it detect different types of shots?"
- "Can it export to my editing software?"

I started building a paid tier. More features, larger file limits, batch processing, export formats for professional workflows.

Then the emails started coming in. Not from indie filmmakers - from production companies. Post-production houses. Major studios.

Within a year, StoryFolder was being used by teams at **Apple, Netflix, HBO, and Sony**. What started as a tool to help me storyboard a Kickstarter video was now part of professional film analysis workflows at the biggest content companies in the world.

---

## What Made It Work

**The problem was real and specific.** I wasn't inventing a need - I had the need myself, and it turned out thousands of other people had it too. The Facebook post validated this in 24 hours, before I'd written a line of production code.

**The MVP was truly minimal.** One button. One file type. One output. No accounts, no payment, no complexity. People could try it in ten seconds. If I'd built user accounts and payment processing first, I'd have spent weeks on infrastructure that didn't matter yet.

**The 48-hour constraint was liberating.** I couldn't over-engineer because I didn't have time. Every feature request went into a list for later. The only question was: does this work?

**Free users were the marketing.** Every person who used the free version and found it useful told other people. The Facebook groups became organic distribution. By the time I launched a paid version, there was already demand.

---

## What I Learned

**Ship the smallest thing that works.** My instinct is always to build more, add features, handle edge cases. StoryFolder taught me that the smallest version often teaches you the most. Users will tell you what's missing.

**Validation before infrastructure.** I could have spent weeks setting up the perfect CI/CD pipeline, user auth, payment processing. Instead I spent 20 minutes on a prototype and 24 hours finding out if anyone cared. The infrastructure came later, when it mattered.

**Scratching your own itch scales.** The problems you have are usually problems other people have too. Solving your own problem authentically tends to resonate - because the solution comes from genuine need, not market research.

**Technical elegance doesn't matter to users.** Nobody using StoryFolder cares about the OpenCV implementation or the AWS architecture. They care that they upload a video and get a storyboard. Everything else is invisible.

---

## Technical Details

**Core Engine:** Python, OpenCV, NumPy - frame extraction, histogram analysis, scene boundary detection

**Backend:** Node.js, Express, Docker containers on AWS ECS

**Frontend:** Vue.js, single-page application

**Infrastructure:** AWS (S3, ECS, ECR, CloudFront), GitHub Actions CI/CD

**Processing:** Parallel frame analysis, adaptive threshold tuning, multiple transition type detection
