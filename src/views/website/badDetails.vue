<template>
  <div class="comenten">
    <div class="comenten-text">
      <h2>详情</h2>
      <p>
        <span>任务ID：</span>
        <span>{{ form.task_id }}</span>
      </p>
      <p>
        <span>场景分类：</span>
        <span>{{ form.scene_classify }}</span>
      </p>
      <p>
        <span>问题类型：</span>
        <span>{{ form.feedback_type }}</span>
      </p>
      <p>
        <span>问题描述：</span>
        <span>{{ form.feedback_description }}</span>
      </p>
      <p>
        <span class="data-img">问题图片</span>
        <img
          :src="index"
          class="avatar"
          v-for="(index, i) in form.feedback_image"
          :key="i"
          
        />
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
          <el-checkbox v-model="form.is_checked" :name="form.is_handle"
            >已分析处理</el-checkbox
          >
          <el-form-item label="备注：">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-button type="primary" class="sub" @click="subDetailList(form) "
            >提交</el-button
          >
          <el-button @click="close">关闭</el-button>
        </div>
      </el-form-item>
      <el-form-item> </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCaseDetail ,subBadDetail} from "../../api/api";
export default {
  data() {
    return {
      form: {
        desc: "",
        is_checked: false,
        is_handle: "否",
      },

      imageUrl: [],
      numCassfil: [],
      listId: this.$route.query.id,
      
    };
  },
  mounted() {
    this.getDetailList();
  },
  beforeUpdate() {
    console.log(this.form);
    if (this.form.is_checked == true) {
      this.form.is_handle = "是";
    } else {
      this.form.is_handle = "否";
    }
  },
  methods: {
    close() {
      this.$router.push({ name: "website" });
    },
    async getDetailList() {
      const loading = this.$loading({
        lock: true,
      });
      try {
        let result = await getCaseDetail(this.listId);
           console.log(result);
        this.form = result
     console.log(this.form);
        loading.close();
      } catch {
        loading.close();
      }
    },
     async subDetailList(data){
      console.log(data)
     let respons = await subBadDetail(data)
     console.log(respons)
    }
  },
};
</script>
<style scoped>
.addTitle {
  margin-bottom: 20px;
}
.pagination {
  text-align: right;
}
/* /deep/ .el-input__inner{
    border: 0;
} */
.classfil {
  display: flex;
}
.sub {
  margin-left: 10px;
}
.comenten {
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.comenten-text {
  padding-left: 60px;
}
.avatar {
  width: 90px;
  height: 50px;
  line-height: 50px;
  margin-right: 10px;
}
.data-img {
  display: inline-block;
  width: 90px;
  height: 50px;
}
</style>