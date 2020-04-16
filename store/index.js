import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    // 刷新当前页面，或者跳转到新页面（a链接。。。）都会运行一次nuxtServerInit()，即一个页面对应一个store
    async nuxtServerInit({commit}, {req, app}) {
      if(req.ctx && req.ctx.query && req.ctx.query.city && req.ctx.query.province){
        const query = req.ctx.query
        commit('geo/setPosition', {city: query.city, province: query.province})
      }
      else {
        const {status: statusP, data: {province, city}} = await app.$axios.get('/geo/getPosition')
        commit('geo/setPosition', statusP == 200 ? {city, province} : {city: '', province: ''})
      }

      const {status: statusM, data: {menu}} = await app.$axios.get('/geo/menu')
      commit('home/setMenu', statusM == 200 ? {menu} : {menu: []})

      const {status: statusH, data: {hotPlace}} = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlace', statusH == 200 ? hotPlace : [])
    }
  }
})

export default store
