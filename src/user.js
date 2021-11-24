import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import store from './store';

// Database
const server = require('http').createServer().listen(8080);
const db = GUN({web: server});

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username

user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    store.commit('setUsername', alias);

    console.log(`signed in as ${store.username}`);
});