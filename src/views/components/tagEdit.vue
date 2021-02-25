<template>
  <div>
    <el-button type="primary" size="mini" @click="addTag">添加</el-button>
       <el-table
      :data="tagData"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="键">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.key" size="small" />
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
         <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.value"  size="small" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="tagDel(scope.$index)" type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
       </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      tagData:{
        type:Array,
        default: () => {
              return {}
      }
    }
    },
    data(){
      return{
      }
    },
    methods:{
      addTag(){
        this.tagData.push({
          key:'',
          value:''
        })
      },
      tagDel(i){
        this.tagData.splice(i,1)
      }
  }
  
  }
</script>

<style lang="scss" scoped>

</style>