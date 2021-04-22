<template>
  <div>
      <el-form :inline="true" status-icon :model="params" ref="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="14">
              <h3>底库数据审核</h3>
            </el-col>
            <el-col :span="10">
                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">底库数据查询</el-button>
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
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column label="任务ID" width="100">
            <template slot-scope="scope">
                <div 
                class="codeId"
                @click="openDedail(scope.row.date)"
                >
                    {{scope.row.date}}
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="names"
        label="类型"
        sortable>
        </el-table-column>
        <el-table-column
        prop="names"
        label="描述">
        </el-table-column>
        <el-table-column
        prop="names"
        label="状态"
        sortable>
        </el-table-column>
        <el-table-column
        prop="names"
        label="提交人">
        </el-table-column>
        <el-table-column
        prop="names"
        label="审核人"
        sortable>
        </el-table-column>
        <el-table-column
        prop="names"
        label="上传时间">
        </el-table-column>
        <el-table-column
        prop="names"
        label="审核时间">
        </el-table-column>
        <el-table-column
        prop="names"
        label="审核结果">
        </el-table-column>
        <el-table-column
        prop="address"
        label="备注"
        :formatter="formatter">
        </el-table-column>
    </el-table>
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
        params:{},
        tableData: [{
          date: '2016-05-02',
          names: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          names: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          names: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          names: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        dialogVisible: false,
            
        }
    }, 
    created(){
    },
    methods:{
        // 上传
        onUplode(){
            this.$router.push({name:'baseUplode'})
        },
        // 表格
        formatter(row, column) {
        return row.address;
      },
    //    点击详情
        openDedail(){
            this.$router.push({name:'dedailPage'})
        },
        // 弹框
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        
    }
}
</script>
<style>
.codeId{
    white-space: nowrap;
    color: #409EFF;
}
.codeId:hover{
    cursor: pointer;
}
.pagination{
  text-align: right;
}
</style>