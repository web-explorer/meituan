<template>
  <div class="exit"></div>
</template>

<script>
    export default {
      middleware: async ctx => {
        let {status, data} = await ctx.$axios.get('/users/exit')
        if(status == 200 && data.code == 0){
          window.location.href = '/'
        }
      },
      layout: 'blank',
        name: "exit"
    }
</script>

<style scoped>

</style>
