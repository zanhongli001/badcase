<template>
    <div>
        <!-- <h2>人脸排重</h2> -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="选择类型" >
                <el-select v-model="form.ai_type" placeholder="人脸数据">
                    <el-option label="人脸数据" value="人脸数据" @click.native="isHide"></el-option>
                    <el-option label="声纹数据" value="声纹数据" @click.native="isHide"></el-option>
                    <el-option label="TV logo数据" value="TV logo数据" @click.native="isShow"></el-option>
                </el-select>
            </el-form-item>
            <div style="display:flex" v-if="isFace">
                <el-form-item label="人名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="一级分类">
                    <el-select v-model="form.primary_classify" placeholder="请选择分类">
                        <el-option :label="options.name" :value="options.name" v-for="(options,i) in list" :key="i"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select v-model="form.secondary_classify" placeholder="请选择分类">
                        <el-option :label="options.name" :value="options.name" v-for="(options,i) in list" :key="i"></el-option>
                    </el-select>
                </el-form-item>
            </div>
           
            <div v-if="isLogo" style="width:30%">
                <el-form-item label="logo">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="分类"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="一级分类"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="二级分类">
            </el-table-column>
            <el-table-column
            prop="address"
            label="详情">
            </el-table-column>
             <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">更改</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isLogo:false,
            isFace:true,
            form: {
                ai_type:'',
                name: '',
                primary_classify: '',
                secondary_classify: '',
                upload_file:''
            },
             list: [
                {name:"人脸识别"},
                {name:"暴恐场景识别"},
            ],
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    created(){
        
    },
     beforeUpdate() {
    console.log(this.form);
  },
    methods:{
        // logo
        isHide(){
            this.isLogo = false;
            this.isFace = true;
        },
        isShow(){
            this.isLogo = true;
            this.isFace = false;
        },
        handleClick(id){
            console.log(id)
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