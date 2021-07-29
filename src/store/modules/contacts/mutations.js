import types from './types'
export default {
  [types.ALL_CONTACT](state, contacts) {
    state.allContacts = contacts
  },
  [types.ADD_CONTACT] (state, contact) {
    state.allContacts.push(contact.data)
  },
  [types.EDIT_CONTACT](state, {contact, key}) {
    let index = state.allContacts.findIndex(
      (item) => item.key == key
    )
    state.allContacts[index] = contact
  },
  [types.REMOVE_CONTACT](state, contactId) {
    let index = state.allContacts.findIndex(
      (item) => item.key == contactId
    )
    state.allContacts.splice(index, 1)
  }
}
