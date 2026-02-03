<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: true })
const content = ref('')

onMounted(() => {
  const modules = import.meta.glob('../content/contact.md', { as: 'raw', eager: true })
  if (modules['../content/contact.md']) {
    content.value = md.render(modules['../content/contact.md'])
  }
})
</script>

<template>
  <div class="contact-page">
    <div class="info-grid">
      <div class="info-sidebar technical">
        <div class="info-block">
          <label>STATUS</label>
          <p>AVAILABLE_FOR_PROJECTS</p>
        </div>
        <div class="info-block">
          <label>LOCATION</label>
          <p>NYC / FLORIDA</p>
        </div>
        <div class="info-block">
          <label>EMAIL</label>
          <p><a href="mailto:hi@JeffJassky.com">hi@JeffJassky.com</a></p>
        </div>
      </div>
      
      <div class="info-main">
        <article class="post-content" v-html="content"></article>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "../assets/less/typography.less";

.info-grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 4rem;
  margin-top: 2rem;
}

.info-sidebar {
  .info-block {
    margin-bottom: 3rem;
    
    label {
      display: block;
      font-size: 0.6rem;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }
    
    p {
      margin: 0;
      font-size: 0.75rem;
      color: var(--text-primary);
      
      a {
        color: inherit;
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
    }
  }
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>