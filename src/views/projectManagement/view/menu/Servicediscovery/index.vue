<template>
  <div>
  <headersearch :searchModel=searchModel @onSearch="onSearch" ></headersearch>
    <el-card>
      <rendertable
        ref="multipleTable"
        :table-data="renderdata"
        :table-header="renderheader"
        :pagination="pagination"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        :showselect='true'
      />
    </el-card>
      <!-- <component
        :is="item.component"
        ref="refForm"
        :formData="formData"
        v-for="(item,i) in moudlelist.filter(e => e.id == selectid)"
      /> -->

      <!-- <span
        slot="footer"
        class="dialog-footer"
      >

      </span> -->

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import headersearch from '@/views/components/search'
import {getInfos} from '@/api/serviceManagement/onlineManagement/serviceDiscovery'
import moudlelist from './moudle'
export default {
  components: {
    rendertable,
    headersearch
  },
  data() {
    return {
      moudlelist,
      selectid: '',
      dialogVisible: false,
      form: {},
      searchModel:{
         formModel:{

          },
          searchFild:[
           {
              type:'input',
              label:'服务编码',
              prop:'serviceCode'
            },
            {
              type:'input',
              label:'服务名称',
              prop:'serviceName'
            },
        ]
      },
      renderheader: [
        {
          prop: 'appCode',
          label: '应用编码'
        },
        {
          prop: 'appName',
          label: '应用名称'
        },
        {
          prop: 'serviceCode',
          label: '服务编码'
        },
        {
          prop: 'serviceName',
          label: '服务名称'
        },
        {
          prop: 'upTime',
          label: '上线时间'
        }

      ],
      renderdata: [
      ],
      pagination:{
        currentPage: 1,
        pagesize: 10,
        total:10,
        show:true
      },
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    onSearch(){
      this.pagination.currentPage=1
      this.pagination.pagesize=10
      this.getList()
    },
   getList(){
      const params={
        "requestObject": {
          ...this.searchModel.formModel
          },
        "pageNo": this.pagination.currentPage,
        "pageSize": this.pagination.pagesize
      }
      getInfos(params).then(res => {
        if(res.code===200){
            this.renderdata = res.data.data
            this.pagination.total=res.data.totalCount
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })
    },


   sizeChange(val){
      this.pagination.pagesize=val
      this.getList()
    },
    currentChange(val){
      this.pagination.currentPage=val
      this.getList()
    }
  },
}
</script>

<style scoped lang="scss">
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
