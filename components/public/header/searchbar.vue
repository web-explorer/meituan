<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input @input="input" @blur="blur" @focus="focus" v-model="search" placeholder="搜索商家或地点"></el-input>
          <button class="el-button el-button--primary" @click="startSearch">
            <i class="el-icon-search"></i>
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, idx) in $store.state.home.hotPlace" :key="idx">
              <a :href="`/products?city=${$store.state.geo.position.city}&province=${$store.state.geo.position.province}&keyword=${item.name}`">{{ item.name }}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, idx) in searchList" :key="idx">
              <a :href="`/products?city=${$store.state.geo.position.city}&province=${$store.state.geo.position.province}&keyword=${item.name}`">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a :href="`/products?city=${$store.state.geo.position.city}&province=${$store.state.geo.position.province}&keyword=${item.name}`" v-for="(item, idx) in $store.state.home.hotPlace" :key="idx">{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import _ from 'lodash'

    export default {
      data() {
        return {
          searchList: [],
          hotPlace: [],
          search: '',
          isFocus: false
        }
      },
      computed: {
        isHotPlace() {
          return this.isFocus && !this.search
        },
        isSearchList() {
          return this.isFocus && this.search
        }
      },
      methods: {
        input: _.debounce(async function() {
          let city = this.$store.state.geo.position.city.replace('市', '')
          this.searchList = []
          let {status, data: {top}} = await this.$axios.get('/search/top', {
            params: {
              input: this.search,
              city
            }
          })
          this.searchList = top.length > 10 ? top.slice(0, 10) : top
        }, 300),
        blur() {
          setTimeout(() => {
            this.isFocus = false
          }, 200)
        },
        focus() {
          this.isFocus = true
        },
        startSearch() {
          location.href = `/products?city=${this.$store.state.geo.position.city}&province=${this.$store.state.geo.position.province}&keyword=${this.search}`
        }
      },
        name: "searchbar"
    }
</script>

<style scoped>

</style>
