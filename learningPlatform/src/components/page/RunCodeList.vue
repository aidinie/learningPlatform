<template>
    <div id="contain">
        <el-row class="title">
            <el-col :span="4">
                <h3 class="panel-title">作品列表</h3>
            </el-col>
            <el-col :span="10" :offset="8" class="lh">
                <el-input
                    placeholder="搜索作品"
                    v-model="key"
                    v-on:input="change"
                    clearable>
                </el-input>
            </el-col>
        </el-row>
        <el-table
            :data="runCodeData"
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
                <router-link :to="{path:'/runCode',query:{id:scope.row.runid}}">
                    {{scope.row.name}}
                </router-link>
            </template>
        </el-table-column>
        <el-table-column
            prop="owner"
            label="作者">
        </el-table-column>
        <el-table-column
            prop="createdate"
            label="创建日期">
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
            runCodeData:[],
            currentPage:1,
            total:0,
            key:''
        }
    },
    created(){
        this.getAllRunCode();
    },
    methods:{
        getAllRunCode(){
            var _this = this;
            var params = {
                page: _this.currentPage,
            }
            if(this.key){
                params.key = this.key;
            }
            this.$axios.get("http://localhost:3000/getAllRunCode",{
                params: params
            }).then(function(data){
                if(data.data.code == 200){
                    _this.runCodeData = data.data.data;
                    _this.total = data.data.count;
                }else{
                    _this.$message.error(data.data.msg);
                }
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllRunCode();
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
                    _this.$message.error(data.data.msg);
                }
            })
        },
        change($val){
            this.currentPage = 1;
            this.getAllRunCode();
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