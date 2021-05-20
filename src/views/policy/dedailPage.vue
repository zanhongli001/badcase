<template>
  <div class="comenten">
    <div class="lt-comenten">
      <h2>底库数据详情</h2>
      <p>
        <span>任务ID：</span>
        <span>{{ form.id }}</span>
      </p>
      <p>
        <span>数据类型：</span>
        <span>{{ form.type }}</span>
      </p>
      <p>
        <span>数据描述：</span>
        <span>{{form.desc}}</span>
      </p>
      <div class="fl-type">
        <p>底库分类：</p>
        <div class="all-type">
          <span>一级分类：</span>
          <span>
            {{ form.primary_classify }}
          </span>
          <p>
            <span>二级分类：</span>
            <span>
              {{ form.secondary_classify }}
            </span>
          </p>
          <p>
            <span class="person"> 人名：</span>
            <span>
              {{ form.person }}
            </span>
          </p>
        </div>
      </div>

      <p>
        <span class="data-img">数据文件</span>
        <img v-for="(item,ind) in form.data_file " :key="ind" :src="item" class="avatar" />
        <!-- <img
          :src="list.data_file"
          class="avatar"
          v-for="(index, i) in imageUrl"
          :key="i"
        /> -->
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
            <el-radio-group v-model="form.audit_operate">
              <el-radio label="1">上传底库</el-radio>
              <el-radio label="0">不上传</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 10px">
            <el-button type="primary" @click="subDetailList(form) ">提交</el-button>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item> </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getPolDetail,subPolDetail } from "../../api/api";
export default {
  data() {
    return {
      form: {
        audit_operate: "",
        comment: "",
      },
      imageUrl: [],
      numCassfil: [],
      listId: this.$route.query.id,
    };
  },
  created() {
    this.getDetailList();
  },
  beforeUpdate() {
    console.log(this.form);
  },
  methods: {
  
    close() {
      this.$router.push({ name: "policy" });
    },
    async getDetailList() {
      const loading = this.$loading({
        lock: true,
      });
      try{
  let result = await getPolDetail(this.listId);
      console.log(result);
      this.form = result;
      loading.close();
      }catch{
        loading.close();
      }
    
    },

    async subDetailList(data){
      console.log(data)
     let respons = await subPolDetail(data)
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
  width: 100%;
}
.person{
  margin-left: 30px;
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
.lt-comenten {
  padding-left: 60px;
}
.fl-type {
  display: flex;
  text-align: center;
}
.all-type {
  margin-top: 30px;
  text-align: left;
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