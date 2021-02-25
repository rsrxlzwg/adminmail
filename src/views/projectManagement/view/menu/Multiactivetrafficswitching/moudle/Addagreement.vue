<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="多活流量名称">
          <el-input
            v-model="formData.name"
            size="mini"            
          />
        </el-form-item>
     
      
      <el-form-item
        label="所属应用">
        <el-select
          v-model="formData.appId"
          size="mini"
          style="width:100%"
          placeholder=""
          @change="getGroupList"
        
        >
          <el-option
            v-for="item in applist"
            :label="item.appName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>             
      <el-form-item label="权重分配">
        <el-card>
          <rendertable
            :tableHeader='tableHeader'
            :tableData='formData.distributeInfo'
            :showpagination='false'
          />       
        </el-card>
        </el-form-item>
         <el-form-item label="描述">
          <el-input
            v-model="formData.description"
            size="mini"
          />
        </el-form-item>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import {getApp} from '@/api/serviceManagement/appManage/sdkgroup'
import {getGroup} from '@/api/serviceManagement/onlineManagement/acticeDistribute'
export default {
  components: {
    rendertable
  },
   props:{
    formData:{
      type:Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      applist:[],
      form: {
       
      },
      tableHeader: [
         {
          prop: 'groupName',
          label: '终端组'
        },
        {
          prop: 'weightDistributeInfo',
          label: '权重',
          render: (h, { row } ) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'weightDistributeInfo' ]
              },
              on: {
                input: e => {
                  row[ 'weightDistributeInfo' ] = e
                }
              }
            })
          }
        }
      ],
      tableData: [
        {
          key: '',
          value: ''
        }
      ],
    }
  },
  mounted() {
      getApp().then( res =>
        {
          if(res.code===200){
            this.applist = res.data
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })
   },
  methods:{   
     getGroupList(data){
       var groupList = {appId:data}
       console.log({data})
      getGroup(groupList).then( res =>
        {
          if(res.code===200){
                  console.log('hhhh',res.data)
            this.formData.distributeInfo = res.data
            this.formData.distributeInfo.forEach(element => {
              element.activeDistruId=element.id

            });
            console.log("distributeInfo",this.formData.distributeInfo)
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })

    }
  } 
}
</script>
<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>