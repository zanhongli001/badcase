<template>
  <div>
    <h2>底库上传数据</h2>
    <el-form ref="form" :model="form"   :rules="rules"  label-width="80px">
      <el-col :span="16">
        <el-form-item label="选择类型" prop="ai_type">
          <el-select v-model="form.ai_type" placeholder="人脸数据">
            <el-option label="人脸数据" value="人脸数据"></el-option>
            <el-option label="声纹数据" value="声纹数据"></el-option>
            <el-option label="TV logo数据" value="TV Logo数据"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据描述" prop="data_description">
          <el-input type="textarea" v-model="form.data_description" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="底库分类">
          <el-form-item  v-model="list"  label="一级分类" prop="primary_classify">
            <el-select
              v-model="form.primary_classify"
              placeholder="请选择一级分类"
            >
              <el-option v-for=" (item,ind) in list " :key="ind" :label="item.name" :value="item.name"></el-option>
            
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label="">
          <el-form-item v-model="form.secondary_classify" label="二级分类" prop="secondary_classify">
            <el-select
              v-model="form.secondary_classify"
              placeholder="请选择二级分类"
            >
              <el-option v-for="it in resList " :key="it.id" :label="it.name" :value="it.name"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <div style="display: flex">
            <el-form-item label="人名" prop="name">
              <el-input placeholder="请输入人名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="faceBtn">
              <el-button type="primary" @click="dialogVisible = true"
                >人脸排重</el-button
              >
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            action="/v1_badcase/policy/file/"
            list-type="picture-card"
            :on-change="handleChange"
            :file-list="form.upload_file"
            multiple
            :accept="accept"
            :before-upload="beforeUpload"
          >
            <i slot="default" class="el-icon-plus"></i>
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
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- 弹框 -->
    <el-dialog
      title="查询底库数据"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <face-repeat></face-repeat>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import faceRepeat from "./faceRepeat.vue";
import {uplodPol,getPolIfy} from '../../api/api'
export default {
  components: { faceRepeat },
  data() {
    return {
      accept: '.png,.jpg,.svg,.jpeg',
      dialogVisible: false,
      select2:"",
      form: {
        ai_type: "",
        name: "",
        primary_classify: "",
        secondary_classify: "",
        data_description: "",
        upload_file: [],
      },
      list:[],
      resList:[],
      rules:{
         data_description: [
            { required: true, message: '请输入数据描述', trigger: 'blur' },
          ],
           ai_type: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
            primary_classify: [
            { required: true, message: '请选择一级分类', trigger: 'change' }
          ],  secondary_classify: [
            { required: true, message: '请选择二级分类', trigger: 'change' }
          ],
           name: [
            { required: true, message: '请输入人名', trigger: 'blur' },
          ],
      },

      dialogImageUrl: [],
    };
  },
  beforeUpdate() {
    // console.log(this.form);
  },
  methods: {
    // 弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 取消
    delite() {
      this.$router.push({ path: "/policy" });
    },
    handleRemove(file, upload_file) {
      console.log(file, upload_file);
      //   file.raw.splice(0,1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, upload_file) {
      this.form.upload_file = upload_file;
    },
    // 限制上传类型
   beforeUpload(file) {
				var extension = file.name.substring(file.name.lastIndexOf('.'));
				if (!this.accept.split(',').includes(extension)) {
					this.$message({
						message: `请上传图片类型（${this.accept.split(',').join('，')}后缀）的文件`,
						type: 'warning',
					});
				}
				return extension;
			},
      // 提交
    async  submitForm(formName) {
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
      // 提交
    async uplodForm(){
      let result = await uplodPol(this.form);
          console.log(result)
      },
   async polIfy(){
      let result = await getPolIfy();
      this.list = result
      for(let i in this.list){
        for(let j in this.list[i].members)
       this.resList.push(this.list[i].members[j]) 
       console.log(this.resList)
        }
      },
    
  },
  created(){
    this.polIfy()
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
.faceBtn {
  padding-left: 10px;
}
/* 
/deep/.el-upload-list__item{
     width: 80px;
    height: 80px;
} */

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