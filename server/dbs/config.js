module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/meituan',
  redis: {
    get host(){
      return '127.0.0.1'
    },
    get port(){
      return 6379
    }
  },
  smtp: {
    get host(){
      return 'smtp.qq.com'
    },
    get user(){
      return '1538104648@qq.com'
    },
    get pass(){
      return 'otjmiwhavyovfggc'
    },
    get code(){
      return () => {
        return Math.random().toString().slice(2,6).toUpperCase()
      }
    },
    get expire(){
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
