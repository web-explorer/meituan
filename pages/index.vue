<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu></emenu>
      </el-col>
      <el-col :span="19">
        <life></life>
      </el-col>
    </el-row>
    <el-row :span="24">
      <artistic></artistic>
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/emenu.vue'
import Life from '@/components/index/life.vue'
import Artistic from '@/components/index/artistic.vue'

export default {
  components: {
    Emenu,
    Life,
    Artistic
  }
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/index/index.scss";
</style>
