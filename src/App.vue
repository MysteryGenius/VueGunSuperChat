<template>
    <Header />
    <Chat />
</template>

<script>
  import { db, user} from './user.js'

  export default {
    mounted() {
      console.log(user.alias)
    } 
}
</script>

<script setup>
  import Header from './components/Header.vue'
  import Chat from './components/Chat.vue'
</script>