<template>
  <el-row>
    <el-col :span="5">
      <geo></geo>
    </el-col>
    <el-col :span="5">
      <user></user>
    </el-col>
    <el-col :span="14">
      <navbar></navbar>
    </el-col>
  </el-row>
</template>

<script>
    import Geo from './geo'
    import User from './user'
    import Navbar from './navbar.vue'

    export default {
        components: {
          Geo,
          User,
          Navbar
        },
        name: "topbar"
    }
</script>

<style lang="scss">
  @import "./../../../assets/css/public/header/index.scss";
</style>
