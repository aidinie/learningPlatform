<template>
<div id="contain">
    <el-row class="title">
        <el-col :span="4">
            <h3 class="panel-title">查看文章</h3>
        </el-col>
        <el-col :span="10" :offset="2" class="lh">
            <el-input
                placeholder="请输入内容"
                v-model="key"
                v-on:input="change"
                clearable>
            </el-input>
        </el-col>
        <el-col class="lh" :span="4" :offset="2">
            <router-link to="/oprArticle">
                <el-button type="primary" round>写文章</el-button>
            </router-link>
        </el-col>
    </el-row>
    <el-table
    :data="articleData"
    stripe
    style="width: 100%">
    <el-table-column
      label="序号"
      type="index"
      width="80">
      <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * 10 + 1}} </span></template>
    </el-table-column>
    <el-table-column
      label="名称"
      >
      <template slot-scope="scope">
            <router-link :to="{path:'/detail',query:{id:scope.row.id}}">
                {{scope.row.title}}
            </router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签">
    </el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="120">
    </el-table-column>
    <el-table-column
      prop="lastModifyUser"
      label="最后修改人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="创建日期"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120"
      >
      <template slot-scope="scope">
        <el-button @click="updateArticle(scope.row.id)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteArticle(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  @current-change="handleCurrentChange"
  :current-page.sync="currentPage"
  :page-size="10"
  layout="total, prev, pager, next"
  :total="total"
  prev-text="上一页"
  next-text="下一页">
</el-pagination>
</div>
</template>
<script>
export default{
    data(){
        return{
            articleData:[],
            currentPage:1,
            total:1,
            key:''
        }
    },
    created(){
        this.getAllArticle();
    },
    methods:{
        getAllArticle(){
            var _this = this;
            var params = {
                page: _this.currentPage,
                author: "nie",
                type: 1
            }
            if(this.key){
                params.key = this.key;
            }
            this.$axios.get("http://localhost:3000/getAllArticle",{
                params: params
            }).then(function(data){
                if(data.data.code == 200){
                    _this.articleData = data.data.data;
                    _this.total = data.data.count;
                }else{
                    _this.$message.error(data.data.data.msg);
                }
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllArticle();
        },
        updateArticle(id){
            this.$router.push({
                path: '/oprArticle',
                query: {
                    id: id
                }
            })
        },
        deleteArticle(id){
            var _this = this;
            this.$axios.get("http://localhost:3000/deleteArticle?id="+id).then(function(data){
                if(data.data.code == 200){
                    _this.$message({
                        message: '恭喜你，删除文章成功!',
                        type: 'success'
                    });
                    _this.currentPage = 1;
                    _this.getAllArticle();
                }else{
                    _this.$message.error(data.data.data.msg);
                }
            })
        },
        change($val){
            this.currentPage = 1;
            this.getAllArticle();
        }
    }
}
</script>
<style scoped>
.title{
    background-color: #5cb85c;
}
.panel-title{
    color: #ffffff;
    text-align: center;
}
#contain{
    width: 1280px; 
    font-size: 18px;
}
.lh{
    line-height: 70px;
    text-align: center;
}
.el-pagination{
    text-align: right;
    margin-top: 10px;
}
a{
    text-decoration: none;
    color: #337ab7;
}
.el-table{
    margin-top: 20px;
    font-size: 18px;
}
</style>