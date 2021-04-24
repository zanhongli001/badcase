<template>
    <div class="comenten">
        
        <div class="comenten-text">
            <h2>详情</h2>
            <p>
                <span>任务ID：</span>
                <span>D2021040804</span>
            </p>
            <p>
                <span>场景分类</span>
                <span>人脸数据</span>
            </p>
            <p>
                <span>问题类型</span>
                <span>漏识别</span>
            </p>
            <p>
                <span>问题描述</span>
               <span>石涛人脸漏识别</span>
            </p>
            <p>
                <span>问题图片</span>
                <img :src="index" class="avatar" v-for="(index,i) in imageUrl" :key="i">
                <!-- <div v-for="(item,ind) in imageUrl" :key="ind">
                  <img :src="item" alt="">
                </div> -->
            </p>
            <p>
                <span>审核人员操作</span>
            </p>
        </div>
        <el-form ref="form" :model="form" label-width="60px">
            <el-form-item>
                <div class="classfil">
               <el-checkbox v-model="form.checked">已分析处理</el-checkbox>
                    <el-form-item label="备注：">
                        <el-input v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-button type="primary" class="sub" @click="onSubmit">提交</el-button>
                     <el-button @click="close">关闭</el-button>
                </div>
               
            </el-form-item>
            <el-form-item>
               
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import request from '../../plugins/request'
export default {
    data(){
        return {
          form: {
            desc: '',
            is_handle:false,
            },
           
            imageUrl:[],
            numCassfil:[],
            listId:this.$route.query.id
        }
    },
    created(){
 this.getDetailList()
    },
     beforeUpdate(){
         console.log(this.form)
    },
    methods:{
        onSubmit(){
            console.log();
        },
        close(){
            this.$router.push({ name: "website" });
        },
         getDetailList() {
      const loading = this.$loading({
        lock: true,
      });
      request.fetchGet(`/AIBadCaseFeedback?id=${this.listId}`).then(async (res) => {
        this.list  = await res.data.data.ai_type;
        loading.close();
      });
    },        
    }
}
</script>
<style scoped>
.addTitle{
  margin-bottom: 20px;
}
.pagination{
  text-align: right;
}
/* /deep/ .el-input__inner{
    border: 0;
} */
.classfil{
    display: flex;
}
.sub{
    margin-left: 10px;
}
.comenten{
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.comenten-text{
    padding-left: 60px;
}
</style>