<template>
<div>
    <el-row>
        <el-col :span="3" :offset="4">
            <router-link to="/index">
                <img src="../../assets/logo.png" alt="" height="50px" width="105px" style="margin-top:10px">
            </router-link>
        </el-col>
        <el-col :span="8" :offset="1">
                <el-menu 
                    :default-active="activeIndex" 
                    class="el-menu-demo" 
                    mode="horizontal" 
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                        <el-menu-item index="1" class="index">
                            <router-link to="/index" class="link">
                                主页
                            </router-link>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">知识库</template>
                            <el-menu-item index="2-1">
                                <router-link to="/oprArticle" class="link">
                                    写文章
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <router-link to="/article" class="link">
                                    查看文章
                                </router-link>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">在线运行代码</template>
                            <el-menu-item index="3-1">
                                <router-link to="/runCode" class="link">
                                    在线运行代码
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <router-link to="/runCodeList" class="link">
                                    作品列表
                                </router-link>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item index="4">
                            <router-link to="/question" class="link">
                                code kata 
                            </router-link>
                        </el-menu-item>
               </el-menu>
        </el-col>
    </el-row>
   
</div>
</template>  
  <script>
    export default {
      data() {
        return {
          activeIndex: '1'
        };
      },
      created(){
          var path = this.$route.path;
          if(path == "/oprArticle"){
            this.activeIndex = '2-1';
          }else if(path == "/article"){
            this.activeIndex = '2-2';
          }else if(path == "/runCode"){
            this.activeIndex = '3-1';
          }else if(path == "/runCodeList"){
            this.activeIndex = '3-2';
          }else if(path == "/question"){
            this.activeIndex = '4';
          }
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
  </script>
<style scoped>
    .el-menu{
        height: 70px;
    }
    .el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu .el-submenu__title{
        height: 70px;
        line-height: 70px;
    }
    .el-menu--horizontal>.index{
        margin-left: 50px;
    }
    .el-row{
        background-color: rgb(84, 92, 100);
        height: 70px;
    }
    .logo{
        height: 70px;
        line-height: 70px;
    }
    .link{
        text-decoration: none;
        height: 100%;
        display: block;
        color: #ffffff;
    }
    .router-link-active{
        color: rgb(255, 208, 75);
    }
</style>