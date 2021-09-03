<template>
  <div class="rounded flex flex-col bg-blue-50 h-screen">
    <h2 class="text-4xl text-gray-700 text-center underline font-bold">GUN SuperChat</h2>
    <div v-if="username" class="w-96 mx-auto mt-2 space-y-2">
      <main on:scroll='debouncedWatchScroll' class="bg-gray-200 rounded-md p-2">
        <li v-for="message in messages" :key="message.when" class="list-none">
          <ChatMessage :message='message' :sender='username' />
        </li>
      </main>
      <form @submit.prevent="sendMessage" class="flex space-x-1">
        <input class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md w-full border-0 p-2" type="text" placeholder="Type a message..." v-model='newMessage' maxlength="100" />
        <button type="submit" :disabled='!newMessage' class="bg-white rounded" :class="{ 'opacity-50' : !newMessage }">💥</button>
      </form>
    </div>
    <main v-else>
      <Login />
    </main>
  </div>
</template>
<script>
  import Login from './Login.vue';
  import ChatMessage from './ChatMessage.vue';
  import { user } from '../user';
  import debounce from 'lodash.debounce';
  import GUN from 'gun';
  const db = GUN();
  export default {
    components: {
      Login,
      ChatMessage
    },
    data() {
      return {
        newMessage: '',
        messages: [],
        scrollBottom: true,
        lastScrollTop: 0,
        canAutoScroll: true,
        unreadMessages: false,
      };
    },
    computed: {
      username() {
        return this.$store.state.username;
      },
    },
    mounted() {
      var match = {
        // lexical queries are kind of like a limited RegEx or Glob.
        '.': {
          // property selector
          '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
        },
        '-': 1, // filter in reverse
      };
      db.get('uwu-chat')
        .map(match)
        .once(async (data, id) => {
          if (data) {
            // Key for end-to-end encryption
            const key = '#foo';
            var message = {
              // transform the data
              who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
              what: (await SEA.decrypt(data.what, key)) + '', // force decrypt as text.
              when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
            };
            if (message.what) {
              this.messages = [...this.messages.slice(-100), message].sort((a, b) => a.when - b.when);
              if (this.canAutoScroll) {
                this.autoScroll();
              } else {
                this.unreadMessages = true;
              }
            }
          }
        });
    },
    methods: {
      debouncedWatchScroll() {
        debounce(this.watchScroll, 1000)
      },
      autoScroll() {
        // setTimeout(() => this.scrollBottom.scrollIntoView({ behavior: 'auto' }), 50);
        this.unreadMessages = false;
      },
      
      watchScroll(e) {
        canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
        lastScrollTop = e.target.scrollTop;
      },
      async sendMessage() {
        const secret = await SEA.encrypt(this.newMessage, '#foo');
        const message = user.get('all').set({ what: secret });
        const index = new Date().toISOString();
        db.get('uwu-chat').get(index).put(message);
        this.newMessage = '';
        this.canAutoScroll = true;
        this.autoScroll();
      }
    },
  }
</script>
