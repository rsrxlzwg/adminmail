<template>
  <div>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span style="fontSize:14px">数据卷</span>

      </div>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="6">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-circle-plus"
            @click="bindDataVolumes"
          >绑定数据卷</el-button>
        </el-col>
        <el-col :span="4">
          <el-row :gutter="10">

            <el-col :span="16">
              <el-input
                size="mini "
                placeholder='搜索'
              >
                <i
                  class="el-icon-search el-input__icon"
                  slot="prefix"
                  @click=""
                >
                </i>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                class="el-button__icon"
                icon="el-icon-refresh"
              ></el-button>
            </el-col>
            <el-col :span="4">
              <el-button
                class="el-button__icon"
                icon="el-icon-right"
                @click="back"
              ></el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <renderdate
          :tableHeader='tableHeader'
          :tableData='tableData'
        />
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <span
          slot="title"
          style="fontSize=14px"
        >绑定数据卷</span>
        <div>
          <el-form :model="form">
            <el-form-item
              label="数据卷"
              :label-width="formLabelWidth"
            >
              <el-select
                style="width:100%"
                v-model="form.dataVolumes"
                placeholder="请选择数据卷"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-divider />
            <el-form-item
              label="容器路径"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.path"
                autocomplete="off"
                placeholder="例:/var"
              />
            </el-form-item>
            <el-divider />
            <el-form-item
              label="权限"
              :label-width="formLabelWidth"
            >
              <el-radio
                v-model="form.authority"
                label="1"
              >读写</el-radio>
              <el-radio
                v-model="form.authority"
                label="2"
              >只读</el-radio>
            </el-form-item>
            <el-divider />
          </el-form>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
          <el-button
            size="mini"
            @click="dialogVisible = false"
          >取 消</el-button>

        </span>
      </el-dialog>
      <!-- <el-row v-for="item in listdata">
        <el-col
          class="lincol"
          :span="24"
        >
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col :span="4">
              <span style="fontSize:14px">{{item.name}}</span>
            </el-col>
            <el-col
              style="fontSize:14px"
              :span="20"
            >
              <span v-if="item.type==='text'">{{item.value}}</span>
              <span v-if="item.type==='table'">
                <renderdate
                  :tableHeader='item.value.tableHeader'
                  :tableData='item.value.tableData'
                  :showpagination='false'
                />
              </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row> -->
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from "@/views/projectManagement/components/table";
export default {
  data() {
    return {
      tableHeader: [
        {
          prop: "name",
          label: "数据卷名称",
          routlink: true,
        },
        {
          prop: "rpro",
          label: "数据卷模式",
        },
        {
          prop: "fpro",
          label: "容器路径",
        },
        {
          prop: "zpro",
          label: "容量",
        },
        {
          prop: "",
          label: "状态",
          render: (h, params) => {
            return h("span", [
              h("span", {
                style: {
                  backgroundColor: "#22C36A",
                  padding: "0px 6px",
                  borderRadius: "20px",
                  marginRight: "5px",
                },
              }),
              h("span", params.row[ "protocol" ] === "1" ? "进行中" : "停止中"),
            ]);
          },
        },
        {
          prop: "sstarttime",
          label: "启动时间",
        },
      ],
      tableData: [
        {
          name: {
            name: "app-wds-dwadaw=2515",
            path: "/",
          },
          rpro: "192.168.1.1",
          fpro: "node30",
          zpro: "1/1",
          protocol: "1",
          sstarttime: "2020/10/1",
        },
        {
          name: {
            name: "app-wds-dwadaw=2515",
            path: "/",
          },
          rpro: "192.168.1.1",
          fpro: "node30",
          zpro: "1/1",
          protocol: "1",
          sstarttime: "2020/10/1",
        },
      ],
      dialogVisible: false,
      formLabelWidth: "80px",
      options: {
        value: "",
        label: "",
      },
      form: {
        dataVolumes: "",
        path: "",
        authority: "1",
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    bindDataVolumes() {
      this.dialogVisible = true;
    },
  },
  components: {
    renderdate,
  },
};
</script>

<style scoped lang="scss">
.lincol {
  border-bottom: 1px solid #f1f3f5;
  padding: 14px 0;
}
.textline {
  letter-spacing: 2px;
}
/deep/ .el-button {
  padding: 6px;
}
.el-row {
  margin-bottom: 14px;
}
</style>
