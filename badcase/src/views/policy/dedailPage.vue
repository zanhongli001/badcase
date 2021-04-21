<template>
    <div>
        <h2>详情</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="任务ID">
                <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="数据类型">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="数据描述">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="数据分类">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="数据文件">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="审核操作">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <e-col :span="7">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </e-col>
                <e-col :span="7">
                    <el-form-item label="备注">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </e-col>
                <e-col :span="7">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </e-col>
            </el-form-item>
            <el-form-item>
                <el-button>关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
          form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
        }
    },
    created(){
        
    },
    methods:{
      onFaceRepeat(){
            this.$router.push({name:'faceRepeat'})
        },
        onSubmit(){
            console.log();
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
</style>