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
            <el-button type="primary" @click="allImg()">批量查看图片</el-button>
            <el-button type="primary" @click="onUplode">上传badcase</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tab">
      <p :class="addAll" @click="all">全部</p>
      <p :class="myCreat" @click="creatList">我创建的</p>
    </div>
    <!-- 表格 -->
    <el-table
      :header-cell-class-name="cellClass"
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'tableData', order: 'descending' }"
      @selection-change="handleEdit"
      @sort-change="sortChange"
    >
      >
      <el-table-column prop="task_id" type="selection" width="50">
      </el-table-column>
      <el-table-column prop="id" label="任务ID" width="180">
        <template slot-scope="scope">
          <div class="codeId" @click="openDedail(scope.row.id)">
            {{ scope.row.id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="cate"
        label="场景分类"
        sortable="custom"
        width="120"
        :filters="[{ text: tableData.cate, value: tableData.cate }]"
       :filter-method="filterTag"
      filter-placement="bottom-end">
      </el-table-column>
      <el-table-column prop="type" label="问题类型" width="80">
        <template slot-scope="scope">
          {{ badType[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述" sortable="custom" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="70">
        <template slot-scope="scope">
          {{ badStatus[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="提交人"
        sortable="custom"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="handler"
        label="处理人"
        sortable="custom"
        width="90"
      >
      </el-table-column>
      <el-table-column prop="update_time" label="上传时间" width="180">
      </el-table-column>
      <el-table-column prop="create_time" label="处理时间" width="180">
      </el-table-column>
      <el-table-column prop="node" label="备注" width="180"> </el-table-column>
      <el-table-column
        prop="result"
        label="是否已解决"
        sortable="custom"
        width="130"
      >
        <template slot-scope="scope">
          {{ badRes[scope.row.result] }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog
      title="查看图片"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-image
        class="el-img"
        style="width: 100px; height: 100px"
        v-for="(itemImg, ind) in imgUrl"
        :key="ind"
        :src="itemImg"
        lazy
      ></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @prev-click="pageChange"
        @next-click="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  watchAllImg,
  getBadList,
  getBadStatus,
  getBadRes,
  getBadType,
} from "../../api/api";
import { set } from "js-cookie";
export default {
  data() {
    return {
      addAll: "active",
      myCreat: "",
      dialogVisible: false,
      imgUrl: [],
      params: {},
      itemId: [],
      tableData: [],
      badStatus: [],
      badRes: [],
      badType: [],
      total: 0, //实现动态绑定
      pageSize: 2,
      page: 1,
      ordering: "",
    };
  },
  created() {
    this.getStatus();
    this.getType();
    this.getRes();
    this.getList();
  },
  updated() {
  },
  methods: {
    filterTag(value, row) {
      console.log(value,'---',row)
        return row.case === value;
      },
    // 排序
    sortChange(column) {
      // console.log(column);
      if (column.order == "ascending") {
        this.ordering = column.prop;
        this.getList();
      }
      if (column.order == "descending") {
        this.ordering = `-${column.prop}`;
        this.getList();
      }
    },
    handleSizeChange(size) {
      // 每页显示的数量是我们选择器选中的值size
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.getList();
    },
    //当改变当前页数的时候触发的事件
    handleCurrentChange(currentPage) {
      this.page = currentPage;
      this.getList();
    },
    // 翻页
    pageChange(current) {
      this.page = current;
      this.getList();
    },
    // 上传
    onUplode() {
      this.$router.push({ name: "badUplode" });
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        return "disabledCheck";
      }
    },
    //    点击详情
    openDedail(id) {
      this.$router.push({ name: "badDetails", query: { id: id } });
    },
    all() {
      this.addAll = "active";
      this.myCreat = "";
    },
    creatList() {
      this.myCreat = "active";
      this.addAll = "";
    },
    // 查看图片
    async allImg() {
      if (this.itemId == "") {
        this.$message("请选择要查看的图片");
        return;
      } else {
        this.dialogVisible = true;
        let resImg = await watchAllImg(this.itemId);
        this.imgUrl = resImg;
      }
    },
    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 获取状态
    async getStatus() {
      this.badStatus = await getBadStatus();
    },
    // 获取结果
    async getRes() {
      this.badRes = await getBadRes();
    },
    //获取问题类型
    async getType() {
      this.badType = await getBadType();
    },
    // 获取badcase列表
    async getList() {
      const loading = this.$loading({
        lock: true,
      });
      let data = {
        page: this.page,
        page_size: this.pageSize,
        ordering: this.ordering,
      };
      try {
        let result = await getBadList(data);
        this.tableData = result.results;
        this.total = result.count;
        loading.close();
      } catch {
        loading.close();
      }
    },
    //  选中当前的内容
    handleEdit(row) {
      this.itemId = [];
      for (let i = 0; i < row.length; i++) {
        let res = this.itemId.push(row[i].task_id);
        console.log(res);
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
  content: "筛选";

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
.tab {
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: space-around;
}
.tab p {
  cursor: pointer;
}
.active {
  color: #409eff;
}
.el-img {
  margin-left: 10px;
}
.page {
  margin-top: 10px;
  float: right;
}
</style>