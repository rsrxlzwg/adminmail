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
import { getInfo } from "@/api/subscribe/forwardQuery";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";
let applist = [];
export default {
  components: {
    rendertable,
    headersearch,
  },
  filters: {
    filterType(processStatus) {
      const statusMap = {
        0: "未消费",
        1: "已消费",
      };
      return statusMap[processStatus];
    },
  },
  data() {
    return {
      moudlelist,
      selectid: 1,
      dialogVisible: false,
      form: {},
      searchModel: {
        formModel: {
          publishSerialNumber: "",
        },
        searchFild: [
          {
            type: "input",
            label: "发布系统流水号",
            prop: "publishSerialNumber",
          },
          {
            type: "select",
            label: "消息发布模块",
            prop: "appId",
            options: applist,
          },
        ],
      },
      renderheader: [
        {
          prop: "publishSerialNumber",
          label: "发布系统流水号",
        },
        {
          prop: "appName",
          label: "消息发布系统",
        },
        {
          prop: "processStatus",
          label: "消息处理状态",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterType(params.row.processStatus)
            );
          },
        },
        {
          prop: "storageTime",
          label: "消息存放时间",
        },
        {
          prop: "processTime",
          label: "消息处理时间",
        },
      ],
      renderdata: [],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true,
      },
      formData: {
        appId: "",
        type: "",
        provideId: "",
        serviceId: "",
        patternId: "",
      },
      pageType: "",
    };
  },
 beforeCreate(){
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




















<!--<template>
  <div>
    <headercontener>
      <el-row
        type="flex"
        align="middle"
        :gutter="12"
      >
        <el-col :span="3">
          <span style="fontSize:'5px'">发布系统流水号</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="small"
          />
        </el-col>
        <el-col :span="3">
          <span style="fontSize:'5px'">消息发布模块</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          />
        </el-col>
        <!-- <el-col :span="1">
          <span style="fontSize:'5px'">场景</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          />
        </el-col> -->
       <!-- <el-col :span='8'>
          <el-row>
            <el-col :span="5">
              <el-button
                size="mini"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
            <el-col :span="4">
              <el-button
                size="mini"
                icon="el-icon-delete"
              >清空</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </headercontener>

    <el-card>

      <rendertable
        :table-data="renderdata"
        :table-header="renderheader"
        :showselect='true'
      />
    </el-card>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <component
        :is="item.component"
        v-for="item in moudlelist.filter(e => e.id == selectid)"
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
import headercontener from '@/views/projectManagement/components/fieldset'
import moudlelist from './moudle'
export default {
  components: {
    rendertable,
    headercontener
  },
  data() {
    return {
      moudlelist,
      selectid: '',
      dialogVisible: false,

      renderheader: [
        // {
        //   label: '选择',
        //   render: (h, params) => {
        //     return h('el-checkbox',
        //       {
        //         on: {
        //           change: () => { }
        //         }
        //       }
        //     )
        //   },
        //   width: 50
        // },
        {
          prop: 'Startitemclassname',
          label: '发布系统流水号'
        },
        {
          prop: 'Startupsequence',
          label: '消息发布系统'
        },
        // {
        //   prop: 'Systemid',
        //   label: '场景'
        // },
        {
          prop: 'Systemtype',
          label: '消息处理状态'
        },
        {
          prop: 'state',
          label: '消息存放时间'

        },
        {
          prop: 'sysname',
          label: '消息处理时间'

        }
      ],
      renderdata: [
        {
          Startitemclassname: '1203180536',
          Startupsequence: ' 核心系统',
          Systemid: '',
          Systemtype: '已消费 ',
          state: '20201203180555',
          sysname: '20201203180556'
        }
      ],
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-zoom-in'
              },
              on: {
                click: () => {
                  this.dialogVisible = true
                  this.selectid = 1
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
                  this.dialogVisible = true,
                    this.selectid = 1
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
                  this.dialogVisible = true
                  this.selectid = 2
                }
              }
            }, '下发')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-video-play'
              }
            }, '启动')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-video-pause'
              }
            }, '停止')
          }
        },
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: 'el-icon-search'
              }
            }, '下发查询')
          }
        }
      ]
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
