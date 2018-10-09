<template>
  <div id="app">
    <nav-menu></nav-menu>
    <div id="content">
        <router-view/>
    </div>
    <back-top></back-top>
  </div>
</template>

<script>
    import NavMenu from './components/common/NavMenu.vue'
    import BackTop from './components/common/BackTop.vue'
    export default {
      name: 'HelloWorld',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },
      components:{
        NavMenu: NavMenu,
        BackTop: BackTop
      }  
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#content{
  width: 80%;
  margin-left: 10%;
  margin-top: 30px;
  display:flex; 
  justify-content:center; 
  align-items:center;
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 70px;
  line-height: 70px;
}
.el-pager li{
  font-size:18px;
}
.el-pagination span.el-pagination__total {
    font-size: 18px !important;
}

.el-input--suffix .el-input__inner{
    font-size: 16px;
}
.el-checkbox__label{
    font-size: 16px;
    font-weight: bold;
}
.CodeMirror{
    height: 370px !important;
}
</style>
