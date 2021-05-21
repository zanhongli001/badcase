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
      @sort-change="sortChange"
    >
      <el-table-column label="任务ID" width="100">
        <template slot-scope="scope">
          <div class="codeId" @click="openDedail(scope.row.id)">
            {{ scope.row.id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" sortable='custom'>
          <template slot-scope="scope">
          {{badType[scope.row.type]}}
        </template>
         </el-table-column>
      <el-table-column prop="desc" label="描述"> </el-table-column>
      <el-table-column prop="status" label="状态" sortable='custom'>
         <template slot-scope="scope">
          {{badStatus[scope.row.status]}}
        </template>
         </el-table-column>
      <el-table-column prop="username" label="提交人"> </el-table-column>
      <el-table-column prop="auditer" label="审核人" sortable='custom'>
      </el-table-column>
      <el-table-column prop="update_time" label="上传时间"> </el-table-column>
      <el-table-column prop="create_time" label="审核时间"> </el-table-column>
      <el-table-column prop="result" label="审核结果"> 
 <template slot-scope="scope">
        {{badRes[scope.row.result]}}
      </template>
      </el-table-column>
      <el-table-column prop="node" label="备注">
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog
      title="查询底库数据"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <face-repeat></face-repeat>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
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
</template>
<script>
import faceRepeat from "./faceRepeat.vue";
import { getPolList,getPolStatus,getPolRes,getPolType } from "../../api/api";
export default {
  components: { faceRepeat },
  data() {
    return {
      params: {},
      tableData: [],
      dialogVisible: false,
       badStatus:[],
      badRes:[],
      badType:[],
       total: 0, //实现动态绑定
      pageSize: 2,
      page: 1,
      ordering:''
    };
  },
  created() {
     this.getStatus();
    this.getType();
    this.getRes()
    this.getList();
  },
  methods: {
    // 排序
     sortChange(column) {
      console.log(column);
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
      console.log(currentPage); //点击第几页
      this.getList();
    },
    // 翻页
    pageChange(current) {
				this.page = current;
			  this.getList();
			},
    // 上传
    onUplode() {
      this.$router.push({ name: "baseUplode" });
    },
    // 表格
    formatter(row, column) {
      return row.address;
    },
    //    点击详情
    openDedail(id) {
      this.$router.push({ name: "dedailPage", query: { id: id } });
    },
    // 弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    async getList() {
      const loading = this.$loading({
        lock: true,
      });
       let data = {
        page: this.page,
        page_size: this.pageSize,
        ordering: this.ordering,
      };
     try{
        let result = await getPolList(data);
      console.log(result);
      this.tableData = result.results;
      this.total = result.count;
      loading.close();
     }catch{
        loading.close();
     }
    },
      // 获取状态
    async getStatus() {
     this.badStatus = await getPolStatus()
    },
     // 获取结果
    async getRes() {
     this.badRes = await getPolRes()
    },
    //获取问题类型
 async getType() {
     this.badType = await getPolType()
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