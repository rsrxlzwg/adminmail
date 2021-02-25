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
  submitInfo,
  editInfo,
  deleteOne,
  getApp,
} from "@/api/serviceManagement/appManage/sdkgroup";
let applist = [];
export default {
  components: {
    rendertable,
    headersearch,
  },
  filters: {
    filterType(type) {
      const statusMap = {
        1: "边车式",
        2: "集中式",
      };
      return statusMap[type];
    },
    filterLoadType(type) {
      const statusMap = {
        1: "客户端负载",
        2: "服务端负载",
      };
      return statusMap[type];
    },
  },
  data() {
    return {
      moudlelist,
      selectid: "",
      dialogVisible: false,
      form: {},
      searchModel: {
        formModel: {
          deployModel: "",
        },
        searchFild: [
          {
            type: "select",
            label: "部署模式",
            prop: "deployModel",
            options: [
              {
                label: "边车式",
                value: 1,
              },
              {
                label: "集中式",
                value: 2,
              },
            ],
          },
          {
            type: "input",
            label: "组名称",
            prop: "groupName",
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
          prop: "deployModel",
          label: "部署模式",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterType(params.row.deployModel)
            );
          },
        },
        {
          prop: "groupName",
          label: "组名称",
        },
        {
          prop: "appName",
          label: "所属应用",
        },
        {
          prop: "loadModel",
          label: "负载模式",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterLoadType(params.row.loadModel)
            );
          },
        },
        {
          prop: "loadAddress",
          label: "负载地址",
        },
        {
          prop: "groupDesc",
          label: "组描述",
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
              "编辑"
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
      ],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true,
      },
      formData: {
        id: "",
        groupName: "",
        appName: "",
        deployModel: "",
        loadModel: "",
        groupDesc: "",
        appId: "",
      },
      pageType: "",
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
    onSearch() {
      this.pagination.currentPage = 1;
      this.pagination.pagesize = 10;
      this.getList();
    },

    openAdd() {
      this.selectid = 1;
      this.pageType = "add";
      this.dialogVisible = true;
      Object.keys(this.formData).map((key) => (this.formData[key] = ""));
      this.formData.deployModel = "1";
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
      this.dialogVisible = true;
      this.selectid = 1;
      this.pageType = "edit";
      let refForm = this.formData;
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
          ids.push(e.id);
        });
        console.log({ ids });
        deleteOne(ids[0]).then((res) => {
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
