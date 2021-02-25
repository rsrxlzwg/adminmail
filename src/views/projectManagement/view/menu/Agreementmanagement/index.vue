<template>
  <div>
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
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <component
        v-for="item in moudlelist.filter(e => e.id == selectid)"
        :is="item.component"
        ref="childIss"
        :formData="formData"
      ></component>

      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          type="primary"
          @click="submitForm"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import headersearch from '@/views/components/search'
import {getInfo,submitInfo,getprotolInfo,editInfo,deleteInfo} from '@/api/commonComponents/protocolManage'
import moudlelist from './moudle'
export default {
    components: {
      rendertable,
      headersearch
    },
    filters: {
      visitFilter(visitType) {
        const visitMap = {
          '0':'C端接入',
          '1': 'P端接出',
        };
        return visitMap[visitType];
      }
    },
    data() {
      return {
        moudlelist,
        selectid: '',
        dialogVisible: false,
        form: {},
        searchModel:{
          formModel:{
            protocolName: '',
            protocolTypeName: '',
          },
          searchFild:[
            {
              type:'input',
              label:'协议名称',
              prop:'protocolName'
            },
            {
              type:'input',
              label:'协议类型名称',
              prop:'protocolTypeName'
            },
            {
              type:'select',
              label:'访问模式',
              prop:'visitType',
              options:[
                {
                  label:'P端接出',
                  value:'1'
                },
                {
                  label:'C端接入',
                  value:'0'
                }
              ]

            }
          ]
        },
        renderheader: [
          {
            prop: 'protocolName',
            label: '协议名称'
          },
          {
            prop: 'protocolTypeName',
            label: '协议类型名称',
          },
          {
            prop: 'messageName',
            label: '报文模式'
          },
          {
            prop: 'visitType',
            label: '访问模式',
            render:(h,params)=>{
              return h("span", {
                style: {
                  display: "inline-block",
                },
              },this.$options.filters.visitFilter(params.row.visitType));
            }
          }
        ],
        renderdata: [
        ],
        // 操作按钮
        actionlinedata: [
          {
            render: (h) => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  icon: "el-icon-zoom-in"
                },
                on: {
                  click: () => {
                    this.openAdd()
                  }
                }
              }, '新增')
            }
          },
          {
            render: (h) => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  icon: 'el-icon-edit'
                },
                on: {
                  click: () => {
                    this.update()
                  }
                }
              }, '修改')
            }
          },
          {
            render: (h) => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  icon: 'el-icon-delete'
                },
                on: {
                  click: () => {
                    this.delFun()
                  }
                }
              }, '删除')
            }
          },
          {
            render: (h) => {
              return h('el-button', {
                attrs: {
                  size: 'mini',
                  icon: 'el-icon-sold-out'
                },
                on: {
                  click: () => {
                    // this.dialogVisible = true
                    // this.selectid = 2
                  }
                }
              }, '查看关联')
            }
          }

        ],
        pagination:{
          currentPage: 1,
          pagesize: 10,
          total:10,
          show:true
        },
        formData: {
          id:'',
          communicationType:'',
          protocolName: '',
          protocolId: '',
          messageId: '',
          exceptionId: '',
          visitType: '',
          type: '',
          adaptationId:'',
          requestValue:{'requestCode':'','requestUrl':'','threadTypeId':'','requestType':'','port':''},
          responseValue:{'responseCode':'','codeMappingIds':[]}
        },
        pageType:''
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      onSearch(){
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
      sizeChange(val){
        this.pagination.pagesize=val
        this.getList()
      },
      currentChange(val){
        this.pagination.currentPage=val
        this.getList()
      },
      openAdd(){
        this.dialogVisible = true
        this.selectid = 1
        this.pageType='add'
        this. formData={
            id:'',
            protocolName: '',
          communicationType:'',
            protocolId: '',
            messageId: '',
            exceptionId: '',
            visitType: '',
             type: '',
            adaptationId:'',
            requestValue:{'requestCode':'','requestUrl':'','threadTypeId':'','requestType':'','port':''},
            responseValue:{'responseCode':'','codeMappingIds':[]}
        }
      },
      submitForm(){
        this.dialogVisible = false
        if(this.pageType=='add'){
          submitInfo(this.formData).then(res=>{
            console.log("CODE ",res.code)
            if(res.code===200){
              this.$refs.compTable.hideDialog()
            }
          })
        }else{
          editInfo(this.formData).then(res=>{
            if(res.code===200){
              this.$refs.compTable.hideDialog()
            }
          })
        }
        this.getList()
      },
      update(){
        // 获取选中值
        this.selectid = 1
        const selectionData=this.$refs.multipleTable.$refs.multipleTable.selection
        console.log("selectionData",selectionData)
        if(selectionData.length!==1){
          this.$message({
            type: 'warning',
            message:'请选择一条数据'
          });
          return false
        }
        this.dialogVisible = true
        this.pageType='edit'
        let refForm=this.formData

        getprotolInfo({id:selectionData[0].id}).then(res=>{
          if(res.code===200){
            Object.keys(refForm).forEach(key => { refForm[ key ] = res.data[ key ] })
            // console.log('tt',this.$refs.childIss[0].$refs.editTable)
            this.$refs.childIss[0].$refs.editTable.getBaseServices(this.formData.adaptationId)
          }else{
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })

      },
      delFun() {
        // 获取选中值
        const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
        const haveData = selectionData.length > 0
        if (haveData) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteInfo(json).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getList()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
        }
        const ids = []
        selectionData.forEach(e => {
          ids.push(e.id)
        })
        const json={
          idList:ids
        }
        console.log({json})
      }
    },
  };
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
