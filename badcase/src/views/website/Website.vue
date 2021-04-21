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
          <h3>badcase反馈</h3>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button type="primary" @click="onSubmit"
              >查看筛选的图片</el-button
            >
            <el-button type="primary" @click="onUplode">上传badcase</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table
      :header-cell-class-name="cellClass"
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="date" label="任务ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="场景分类" sortable width="120">
      </el-table-column>
      <el-table-column prop="name" label="问题类型" width="80"> </el-table-column>
      <el-table-column prop="name" label="描述" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="状态" width="70">
      </el-table-column>
      <el-table-column prop="name" label="提交人" sortable width="90">
      </el-table-column>
      <el-table-column prop="name" label="处理人" sortable width="90">
      </el-table-column>
      <el-table-column prop="name" label="上传时间" width="180">
      </el-table-column>
      <el-table-column prop="name" label="处理时间" width="180">
      </el-table-column>
      <el-table-column prop="address" label="备注" width="180" :formatter="formatter">
      </el-table-column>
       <el-table-column prop="name" label="是否已解决" sortable width="130">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  created() {
    // this.getOrderList()
  },

  methods: {
    // 上传
    onUplode() {
      this.$router.push({ name: "badUplode" });
    },
    // 表格
    formatter(row, column) {
      return row.address;
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "disabledCheck";
      }
    },
  },
};
</script>
<style>
.el-table .disabledCheck .cell .el-checkbox__inner {
  display: none !important;
}

.el-table .disabledCheck .cell::before {
  content: "选择";

  text-align: center;

  line-height: 37px;
}

.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 350px;
}
.pagination {
  text-align: right;
}
</style>