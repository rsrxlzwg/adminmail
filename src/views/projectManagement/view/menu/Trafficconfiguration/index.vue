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

    <el-dialog title="编辑" :visible.sync="dialogVisible" :width="dialogwidth">
      <component
        :is="item.component"
        ref="refForm"
        :formData="formData"
        :detaildata="detaildata"
        :selectDisabled="selectDisabled"
        :servicelist="servicelist"
        @getServiceList="getServiceList"
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
import {
  getInfo,
  editInfo,
  submitInfo,
  deleteOne,
  getTerminal,
  issueInfo,
  getService,
} from "@/api/serviceManagement/onlineManagement/flowControl";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";
import moudlelist from "./moudle";
let applist = [];
let serviceCodeList = [];
export default {
  components: {
    rendertable,
    headersearch,
  },
  filters: {
    filterLoadType(type) {
      const statusMap = {
        1: "未发布",
        2: "已发布",
      };
      return statusMap[type];
    },
  },
  data() {
    return {
      dialogwidth: "40%",
      moudlelist,
      selectid: "",
      dialogVisible: false,
      form: {},
      servicelist: [],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true,
      },
      searchModel: {
        formModel: {},
        searchFild: [
          {
            type: "select",
            label: "所属应用",
            prop: "appId",
            options: applist,
          },
          {
            type: "select",
            label: "服务编码",
            prop: "serviceCode",
            options: serviceCodeList,
          },
        ],
      },
      renderheader: [
        {
          prop: "appName",
          label: "所属应用",
        },

        {
          prop: "serviceCode",
          label: "服务编码",
        },
        {
          prop: "strategyName",
          label: "流量控制策略",
        },
        {
          prop: "status",
          label: "状态",
          render: (h, params) => {
            return h(
              "el-tag",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterLoadType(params.row.status)
            );
          },
        },
        {
          prop: "Jump",
          label: "终端信息",
          render: (h, { row }) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  type: "text",
                },
                on: {
                  click: () => {
                    this.dialogVisible = true;
                    this.selectid = 3;
                    this.dialogwidth = "60%";
                    this.getDetail(row);
                  },
                },
              },
              "详情信息"
            );
          },
        },
      ],
      renderdata: [{}],
      detaildata: [{ serviceCode: "" }],
      selectDisabled: false,
      formData: {
        id: "",
        appId: "",
        appName: "",
        serviceId: "",
        serviceCode: "",
        flowControlPolicyId: "",
        strategyName: "",

        esbGovFlowTerminalThreshold: [
          {
            terminalCode: "",
            thresholdValue: "",
            terminalId: "",
            id: "",
          },
        ],
      },
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
                    this.dialogwidth = "40%";
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
                    this.dialogwidth = "40%";
                  },
                },
              },
              " 编辑"
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
              " 删除"
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
                  icon: "el-icon-bottom",
                },
                on: {
                  click: () => {
                    this.flowIssue();
                  },
                },
              },
              " 下发"
            );
          },
        },
      ],
      detailVis: false,
    };
  },
  beforeCreate() {
    let serviceQueryList = { appId: "", serviceName: "" };
    applist = [];
    serviceCodeList = [];
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
    }),
      getService(serviceQueryList).then((res) => {
        if (res.code === 200) {
          this.$nextTick(() => {
            res.data.forEach((e) => {
              serviceCodeList.push({
                label: e.serviceCode,
                value: e.serviceCode,
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
    getServiceList() {
      var queryList = { appId: this.formData.appId };

      getService(queryList).then((res) => {
        console.log("servdata", res.data);
        if (res.code === 200) {
          this.servicelist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
      getTerminal(queryList).then((res) => {
        if (res.code === 200) {
          this.formData.esbGovFlowTerminalThreshold = res.data;
          this.formData.esbGovFlowTerminalThreshold.forEach((element) => {
            element.terminalId = element.id;
          });
          console.log(
            "esbGovFlowTerminalThreshold",
            this.formData.esbGovFlowTerminalThreshold
          );
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    flowIssue() {
      var selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      var senData = {
        esbGovFlowControl: selectionData[0],
        esbGovFlowTerminalThreshold: [{}],
      };
      console.log("iss", senData);
      this.issueFun(senData);
    },
    issueFun(params) {
      issueInfo(params).then((res) => {
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
    getDetail(params) {
      console.log("detail", params);
      getTerminal(params).then((res) => {
        if (res.code === 200) {
          this.detaildata = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    onSearch() {
      this.pagination.currentPage = 1;
      this.pagination.pagesize = 10;
      this.getList();
    },

    openAdd() {
      this.selectid = 1;
      this.pageType = "add";
      this.selectDisabled = false;
      this.dialogVisible = true;
      var queryList = { appId: "" };
      getService(queryList).then((res) => {
        console.log("servdata", res.data);
        if (res.code === 200) {
          this.servicelist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
      Object.keys(this.formData).map((key) => (this.formData[key] = ""));
      this.formData.esbGovFlowTerminalThreshold = [];
    },
    openEdit() {
      // 获取选中值
      this.selectDisabled = true;
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }

      this.dialogVisible = true;
      this.selectid = 1;
      this.pageType = "edit";
      let refForm = this.formData;

      var queryList = { appId: selectionData[0].appId };
      console.log("codssssss", selectionData[0]);
      getService(queryList).then((res) => {
        console.log("servdata", res.data);
        if (res.code === 200) {
          this.servicelist = res.data;
          console.log("codeeee", res.data);
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });

      Object.keys(refForm).forEach((key) => {
        refForm[key] = selectionData[0][key];
      });
      getTerminal(selectionData[0]).then((res) => {
        if (res.code === 200) {
          this.formData.esbGovFlowTerminalThreshold = res.data;
          this.formData.esbGovFlowTerminalThreshold.forEach((element) => {
            element.terminalId = element.id;
          });
          console.log(
            "esbGovFlowTerminalThreshold",
            this.formData.esbGovFlowTerminalThreshold
          );
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
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
      var senData = {
        esbGovFlowControl: this.formData,
        esbGovFlowTerminalThreshold: this.formData.esbGovFlowTerminalThreshold,
      };
      console.log("00", senData);
      if (this.pageType === "add" && this.selectid === 1) {
        console.log("111");
        this.submitFun(senData);
      }
      if (this.pageType === "edit" && this.selectid === 1) {
        console.log("222");
        this.editFun(senData);
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
