<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const md = new MarkdownIt({ 
  html: true,
  linkify: true,
  typographer: true 
})

const content = ref('')
const metadata = ref({ title: '', subtitle: '', year: '' })

const loadProject = () => {
  const modules = import.meta.glob('../content/projects/*.md', { as: 'raw', eager: true })
  const path = `../content/projects/${route.params.id}.md`
  
  if (modules[path]) {
    let raw = modules[path]
    
    // Extract metadata before rendering
    const titleMatch = raw.match(/^# \*\*(.*?)\*\*/m) || raw.match(/^# (.*)/m)
    metadata.value.title = titleMatch ? titleMatch[1].replace(/\*/g, '') : ''
    
    const yearMatch = raw.match(/### _?(\d{4})_?/m)
    metadata.value.year = yearMatch ? yearMatch[1] : ''

    // Render remaining content
    content.value = md.render(raw)
  } else {
    content.value = '<h1 class="technical">404_NOT_FOUND</h1>'
  }
}

onMounted(loadProject)
watch(() => route.params.id, loadProject)
</script>

<template>
  <div class="project-page">
    <nav class="project-nav technical">
      <router-link to="/">&lt; BACK_TO_INDEX</router-link>
      <span v-if="metadata.year">YEAR: {{ metadata.year }}</span>
    </nav>
    
    <article class="post-content" v-html="content"></article>

    <div class="project-footer technical">
      <router-link to="/">&lt; RETURN_TO_COLLECTION</router-link>
    </div>
  </div>
</template>

<style lang="less">
@import "../assets/less/typography.less";

.project-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6rem;
  font-size: 0.7rem;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
}

.post-content {
  h1 {
    font-size: 5rem;
    line-height: 0.85;
    margin-bottom: 2rem;
    font-family: @font-sans;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.04em;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
  }

  h3 {
    font-family: @font-mono;
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 3rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
      font-family: @font-sans;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      
      &::before {
        content: "→ ";
        color: var(--text-muted);
      }
    }
  }

  blockquote {
    margin: 4rem 0;
    padding-left: 2rem;
    border-left: 4px solid var(--accent-color);
    font-style: italic;
    font-size: 1.5rem;
    color: var(--text-secondary);
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

  hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 6rem 0;
  }
}

.project-footer {
  margin-top: 8rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.7rem;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
}
</style>