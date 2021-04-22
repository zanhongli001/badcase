<template>
    <div class="comenten">
        <div class="lt-comenten">
            <h2>底库数据详情</h2>
            <p>
                <span>任务ID</span>
                <span>D2021040804</span>
            </p>
            <p>
                <span>数据类型</span>
                <span>人脸数据</span>
            </p>
            <p>
                <span>数据描述</span>
                <span>增加石涛的人脸</span>
            </p>
            <p>
                <span>底库分类</span>
                <span v-for="(item,index) in numCassfil" :key="index">
                    {{item}}
                </span>
            </p>
            <p>
                <span>数据文件</span>
                <img :src="index" class="avatar" v-for="(index,i) in imageUrl" :key="i">
                <!-- <div v-for="(item,ind) in imageUrl" :key="ind">
                  <img :src="item" alt="">
                </div> -->
            </p>
            <p>
                <span>审核操作</span>
                <span>仅审核人员权限看到审核操作这个板块</span>
            </p>
        </div>
        <el-form ref="form" :model="form" label-width="60px">
            <el-form-item>
                <div class="classfil">
               <el-form-item>
                         <el-radio-group v-model="form.desc">
                            <el-radio label="上传底库"></el-radio>
                            <el-radio label="不上传"></el-radio>
                        </el-radio-group>
                     </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item style="padding-left:10px">
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </div>
               
            </el-form-item>
            <el-form-item>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
         <el-form ref="form" :model="form" label-width="80px">
            
            <el-form-item>
               
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
          form: {
            desc: ''
            },
            imageUrl:[],
            numCassfil:[]
        }
    },
     created(){
    },
    methods:{
        onSubmit(){
            console.log();
        },
        close(){
            this.$router.push({name:'policy'})
        }
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
    width: 100%;
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
.lt-comenten{
    padding-left:60px ;
}
</style>