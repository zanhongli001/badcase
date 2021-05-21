<template>
  <div>
    <h2>新建badcase</h2>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="场景分类" prop="cate">
        <el-select v-model="form.cate" placeholder="人脸数据">
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题类型" prop="feedback_type">
        <el-radio-group v-model="form.feedback_type">
          <el-radio v-model="radio" label="漏识别" @change="show">漏识别</el-radio>
          <el-radio v-model="radio" label="误识别" @change="hide">误识别</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="know" prop="feedback_two_type">
           <el-radio-group v-model="form.feedback_two_type">
        <el-radio v-model="radio2" label="现有模型漏识别"></el-radio>
        <el-radio v-model="radio2" label="新需求"></el-radio>
    </el-radio-group>
   </el-form-item>

      <el-form-item label="问题描述" prop="desc">
        <el-input type="textarea" v-model="form.desc" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-upload
          action="/v1_badcase/badcase/file/"
          list-type="picture-card"
           multiple
           :accept="accept"
           :before-upload="handleChange"
           :on-success="handleSuccess"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div class="upImg" slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
          
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {uplodBad,getBadIfy} from '../../api/api'
import uploadImg from '@/components/Upload';
export default {
  data() {
    return {
      form: {
        feedback_type:"",
        feedback_two_type:"",
        desc:"",
        feedback_image:"",
        cate: "",
        file:[]
      },
       accept: '.png,.jpg,.svg,.jpeg',
      radio: "1",
      radio2: "2",
      know: false,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      multiple: true,
      list: [],
       rules:{
         cate: [
            { required: true, message: '请输入场景分类', trigger: 'blur' },
          ],
           feedback_type: [
            { required: true, message: '请选择反馈问题类型', trigger: 'change' }
          ],
            feedback_two_type: [
            { required: true, message: '请选择反馈问题类型', trigger: 'change' }
          ], 
           desc: [
            { required: true, message: '请输入问题描述', trigger: 'blur' },
          ],
      },
    };
  },
  created() {
    this.badIfyClass()
  },
  beforeUpdate(){
    console.log(this.form)
  },
  methods: {
    onFaceRepeat() {
      this.$router.push({ name: "faceRepeat" });
    },
    show() {
      this.know = true;
    },
    hide() {
      this.know = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      //   file.raw.splice(0,1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    close() {
      this.$router.push({ name: "website" });
    },
    handleChange(file) {
      const isTypeTrue = /^image\/(jpeg|png|jpg)$/.test(file.type);
      const isLt300K = file.size / 1024 / 1024 < 100;
      if (!isLt300K) {
        this.$message.error("上传图片大小不能超过5mb!");
        return false;
      }
      if (!isTypeTrue) {
        this.$message.error("上传图片格式不对!");
        return false;
      }
    },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.uplodForm()
            this.$message.success('成功');
          } else {
            this.$message.error('请填写完整');
            return false;
          }
        });
      },
      // 上传图片成功
      handleSuccess(res){
        this.form.file.push(res.id)
      },
      // 提交
        async uplodForm(){
         
      let result = await uplodBad(this.form);
          console.log(result)
      },
      // 获取场景分类
        async badIfyClass(){
       this.list = await getBadIfy();
      }

  },
};
</script>
<style>
.addTitle {
  margin-bottom: 20px;
}
.pagination {
  text-align: right;
}
.el-upload--picture-card {
  width: 90px;
  height: 50px;
  position: relative;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 50px;
}
.upImg {
  width: 90px;
  height: 50px;
}
.el-icon-plus {
  text-align: center;
  vertical-align: middle;
  position: absolute;
  left: 33%;
  top: 26%;
}
</style>