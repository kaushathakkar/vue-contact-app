import types from './types'
import { db } from '@/services/firebase'
var uniqid = require('uniqid')
export default {
  async getAllContacts({ commit }) {
    let contacts = [];
    await db()
      .ref(`/contacts`)
      .once('value', (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            contacts.push(item);
        });
        return contacts
      })
      commit(types.ALL_CONTACT, contacts)
  },
  async addContact({ commit }, contactInfo) {
    await db().ref('contacts/'+uniqid()).set(contactInfo.data);
    commit(types.ADD_CONTACT, contactInfo)
  },
  async editContact({ commit }, contactInfo) {
    await db().ref('contacts/'+contactInfo.key).update(contactInfo.data);
    commit(types.EDIT_CONTACT, { contact: contactInfo.data, key: contactInfo.key })
  },
  async removeContact({ commit }, contactId) {
    await db().ref('contacts/'+contactId).remove();
    commit(types.REMOVE_CONTACT, contactId)
  }
}
