<template>
    <div id="contain">
        <div class="head-title">
            <h2>在线运行代码</h2>
        </div>
        <el-row>
            <el-col :span="4">
                <div class="title">RunCode标题:</div>
            </el-col>
            <el-col :span="10">
                <el-input
                    placeholder="请输入标题"
                    v-model="name"
                    clearable
                    >
                </el-input>
            </el-col>
            <el-col :span="3" :offset="2"><el-button type="success" @click="run" round >运行</el-button></el-col>
            <el-col :span="3" :offset="2"><el-button type="success" round @click="save" >保存</el-button></el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <div class="title">请选择需要的库:</div>
            </el-col>
            <el-col :span="20">
                <el-checkbox-group v-model="checkList" @change="changeMethod">
                    <el-checkbox label="jquery"></el-checkbox>
                    <el-checkbox label="underscore"></el-checkbox>
                    <el-checkbox label="backbone"></el-checkbox>
                    <el-checkbox label="d3"></el-checkbox>
                    <el-checkbox label="sea1.2"></el-checkbox>
                    <el-checkbox label="vue1.0"></el-checkbox>
                    <el-checkbox label="vue-router"></el-checkbox>
                    <el-checkbox label="bootstraps"></el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="html-box" ref="htmlBox">
                    <div class="tips">html</div>
                    <codemirror
                      v-model="htmlEditor.code"
                      :options="htmlEditor.editorOption"
                      @input="changeMethod">
                    </codemirror>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="css-box" ref="cssBox">
                    <div class="tips">css</div>
                    <codemirror
                      v-model="cssEditor.code"
                      :options="cssEditor.editorOption"
                      @input="changeMethod">
                    </codemirror>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="js-box" ref="jsBox">
                    <div class="tips">javaScript</div>
                    <codemirror
                      v-model="jsEditor.code"
                      :options="jsEditor.editorOption"
                      @input="changeMethod">
                    </codemirror>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="result-box" ref="resultBox">
                    <div class="tips">效果展示</div>
                    <div id="iframe">
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
//mode
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/css/css.js'
//括号匹配
import 'codemirror/addon/edit/matchbrackets.js'
//当前行
import 'codemirror/addon/selection/active-line.js'
//代码折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
//全屏模式
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen.js'
//自动补全
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
// theme css
import 'codemirror/theme/base16-dark.css'
import Result from '../common/Result.vue'
import juicer from'../../../static/juicer.js'
export default{
    data(){
        return{
            checkList:["jquery"], //选择类库
            name:'', //作品名称
            htmlEditor:{   //html编辑器
                code:'', //code
                editorOption:{ //配置
                    tabSize: 4,
                    mode: 'htmlmixed',
                    lineNumbers: true,
                    line: true,
                    //代码折叠
                    lineWrapping:true,
                    foldGutter: true,
                    gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    //括号匹配
                    matchBrackets:true,
                    //智能提示 
                    extraKeys:{"Ctrl-Space":"autocomplete"}//ctrl-space唤起智能提示
                },
            },
            cssEditor:{  //css编辑器
                code:'',
                editorOption:{
                    tabSize: 4,
                    mode: 'css',
                    lineNumbers: true,
                    line: true,
                    //代码折叠
                    lineWrapping:true,
                    foldGutter: true,
                    gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    //括号匹配
                    matchBrackets:true,
                    //智能提示 
                    extraKeys:{"Ctrl-Space":"autocomplete"}//ctrl-space唤起智能提示
                },
            },
            jsEditor:{  //js编辑器
                code:'',
                editorOption:{
                    tabSize: 4,
                    mode: 'javascript',
                    lineNumbers: true,
                    line: true,
                    //代码折叠
                    lineWrapping:true,
                    foldGutter: true,
                    gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    //括号匹配
                    matchBrackets:true,
                    //智能提示 
                    extraKeys:{"Ctrl-Space":"autocomplete"}//ctrl-space唤起智能提示
                },
            },
            //模板
            temp:['<html>'+
                    '<head>' +
                        '<meta charset="utf-8">' +
                        '<meta name="viewport" content="width=device-width,initial-scale=1.0">' +
                        '<title>爱奇艺学习平台</title>' +
                        '<style> ${style}' +
                        '</style>' +
                    '</head>' +
                    '<body> ${jsLib} ${html}' +
                    '<script> ${js}</'+'script>'+
                    '</body>' +
                    '</html>'].join(""),
            jsLib:'', //js类库
            id: ''  //作品id
        }
    },
    created(){
        let _this = this;
        var query = this.$route.query;
        if(query.id){
            this.id = query.id;
            this.getRunCodeData(query.id);
        }
    },
    methods:{
        changeMethod($val){
            // var _this = this;
            // if(_this.flag){
            //     setTimeout(function(){
            //         _this.run();
            //         _this.flag = true;
            //     },2000)
            // }
            // _this.flag = false;
        },
        //获取类库
        fetchLib(){
            this.jsLib = "";
            for(var i = 0; i < this.checkList.length; i++){
                if(this.checkList[i] == "jquery"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></'+'script>';
                }else if( this.checkList[i] == "underscore"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></'+'script>';
                }else if( this.checkList[i] == "backbone"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"></'+'script>';
                }else if( this.checkList[i] == "d3"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js"></'+'script>';
                }else if( this.checkList[i] == "sea1.2"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/seajs/1.2.0/sea.js"></'+'script>';
                }else if( this.checkList[i] == "vue1.0"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.min.js"></'+'script>';
                }else if( this.checkList[i] == "vue-router"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.1/vue-router.min.js"></'+'script>';
                }else if( this.checkList[i] == "bootstraps"){
                    this.jsLib += '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.js"></'+'script>';
                }
            }
        },
        run(){
            this.fetchLib();
            var data = {
                style: this.cssEditor.code,
                html: this.htmlEditor.code,
                js: this.jsEditor.code,
                jsLib: this.jsLib
            }
            var html = juicer(this.temp,data);
            var iframe = document.getElementById('iframe');
            iframe.innerHTML = '<iframe id="result" class="" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" style="height: 300px;width:680px;border:0"></iframe>';
            var result = document.getElementById('result');
            result.contentWindow.document.open('text/html', 'replace');
            result.contentWindow.document.write(html);
            result.contentWindow.document.close();
        },
        save(){
            var _this = this;
            if(this.name){
                if(!_this.id){
                    var date = new Date();
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
                    var h = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) + ':';
                    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
                    var createDate = Y+M+D+h+m;
                    var params = {
                        html: _this.htmlEditor.code,
                        css: _this.cssEditor.code,
                        js: _this.jsEditor.code,
                        libs: _this.checkList.join(','),
                        name: _this.name,
                        owner: 1,
                        createdate: createDate
                    }
                    this.$axios({
                        url:"http://localhost:3000/setRunCode",
                        method: 'POST',
                        data:_this.$qs.stringify(params),
                    }).then(function(data){
                        if(data.data.code == 200){
                            _this.$message({
                                message: '恭喜你，保存作品成功!',
                                type: 'success'
                            });
                            setTimeout(function(){
                                _this.$router.push({
                                    path: '/runCode',
                                    query: {
                                        id: data.data.data.id
                                    }
                                })
                            },2000);
                        }else{
                            _this.$message.error(data.data.data.msg);
                        }
                    });
                }else{
                    var params = {
                        html: _this.htmlEditor.code,
                        css: _this.cssEditor.code,
                        js: _this.jsEditor.code,
                        libs: _this.checkList.join(','),
                        name: _this.name,
                        id: _this.id

                    }
                    this.$axios({
                        url:"http://localhost:3000/updateRunCode",
                        method: 'POST',
                        data:_this.$qs.stringify(params),
                    }).then(function(data){
                        if(data.data.code == 200){
                            _this.$message({
                                message: '恭喜你，更新作品成功!',
                                type: 'success'
                            });
                        }else{
                            _this.$message.error(data.data.data.msg);
                        }
                    });
                }
            }else{
                _this.$message.error("请输入RunCode标题!");
            }
           
            
        },
        getRunCodeData(id){
            var _this = this;
            this.$axios.get('http://localhost:3000/getRunCode?id='+id).then(function(data){
                if(data.data.code == 200){
                    data = data.data.data[0];
                    _this.htmlEditor.code = data.html;
                    _this.cssEditor.code = data.css;
                    _this.jsEditor.code = data.js;
                    _this.checkList = data.libs.split(",");
                    _this.name = data.name;
                    _this.run();
                }else{
                    _this.$message.error(data.data.data.msg);
                }
            })
        }
    },
    components: {
        codemirror,
    },
    // mounted(){
    //     this.iframe = this.$refs.result;
    // }
}
</script>
<style scoped>
    #contain{
        width: 1400px;
    }
    .el-row{
        margin-top: 20px;
    }
    .title{
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
    }
    .head-title{
        background-color: #5cb85c;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
    }
    .el-button--success{
        width: 150px;
    }
    .el-checkbox-group{
        height: 40PX;
        line-height: 40px;
        
    }
    .html-box,.css-box,.js-box,.result-box{
        height: 400px;
        border: 1px solid black;
        overflow:auto;
    }
    .tips{
        height: 30px;
        background-color: #5cb85c;
        color: #ffffff;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        text-indent: 20px;
    }
    .vue-codemirror {
        width: 96%;
        height: 90%;
    }

</style>