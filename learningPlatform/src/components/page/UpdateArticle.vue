<template>
    <div id="contain">
        <div class="head-title">
            <h2>写文章</h2>
        </div>
        <el-row>
            <el-col :span="2" class="title" :offset="2">标题:</el-col>
            <el-col :span="4">
                <el-input
                    placeholder="请输入标题"
                    clearable
                    v-model="title">
                </el-input>
            </el-col>
            <el-col :span="2" class="title">权限:</el-col>
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
            <el-col :span="3" :offset="1"><el-button type="success" round @click="save">提交</el-button></el-col>
        </el-row>
        <el-row>
            <el-col :span="2" class="title" :offset="2">标签:</el-col>
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
        <!-- <el-row>
            <el-col :offset="2" :span="15"> -->
                <div id="editor" type="text/plain"></div> 
            <!-- </el-col>
        </el-row> -->
        
    </div>
</template>
<script>
    import '../../../static/utf8-jsp/ueditor.config' 
    import '../../../static/utf8-jsp/ueditor.all'; 
    import '../../../static/utf8-jsp/lang/zh-cn/zh-cn'; 
    import axios from 'axios'
export default{
    data(){
        return{
            authority:1,
            authorityName:'公开',
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            editor: '', 
            editordata: '', 
            xierudata:  '<p><strong>UE加载完成后写入数据</strong></p><p><strong>nnn</strong></p><p>mppm</p>',
            title:'',
            acticleData:''
        };
    },
    created(){
        let _this = this;
        var query = this.$route.query;
        console.log(query);
        if(query.id){
            this.getArticleData();
        }
    },
    mounted(){
        let _this = this;
        console.log(111);
        _this.editor = UE.getEditor('editor',{ 
        BaseUrl: '', 
        UEDITOR_HOME_URL: 'static/utf8-jsp/', 
        // toolbars:[] 
        });
        _this.editor.addListener("ready", function () {
            // _this.ue.setContent(_this.xierudata); // 确保UE加载完成后，放入内容。
            console.log(222);
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
          console.log(this.editor.getContent());
          console.log(this.dynamicTags);
          console.log(this.title);
          console.log(this.authority);

      },

      getArticleData(){
        var _this = this;
        this.$axios.get('/api/oprArticle?oprType=getArticle&id=646&callback=cb').then(function(data){
            console.log(data);
            // _this.xierudata = data.data.content;
            // _this.dynamicTags = data.data.tag.split(",");
            // _this.authority = data.data.authority;
            // _this.title = data.data.title;
            console.log(_this.title);
        })
      }

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
    width: 1200px; 
}
</style>