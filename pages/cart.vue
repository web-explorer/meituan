<template>
  <div class="page-cart">
    <el-row>
      <el-col
        v-if="cart.length"
        :span="24"
        class="m-cart">
        <list :cart-data="cart"/>
        <p>
          应付金额：<em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button
            type="primary"
            @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col
        v-else
        class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
  import List from './../components/cart/list'
  export default {
    components:{
      List
    },
    data(){
      return {
        cart:[]
      }
    },
    computed:{
      total(){
        let total=0;
        this.cart.forEach(item=>{
          total+=item.price*item.count
        })
        return total
      }
    },
    methods:{
      submit: async function(){
      }
    },
    async asyncData(ctx){
      let response=await ctx.$axios.get('/cart/detail')
      let res = response.data
      let products = res.data.products
      const cart = products.map(item => {
        return {
          name: item.product.name,
          price: item.product.biz_ext.cost,
          count: item.num
        }
      })
      return {
        cart
      }
    }

  }
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
