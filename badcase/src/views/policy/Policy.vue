<template>
  <div>
    <el-form
      :inline="true"
      status-icon
      :model="params"
      ref="formInline"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="14">
          <h3>底库数据审核</h3>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = true"
              >底库数据查询</el-button
            >
            <el-button type="primary" @click="onUplode">上传底库数据</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column label="任务ID" width="100">
        <template slot-scope="scope">
          <div class="codeId" @click="openDedail(scope.row.date)">
            {{ scope.row.task_id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ai_type" label="类型" sortable> </el-table-column>
      <el-table-column prop="data_description" label="描述"> </el-table-column>
      <el-table-column prop="status" label="状态" sortable> </el-table-column>
      <el-table-column prop="submitter" label="提交人"> </el-table-column>
      <el-table-column prop="auditor" label="审核人" sortable> </el-table-column>
      <el-table-column prop="upload_time" label="上传时间"> </el-table-column>
      <el-table-column prop="audit_time" label="审核时间"> </el-table-column>
      <el-table-column prop="audit_result" label="审核结果"> </el-table-column>
      <el-table-column prop="comment" label="备注" :formatter="formatter">
      </el-table-column>
    </el-table>
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
export default {
  components: { faceRepeat },
  data() {
    return {
      params: {},
      tableData: [
        {
          task_id: "2021040804",
          ai_type: 0,
          data_description: "增加石涛的脸",
          status: 1,
          submitter: "张三",
          auditor: "王五",
          upload_time: 1619079871,
          audit_time: 1619079934,
          audit_result: "未上传底库",
          comment: "",
        },
      ],
      dialogVisible: false,
    };
  },
  created() {},
  methods: {
    // 上传
    onUplode() {
      this.$router.push({ name: "baseUplode" });
    },
    // 表格
    formatter(row, column) {
      return row.address;
    },
    //    点击详情
    openDedail() {
      this.$router.push({ name: "dedailPage" });
    },
    // 弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style>
.codeId {
  white-space: nowrap;
  color: #409eff;
}
.codeId:hover {
  cursor: pointer;
}
.pagination {
  text-align: right;
}
</style>