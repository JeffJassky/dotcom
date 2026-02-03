<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark-theme',
  valueLight: 'light-theme',
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="app-container">
    <header>
      <div class="logo technical">
        <router-link to="/">JEFF JASSKY</router-link>
        <span class="role"> / CREATIVE TECHNOLOGIST</span>
      </div>
      <nav>
        <router-link to="/">Index</router-link>
        <router-link to="/contact">Info</router-link>
        <button @click="toggleDark()" class="theme-toggle technical">
          {{ isDark ? '[ LIGHT ]' : '[ DARK ]' }}
        </button>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="technical">
      <div>© 2026 JEFF JASSKY</div>
      <div>CREATIVE TECHNOLOGIST // NYC + FLA</div>
    </footer>
  </div>
</template>

<style lang="less">
@import "./assets/less/main.less";
</style>