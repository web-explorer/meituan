<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar></top-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar></search-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import topBar from './topbar'
  import searchBar from './searchbar'

    export default {
        components: {
          topBar,
          searchBar
        },
        name: "index"
    }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/public/header/index";

</style>
