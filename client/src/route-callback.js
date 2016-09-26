import store from './index.js';
import { fetchMessages } from '../actions/messages.js';

module.exports = {
    onMessagesEnter: store.dispatch(fetchMessages());
}