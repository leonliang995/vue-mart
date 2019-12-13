<template>
  <div class="home">

  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'home',
  components: {

  },
  created () {

    axios.get('/api/userInfo')
  }
}
</script>
