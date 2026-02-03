FEATURED: true
TAGS: NodeJS, Python, Vue.JS, OpenCV
YEAR: 2020-2021

![Screen Shot 2020-11-20 at 2.37.29 PM.png](/img/Screen+Shot+2020-11-20+at+2.37.29+PM.png)

# **StoryFolder**Launching a SAAS Product in 48 hours

From ideation to market research, development, deployment, and feedback follow the launch of a new software tool for storytellers.

### 2020 - Try StoryFolder at [StoryFolder.com](https://storyfolder.com/)

---

# Update: 2021

Since originally publishing in 2020, StoryFolder has grown from a simple, free service into a complex suite of video and film analysis tools used daily by companies like Apple, Netflix, HBO and Sony.

[**see where storyfolder is now**](https://storyfolder.com/)

---

# The Idea

Tasked with producing a Kickstarter video for [Aura Mirrors](https://auramirrors.com/) I visited a coffee shop to start storyboarding over breakfast. Friends of mine at [Wazer](https://www.wazer.com/) had successfully [raised over $1M on Kickstarter](https://www.kickstarter.com/projects/1294137530/the-first-desktop-waterjet-cutter) launching their desktop water jet cutter and their Kickstarter video hit the tone and format that I wanted for the Aura Mirrors launch. I wanted to base my storyboard on their video.

Storyboarding is usually a tedious task that requires drawing talent or other very time consuming techniques. Drinking my coffee I wondered - could I write code to automatically generate a storyboard from an MP4 video file?

![Screen Shot 2020-11-22 at 8.10.49 PM.png](/img/Screen+Shot+2020-11-22+at+8.10.49+PM.png)

# The Prototype

![Screen Shot 2020-11-22 at 8.21.50 PM.png](https://images.squarespace-cdn.com/content/v1/55a81958e4b0d74f5deeeb66/1606094531245-A290GYKODAYP3GSIXJBD/Screen+Shot+2020-11-22+at+8.21.50+PM.png)

It’s known that one can [easily detect motion in videos](https://www.pyimagesearch.com/2015/05/25/basic-motion-detection-and-tracking-with-python-and-opencv/) by stepping through frame-by-frame and comparing pixel values of each frame using Python and OpenCV. I figured the same technique could be used to detect cuts and edits in any video.

I went home, prototyped some code in about 20 minutes and had the entire Wazer Kickstarter video split up into its individual shots. After a few more minutes the script was extracting a still image from each shot and put them in an HTML page that was easy to print.

# First Users

![Screen Shot 2020-11-22 at 8.14.48 PM copy.png](/img/Screen+Shot+2020-11-22+at+8.14.48+PM+copy.png)

I knew the tool did what I wanted - but who else might want something like this? Maybe film students or professors who wanted to creatively analyze iconic film scenes or content producers could use it to to find creative inspiration or use it to create starting points for their own videos.

I decided to join several Facebook Groups of indie film makers and posted the idea to get feedback. The next morning I woke up to hundreds of replies of people wanting to try it and within a week there were over 600.

# The MVP

![Screen Shot 2020-11-22 at 8.31.08 PM.png](/img/Screen+Shot+2020-11-22+at+8.31.08+PM.png)

I have a tendency to over-engineer things and wanted to avoid that this time. Simplifying requirements would help reduce surface area for bugs, simplify testing, minimize edge cases and manage users expectations. **MP4 files only, 50MB or less, and one single button.** No user accounts, no paywall, just one button that converts an MP4 file into storyboard assets.

The interface was one button labeled "Select MP4 file". Once selected, the file gets sent to the API, crunched in OpenCV where the images and HTML would be generated, zipped, and delivered back to the user. The front end and API were spun up in a few hours using Vue, Express, NodeJS, and pushed to a private Github repo.

# Scalable Deployment

Skip to next section (**Fast Feedback)** to avoid this section of technobabble.

Analyzing video with OpenCV is processor intensive work. I knew if too many people used it at the same time the server would become slow, unresponsive, or even crash. Luckily, I had just gone through several weeks of learning and integrating CI/CD pipelines using Github actions, Docker and AWS for Aura Mirrors web application - so I knew how deploy on systems that would automatically scale based on usage.

The code gets written on my laptop, pushed to Github where actions would build my Dockerfile and store the image on AWS ECR, then deploy the image as containers on ECS. I also set up an AWS S3 bucket to store video files and generated storyboard images.

![Product-Page-Diagram_Amazon-ECR.bf2e7a03447ed3aba97a70e5f4aead46a5e04547.png](/img/Product-Page-Diagram_Amazon-ECR.bf2e7a03447ed3aba97a70e5f4aead46a5e04547.png)

# Fast Feedback

I didn't know how what the response would be. Frankly - I still have no idea. It only launched a day ago. Combine that with the code being new and likely riddled with bugs, I needed a way for users to easily share feedback on how the tool was (or wasn't) working for them. Equally as important I wanted to know if users could see themselves paying for this tool in the future, have a simple way to collect email addresses for a product newsletter and ask for donations since server resources aren't cheap.

I landed on using a Facebook ChatBot. ChatBots act kind of like automated phone systems - Menus with options, questions that users can navigate - except over chat. Considering my first users would be coming from Facebook Groups already I figured it would be easy for them to provide feedback over Facebook Messenger. It would also be faster than integrating separate services like Survey Monkey and MailChimp.

After researching the popular ChatBot services and landed on ManyChat as it supported user surveys, lead generation, and some other cool integrations.

![Screen Shot 2020-11-22 at 8.34.19 PM.png](/img/Screen+Shot+2020-11-22+at+8.34.19+PM.png)

# What next?

The interest has been enough to qualify development of a paid version with more developed features. It’s currently in the works and has a slew of other features to help video makers get the most out of their inspiration material.

One very kind, thoughtful, and thorough user has been testing a variety of videos, analyzing the results and and sharing the details with me. With his help I've already released some improvements.

### Do I consider the launch to be a success?

Commercially, it’s far too early to tell. I still have a lot of market testing and validation to do. Personally I’ve never launched a product to a group of users this fast before - so it’s a big win in that respect. This experience is exactly what I needed to internalize the value of the “launch early” and “fail fast”, ideas commonly touted in the startup communities.

### New features and releases?

Most likely I’ll be updating the product in the weeks to come and this section will quickly become out of date. To get updates about the project you can sign up for the email list using the chatbot by clicking [here](https://m.me/103443441596656?ref=w13592812).

[**StoryFolder.com**](https://storyfolder.com/original)

[\*\*Facebook](http://www.facebook.com/jeffjassky)      [Instagram](http://www.instagram.com/jeffjassky)     [GitHub](http://www.github.com/jeffjassky)     [LinkedIn](https://www.linkedin.com/in/jassky)\*\*