<template>
  <div class="culster-container">
    <headersearch
      :search-model="searchModel"
      :show="searchModel.show"
      @onSearch="onSearch"
    />
    <comp-table
      ref="compTable"
      :table-model="tableModel"
      :form-model="formModel"
      :search-model="searchModel"
      @submitHandle="submitInfo"
      @editHandle="editInfo"
      @delInfo="delInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @onSearch="onSearch"
      @editFun="editFun"
      @created="created"
    />
  </div>
</template>

<script>
import compTable from "@/views/components/table";
import headersearch from "@/views/components/search";
import {
  getInfo,
  submitInfo,
  editInfo,
  deleteInfo,
  editFun,
} from "@/api/subscribe/forwardingsettings";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";
let applist = [];
export default {
  name: "Culster",
  components: {
    compTable,
    headersearch,
  },
  data() {
    return {
      tableModel: {
        tableData: [],
        rowData: [
          {
            prop: "serviceId",
            label: "服务编码",
          },
          {
            prop: "messageTopic",
            label: "消息主题",
          },
          {
            prop: "appName",
            label: "发布方应用",
          },
        ],
        operateData: [],
        pagination: {
          currentPage: 1,
          pagesize: 10,
          total: 0,
        },
      },
      formModel: {
        formData: {
          id: "",
          serviceId: "",
          messageTopic: "",
          appId: "",
          esbPubSubscribeList: [
            {
              id: "",
              publishId: "",
              appSubId: "",
              subPath: "",
            },
          ],
        },
        formLabelWidth: "85px",
        formFilds: [
          {
            label: "服务编码",
            prop: "serviceId",
            type: "input",
            disabled: false,
          },
          {
            label: "消息主题",
            prop: "messageTopic",
            type: "input",
            disabled: false,
          },
          {
            label: "发布方应用",
            prop: "appId",
            type: "select",
            options: applist,
            disabled: false,
          },
          // {
          //   label: "描述",
          //   prop: "description",
          //   type: "textarea",
          //   disabled: false,
          // },
          {
            label: "订阅方",
            prop: "esbPubSubscribeList",
            type: "other",
            disabled: false,
            tableData: [
              {
                appSubId: "",
                subProtocol: "",
                subPath: "",
                default: "",
              },
            ],
            tabelFild: [
              {
                label: "订阅方应用",
                prop: "appSubId",
                type: "input",
              },
              {
                label: "订阅方协议",
                prop: "subProtocol",
                type: "input",
              },
              {
                label: "订阅方路径",
                prop: "subPath",
                type: "input",
              },
            ],
          },
        ],
        btnData: [
          {
            type: "submit",
            style: "primary",
            label: "确定",
            handle: () => {},
          },
          {
            type: "cancle",
            label: "取消",
            style: "",
            handle: () => {},
          },
        ],
      },
      searchModel: {
        btnGroup: [
          {
            type: "add",
            style: "primary",
            label: "新增",
          },
          {
            label: "编辑",
            type: "editFun",
            funName: "editFun",
          },
          {
            label: "删除",
            type: "delete",
          },
        ],
        formModel: {
          appId: "",
          serviceId: "",
          messageTopic: "",
        },
        searchFild: [
          {
            type: "select",
            label: "发布方应用",
            prop: "appId",
            options: applist,
          },
          {
            type: "input",
            label: "服务编码",
            prop: "serviceId",
          },
          {
            type: "input",
            label: "消息主题",
            prop: "messageTopic",
          },
        ],
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
    this.created;
  },

  methods: {
    editFun(row) {
      if (row.length !== 1) {
        this.$message({
          message: "请选择一条数据",
          type: "warning",
        });
      } else {
        this.$refs.compTable.dialogType = "edit";
        editFun(row[0].id).then((res) => {
          if (res.code === 200) {
            this.$refs.compTable.dialogFormVisible = true;
            Object.keys(this.formModel.formData).forEach((key) => {
              this.formModel.formData[key] = res.data[key];
            });
          }
        });
      }
    },

    onSearch() {
      this.getList();
    },

    getList() {
      const params = {
        requestObject: {
          ...this.searchModel.formModel,
        },
        pageNo: this.tableModel.pagination.currentPage,
        pageSize: this.tableModel.pagination.pagesize,
      };
      getInfo(params).then((res) => {
        if (res.code === 200) {
          this.tableModel.tableData = res.data.data;
          this.tableModel.pagination.total = res.data.totalCount;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },

    submitInfo(params) {
      console.log({ params });
      JSON.stringify(params);
      submitInfo(params).then((res) => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog();
          this.getList();
        }
      });
    },

    editInfo(params) {
      editInfo(params).then((res) => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog();
          this.getList();
        }
      });
    },

    delInfo(params) {
      deleteInfo({ ids: params }).then((res) => {
        if (res.code === 200) {
          this.$refs.compTable.hideDialog();
          this.getList();
        }
      });
    },

    sizeChange(val) {
      this.tableModel.pagination.pagesize = val;
      this.getList();
    },

    currentChange(val) {
      this.tableModel.pagination.currentPage = val;
      this.getList();
    },
  },
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
