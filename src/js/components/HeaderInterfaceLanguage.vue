<script>
export default {
  name: "HeaderInterfaceLanguage",
  data() {
    return {
      languages: {
        en: {nativeName: 'English'},
        uk: {nativeName: 'Українська'}
      }
    }
  },
  methods: {
    setLocaleInStorage(event) {
      localStorage.setItem('locale', event.target.value)
    }
  }
}
</script>

<template>
  <select v-model="$i18n.locale" @change="setLocaleInStorage">
    <option v-for="(lng, i) in Object.keys(languages)" :key="`Lang${i}`" :value="lng">
      {{ languages[lng].nativeName }}
    </option>
  </select>
</template>

<style scoped>

</style>
