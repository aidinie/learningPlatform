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
                    clearable
                    >
                </el-input>
            </el-col>
            <el-col :span="3" :offset="2"><el-button type="success" @click="run" round >运行</el-button></el-col>
            <el-col :span="3" :offset="2"><el-button type="success" round >保存</el-button></el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <div class="title">请选择需要的库:</div>
            </el-col>
            <el-col :span="20">
                <el-checkbox-group v-model="checkList" @change="change">
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
                      @input="yourCodeChangeMethod">
                    </codemirror>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="css-box" ref="cssBox">
                    <div class="tips">css</div>
                    <codemirror
                      v-model="cssEditor.code"
                      :options="cssEditor.editorOption"
                      @input="yourCodeChangeMethod">
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
                      @input="yourCodeChangeMethod">
                    </codemirror>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="result-box" ref="resultBox">
                    <div class="tips">效果展示</div>
                    <div id="iframe">
                        <!-- <iframe id='result' ref="result"></iframe> -->
                        <result>
                            <template solt="body">
                                <div v-html="htmlEditor.code"></div>
                            </template>    
                            <!-- <template solt="style">
                                <style v-html="cssEditor.code"></style>
                            </template>  
                            <template solt="js">
                                <script v-html="jsEditor.code"></script>
                            </template>  -->
                        </result>
                    </div>
                    <!-- <result>
                        <template solt="body">
                            <div v-html="htmlEditor.code"></div>
                        </template>    
                        <template solt="body">
                            <style v-html="cssEditor.code"></style>
                        </template>  
                    </result> -->
                    <!-- <result>
                        <body v-html="dom">
                        
                        </body>
                    </result> -->
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
export default{
    data(){
        return{
            checkList:["jquery"],
            htmlCode:'',
            jsCode:'',
            cssCode:'',
            dom:'',
            iframe:'',
            htmlEditor:{
                code:'',
                editorOption:{
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
            cssEditor:{
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
            jsEditor:{
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
            
        }
    },
    methods:{
        yourCodeChangeMethod($val){
            console.log(111);
        },
        run(){
            // console.log(typeof this.jsEditor.code);
            // var dom = "<style>" + this.cssEditor.code + '</style>' +"<script>"+ this.jsEditor.code +"</"+"script>"+ this.htmlEditor.code;
            // console.log(dom);
            // var render = this.$template.compile(tpl);
            // var renderHtml = render({ html: this.htmlEditor.code, js: this.jsEditor.code, css: this.cssEditor.code});
            // var iframe = document.getElementById('iframe');
            // console.log(iframe);
            // iframe.innerHTML = '<iframe id="result" class="" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" style="height: 300px"></iframe>';
            // var result = document.getElementById('result');
            // result.contentWindow.document.open('text/html', 'replace');
            // result.contentWindow.document.write(renderHtml);
            // result.contentWindow.document.close();
        },
        change(){
            console.log(this.checkList);
        }
    },
    components: {
        codemirror,
        Result
    },
    mounted(){
        this.iframe = this.$refs.result;
        console.log(this.iframe);
    }
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