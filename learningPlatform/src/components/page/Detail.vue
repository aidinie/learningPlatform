<template>
    <div id="detail">
        <div class="detailTitle" >
            <div class="title">{{title}}</div>
        </div>
        <div class="back">
            <router-link to="/article">
                <el-button type="primary" round>返回</el-button>
            </router-link>
        </div>
        <div class="detailContent" v-html="content"></div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                title:'',
                content:''
            }
        },
        created(){
            let _this = this;
            var query = this.$route.query;
            if(query.id){
                this.id = query.id;
                this.getArticleData(query.id);
            }
        },
        methods: {
            getArticleData(id){
                var _this = this;
                this.$axios.get('http://localhost:3000/oprArticle?id='+id).then(function(data){
                    if(data.data.code == 200){
                        data = data.data.data[0]
                        _this.title = data.title;
                        _this.content = data.content;
                    }else{
                        _this.$message.error(data.data.data.msg);
                    }
                })
            },
        }
            
        
    }

</script>
<style scoped>
#detail{
    width: 1280px;
    position: relative;
}
.detailContent {
    width: 100%;
    margin: 20px auto;
    border: 1px solid #d4d4d4;
    box-shadow: 2px 2px 5px #d3d6da;
    background-color: #fff;
    padding: 20px;
}
.title{
    font-size: 26px;
    text-align: center;
    font-weight: bold;
    height: 41px;
}
.detailContent{
    font-size: 18px !important;
}
.back{
    position: absolute;
    right: 10px;
    top: 0;
}
</style>