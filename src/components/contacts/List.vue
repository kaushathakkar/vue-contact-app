<template>
  <b-container>
    <b-row class="mb-lg-4">
      <b-col cols="4" class="text-left"><b-button @click="modalShow = true">Create Contact</b-button></b-col>
    </b-row>
    <div v-if="contactList.length" class="border">
      <b-row class="mb-lg-3 mt-lg-3">
        <b-col cols="3"><strong>Name</strong></b-col>
        <b-col cols="3"><strong>Email</strong></b-col>
        <b-col cols="3"><strong>Phone</strong></b-col>
        <b-col cols="3"><strong>Action</strong></b-col>
      </b-row>
      <b-row class="mb-lg-2" v-for="item in contactList" :key="item.key">
        <b-col cols="3" mb="3">{{item.name}}</b-col>
        <b-col cols="3" mb="3">{{item.email}}</b-col>
        <b-col cols="3" mb="2">{{item.phone}}</b-col>
        <b-col cols="3" mb="3">
          <b-button class="bg-primary" @click="editContact(item)">Edit</b-button> | <b-button class="bg-danger" @click="removeContact(item)">Delete</b-button>
        </b-col>
      </b-row>
    </div>
    <ContactForm v-if="modalShow" :edit-data="editData" :modal="modalShow" @close="modalShow = false" />
  </b-container>
</template>
<script>
  import ContactForm from '@/components/contacts/ContactForm.vue'
  export default {
    components: {
      ContactForm
    },
    computed: {
      contactList () {
        return this.$store.getters['contacts/allContacts']
      }
    },
    mounted(){
      this.$store.dispatch('contacts/getAllContacts')
    },
    data() {
      return {
        modalShow: false,
        editData: null,
      }
    },
    methods: {
      editContact(contact) {
        this.editData = contact
        this.modalShow = true
      },
      async removeContact(contact) {
        await this.$store.dispatch('contacts/removeContact', contact.key)
      }
    }
  }
</script>