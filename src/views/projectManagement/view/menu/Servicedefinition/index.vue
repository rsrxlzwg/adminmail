<template>
  <div>
    <headersearch
      :searchModel="searchModel"
      @onSearch="onSearch"
    ></headersearch>
    <el-card>
      <rendertable
        ref="multipleTable"
        :table-data="renderdata"
        :table-header="renderheader"
        :actionlinedata="actionlinedata"
        :pagination="pagination"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        :showselect="true"
      />
    </el-card>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
      <component
        :is="item.component"
        ref="refForm"
        :formData="formData"
        :form="form"
        :detaildata="detaildata"
        :interfaceCode="interfaceCode"
        @getinterfaceCodeList="getinterfaceCodeList"
        v-for="(item, i) in moudlelist.filter((e) => e.id == selectid)"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitHandle">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from "@/views/projectManagement/components/table";
import headersearch from "@/views/components/search";
import moudlelist from "./moudle";
import {
  getInfo,
  getApp,
  submitInfo,
  editInfo,
  deleteOne,
  getCatalog,
  getInterface,
  addServiceApproval
} from "@/api/serviceManagement/offlineManagement/serviceList";
let applist = [];
export default {
  components: {
    rendertable,
    headersearch,
  },
  filters: {
    filterType(type) {
      const statusMap = {
        1: "未发布",
        2: "已发布",
      };
      return statusMap[type];
    },
    filterAuth(authStatus) {
      const authMap = {
        1: "待审批",
        2: "发起审批",
        3: "审批完成",
      };
      return authMap[authStatus];
    },
  },
  data() {
    return {
      moudlelist,
      selectid: "",
      interfaceCode:[],
      dialogVisible: false,
      searchModel: {
        formModel: {
          appId: "",
        },
        searchFild: [
          {
            type: "select",
            label: "所属应用",
            prop: "appId",
            options: applist,
          },
          {
            type: "input",
            label: "服务编码",
            prop: "serviceCode",
          },
          {
            type: "select",
            label: "服务状态",
            prop: "status",
            options: [
              {
                label: "未发布",
                value: "1",
              },
              {
                label: "已发布",
                value: "2",
              },
            ],
          },
          {
            type: "select",
            label: "审批状态",
            prop: "authStatus",
            options: [
              {
                label: "待审批",
                value: "1",
              },
              {
                label: "发起审批",
                value: "2",
              },
              {
                label: "审批完成",
                value: "3",
              },
            ],
          },
        ],
      },
      renderheader: [
        {
          prop: "serviceCode",
          label: "服务编码",
        },
        {
          prop: "version",
          label: "当前版本",
        },
        {
          prop: "serviceName",
          label: "服务名称",
        },

        {
          prop: "appName",
          label: "所属应用名称",
        },
        {
          prop: "status",
          label: "服务状态",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterType(params.row.status)
            );
          },
        },
        {
          prop: "authStatus",
          label: "审批状态",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterAuth(params.row.authStatus)
            );
          },
        },
        {
          prop: "timeout",
          label: "超时时间",
        },
        {
          prop: "retryCount",
          label: "重试次数",
        },

      ],
      renderdata: [],
      actionlinedata: [
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-zoom-in",
                },
                on: {
                  click: () => {
                    this.openAdd();
                  },
                },
              },
              "新增"
            );
          },
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-edit",
                },
                on: {
                  click: () => {
                    (this.dialogVisible = true), (this.selectid = 1);
                  },
                },
                on: {
                  click: () => {
                    this.openEdit();
                  },
                },
              },
              "修改"
            );
          },
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-delete",
                },
                on: {
                  click: () => {
                    this.delFun();
                  },
                },
              },
              "删除"
            );
          },
        },{
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-delete",
                },
                on: {
                  click: () => {
                  },
                },
              },
              "导入"
            );
          },
        },{
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-delete",
                },
                on: {
                  click: () => {
                  },
                },
              },
              "导出"
            );
          },
        },{
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-delete",
                },
                on: {
                  click: () => {
                  },
                },
              },
              "模板下载"
            );
          },
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-upload",
                },
                on: {
                  click: () => {
                    this.checkStart();
                  },
                },
              },
              "发起审批"
            );
          },
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-refresh-right",
                },
                on: {
                  click: () => {
                    
                    this.selectid = 3;
                    this.dialogwidth = "60%";
                    this.getDetail();
                  },
                },
              },
              "审批完成"
            );
          },
        },
      ],
     
      formData: {
        id: "",
        cateId: "",
        catalogName: "",
        appId: "",
        baffleId: "",
        cosuAppId: "",
        version: "",
        serviceName: "",
        status: "",
        authStatus: "",
        interfaceId: "",
        serviceCode: "",
        enableTimeout:"",
        timeout:"",
        enableRetry:"",
        retryCount:"",
        sceneCode:"",
        },
        form:{
          
          approvalChoices:'',
          approvalOptions:''
        },
      detaildata:[],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true,
      },
      catalogData: {
        id: "",
        catalogName: "",
      },
    };
  },
  beforeCreate() {
    applist = [];
    getApp().then((res) => {
      if (res.code === 200) {
        this.$nextTick(() => {
          res.data.forEach((e) => {
            applist.push({
              label: e.appName,
              value: e.id,
            });
          });
        });
        console.log("eee", applist);
      } else {
        this.$message({
          type: "error",
          message: res.message,
        });
      }
    });
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSearch() {
      this.pagination.currentPage = 1;
      this.pagination.pagesize = 10;
      this.getList();
    },
    getinterfaceCodeList() {
      var esbGroup = { appId: this.formData.appId };
      getInterface(esbGroup).then((res) => {
        if (res.code === 200) {
          this.interfaceCode = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    checkStart() {
      // 发起审批
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      console.log("0000000000000",selectionData[0]);  
      editInfo({ id: selectionData[0].id, authStatus: "2",enableTimeout:selectionData[0].enableTimeout,
        enableRetry:selectionData[0].enableRetry,
        timeout:selectionData[0].timeout,retryCount:selectionData[0].retryCount}).then((res) => {
        if (res.code === 200) {
          this.getList();
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
     },
     getDetail(params) {     
        const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.dialogVisible = true;
      this.pageType = "approval";     
     },
     approvalFun(approvalparams){
       const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection;
       this.serviceListId=selectionData.id;
        console.log("detail", approvalparams);
      console.log("serviceListId", selectionData[0].id);
      addServiceApproval({serviceListId: selectionData[0].id,...approvalparams}).then((res) => {
        if (res.code === 200) {
         // this.detaildata = res.data;
          this.$message({
            type: "success",
            message: "审批完成",
          });
          this.dialogVisible = false;
          this.getList();
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
   
    // checkEnd() {
    //   // 审批完成
    //   const selectionData = this.$refs.multipleTable.$refs.multipleTable
    //     .selection;
    //   if (selectionData.length !== 1) {
    //     this.$message({
    //       type: "warning",
    //       message: "请选择一条数据",
    //     });
    //     return false;
    //   }
    //   console.log("0000000000000");
      
      // editInfo({ id: selectionData[0].id, authStatus: "3",
      // enableTimeout:selectionData[0].enableTimeout,
      // enableRetry:selectionData[0].enableRetry,
      // timeout:selectionData[0].timeout,retryCount:selectionData[0].retryCount}).then((res) => {
      //   if (res.code === 200) {
      //     this.getList();
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: res.message,
      //     });
      //   }
      // });
      //},
    openAdd() {
      this.selectid = 1;
      this.pageType = "add";
      this.dialogVisible = true;
      Object.keys(this.formData).map((key) => (this.formData[key] = ""));
      this.formData.enableTimeout="1"
      this.formData.enableRetry="1"
      var esbGroup = { appId: "" };
      getInterface(esbGroup).then((res) => {
        if (res.code === 200) {
          this.interfaceCode = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    openEdit() {
      // 获取选中值

      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      //console.log('111111',this.formData)
      this.dialogVisible = true;
      this.selectid = 1;
      this.pageType = "edit";
      this.formData.catalogName = selectionData[0].catalogName;
      this.formData.cateId = selectionData[0].cateId;
      var esbGroup = { appId: selectionData[0].appId };
      getInterface(esbGroup).then((res) => {
        if (res.code === 200) {
          this.interfaceCode = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
      getCatalog(selectionData[0].cateId).then((res) => {
        if (res.code === 200) {
          this.formData.catalogName = res.data.catalogName;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });

      let refForm = this.formData;
      Object.keys(refForm).forEach((key) => {
        refForm[key] = selectionData[0][key];
      });
    },
    getList() {
      const params = {
        requestObject: {
          ...this.searchModel.formModel,
        },
        pageNo: this.pagination.currentPage,
        pageSize: this.pagination.pagesize,
      };
      getInfo(params).then((res) => {
        if (res.code === 200) {
          this.renderdata = res.data.data;
          this.pagination.total = res.data.totalCount;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    submitHandle() {
      const params = this.formData;
      const approvalparams = this.form;
      console.log("00", this.selectid);
      if (this.pageType === "add" && this.selectid === 1) {
        console.log("111");
        this.submitFun(params);
      }
      if (this.pageType === "edit" && this.selectid === 1) {
        console.log("222");
        this.editFun(params);
      }
      if (this.pageType === "approval" ) {
        console.log("333");
        this.approvalFun(approvalparams);
      }
    },
    submitFun(params) {
      submitInfo(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    editFun(params) {
      editInfo(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    delFun() {
      // 获取选中值
      const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
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
    sizeChange(val) {
      this.pagination.pagesize = val;
      this.getList();
    },
    currentChange(val) {
      this.pagination.currentPage = val;
      this.getList();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.catalogName.indexOf(value) !== -1;
    },
  },
  // components: {
  //   rendertable,
  //   headercontener
  // },
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
