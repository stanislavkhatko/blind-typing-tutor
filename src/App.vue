<script>
import BuyMeACoffee from "./js/components/BuyMeACoffee.vue";
import GithubLink from "./js/components/GithubLink.vue";
import SimpleKeyboard from "./js/components/SimpleKeyboard.vue";
import Header from "./js/components/Header.vue";

export default {
  name: "App",
  components: {Header, GithubLink, BuyMeACoffee, SimpleKeyboard},
  data: () => ({
    input: "",
  }),
  methods: {
    onSimpleKeyboardChange(input) {
      console.log('onSimpleKeyboardChange');
      this.input = input;
    },
    onSimpleKeyboardKeyPress(button) {
      console.log("onSimpleKeyboardKeyPress", button);
    },
    // onInputChange(input) {
    //   this.input = input.target.value;
    // },
    handleKeyDown(event) {
      console.log(event.key);

      if (['Tab', 'Backspace', 'Escape', 'Shift', 'CapsLock', 'Control', 'Alt', 'Meta'].includes(event.key)) {
        event.preventDefault();
        return;
      }

      if (event.key === 'Enter') {
        this.input += '<br>';
      } else if (event.key === 'Backspace') {
        this.input += '<br>';
      } else {
        this.input += event.key;
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
}
</script>

<template>
  <div class="app bg-white dark:bg-black">
    <!--    <GithubLink/>-->

    <Header></Header>


    <div class="keyboard max-w-4xl mx-auto mt-20">

      <pre class="min-h-10 dark:text-white" v-html="input"></pre>
      <!--      <input-->
      <!--          :value="input"-->
      <!--          class="input block"-->
      <!--          @input="onInputChange"-->
      <!--          placeholder="Tap on the virtual keyboard to start"-->
      <!--      >-->
      <SimpleKeyboard class="m-auto" @onChange="onSimpleKeyboardChange" @onKeyPress="onSimpleKeyboardKeyPress"
                      :input="input"/>
    </div>


    <ul class="mt-10 ml-20 dark:text-white">
      <li class="line-through">Language</li>
      <li class="line-through">Theme</li>
      <li>input</li>
      <li>keyboard</li>
      <li>Mode (novice/practice)</li>
      <li>Speed stats</li>
      <li>Error stats</li>
      <li>Dictionary</li>
      <li>hide keyboard</li>
    </ul>

<!--    <BuyMeACoffee/>-->
  </div>
</template>

<style scoped>

.app {
  min-height: 100vh;
}

input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

</style>
