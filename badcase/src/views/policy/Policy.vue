<template>
  <div>
      <el-form :inline="true" status-icon :model="params" ref="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="14">
              <h3>底库数据审核</h3>
            </el-col>
            <el-col :span="10">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">底库数据查询</el-button>
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
        <el-table-column
        prop="date"
        label="任务ID"
        
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="类型"
        sortable
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="描述"
        
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="状态"
        sortable
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="提交人"
        
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="审核人"
        sortable
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="上传时间"
        
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="审核时间"
        
        width="180">
        </el-table-column>
        <el-table-column
        prop="name"
        label="审核结果"
        
        width="180">
        </el-table-column>
        <el-table-column
        prop="address"
        label="备注"
        :formatter="formatter">
        </el-table-column>
    </el-table>
</div>
    
</template>
<script>
export default {
    data(){
        return {
           tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
            
        }
    }, 
    created(){
        this.getOrderList()
    },
    methods:{
        // 上传
        onUplode(){
            this.$router.push({name:'baseUplode'})
        },
        // 表格
        formatter(row, column) {
        return row.address;
      }
       
        
    }
}
</script>
<style>
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width: 350px;
}
.pagination{
  text-align: right;
}
</style>