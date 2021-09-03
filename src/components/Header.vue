<template>
  <header class="bg-indigo-600">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div v-if="username" class="w-full py-4 flex items-center justify-between border-b border-indigo-500 lg:border-none">
        <div class="flex items-center">
          <h1 class="text-3xl text-white my-2">{{ username }}</h1>
        </div>
        <div class="ml-10 space-x-4">
          <button @click="signout()" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
            Sign out
          </button>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center">
          <h1 class="text-3xl text-white my-2">Gun.js Chat</h1>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import { user } from '../user';
  
  export default {
    computed: {
      username() {
        return this.$store.state.username;
      }
    },
    methods: {
      signout() {
        user.leave();
        this.$store.state.username = '';
      }
    }
  }
</script>