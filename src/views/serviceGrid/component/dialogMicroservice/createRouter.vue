<template>
  <div>
    <el-form ref="fileData" :model="fileData" label-width="100px">
      <el-form-item label="名称" >
          <el-input size="small" v-model="fileData.name" placeholder=""  ></el-input>
      </el-form-item>
      <el-form-item label="显示名称" >
          <el-input size="small" v-model="fileData.visibleName" placeholder="" ></el-input>
      </el-form-item>
      <el-form-item label="条件规则">
        <el-button type="primary" size="mini" @click="addTable" >添加</el-button>

      </el-form-item>
  
      <el-form-item label="权重规则">

          <el-table
            :data="fileData.content"
            style="width: 100%">
            <el-table-column
              label="工作负载">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.workload" size="small" />
                <!-- <el-select v-model="scope.row.workload"  size="small">
                  <el-option :value="1" label="details"></el-option>
                  <el-option :value="2"  label="ratings"></el-option>
                  <el-option :value="3"  label="reviews"></el-option>
                  <el-option :value="4"  label="productPage"></el-option>
              </el-select> -->
              </template>
            </el-table-column>
            <el-table-column
              label="版本">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.versions" size="small" />
              </template>
            </el-table-column>
              <el-table-column
              label="权重">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.weight" size="small" >
                   <template slot="append">%</template>
                </el-input>
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        fileData:{
          name:'',
          visibleName:'',
          content:[
            {
              workload:'',
              versions:'',
              weight:''
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