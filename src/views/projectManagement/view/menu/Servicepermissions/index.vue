<template>
  <div>
    <!-- <headercontener>
      <el-row
        type="flex"
        align="middle"
        :gutter="12"
      >
        <el-col :span="5">
          <el-row
            type="flex"
            align="middle"
          >
            <el-col :span="9">
              <span style="fontSize:'5px'">消费者应用</span>
            </el-col>
            <el-col :span="14">
              <el-input
                placeholder="请输入"
                size="small"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row
            type="flex"
            align="middle"
          >
            <el-col :span="8">
              <span style="fontSize:'5px'">服务编码</span>
            </el-col>
            <el-col :span="14">
              <el-input
                placeholder="请输入"
                size="mini"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row
            type="flex"
            align="middle"
          >
            <el-col :span="5">
              <span style="fontSize:'5px'">状态</span>
            </el-col>
            <el-col :span="14">
              <el-select
                size="mini"
                placeholder="请选择"
              >
                <el-option
                  label="新增"
                  value="新增"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="5">
              <el-button
                size="mini"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                size="mini"
                icon="el-icon-delete"
              >清空</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </headercontener> -->

    <el-card>
   <headersearch :searchModel=searchModel @onSearch="onSearch" ></headersearch>
    <el-card>
      <rendertable
        ref="multipleTable"
        :table-data="renderdata"
        :table-header="renderheader"
        :actionlinedata="actionlinedata"
        :pagination="pagination"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        :showselect='true'
      />
    </el-card>

    </el-card>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
       <component
        :is="item.component"
        ref="refForm"
        :formData="formData"
        v-for="(item,i) in moudlelist.filter(e => e.id == selectid)"
      />

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import {getInfo,publish,cancel} from '@/api/serviceManagement/offlineManagement/servicePublish'
import headersearch from '@/views/components/search'
import moudlelist from './moudle'
export default {
  components: {
    rendertable,
    headersearch
  },
    filters:{
    filterLoadType(type){
      const statusMap = {
        '1': '未发布',
        '2': '已发布',
      }
      return statusMap[type]
    },
  },
  data() {
    return {
      moudlelist,
      selectid: '',
      dialogVisible: false,
      pagination:{
        currentPage: 1,
        pagesize: 10,
        total:10,
        show:true
      },
      searchModel:{
         formModel:{
            deployModel: '',
          },
          searchFild:[
           {
              type:'select',
              label:'服务状态',
              prop:'status',
              options:[
            {
              label:'未发布',
              value:1
             },
             {
               label:'已发布',
               value:2
             }
           ]

            },
            {
              type:'input',
              label:'服务编码',
              prop:'serviceCode'
            },


        ]
      },

      renderheader: [
        {
          prop: 'serviceCode',
          label: '服务编码',
        },
        {
          prop: 'serviceName',
          label: '服务名称',
        },
        {
          prop: 'cosuAppName',
          label: '消费方应用'
        },
        {
          prop: 'appName',
          label: '服务方应用'
        },
        {
          prop: 'status',
          label: '服务状态',
          render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },this.$options.filters.filterLoadType(params.row.status) );
            }
        },


      ],
      renderdata: [
        {
        },

      ],
      formData:{
        id:'',
      },

      actionlinedata: [
        ,
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-video-play'
              },
              on: {
                click: () => {
                this.servicePublish()
                }
              }
            }, '服务发布')
          }
        }
        ,
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-sold-out'
              },
              on: {
                click: () => {
                this.serviceCancel()
                }
              }

            }, '服务注销')
          }
        }


      ]
    }
  },
  mounted(){
    this.getList()
  },
  methods:{

    servicePublish(){
        const selectionData=this.$refs.multipleTable.$refs.multipleTable.selection
        if(selectionData.length!==1){
           this.$message({
              type: 'warning',
              message:'请选择一条数据'
          });
          return false
        }
        publish(selectionData[0]).then(res => {
        if(res.code===200){
           this.$message({
                type: 'success',
                message:'发布成功'
            });
            this.dialogVisible=false
            this.getList()
        }

      })

        //console.log("se",selectionData[0])

    },
    serviceCancel(){

      const selectionData=this.$refs.multipleTable.$refs.multipleTable.selection
        if(selectionData.length!==1){
           this.$message({
              type: 'warning',
              message:'请选择一条数据'
          });
          return false
        }
        cancel(selectionData[0]).then(res => {
        if(res.code===200){
           this.$message({
                type: 'success',
                message:'注销成功'
            });
            this.dialogVisible=false
            this.getList()
        }

      })


    },

    getList(){
      const params={
        "requestObject": {
          ...this.searchModel.formModel
          },
        "pageNo": this.pagination.currentPage,
        "pageSize": this.pagination.pagesize
      }
      getInfo(params).then(res => {
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
    onSearch(){
      this.getList()
    },
      sizeChange(val){
      this.pagination.pagesize=val
      this.getList()
    },
    currentChange(val){
      this.pagination.currentPage=val
      this.getList()
    },

    next(){
      this.active=2
    },
    upStep(){
       this.active=1
    }
  }

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
