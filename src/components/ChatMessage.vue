<template>
  <div class="flex space-x-2 max-w-xs rounded overflow-hidden bg-gray-100 shadow-lg mb-2 p-2" 
      :class="{ 'bg-green-100 mr-0 ml-auto': owner }">
    <img class="h-12 w-12 rounded-full items-center" :src='avatar' alt="avatar" />
    <div class="flex-grow">
      <span class="text-xs font-bold mb02">{{ message.who }}</span>
      <p class="text-md text-gray-700">{{ message.what }}</p>
      <p class="text-xs text-right">{{ ts.toLocaleTimeString() }}</p>
    </div>
  </div>
</template>

<script>
 export default {
   props: ['message', 'sender'],
   computed: {
    messageClass() {
      return this.message.who === this.sender ? 'sent' : 'received';
    },
    ts() {
      return new Date(this.message.when);
    },
    avatar() {
      return `https://avatars.dicebear.com/api/initials/${this.message.who}.svg`;
    }
  }
}
</script>
