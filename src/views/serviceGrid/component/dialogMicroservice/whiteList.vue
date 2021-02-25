<template>
  <div>
        <el-button type="primary" size="mini" @click="addTable" style="float:right">添加</el-button>
          <el-table
            :data="fileData.content"
            style="width: 100%">
            <el-table-column
              label="微服务">
              <template slot-scope="scope">
                <el-select v-model="scope.row.workload"  size="small">
                  <el-option :value="1" label="details"></el-option>
                  <el-option :value="2"  label="ratings"></el-option>
                  <el-option :value="3"  label="reviews"></el-option>
                  <el-option :value="4"  label="productPage"></el-option>
              </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="版本">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.versions" size="small" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="tableDel(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        fileData:{
          content:[
            {
              workload:'',
              versions:'',
            }
          ],
      },
      }

    },
    methods:{
       tableDel(i){
      this.fileData.content.splice(i,1)
    },
    addTable(){
      this.fileData.content.push({
            workload:'',
            versions:'',
          })
    },
    }
  }
</script>

<style lang="scss" scoped>
/deep/ .el-radio{
  margin-bottom: 30px;
}

</style>