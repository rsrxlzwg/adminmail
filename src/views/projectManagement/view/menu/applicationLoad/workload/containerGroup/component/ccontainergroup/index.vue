<template>
  <div>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span style="fontSize:14px">容器组</span>
      </div>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="6">
          <span
            style="fontSize:14px;color:#ccc"
            class="textline"
          >共{{tableData.length}}个容器组已选{{checkcontents.length}}个</span>
          <el-button
            v-if="checkcontents.length"
            size="small"
            type="danger"
            @click="deletemu"
          >删除</el-button>
        </el-col>
        <el-col :span="4">
          <el-row :gutter="10">
            <el-col :span="20">
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
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <renderdate
          :tableHeader='tableHeader'
          :tableData='tableData'
        />
      </el-row>
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
      checkcontents: [],
      tableHeader: [
        {
          type: "selection",
          width: "10",
          render: (h, params) => {
            return h('el-checkbox', {
              on: {
                change: () => {
                  let { id } = params.row
                  if (this.checkcontents.includes(id)) {
                    this.checkcontents.splice(this.checkcontents.findIndex(e => e == id), 1)
                  } else {
                    this.checkcontents.push(id)
                  }
                }
              }
            })
          }

        },
        {
          prop: "name",
          label: "容器组",
          routlink: true,
        },
        {
          prop: "rpro",
          label: "ip",
        },
        {
          prop: "fpro",
          label: "主机",
        },
        {
          prop: "zpro",
          label: "运行中",
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
            path:
              "/applicationLoad/workload/containerGroup/detail",
          },
          rpro: '192.168.1.1',
          fpro: 'node30',
          zpro: '1/1',
          protocol: '1',
          sstarttime: '2020/10/1',
          id: 1
        },
        {
          name: {
            name: "app-wds-dwadaw=2515",
            path: "/",
          },
          rpro: '192.168.1.1',
          fpro: 'node30',
          zpro: '1/1',
          protocol: '1',
          sstarttime: '2020/10/1',
          id: 2
        }
      ]
    }
  },
  methods: {
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
