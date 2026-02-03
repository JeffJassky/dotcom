FEATURED: true
TAGS: Javascript Development, Backbone/Marionette, DRM Encrypted HTML5 Video
YEAR: 2014-2017

![billions.jpeg](/img/billions.jpeg)

# **Showtime Anytime\***Migrating from Flash to HTML5\*

### 2014 - 2017

### When one of the best TV networks meets the modern web browser

The project was to rebuild the Flash website page-for-page in Javascript and HTML5. The Showtime Anytime website consisted of a Netflix style website built entirely in Adobe Flash and Actionscript. After launching the rebuild, the initial load time was improved more than 5 times. Switching between pages improved more than 10 times. The site was now built to modern standards, more testable, and more maintainable. We proved the internal development team was capable of a whole-scale rebuild in a short period of time.

Marionette and Backbone were chosen for the Javascript foundation. Bower for our package management, Mocha and Chai for unit testing. LESS for our CSS pre-processing, ESLint for Javascript linting, and Gulp for building. The components we built include a registration funnel, user login, catalog browsing, viewing history, playlist management, dynamic promotions and account management. Project management software by Jira.

[**Get Showtime**](http://showtime.com/)

---

When I started at Showtime Networks in 2014 I was brought on as a front end web developer to work on their existing streaming platform Showtime Anytime. Showtime Anytime consisted of a Netflix style website where you could log in, browse series and categories, and ultimately watch your favorite Showtime TV shows. The problem was the website was entirely Flash. An antiquated technology even then that desperately needed rebuilding. With my previous experience at Guruz Media, a video-heavy marketing company where we heavily employed HTML5 video it made sense for me to be a part of this team.

I spent the first month or two pouring through their existing code, databases, deployment systems, and other tech infrastructure to better understand the history of the new platform I'd be building. The databases were a mix of MongoDB and Postgres. The API was almost entirely written in Groovy (Java), and the front-end, the portion I'd be focusing on, was of course ActionScript.

With this knowledge in hand my coworker Gautham Chandra and I started prototyping mock ups of top-tier pages in various Javascript frameworks.We played with React, Angular, Backbone, Marionette, and others. Most of the website, aside from the registration and settings, was primarily read-only. There's not a lot of data input or user interaction. Mostly just catalog browsing. With that being considered we decided upon using Backbone and Marionette. These lack the data binding that React and Angular offer but provide better features for read-only platforms.

Over the next several months Gautham and I rebuilt the Flash website page-for-page in Backbone and Marionette. We used Bower for our package management, Mocha and Chai for unit testing. LESS for our CSS pre-processing, ESLint for Javascript linting, and Gulp for building. The components we built include a registration funnel, user login, catalog browsing, viewing history, playlist management, dynamic promotions and account management. The video player itself was left as Flash due to the its offering a simplified method for DRM (Digital Rights Management) which I'll go in to detail in later.

### The Final Product

We launched the new HTML5 website with great success. The performance improvements were honestly shocking to the entire department. Initial load time was improved more than 5 times and switching between pages more than 10 times. We had also brought the website in to modern standards and made it more testable and maintainable. More importantly we proved to our parent organization, CBS, that our tech team was qualified and capable to tackle large-scale rebuilds with new product features. This would pave the way for for the next large project - the [Mayweather Vs McGregor fight Pay Per View service that we launched in 60 days](https://jeff-jassky.squarespace.com/mayweather-vs-mcgregor).

---

## Migrating from Flash video streaming to native HTML5 video streaming

After we launched the HTML5 website the video player itself was still in Adobe Flash.

The problem came when Google announced that Adobe Flash would no longer be supported in Chrome. That meant that in just a few short months we would need to write a new, native video player that would play back videos securely without exposing our video files for direct download and piracy. Let me back up.

Adobe offered a simple product to help reduce pirating of our videos called PrimeTime. PrimeTime is just one of the many systems for Digital Rights Management. Digital Rights Management (DRM) is how iTunes, Netflix, Hulu, and other media distributers restrict you from sharing music and movies you purchased. The files will only play back if you're logged in to an account that has permission. That means even if you copy the file over to your cousins computer they'll only play if you log in with your Apple ID. The lack of Flash support and therefore PrimeTime support exposes our content to potential piracy.

Apple, Microsoft, Google, and Adobe all have products competing in the DRM market. Fairplay, PlayReady, Widevine, and Primetime respectively. The market competition means that popular browsers (Mircosoft IE, Google Chrome, and Apple Safari) all have their own proprietary methods of playing encrypted content. When we were using a flash-based video player we only had to use Adobe Primetime. However since we were migrating away from Flash to native HTML5 this requires us to navigate DRM with each browser itself. Anyone wishing to stream content to a wide audience must implement each and every one of these individually.

Googles Shaka Player project which succeeds at making this easier for programmers. It works by abstracting the varying DRM requirements in to a single library that works in most browsers. Shaka also provides libraries for multiple language audio tracks, multiple language closed captioning, and video quality switching. I chose Google Shake Player after extensively testing our options.

I began writing the design code for the brand new skin provided by our design department. DRM servers were stood up and tested with the help of our operations team. Due to the freshness native browser DRM it's still very difficult to pull off. Each browser on every platform was thoroughly tested for playback. Desktops, laptops, tablets, iOS, Android, even Kindle was tested. Each platform, operating system, browser, and even browser version now had to be taken in to consideration.

### The Final Product

The launch of the HTML5 Video player was a big deal. With Flash now gutted entirely from our repositories we had effectively rebuilt and relaunched the core of the Showtime  - the video player itself. DRM servers were stood up, the player was deployed to production. The new player works on iOS, Android, Chrome, Safari, Firefox, Microsoft Edge and even IE11. Showtime had successfully become one of the few big players in DRM encrypted HTML5 video content.

[View fullsize](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1511735755663-JQIELLCXL3WT5F0TW2L7/Screen+Shot+2017-11-26+at+5.28.25+PM.png)

![Screen Shot 2017-11-26 at 5.28.25 PM.png](/img/Screen+Shot+2017-11-26+at+5.28.25+PM.png)

[View fullsize](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1511735748338-I1FRIG4RRRJRL5NJ6APO/Screen+Shot+2017-11-26+at+5.25.20+PM.png)

![Screen Shot 2017-11-26 at 5.25.20 PM.png](/img/Screen+Shot+2017-11-26+at+5.25.20+PM.png)

[View fullsize](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1511735752589-E00YY7G6TRU2J3YFVRAH/Screen+Shot+2017-11-26+at+5.25.12+PM.png)

![Screen Shot 2017-11-26 at 5.25.12 PM.png](/img/Screen+Shot+2017-11-26+at+5.25.12+PM.png)

[\*\*Facebook](http://www.facebook.com/jeffjassky)      [Instagram](http://www.instagram.com/jeffjassky)     [GitHub](http://www.github.com/jeffjassky)     [LinkedIn](https://www.linkedin.com/in/jassky)\*\*