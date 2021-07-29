<template>
  <div class="contacts">
    <h1>Contacts</h1>
    <b-row>
      <List></List>
    </b-row>
  </div>
</template>
<script>
  import List from '@/components/contacts/List.vue'
  export default {
    components: {
      List
    }
  }
</script>