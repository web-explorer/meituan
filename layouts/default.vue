<template>
  <el-container class="layout-default">
    <el-header height="auto">
      <m-header></m-header>
    </el-header>
    <el-main>
        <nuxt />
    </el-main>
    <el-footer height="100%">
      <m-footer></m-footer>
    </el-footer>
  </el-container>
</template>

<script>
  import MHeader from '@/components/public/header'
  import MFooter from '@/components/public/footer'

  export default {
    components: {
      MHeader,
      MFooter
    }
  }
</script>

<style scoped>
  @import "./../assets/css/public/layout.scss";
</style>
