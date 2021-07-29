<template>
  <b-modal 
    v-model="show" 
    id="modal-prevent-closing"
    title="Contact Form"
    ok-title="Save"
    @hidden="resetModal"
    @ok="handleOk">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required" >
        <b-form-input id="name-input" v-model="form.name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email" label-for="email" invalid-feedback="Email is required">
        <b-form-input id="email" type="email" v-model="form.email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Address1" label-for="address1" invalid-feedback="Address1 is required">
        <b-form-input id="address1" v-model="form.address1" required></b-form-input>
      </b-form-group>
      <b-form-group label="Address2" label-for="address2" invalid-feedback="Address2 is required">
        <b-form-input id="address2" v-model="form.address2" required></b-form-input>
      </b-form-group>
      <b-form-group label="Phone" label-for="phone" invalid-feedback="Phone is required">
        <b-form-input id="phone" type="number" v-model="form.phone" required></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>
<script>
  export default {
    props: ['modal', 'editData'],
    data() {
      return {
        show: this.modal,
        loading: false,
        form: {
          name: '',
          email: '',
          address1: '',
          address2: '',
          phone: '',
          key: ''
        },
      }
    },
    mounted () {
      if (this.editData && this.editData.key) {
        this.form = this.editData
        this.form.key = this.editData.key
      } else {
        this.form = {
          name: '',
          email: '',
          address1: '',
          address2: '',
          phone: '',
          key: ''
        }
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        return valid
      },
      resetModal() {
        this.$emit('close')
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          alert('Invalid/missing data')
          return
        }
        this.loading = true
        try {
          let apiCall = 'contacts/addContact'
          let contactInfo = { data: this.form }
          if (this.form.key) {
            //edit call
            apiCall = 'contacts/editContact'
            contactInfo.key = this.form.key
          }
          await this.$store.dispatch(apiCall, contactInfo)
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>