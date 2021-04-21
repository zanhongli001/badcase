<template>
  <div>
    <h2>新建badcase</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="场景分类">
        <el-select v-model="form.region" placeholder="人脸数据">
          <el-option
            v-for="(item, ind) in list"
            :key="ind"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题类型">
        <el-radio-group v-model="radio">
          <el-radio :label="3" @change="show">漏识别</el-radio>
          <el-radio :label="6" @change="hide">误识别</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="know">
        <el-radio v-model="radio2" label="3">现有模型漏识别</el-radio>
        <el-radio v-model="radio2" label="4">新需求</el-radio>
      </el-form-item>

      <el-form-item label="问题描述">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="选择图片">
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
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      radio: "1",
      radio2: "2",
      know: false,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      multiple:true,
      list: [
        "人脸识别",
        "暴恐场景识别",
        "敏感旗帜识别",
        "境外台标识别",
        "敏感事件识别",
        "淫秽色情识别",
        "图片文字提取",
        "语音识别",
        "声纹识别",
      ],
    };
  },
  created() {},
  methods: {
    onFaceRepeat() {
      this.$router.push({ name: "faceRepeat" });
    },
    onSubmit() {},
    show() {
      this.know = true;
    },
    hide() {
      this.know = false;
    },
    handleRemove(file,fileList) {
      console.log(file,fileList);
    //   file.raw.splice(0,1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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
.el-upload--picture-card{
    width: 90px;
    height: 50px;
    position: relative;
}
.el-upload-list--picture-card .el-upload-list__item{
    width: 90px;
    height: 50px;
}
.upImg{
    width: 90px;
    height: 50px;
}
.el-icon-plus{
text-align: center;
vertical-align: middle;
position: absolute;
left: 33%;
top: 26%;
}

</style>