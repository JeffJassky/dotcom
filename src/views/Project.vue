<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import texmath from 'markdown-it-texmath'
import katex from 'katex'
import 'katex/dist/katex.min.css'

import vFadeIn from '../directives/VFadeIn' // Import the custom directive

// Syntax highlighting
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // You can choose a different theme

// Markdown-it plugins
import markdownItAttrs from 'markdown-it-attrs'
import markdownItMark from 'markdown-it-mark'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'

// For reading time estimate


function calculateReadingTime(text) {
  const wordsPerMinute = 200 // Average reading speed
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return {
    text: `${minutes} min read`,
    minutes: minutes,
    words: words
  }
}

const route = useRoute()

// Reactive variables for reading time and TOC
const readingTimeStats = ref(null)
const tocHtml = ref('')

const relatedProjects = computed(() => {
  if (!metadata.value.tags || metadata.value.tags.length === 0) {
    return []
  }

  const currentProjectTags = new Set(metadata.value.tags)
  const related = allProjectsMetadata.value.filter(project => {
    if (project.id === route.params.id) {
      return false // Exclude current project
    }
    return project.tags.some(tag => currentProjectTags.has(tag))
  })

  // Sort by number of shared tags, then by year
  related.sort((a, b) => {
    const aSharedTags = a.tags.filter(tag => currentProjectTags.has(tag)).length
    const bSharedTags = b.tags.filter(tag => currentProjectTags.has(tag)).length
    if (aSharedTags !== bSharedTags) {
      return bSharedTags - aSharedTags // More shared tags first
    }
    return parseInt(b.year) - parseInt(a.year) // Newer projects first
  })

  return related.slice(0, 3) // Return top 3 related projects
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>'
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
  .use(texmath, {
    engine: katex,
    delimiters: ['dollars', 'brackets'],
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
  })
  .use(markdownItAttrs, {
    // optional, but recommended
    allowedAttributes: ['id', 'class', 'style', /^data-.+$/]
  })
  .use(markdownItMark)
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      symbol: '<span class="icon-link"></span>'
    })
  })

// Separate MarkdownIt instance for TOC rendering to avoid recursion
const tocMd = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
// The markdown-it-anchor plugin is needed for the TOC to link to headings
.use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.ariaHidden({
    placement: 'after',
    symbol: '<span class="icon-link"></span>'
  })
})


// The main md instance uses markdownItTocDoneRight with a callback
md.use(markdownItTocDoneRight, {
  listType: 'ul',
  level: [2, 3], // Only H2 and H3 for TOC
  callback: function (tocMarkdown) {
    tocHtml.value = tocMd.render(tocMarkdown) // Use tocMd to render the TOC markdown to HTML
  }
})

const content = ref('')
const metadata = ref({ title: '', subtitle: '', year: '', tags: [] })
const allProjectsMetadata = ref([])

const extractMetadata = (rawContent, projectId) => {
  const titleMatch = rawContent.match(/^# \*\*(.*?)\*\*/m) || rawContent.match(/^# (.*)/m)
  const title = titleMatch ? titleMatch[1].replace(/\*/g, '') : ''

  const yearMatch = rawContent.match(/### _?(\d{4})_?/m)
  const year = yearMatch ? yearMatch[1] : ''

  const tagsMatch = rawContent.match(/^TAGS:\s*(.*)/m)
  const tags = tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim()) : []

  return { id: projectId, title, year, tags }
}

const loadAllProjectsMetadata = () => {
  const modules = import.meta.glob('../content/projects/*.md', { as: 'raw', eager: true })
  const projects = []
  for (const path in modules) {
    const rawContent = modules[path]
    const projectId = path.match(/([a-zA-Z0-9-]+)\.md$/)[1]
    projects.push(extractMetadata(rawContent, projectId))
  }
  allProjectsMetadata.value = projects
}

const loadProject = () => {
  // Ensure all project metadata is loaded
  if (allProjectsMetadata.value.length === 0) {
    loadAllProjectsMetadata()
  }

  const modules = import.meta.glob('../content/projects/*.md', { as: 'raw', eager: true })
  const path = `../content/projects/${route.params.id}.md`

  if (modules[path]) {
    let raw = modules[path]

    // Extract metadata for current project
    const currentProjectMetadata = extractMetadata(raw, route.params.id)
    metadata.value = currentProjectMetadata

    // Strip metadata lines before rendering
    raw = raw.split('\n').filter(line => {
      const trimmed = line.trim()
      return !trimmed.match(/^(FEATURED|TAGS|YEAR|HOVER_VIDEO|PRIORITY):/i)
    }).join('\n')

    // Calculate reading time
    readingTimeStats.value = calculateReadingTime(raw)

    // Render remaining content
    content.value = md.render(raw)
    nextTick(() => {
      applyFadeInEffects()
    })
  } else {
    content.value = '<h1 class="technical">404_NOT_FOUND</h1>'
    readingTimeStats.value = null
  }
}

function applyFadeInEffects() {
  const postContentDiv = document.querySelector('.post-content > div')
  if (postContentDiv) {
    // Select direct children of the div that holds the markdown content
    const elements = postContentDiv.children
    Array.from(elements).forEach(el => {
      if (el.nodeType === 1) { // Ensure it's an element node
        el.classList.add('fade-in-section')
        // Manually call the directive's mounted hook
        vFadeIn.mounted(el)
      }
    })
  }
}

onMounted(() => {
  loadProject()
})

watch(() => route.params.id, () => {
  loadProject()
})
</script>

<template>
  <div class="project-page">
    <aside class="project-sidebar" v-if="tocHtml" v-html="tocHtml"></aside>

    <div class="main-content">
      <article class="post-content">
        <h1 class="project-title">{{ metadata.title }}</h1>
        <h3 class="project-meta">
          {{ metadata.year }}
          <span v-if="readingTimeStats">
            &bull; {{ readingTimeStats.text }}</span
          >
        </h3>
        <div v-html="content"></div>
      </article>

      <section
        v-if="relatedProjects.length"
        class="related-projects fade-in-section"
      >
        <h2 class="technical">RELATED_PROJECTS</h2>
        <div class="project-grid">
          <router-link
            v-for="project in relatedProjects"
            :key="project.id"
            :to="`/project/${project.id}`"
            class="related-project-card"
          >
            <h3>{{ project.title }}</h3>
            <p>{{ project.year }}</p>
          </router-link>
        </div>
      </section>

      <div class="project-footer technical">
        <router-link to="/">&lt; RETURN_TO_COLLECTION</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "../assets/less/typography.less";

.project-page{
	margin-top: -5rem;
  display: flex;
  gap: 2rem; // Space between main content and sidebar

  .main-content {
    flex-grow: 1;
    max-width: 800px; // Limit content width for readability
    margin: 0 auto;
  }
}

.project-sidebar {
  position: sticky;
  top: 2rem; // Adjust as needed
  align-self: flex-start; // Sticks to the top of its container
  width: 250px;
  flex-shrink: 0;
  padding: 1rem;
  background-color: var(--background-color-secondary);
  border-radius: 8px;
  font-size: 0.9rem;

  // Basic styling for the TOC generated by markdown-it-toc-done-right
  .table-of-contents {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        padding: 0.3rem 0;
        border-bottom: none;
        a {
          color: var(--text-body);
          text-decoration: none;
		  text-transform: none;
		  letter-spacing: normal;
          &:hover {
            color: var(--accent-color);
          }
        }
        ul { // nested lists for sub-headings
          padding-left: 1rem;
		  a {
			color: var(--text-secondary);
		  }
        }
      }
    }
  }
}

.project-title {
  font-size: 4rem;
  line-height: 0.85;
  margin-bottom: 0.5rem;
  font-family: @font-display;
  font-weight: 700;
  text-transform: none;
  letter-spacing: -0.05em;
  color: var(--text-title);
}

.project-meta {
  font-family: @font-mono;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0;
  margin-bottom: 3rem;
}


.post-content {
  h1 { // The markdown H1 is now replaced by project-title, keeping this for internal links
    display: none; // Hide markdown H1 as we have a dedicated project-title
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    font-family: @font-display;
    font-weight: 700;
    color: var(--text-title);
    position: sticky;
    top: 0; // Adjust as needed, e.g., if there's a fixed header
    background-color: var(--background-color); // Ensure content behind is not visible
    padding-top: 1.5rem; // Add some padding when sticky
    padding-bottom: 0.5rem;
    z-index: 10; // Ensure it stays above other content
    border-bottom: 1px solid var(--border-color); // Optional: A line when sticky
  }

  h3 {
    font-family: @font-mono;
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 3rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--text-body);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
      font-family: @font-body;
      font-size: 0.9rem;
      color: var(--text-body);

      &::before {
        content: "→ ";
        color: var(--text-muted);
      }
    }
  }

  blockquote {
    margin: 4rem auto; // Center it
    padding: 2rem;
    border-left: 8px solid var(--accent-color); // More prominent border
    font-style: italic;
    font-size: 1.8rem; // Larger font
    line-height: 1.4;
    color: var(--text-title); // Stronger color
    background-color: var(--background-color-secondary);
    border-radius: 8px;
    max-width: 700px; // Limit width
  }

  pre {
    background: var(--code-bg);
    padding: 2rem;
    border-radius: 4px;
    font-family: @font-mono;
    font-size: 0.8rem;
    margin: 3rem 0;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9rem;

    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      font-family: @font-mono;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--text-muted);
      background: var(--code-bg);
    }

    td {
      color: var(--text-body);
    }

    tr:hover td {
      background: var(--code-bg);
    }
  }

  // KaTeX math styling
  .katex-display {
    margin: 2rem 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .katex {
    font-size: 1.1em;
  }

  hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 5rem 0;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 2rem 0;
    border-radius: 4px;
  }

  .full-bleed {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    max-width: none;
    border-radius: 0;
  }

  mark {
    background-color: var(--accent-color);
    color: var(--text-on-accent);
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
}

.related-projects {
  margin-top: 6rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);

  h2 {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--text-title);
    font-family: @font-mono;
    text-transform: uppercase;
    position: static; // Override sticky H2 for this section
    background-color: transparent;
    padding: 0;
    z-index: auto;
    border-bottom: none;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .related-project-card {
    display: block;
    padding: 1.5rem;
    background-color: var(--background-color-secondary);
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: var(--text-title);
      font-family: @font-display;
    }

    p {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 0;
    }
  }
}

.project-footer {
  margin-top: 4rem; // Adjust margin as related projects are now above it
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.7rem;

  a {
    color: var(--text-title);
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
}

@media (max-width: 1024px) {
  .project-page {
    flex-direction: column;
    .project-sidebar {
      display: none; // Hide sidebar on smaller screens
    }
    .main-content {
      max-width: 100%;
      padding: 0 1rem; // Add some horizontal padding
    }
  }

  .post-content {
    .full-bleed { // Adjust full-bleed for mobile to avoid horizontal scroll
      margin-left: -1rem;
      margin-right: -1rem;
      width: calc(100% + 2rem);
    }
  }
}

// Scroll-triggered fade-in effects
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
