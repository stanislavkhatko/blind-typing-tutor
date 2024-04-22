<script>
export default {
  name: "HeaderThemeModeSwitcher",
  data() {
    return {
      darkMode: localStorage.getItem('darkMode') || false
    }
  },
  mounted() {
    if(this.darkMode) document.documentElement.classList.add('dark')
  },
  methods: {
    toggleTheme() {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        this.darkMode = false
        localStorage.removeItem('darkMode')
      } else {
        html.classList.add('dark')
        this.darkMode = true
        localStorage.setItem('darkMode', 'yes')
      }
    }
  }
}
</script>

<template>
  <div :title="$t('general.toggleTheme')">
    <svg v-if="darkMode" @click="toggleTheme" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" color="white"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
    </svg>
    <svg v-else @click="toggleTheme" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
         class="cursor-pointer w-6 h-6">
      <path fill-rule="evenodd"
            d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
            clip-rule="evenodd"/>
    </svg>
  </div>
</template>

<style scoped>

</style>
