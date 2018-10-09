<template>
    <div id="contain">
        <div class="head-title">
            <h2>写文章</h2>
        </div>
        <el-row>
            <el-col :span="2" class="title" :offset="1">标题:</el-col>
            <el-col :span="6">
                <el-input
                    placeholder="请输入标题"
                    clearable
                    v-model="title">
                </el-input>
            </el-col>
            <el-col :span="2" class="title" :offset="1">权限:</el-col>
            <el-col :span="4">
                    <el-dropdown @command="handleCommand">
                        <el-button type="success">
                            {{authorityName}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='{"authority":"1","authorityName":"公开"}'>公开</el-dropdown-item>
                            <el-dropdown-item command='{"authority":"2","authorityName":"仅自己可见"}'>仅自己可见</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
            </el-col>
            <el-col :span="3" :offset="2"><el-button type="success" round @click="save">提交</el-button></el-col>
        </el-row>
        <el-row>
            <el-col :span="2" class="title" :offset="1">标签:</el-col>
            <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>     
        </el-row>
        <div id="editor" type="text/plain"></div> 
        
    </div>
</template>
<script>
    import '../../../static/utf8-jsp/ueditor.config' 
    import '../../../static/utf8-jsp/ueditor.all'; 
    import '../../../static/utf8-jsp/lang/zh-cn/zh-cn'; 
export default{
    data(){
        return{
            authority:1,    //权限 1：公开 2：仅自己可见
            authorityName:'公开',
            dynamicTags: [],//标签
            inputVisible: false,
            inputValue: '',  //新建标签
            editor: '', //存储实例化的编辑器
            editordata: '', //要写入编辑器的内容
            title:'',   //标题
            acticleData:'',
            id:'',
        };
    },
    created(){
        let _this = this;
        var query = this.$route.query;
        console.log(query);
        if(query.id){
            this.id = query.id;
            this.getArticleData(query.id);
        }
    },
    mounted(){
        let _this = this;
        _this.editor = UE.getEditor('editor',{ 
        BaseUrl: '', 
        UEDITOR_HOME_URL: 'static/utf8-jsp/',
        });
        _this.editor.addListener("ready", function () {
            _this.editor.setContent(_this.editordata); // 确保UE加载完成后，放入内容。
        });
    },
    destroyed() {
        this.editor.destroy();
    },
    methods: {
      handleCommand(command) {
        command = JSON.parse(command)
        this.authority = +command.authority;
        this.authorityName = command.authorityName;
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      save() {
        var tag = this.dynamicTags.join(",");
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
        var createDate = Y+M+D+h+m;
        console.log(createDate);
        var params = {
            user:'nie',
            title: this.title,
            content: this.editor.getContent(),
            tag: tag,
            authority: this.authority,
            createDate: createDate
        }
        console.log(params);
        if(this.id){
            params.id = this.id;
            params.lastModifyUser = "li";
            var _this = this;
            this.$axios({
                url:"http://localhost:3000/updateArticle",
                method: 'POST',
                data:this.$qs.stringify(params),
            }).then(function(data){
                if(data.data.code == 200){
                    _this.$message({
                        message: '恭喜你，更新文章成功!',
                        type: 'success'
                    });
                    setTimeout(function(){
                        _this.$router.push({
                            path: '/detail',
                            query: {
                                id: _this.id
                            }
                        })
                    },2000);
                }else{
                    _this.$message.error(data.data.data.msg);
                }
            });
        }else{
            var _this = this;
            this.$axios({
                url:"http://localhost:3000/setArticle",
                method: 'POST',
                data:this.$qs.stringify(params),
            }).then(function(data){
                if(data.data.code == 200){
                    _this.$message({
                        message: '恭喜你，保存文章成功!',
                        type: 'success'
                    });
                    setTimeout(function(){
                        _this.$router.push({
                            path: '/detail',
                            query: {
                                id: data.data.data.id
                            }
                        })
                    },2000);
                }else{
                    _this.$message.error(data.data.data.msg);
                }
            });
        }
      },
      getArticleData(id){
        var _this = this;
        this.$axios.get('http://localhost:3000/oprArticle?id='+id).then(function(data){
            if(data.data.code == 200){
                data = data.data.data[0]
                _this.title = data.title;
                _this.editordata = data.content;
                _this.authority = data.authority;
                _this.dynamicTags = data.tag.split(",");
            }else{
                _this.$message.error(data.data.data.msg);
            }
        })
      },

    }
}
</script>
<style scoped>
.head-title{
    background-color: #5cb85c;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
.head-title h2{
    color: #ffffff
}
.el-row{
    height: 40px;
    margin-top: 30px;
    line-height: 40px;
}
.title{
    text-align: center;
    font-weight: bold;
}
.el-button--success{
    width: 150px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 100px;
    margin-left: 10px;
    vertical-align: bottom;
}
#editor{
    height: 700px;
    margin-top: 20px;
}
#contain{
    width: 1280px; 
}
.el-tag{
    height: 36px;
    line-height: 36px;
    font-size: 16px;
}
</style>