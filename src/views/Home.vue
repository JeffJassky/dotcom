<script setup>
import { ref, onMounted } from 'vue'

const featuredProjects = ref([])
const archiveProjects = ref([])

onMounted(() => {
  const modules = import.meta.glob('../content/projects/*.md', { as: 'raw', eager: true })
  const featured = []
  const archive = []

  for (const path in modules) {
    const id = path.split('/').pop().replace('.md', '')
    const content = modules[path]

    // Extract title
    const titleMatch = content.match(/^#\s*(\*\*|)(.*?)\1/m)
    const title = titleMatch ? titleMatch[2].replace(/\*/g, '').trim() : id

    // Extract Tags
    const tagsMatch = content.match(/^TAGS:\s*(.*)/m)
    const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()) : []

    // Extract Featured
    const featuredMatch = content.match(/^FEATURED:\s*(true|false)/mi)
    const isFeatured = featuredMatch ? featuredMatch[1].toLowerCase() === 'true' : false

    // Extract Year
    const yearMatch = content.match(/^YEAR:\s*(.*)/m)
    const year = yearMatch ? yearMatch[1].trim() : ''

    // Extract first image
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/)
    const image = imageMatch ? imageMatch[1] : null

    // Extract description: Skip title, tags, images, and metadata
    const lines = content.split('\n')
    let description = ''
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line &&
          !line.startsWith('#') &&
          !line.startsWith('!') &&
          !line.startsWith('TAGS:') &&
          !line.startsWith('FEATURED:') &&
          !line.startsWith('YEAR:') &&
          !line.startsWith('[') &&
          !line.startsWith('---') &&
          line.length > 20) {
        description = line.replace(/[*_]/g, '').slice(0, 200) + (line.length > 200 ? '...' : '')
        break
      }
    }

    const project = { id, title, description, tags, year, image, isFeatured }

    if (isFeatured) {
      featured.push(project)
    } else {
      archive.push(project)
    }
  }

  // Sort featured by year (newest first)
  featuredProjects.value = featured.sort((a, b) => {
    const yearA = a.year.split('-')[0] || '0'
    const yearB = b.year.split('-')[0] || '0'
    return yearB.localeCompare(yearA)
  })

  // Sort archive by year (newest first)
  archiveProjects.value = archive.sort((a, b) => {
    const yearA = a.year.split('-')[0] || '0'
    const yearB = b.year.split('-')[0] || '0'
    return yearB.localeCompare(yearA)
  })
})
</script>

<template>
  <div class="home">
    <!-- Featured Projects -->
    <div class="index-header technical">
      <span>FEATURED_WORKS</span>
      <span>{{ featuredProjects.length }} PROJECTS</span>
    </div>

    <section class="featured-grid">
      <router-link
        v-for="project in featuredProjects"
        :key="project.id"
        :to="'/project/' + project.id"
        class="featured-card"
      >
        <div class="card-image" v-if="project.image">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="card-content">
          <div class="card-year technical">{{ project.year }}</div>
          <h2 class="card-title">{{ project.title }}</h2>
          <p class="card-desc">{{ project.description }}</p>
          <div v-if="project.tags.length" class="card-tags">
            <span
              v-for="tag in project.tags.slice(0, 4)"
              :key="tag"
              class="tag technical"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </router-link>
    </section>

    <!-- Archive Projects -->
    <div class="archive-header technical" v-if="archiveProjects.length">
      <span>ARCHIVE</span>
      <span>{{ archiveProjects.length }} PROJECTS</span>
    </div>

    <section class="archive-list" v-if="archiveProjects.length">
      <router-link
        v-for="project in archiveProjects"
        :key="project.id"
        :to="'/project/' + project.id"
        class="archive-row"
      >
        <span class="archive-year technical">{{ project.year }}</span>
        <span class="archive-title">{{ project.title }}</span>
        <span
          class="archive-tags technical"
          >{{ project.tags.slice(0, 3).join(' / ') }}</span
        >
        <span class="archive-arrow technical">↗</span>
      </router-link>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import "../assets/less/typography.less";

.index-header, .archive-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  font-size: 0.6rem;
  color: var(--text-muted);
}

.archive-header {
  margin-top: 6rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-color);
}

/* Featured Grid */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.featured-card {
  display: block;
  text-decoration: none;
  color: var(--text-title);
  border: none;
  border-radius: 12px;
  background: var(--card-bg);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  box-shadow: var(--shadow-soft);

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-hover);

    .card-image img {
      transform: scale(1.05);
    }

    .card-title {
      color: var(--text-title); // Keep title consistent on hover
    }
  }
}

.card-image {
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: var(--bg-secondary);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  // Atmospheric radial gradient overlay
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 100%);
    pointer-events: none;
  }
}

.card-content {
  padding: 2rem;
  background: var(--card-bg);
}

.card-year {
  font-size: 0.6rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.card-title {
  font-family: @font-display;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  line-height: 1.1;
  letter-spacing: -0.04em;
  transition: color 0.3s;
  color: var(--text-title);
}

.card-desc {
  font-family: @font-body;
  font-size: 1rem;
  color: var(--text-body);
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    font-size: 0.55rem;
    padding: 0.25rem 0.5rem;
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    color: var(--text-muted);
  }
}

/* Archive List */
.archive-list {
  border-top: 1px solid var(--border-color);
}

.archive-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 30px;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-title);
  transition: all 0.2s;

  &:hover {
    padding-left: 1rem;
    background: var(--bg-secondary);

    .archive-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.archive-year {
  font-size: 0.65rem;
  color: var(--text-muted);
}

.archive-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-title);
}

.archive-tags {
  font-size: 0.6rem;
  color: var(--text-muted);
  text-align: right;
  padding-right: 1rem;
}

.archive-arrow {
  font-size: 0.8rem;
  color: var(--text-muted);
  opacity: 0;
  transform: translateX(-0.5rem);
  transition: all 0.2s;
}

/* Responsive */
@media (max-width: 900px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .card-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .archive-row {
    grid-template-columns: 70px 1fr 30px;
  }

  .archive-tags {
    display: none;
  }

  .card-image {
    height: 180px;
  }
}
</style>
