<template>
  <div>

    <el-form
    ref="addForm"
      :model="formData"
      label-width="100px"
      label-position="left"
    >
    <el-form-item label="主注册中心">
        <el-select
          v-model="formData.mainRegistryId"
          size="mini"
          style="width: 100%"
          placeholder=""
          @change="mainChange"
        >
          <el-option
            v-for="item in registryList"
            :label="item.registryName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="类型"  v-show="formData.mainRegistryId" >
          <el-input size="small" v-model="formData.mainRegistryType" placeholder=""  style="width:68%" disabled></el-input>
        </el-form-item>
         <el-form-item label="地址" v-show="formData.mainRegistryId">
          <el-input size="small" v-model="formData.mainRegistryAddress" placeholder=""  style="width:68%" disabled></el-input>
        </el-form-item>

      <el-form-item label="备用注册中心">
        <el-select
          v-model="formData.standbyRegistryId"
          size="mini"
          style="width: 100%"
          placeholder=""
          @change="standbyChange"
        >
          <el-option
            v-for="item in registryList"
            :label="item.registryName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
           <el-form-item label="类型"  v-show="formData.standbyRegistryId">
          <el-input size="small" v-model="formData.standbyRegistryType" placeholder=""  style="width:68%" disabled></el-input>
        </el-form-item>
         <el-form-item label="地址" v-show="formData.standbyRegistryId">
          <el-input size="small" v-model="formData.standbyRegistryAddress" placeholder=""  style="width:68%" disabled></el-input>
        </el-form-item>
      </el-form>
  </div>
</template>


<script>
import { queryList} from '@/api/registryCenter/registConfig.js'

let registryList=[]
  export default {
    props:{
      formData:{
       type: Object,
      default: () => {
        return {};
        }
      },
    },
    data(){
      return {
        registryList:[],
      }
    },
    // beforeCreate() {
    // queryList().then((res) => {
    //   if (res.code === 200) {
    //     this.$nextTick(() => {
    //       res.data.forEach((e) => {
    //         registryList.push({
    //           label: e.registryName,
    //           value: e.id,
    //         });
    //       });
    //     });
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: res.message,
    //     });
    //   }
    // });


    // },
    mounted(){

        queryList().then((res) => {
        if (res.code === 200) {
          this.$nextTick(() => {
            this.registryList = res.data;
          });
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      })

    },
    methods:{
        mainChange(data){
           var registryList = {mainRegistryId:data}
           console.log({data})
           console.log({registryList})
          this.formData.show=true
          const params= this.registryList.find(item=> item.id===data)
          console.log({params})
            this.formData.mainRegistryType = params.registryType==="1"?'Zookeeper':'nacoscenter'
            this.formData.mainRegistryAddress=params.registryAddress

        },
        standbyChange(data){
          var registryList = {standbyRegistryId:data}
           console.log({data})
           console.log({registryList})
          this.formData.show=true
          const params= this.registryList.find(item=> item.id===data)
          console.log({params})
            this.formData.standbyRegistryType = params.registryType==="1"?'Zookeeper':'nacoscenter'
            this.formData.standbyRegistryAddress=params.registryAddress

        }
  }

  }
</script>

<style lang="scss" scoped>
/deep/ .el-radio{
  margin-bottom: 30px;
}

</style>
