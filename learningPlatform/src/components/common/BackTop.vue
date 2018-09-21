<template>
<div class="scrollTop" v-show="showTop" @click="toTop">
    <div>
        <i class="el-icon-caret-top"></i>
        <div class="anchor-txt">置顶</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'scroll-top',
    data (){
    return {
        scrollTop: 0,
        time: 0,
        dParams: 20,
        scrollState: 0
    }
    },
    computed:{
    showTop: function(){
        let value = this.scrollTop>200?true:false;
        return value;
    },
    },
    mounted() {
    window.addEventListener('scroll', this.getScrollTop);
    },
    methods: {
    toTop(e) {
        if(!!this.scrollState){
        return;
        }
        this.scrollState = 1;
        e.preventDefault();
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let _this = this;
        this.time = setInterval(function(){ _this.gotoTop(_this.scrollTop-_this.dParams) }, 10);
    },
    gotoTop(distance){
        this.dParams += 20;
        distance = distance>0 ? distance : 0;
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
        if(this.scrollTop < 10){
        clearInterval(this.time);
        this.dParams = 20;
        this.scrollState = 0;
        }
    },
    getScrollTop() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
    },
    
}
</script>
<style scoped>
.scrollTop {
    position: fixed;
    right: 40px;
    bottom: 80px;
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid #ebebeb;
    background-color: #fff;
    color: #949494;
    text-align: center;
    padding: 5px 0;
    height: 70px;
    box-shadow: 0 0 5px 0 #e5e5e5;
}
.scrollTop:hover{
    background-color: #fbebda;
    box-shadow: none;
    border-color: #fbebda;
    color: #bb8b51;
}
.el-icon-caret-top{
    font-size: 40px;
}
.anchor-txt{
    text-align: center
}
</style>