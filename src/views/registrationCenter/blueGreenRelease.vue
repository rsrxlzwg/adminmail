<template>
  <!-- 集群  -->
  <div class="culster-container">
    <headersearch :search-model="searchModel" :show="searchModel.show" @onSearch="onSearch" />
    <comp-table
      ref="compTable"
      :tableModel=tableModel
      :formModel=formModel
      :searchModel=searchModel
      @openAdd="openAdd"
    @openEdit="openEdit"
      @editInfo="editInfo"
      @onSearch="onSearch"
      @delFun="delFun"
      @masterChange="masterChange"
    ></comp-table>
    <el-dialog
      class="deepdialog"
      title="控制台"
      :visible.sync="visible"
      width="40%"
    >
      <component
        is="addProcess"
        :formData="formData"
      ></component>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitHandle"
          size="mini"
        >确 定</el-button>
        <el-button
          @click="visible = false"
          size="mini"
        >取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import compTable from '@/views/components/table'
import addProcess from './addRelationship'
import headersearch from '@/views/components/search'
import { getInfo, submitInfo, editInfo, deleteOne, switchInfo } from '@/api/registryCenter/registryBackup'
import { queryList} from '@/api/registryCenter/registConfig.js'
 let registList=[];
export default {
  name: "Culster",
  components: {
    compTable,
    addProcess,
    headersearch
  },
    filters:{
     filterType(type){
      const statusMap = {
        '1': 'Zookeeper',
        '2': 'Nacos',
      }
      return statusMap[type]
    },
  },
  data() {
    return {
      visible: false,
      dialogVisible: false,
      tableModel: {
        tableData: [
        ],
        rowData: [
          {
            prop: 'mainRegistryName',
            label: '主注册中心名称'
          },
          {
            prop: 'mainRegistryAddress',
            label: '主注册中心地址'
          },
          {
            prop: 'mainRegistryType',
            label: '主注册中心类型',
            render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },
             this.$options.filters.filterType(params.row.mainRegistryType) );
            }
          },
          {
            prop: 'standbyRegistryName',
            label: '备用注册中心名称'
          },
          {
            prop: 'standbyRegistryAddress',
            label: '备用注册中心地址'
          },
          {
            prop: 'standbyRegistryType',
            label: '备用注册中心类型',
            render:(h,params)=>{
                return h("span", {
                  style: {
                    display: "inline-block",
                  },
              },
             this.$options.filters.filterType(params.row.standbyRegistryType) );
            }
          },
        ],
        operateData: [],
        pagination: {
          currentPage:1,
          pagesize:10,
          total:2
        }
      },

      formModel: {
        formData: {
          id:'',
          mainRegistryId:'',
          standbyRegistryId:'',
          comment:''
        },
        formLabelWidth: '140px',
        formFilds: [

        ],
        btnData: [
          {
            type: 'submit',
            style: 'primary',
            label: '确定',
            handle: () => { }
          },
          {
            type: 'cancle',
            label: '取消',
            style: '',
            handle: () => { }
          }

        ],
        rules: {
          tenantName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
        },
      },
      searchModel: {
        btnGroup: [
          {
            type: 'openAdd',
            style: '',
            label: '新增主备关系',
            funName: 'openAdd'
          },
          {
            label: '修改主备关系',
            type: 'openEdit',
            funName: 'openEdit'
          },
          {
            label: '删除主备关系',
            type: 'delFun',
            funName: 'delFun'
          },
          {
            type: 'masterChange',
            style: '',
            label: '主备切换',
            funName: 'masterChange'
          }
        ],
        formModel: {
          name: '',
          type: ''

        },
        searchFild: [
          {
            type: 'select',
            label: '注册中心名',
            prop: 'mainRegistryId',
            options: registList
          },
          // {
          //   type: 'select',
          //   label: '类型',
          //   prop: 'mainRegistryType',
          //   options: [
          //     {
          //       label: 'Zookeeper',
          //       value: '1'
          //     },
          //     {
          //       label: 'Nacos',
          //       value: '2'
          //     }
          //   ]
          // },
        ]
      },
      addVisible: false,
      formData: {
        id:'',
        mainRegistryId:'',
        standbyRegistryId:'',
        comment:'',
        mainRegistryName:'',
        mainRegistryType:'',
        mainRegistryAddress:'',
        standbyRegistryAddress:'',
        standbyRegistryName:'',
        standbyRegistryType:''
      },

    };
  },
  beforeCreate() {
    registList = [];
    queryList().then((res) => {
      if (res.code === 200) {
        this.$nextTick(() => {
          res.data.forEach((e) => {
            registList.push({
              label: e.registryName,
              value: e.id,
            });
          });
        });
      } else {
        this.$message({
          type: "error",
          message: res.message,
        });
      }
    });


  },
  mounted() {
     this.getList()
  },
  methods: {
     onSearch() {
        console.log('123456',)
      // this.tableModel.pagination.currentPage=1
      // this.tableModel.pagination.pagesize=10
      this.getList()
    },
    getList() {
      const params = {
        'requestObject': {
          ...this.searchModel.formModel
        },
        'pageNo': this.tableModel.pagination.currentPage,
        'pageSize': this.tableModel.pagination.pagesize
      }
      getInfo(params).then(res => {
        if (res.code === 200) {
          this.tableModel.tableData = res.data.data
          this.tableModel.pagination.total = res.data.totalCount
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    openAdd() {
       this.pageType = "add";

      this.visible=true
      Object.keys(this.formData).map((key) => (this.formData[key] = ""));

    },
    openEdit() {
      // 获取选中值
      this.selectDisabled = true;
      const selectionData = this.$refs.compTable.$refs.commonTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.visible = true;
      this.pageType = "edit";
      let refForm = this.formData;
      Object.keys(refForm).forEach(key => { refForm[ key ] = selectionData[ 0 ][ key ] })
     },
    submitHandle() {
       const params = this.formData;
      //  const params=JSON.parse(JSON.stringify(this.fileData))
      console.log("00", this.selectid );
      if (this.pageType === "add") {
        console.log("111",params);
        this.submitInfo(params);
      }
      if (this.pageType === "edit" ) {
        console.log("222");
        this.editInfo(params);
      }
    },
    submitInfo(params) {
      console.log({ params })
      submitInfo(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.dialogVisible = false;
          this.visible = false;
          this.getList();
        }
      });
    },
    editInfo(params) {
      editInfo(params).then(res => {
        if (res.code === 200) {
           this.$message({
            type: "success",
            message: "修改成功",
          });
          this.$refs.compTable.hideDialog()
          this.dialogVisible = false;
          this.visible = false;
          this.getList()
        }
      })
    },
    addRelationship() {
      this.visible = true
    },
    delFun() {
      // 获取选中值
      const selectionData = this.$refs.compTable.$refs.commonTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      const ids = []
      selectionData.forEach(e => {
        ids.push(e.id)
      })
      console.log({ids})
      deleteOne(ids[0]).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        }
      })
        })
    },
    masterChange() {
      //主备切换
      const selectionData = this.$refs.compTable.$refs.commonTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      const ids = []
      selectionData.forEach(e => {
        ids.push(e.id)
      })
      console.log({ids})
      switchInfo({id: selectionData[0].id}).then(res => {

        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '切换成功'
          })
          this.getList()
        }
      })

    },
    issueFun() {
      this.$message.success('下发成功')
    },
    addProcess() {
      this.visible = true
    },

    addService() {
      this.addVisible = true
    },

  }
};
</script>

<style lang="scss" scoped>
.culster-container {
  // &-container {
  // }
  .mr0 {
    margin-right: 0 !important;
  }
  // form.el-form {
  //   float: right;
  // }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>
