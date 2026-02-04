FEATURED: true
TAGS: JavaScript, Backbone/Marionette, DRM, HTML5 Video, Shaka Player, Flash Migration
YEAR: 2014-2017
HOVER_VIDEO: /video/showtime.mp4

![Billions on Showtime](/img/billions.jpeg)

# **Killing Flash Before Google Did**

### Showtime Anytime (2014–2017)

When I joined Showtime in 2014, their entire streaming platform was built in Flash. Over three years, we rebuilt everything - the website, the video player, the DRM system - in native HTML5. Then that foundation let us launch the Mayweather vs McGregor PPV to 4.6 million viewers without breaking a sweat.

→ [Showtime](https://showtime.com/)

---

## The Problem

Showtime Anytime was a Netflix-style streaming service built entirely in Adobe Flash and ActionScript. In 2014, Flash was already dying - iOS had never supported it, Chrome was threatening deprecation, and the writing was on the wall.

But Showtime's entire streaming experience lived in Flash. The UI, the navigation, the catalog browsing, the video player, the DRM. Everything.

I was brought on as a front-end developer with HTML5 video experience. The mandate was clear: rebuild the platform before Flash died completely.

---

## Understanding the Existing System

I spent the first two months reading code. Not writing - reading.

The databases were a mix of MongoDB and Postgres. The API was written in Groovy (Java). The front-end was ActionScript. Deployment pipelines, authentication flows, content management, analytics integration - I traced through all of it.

This wasn't wasted time. You can't rebuild something you don't understand. By the time I started writing code, I knew where the complexity actually lived and where the original developers had made trade-offs I'd need to respect or rethink.

---

## Choosing a Framework

My coworker Gautham Chandra and I prototyped the same pages in multiple JavaScript frameworks: React, Angular, Backbone, Marionette.

The decision came down to understanding what Showtime Anytime actually *was*. It wasn't a highly interactive application with complex state management. It was primarily a **read-only catalog browser**. Users logged in, browsed series, watched videos. Very little data input, very little user-generated state.

React and Angular offered powerful data binding, but that power came with complexity we didn't need. Backbone and Marionette were simpler, lighter, and well-suited for read-heavy applications.

We chose Backbone/Marionette. It was the right tool for the actual problem, not the most impressive tool on paper.

---

## The Rebuild

Over several months, we rebuilt the Flash website page-by-page:

- **Registration funnel** - New user signup and subscription flow
- **Authentication** - Login, session management, device authorization
- **Catalog browsing** - Series, episodes, categories, search
- **Viewing history** - Continue watching, recently viewed
- **Playlist management** - Watchlist, favorites
- **Dynamic promotions** - Featured content, personalized recommendations
- **Account management** - Billing, preferences, device management

The toolchain: Bower for package management, Gulp for builds, LESS for CSS preprocessing, Mocha and Chai for testing, ESLint for code quality.

We left one thing in Flash: the video player. DRM-encrypted video playback was still easier in Flash via Adobe Primetime. We'd get to that later.

---

## The Results

The HTML5 rebuild launched to immediate, measurable improvement:

- **Initial load time:** 5x faster
- **Page navigation:** 10x faster
- **Code maintainability:** Dramatically improved (testable, linted, modular)
- **Mobile support:** Finally possible without Flash

The performance gains were honestly shocking to the entire department. Flash had been hiding how slow everything was. The same content, the same features, the same design - just built properly - was an order of magnitude faster.

More importantly, we'd proven to CBS (Showtime's parent company) that our team could execute a large-scale platform rebuild. That credibility would matter for what came next.

---

## Then Google Killed Flash

We'd rebuilt the website, but the video player was still Flash. It worked, and Flash wasn't dead *yet*.

Then Google announced that Chrome would drop Flash support entirely. Our video player would stop working in the world's most popular browser.

The timeline was months, not years. We needed a native HTML5 video player with DRM support.

---

## The DRM Problem

Here's why this was hard: **every browser vendor has their own proprietary DRM system.**

- **Apple Safari:** FairPlay
- **Google Chrome:** Widevine
- **Microsoft Edge/IE:** PlayReady
- **Firefox:** Widevine (but different implementation)

When we used Flash, Adobe Primetime handled DRM for us - one system, works everywhere Flash worked. Without Flash, we needed to implement *each DRM system separately* for each browser.

This is the dirty secret of streaming video on the web. There's no standard. Netflix, Hulu, HBO - everyone streaming premium content has to implement this matrix of proprietary encryption systems. Miss one, and your video doesn't play for that browser's users.

---

## Google Shaka Player

After extensive testing, I chose Google's Shaka Player as our foundation. Shaka abstracts the DRM complexity into a single library that handles:

- **Multi-DRM negotiation** - Automatically selects the right DRM for the current browser
- **Adaptive bitrate streaming** - Quality adjusts to network conditions
- **Multiple audio tracks** - Language selection
- **Closed captioning** - Subtitle support
- **Offline playback** - Download for later (where DRM allows)

But Shaka is a foundation, not a finished product. I built our custom player on top of it:

- **Custom UI skin** matching Showtime's design language
- **Analytics integration** for playback metrics
- **Error handling** for the countless ways video can fail
- **Accessibility features** for screen readers and keyboard navigation

---

## Testing Everything

Browser DRM was new and fragile. Every combination of platform, operating system, browser, and browser *version* could behave differently.

We tested:

- Desktop: Windows, Mac
- Mobile: iOS, Android
- Tablets: iPad, Android tablets, Kindle
- Browsers: Chrome, Safari, Firefox, Edge, IE11
- Each browser across multiple versions

When something didn't work - and plenty didn't work initially - we had to determine whether the problem was our code, Shaka, the browser's DRM implementation, or the DRM license server. The debugging was archaeological.

---

## The Launch

The HTML5 video player launched successfully. Flash was completely removed from the codebase. The player worked across every platform and browser we needed to support.

Showtime had become one of the few major streaming services to fully migrate from Flash to HTML5 with cross-browser DRM. The technical capability we'd built - the video player, the DRM infrastructure, the streaming architecture - would prove essential the following year.

When the Mayweather vs McGregor fight was announced and Showtime needed a PPV service that could handle millions of simultaneous viewers, we didn't have to build video streaming from scratch. We extended what was already battle-tested.

---

## What I Learned

**Read before you write.** Two months understanding the existing system wasn't delay - it was investment. The rebuild went faster because I knew where the real complexity lived.

**Choose tools for your actual problem.** React and Angular were more impressive on paper, but Backbone/Marionette was right for a read-heavy catalog browser. The best tool is the one that fits, not the one that's newest.

**Standards don't exist where money is involved.** DRM on the web is a mess of competing proprietary systems because content owners don't trust open standards. Building for that reality means accepting complexity you can't engineer away.

**Foundations enable future work.** The HTML5 rebuild wasn't just about replacing Flash - it created infrastructure that let us move fast when opportunities like the PPV service appeared.

---

## Technical Details

**Frontend:** Backbone/Marionette, LESS, Gulp builds

**Video:** Google Shaka Player, custom UI layer, adaptive bitrate streaming

**DRM:** FairPlay (Safari), Widevine (Chrome/Firefox), PlayReady (Edge/IE)

**Testing:** Mocha/Chai unit tests, cross-browser manual testing matrix

**Infrastructure:** Groovy API, MongoDB/Postgres, CDN-distributed video

**Timeline:** 3 years from Flash to full HTML5 with DRM video
