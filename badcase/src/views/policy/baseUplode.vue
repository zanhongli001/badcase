<template>
    <div>
        <h2>上传底库数据</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-col :span="16">
                <el-form-item label="选择类型">
                    <el-select v-model="form.region" placeholder="人脸数据">
                        <el-option label="人脸数据" value="shanghai"></el-option>
                        <el-option label="声纹数据" value="beijing"></el-option>
                        <el-option label="TV logo数据" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="底库分类">
                    <el-form-item label="一级分类">
                        <el-select v-model="form.region" placeholder="请选择分类">
                            <el-option :label="options.name" :value="options.name" v-for="(options,i) in list" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>
                 <el-form-item label="">
                        <el-form-item label="二级分类">
                            <el-select v-model="form.region" placeholder="请选择分类">
                                <el-option :label="options.name" :value="options.name" v-for="(options,i) in list" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                </el-form-item>
                 <el-form-item >
                     <div style="display:flex">
                        <el-form-item label="人名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item class="faceBtn">
                            <el-button type="primary" @click="dialogVisible = true">人脸排重</el-button>
                        </el-form-item>
                     </div>     
                </el-form-item>
                <el-form-item label="选择文件">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple >
                    <i  slot="default" class="el-icon-plus"></i>
                    <div class="upImg" slot="file" slot-scope="{ file }">
                        <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                        />
                        <!-- <span class="el-upload-list__item-actions">
                        <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                        >
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                        >
                            <i class="el-icon-delete"></i>
                        </span> -->
                        <!-- </span> -->
                    </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button @click="delite">取消</el-button>
                    <el-button type="primary">上传</el-button>
                </el-form-item>
            </el-col>
        </el-form>
         <!-- 弹框 -->
        <el-dialog
        title="查询底库数据"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
            <face-repeat></face-repeat>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import faceRepeat from './faceRepeat.vue';
export default {
	components: { faceRepeat },
    data(){
        return {
            dialogVisible:false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            list: [
                {name:"人脸识别"},
                {name:"暴恐场景识别"},
            ],
            dialogImageUrl:[]
        }
    },
    created(){
        
    },
    methods:{
       // 弹框
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 取消
        delite(){
            this.$router.push({name:"policy"})
        },
        handleRemove(file,fileList) {
        console.log(file,fileList);
        //   file.raw.splice(0,1)
        },
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
.faceBtn{
    padding-left: 10px;
}
/* 
/deep/.el-upload-list__item{
     width: 80px;
    height: 80px;
} */
</style>