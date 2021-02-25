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
    <el-dialog title="编辑" :visible.sync="dialogVisible" :width="dialogWidth">
      <component
        :is="item.component"
        @showBtn="showBtn"
        ref="childIss"
        :formData="formData"
        :issuedForm="issuedForm"
        :active="active"
        :formSelectList="formSelectList"
        :grouplist="grouplist"
        @getGroupList="getGroupList"
        @versionChange="versionChange"
        @appChange="appChange"
        @addPrivateParams="addPrivateParams"
        @delPrivateParams="delPrivateParams"
        v-for="item in moudlelist.filter((e) => e.id == selectid)"
      />

      <span slot="footer" class="dialog-footer" v-show="selectid == 1">
        <el-button type="primary" @click="submitHandle" size="mini"
          >确 定</el-button
        >
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-show="selectid == 3">
        <el-button type="primary" size="mini" @click="submitParams"
          >确定</el-button
        >
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-show="selectid == 2">
        <el-button
          type="primary"
          size="mini"
          @click="upStep"
          v-show="active == 2"
          >上一步</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-show="active == 1 && showNext"
          @click="next()"
          >下一步</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-show="(active == 1 && !showNext) || active == 2"
          @click="submitIssued"
          >确定</el-button
        >
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
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
  submitInfo,
  editInfo,
  deleteOne,
  sendVersion,
} from "@/api/serviceManagement/appManage/terminalinfo";
import {
  getParams,
  getVersiByName,
  getSdkTmp,
  submitParams,
  submitAppParams,
} from "@/api/serviceManagement/appManage/terminalIssued";
import { getApp,getGroup } from "@/api/serviceManagement/appManage/sdkgroup";
import { getInfo as getVersion } from "@/api/serviceManagement/appManage/terminalVersion";
import { getApps as getAppList } from "@/api/serviceManagement/appManage/appConfig";

import data from "@/views/OperationMaintenanceMonitoring/tabledata";
let applist = [];
export default {
  components: {
    rendertable,
    headersearch,
  },
  filters: {
    filterType(type) {
      const statusMap = {
        0: "异常",
        1: "正常",
      };
      return statusMap[type];
    },
    filterLoadType(type) {
      const statusMap = {
        0: "未下发",
        1: "已下发",
      };
      return statusMap[type];
    },
    filterDeployType(type) {
      const statusMap = {
        1: "边车式",
        2: "集中式",
      };
      return statusMap[type];
    },
  },
  data() {
    return {
      showNext: false,
      active: 1,
      dialogWidth: "40%",
      form: {},
      grouplist: [],
      moudlelist,
      selectid: "",
      dialogVisible: false,
      searchModel: {
        formModel: {
          deployModel: "",
        },
        searchFild: [
          {
            type: "select",
            label: "终端状态",
            prop: "terminalState",
            options: [
              {
                label: "正常",
                value: 1,
              },
              {
                label: "异常",
                value: 0,
              },
            ],
          },
          {
            type: "input",
            label: "SDK端地址",
            prop: "terminalHost",
          },
          {
            type: "select",
            label: "所属应用",
            prop: "appId",
            options: applist,
          },
        ],
      },
      renderheader: [
        {
          prop: "terminalCode",
          label: "SDK编码",
        },
        {
          prop: "appName",
          label: "所属应用名称",
        },
        {
          prop: "terminalHost",
          label: "SDK端地址",
        },
        {
          prop: "agentPort",
          label: "Agent管理接口  ",
        },
        {
          prop: "terminalPort",
          label: "SDK管理端口  ",
        },
        {
          prop: "terminalState",
          label: "终端状态",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterType(params.row.terminalState)
            );
          },
        },
        {
          prop: "versionNum",
          label: "版本号",
        },
        {
          prop: "deployModel",
          label: "SDK部署模式",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterDeployType(params.row.deployModel)
            );
          },
        },
        {
          prop: "deployState",
          label: "版本下发状态",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterLoadType(params.row.deployState)
            );
          },
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
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-video-play",
                },
                on: {
                  click: () => {
                    this.paramsEdit();
                  },
                },
              },
              "参数修改"
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
                  icon: "el-icon-download",
                },
                on: {
                  click: () => {
                    this.issuedFun();
                  },
                },
              },
              "下发"
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
                  icon: "el-icon-connection",
                },
                on: {
                  click: () => {},
                },
              },
              "回退"
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
                  icon: "el-icon-video-play",
                },
                on: {
                  click: () => {},
                },
              },
              "启动"
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
                  icon: "el-icon-video-pause",
                },
                on: {
                  click: () => {},
                },
              },
              "停止"
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
                  icon: "el-icon-refresh",
                },
                on: {
                  click: () => {},
                },
              },
              "重启"
            );
          },
        },
      ],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true,
      },
      // sendVersionData:{
      //   sendVersionId:'',
      //   sendAppId:'',
      //   paramConfigEnabled:'',
      //   terminalId:'',
      //   terminalVersionId:'',
      // },
      formData: {
        id: "",
        appName: "",
        appId: "",
        groupId: "",
        gropuName: "",
        deployModel: "",
        terminalCode: "",
        terminalHost: "",
        terminalPort: "",
        agentPort: "",
      },
      issuedForm: {
        sendVersionId: "",
        sendAppId: "",
        paramConfigEnabled: "",
        terminalId: "",
        terminalVersionId: "",
        params: [],
        versionName:""
      },
      pageType: "",
      formSelectList: {
        versionNameList: [],
        versionList: [],
        appFormList: [],
        sdkTmpList: [],
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
    submitParams() {
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      const paramsType = this.$refs.childIss[0].paramsType;
      console.log({ selectionData });
      console.log("v", this.$refs.childIss[0].paramsType);
      if (paramsType === "1") {
        const params = {
          id: selectionData[0].id,
          versionId: selectionData[0].versionId,
          params: this.issuedForm.params,
        };
        console.log("params",params)
        submitParams(params).then((res) => {
          if (res.code === 200) {
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.getList();
          }
        });
      }
      if (paramsType === "2") {
        const appParams = {
          id: selectionData[0].id,
          version: selectionData[0].versionId,
          params: this.issuedForm.params,
        };
        submitAppParams(appParams).then((res) => {
          if (res.code === 200) {
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.getList();
          }
        });
      }
    },
    paramsEdit() {
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      (this.dialogVisible = true), (this.selectid = 3);
      this.dialogWidth = "75%";
      this.getParamsList();
    },
    issuedFun() {
      // const selectionData = this.$refs.multipleTable.$refs.multipleTable
      //   .selection;
      this.issuedForm.versionName="";
      this.issuedForm.sendVersionId="";
      this.issuedForm.sendAppId="";
      this.issuedForm.paramConfigEnabled="";
      this.issuedForm.terminalId="";
      this.dialogVisible = true;
      this.selectid = 2;
      this.active = 1;
      this.dialogWidth = "75%";
      getVersion().then((res) => {
        this.formSelectList.versionNameList = res.data;
      });
      const appParams = {
        requestObject: {
          appAbbr: "",
          appName: "",
        },
        pageNo: 1,
        pageSize: 10,
      };
      getAppList(appParams).then((res) => {
        this.formSelectList.appFormList = res.data.data;
      });
    },
    versionChange(val) {
      getVersiByName({ versionName: val }).then((res) => {
        this.formSelectList.versionList = res.data;
      });
    },
    appChange(val) {
      this.issuedForm.terminalId="";
      getSdkTmp({ appId: val }).then((res) => {
        this.formSelectList.sdkTmpList = res.data;
      });
    },
    next() {
      this.active = 2;
      this.getParamsListNext();
    },

    getParamsListNext(){
    const params = {
        id: this.issuedForm.terminalId
      };
      getParams(params).then((res) => {
        this.$nextTick(() => {
          this.issuedForm.params = res.data;
        });
      });  
    },

    getParamsList() {
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      const params = {
        id: selectionData[0].id,
        versionId: selectionData[0].versionId,
      };
      getParams(params).then((res) => {
        this.$nextTick(() => {
          console.log("sdsdsdas",res.data)
          this.issuedForm.params = res.data;
        });
      });
    },
    upStep() {
      this.active = 1;
    },
    addPrivateParams() {
      this.issuedForm.params.push({
        paramName: "",
        paramValue: "",
        publicParamType: "1",
        paramType: "2",
      });
    },
    delPrivateParams(index) {
      const publicParameters = this.issuedForm.params.filter(
        (e) => e.paramType === "1"
      );
      let privateParameters = this.issuedForm.params.filter(
        (e) => e.paramType === "2"
      );
      privateParameters.splice(index, 1);
      this.issuedForm.params = [...publicParameters, ...privateParameters];
    },
    submitIssued() {
      console.log("addd", this.issuedForm);
      sendVersion(this.issuedForm).then((res) => {
        if (res.code === 200) {
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: "下发成功",
          });
          this.getList();
        }
      });
    },
    showBtn(val) {
      this.showNext = val == 1 ? true : false;
    },
    onSearch() {
      this.pagination.currentPage = 1;
      this.pagination.pagesize = 10;
      this.getList();
    },

    // sendVersion(){
    //   this.selectid=2
    //   this.dialogVisible = true
    //   Object.keys(this.sendVersionData).map(key => this.sendVersionData[key] = "")
    // },
    getGroupList(data) {
      var esbGroup = { appId: this.formData.appId };
      getGroup(esbGroup).then((res) => {
        if (res.code === 200) {
          this.grouplist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    openAdd() {
      this.selectid = 1;
      this.pageType = "add";
      this.dialogVisible = true;
      this.dialogWidth = "40%";
      Object.keys(this.formData).map((key) => (this.formData[key] = ""));
      this.formData.deployModel='1'
      var esbGroup = { appId: "" };
      getGroup(esbGroup).then((res) => {
        if (res.code === 200) {
          this.grouplist = res.data;
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

      var esbGroup = { appId: selectionData[0].appId };
      getGroup(esbGroup).then((res) => {
        if (res.code === 200) {
          this.grouplist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });

      this.dialogVisible = true;
      this.selectid = 1;
      this.pageType = "edit";
      let refForm = this.formData;
      this.dialogWidth = "40%";
      Object.keys(refForm).forEach((key) => {
        refForm[key] = selectionData[0][key];
      });


    },
    delFun() {
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
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        selectionData.forEach((e) => {
          ids.push(e);
        });
        console.log({ ids });
        deleteOne(selectionData[0]).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          }
        });
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
      console.log("00", this.selectid);
      if (this.pageType === "add" && this.selectid === 1) {
        console.log("111");
        this.submitFun(params);
      }
      if (this.pageType === "edit" && this.selectid === 1) {
        console.log("222");
        this.editFun(params);
      }
      // if(this.selectid===2){
      //   data=this.sendVersionData
      //   this.sendVersionFun(data)

      // }
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
    // sendVersionFun(params){
    //   sendVersion(params).then(res=>{
    //     if(res.code===200){
    //        this.$message({
    //             type: 'success',
    //             message:'编辑成功'
    //         });
    //         this.dialogVisible=false
    //         this.getList()
    //     }
    //   })
    // },
    sizeChange(val) {
      this.pagination.pagesize = val;
      this.getList();
    },
    currentChange(val) {
      this.pagination.currentPage = val;
      this.getList();
    },
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
