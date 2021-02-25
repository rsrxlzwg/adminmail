<template>
  <div>
    <el-tabs
      size='mini'
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item,key) in tablelist"
        :label="item.name"
        :name="key"
        :key="key"
        style="padding:0 20px"
      >
        <span v-if="key == 0">
          <el-row
            v-for="item in DNSLISTS"
            type="flex"
            align="middle"
            style="lineHeight:60px;borderBottom:1px solid #E4E7ED;padding:10px 0"
          >
            <el-col :span="6">
              <span style="fontSize:14px">{{item.name}}</span>
              <i class="el-icon-warning-outline"></i>
            </el-col>
            <el-col :span="18">
              <span v-if="item.type === 'checklist'">
                <el-select
                  size="small"
                  v-model="value"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in [{
                      label:'ClusterFirst',
                      value:'1'
                    },{
                      label:'Default',
                      value:'2'
                    },{
                      label:'None',
                      value:'3'
                    }]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </span>
              <span
                v-if="item.type === 'table'"
                style="lineHeight:0px"
              >
                <i
                  class="el-icon-circle-plus"
                  style="fontSize:25px;cursor:pointer"
                  @click="addmoudlelist(item)"
                ></i>
                <renderdate
                  v-if="item.value['tableData'].length"
                  :tableHeader="item.value['tableHeader']"
                  :tableData="item.value['tableData']"
                  :option="{ headerfontsize: 12,lineHeight: 30}"
                  :showpagination='false'
                />

              </span>
            </el-col>
          </el-row>
          <el-row v-if="value == 3">
            <el-col>
              <el-button
                @click="showlist=!showlist"
                type="text"
                :icon="[showlist?'el-icon-arrow-down':'el-icon-arrow-up']"
              >{{showlist?'展开高级设置':'收起高级设置'}}</el-button>
            </el-col>
          </el-row>
        </span>
        <span v-else>
          <el-row
            v-for="item in bandwidthlist"
            type="flex"
            align="middle"
            style="lineHeight:60px;borderBottom:1px solid #E4E7ED;padding:10px 0"
          >
            <el-col :span="6">
              <span style="fontSize:14px">{{item.name}}</span>
              <i class="el-icon-warning-outline"></i>
            </el-col>
            <el-col :span="18">
              <span v-if="item.name === '入口速率限制'">
                <el-row>
                  <el-col :span="24">
                    <el-row style="lineHeight:30px">
                      <el-col :span="24">
                        <el-radio
                          v-model="radio"
                          label="1"
                        >限制</el-radio>
                        <el-radio
                          v-model="radio"
                          label="2"
                        >不限制</el-radio>
                      </el-col>
                      <el-col
                        :span="24"
                        v-if="radio == 2"
                      ><span>部署的业务容器组入口速率不受约束</span></el-col>
                      <el-col
                        v-else
                        :span="24"
                      >
                        <el-row :gutter="10">
                          <el-col :span="10">
                            <span>入口速率平均值限制</span>
                            <el-input size="small">
                              <el-select
                                v-model="select"
                                slot="append"
                                placeholder="请选择"
                                class="unitStyle"
                              >
                                <el-option
                                  label="Mbps"
                                  value="1"
                                ></el-option>
                              </el-select>
                            </el-input>
                          </el-col>
                          <el-col :span="10">
                            <span>入口速率最大值限制</span>
                            <el-input size="small">
                              <el-select
                                v-model="select1"
                                slot="append"
                                placeholder="请选择"
                                class="unitStyle"
                              >
                                <el-option
                                  label="Mbps"
                                  value="1"
                                ></el-option>
                              </el-select>
                            </el-input>
                          </el-col>
                          <el-col>
                            <span>设置入口速率限制值后，部署的业务容器组的入口带宽会受到上述值限制</span>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </span>
              <span v-else>
                <el-row>
                  <el-col :span="24">
                    <el-row style="lineHeight:30px">
                      <el-col :span="24">
                        <el-radio
                          v-model="radio1"
                          label="1"
                        >限制</el-radio>
                        <el-radio
                          v-model="radio1"
                          label="2"
                        >不限制</el-radio>
                      </el-col>
                      <el-col
                        :span="24"
                        v-if="radio1 == 2"
                      ><span>部署的业务容器组入口速率不受约束</span></el-col>
                      <el-col
                        v-else
                        :span="24"
                      >
                        <el-row :gutter="10">
                          <el-col :span="10">
                            <span>出口速率平均值限制</span>
                            <el-input size="small">
                              <el-select
                                v-model="select2"
                                slot="append"
                                placeholder="请选择"
                                class="unitStyle"
                              >
                                <el-option
                                  label="Mbps"
                                  value="1"
                                ></el-option>
                              </el-select>
                            </el-input>
                          </el-col>
                          <el-col :span="10">
                            <span>出口速率最大值限制</span>
                            <el-input size="small">
                              <el-select
                                v-model="select3"
                                slot="append"
                                placeholder="请选择"
                                class="unitStyle"
                              >
                                <el-option
                                  label="Mbps"
                                  value="1"
                                ></el-option>
                              </el-select>
                            </el-input>
                          </el-col>
                          <el-col>
                            <span>设置入口速率限制值后，部署的业务容器组的入口带宽会受到上述值限制</span>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </span>
            </el-col>
          </el-row>
        </span>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from "@/views/projectManagement/components/table";
export default {
  data() {
    return {
      value: '1',
      radio: "1",
      radio1: "1",
      select: "1",
      select1: "1",
      select2: "1",
      select3: "1",
      showlist: true,
      activeName: 0,
      tablelist: [
        {
          name: "DNS配置",
        },
        {
          name: "带宽限制",
        },
      ],
      DNSLISTS: [],
      DNSLIST: [
        {
          name: "DNS策略",
          type: "checklist",
        },
        {
          name: "域名服务器",
          type: "table",
          value: {
            tableHeader: [
              {
                prop: "ip",
                label: "域名服务器 IP",
                render: (h, params) => {
                  return h("el-input", {
                    attrs: {
                      size: "mini",
                    },
                    style: {
                      padding: "10px",
                    },
                  });
                },
              },
              {
                prop: "edit",
                label: "编辑",
                width: "50",
                render: (h, params) => {
                  return h("i", {
                    attrs: {
                      class: "el-icon-remove",
                    },
                    on: {
                      click: () => {
                        this[ 'DNSLIST' ][ 1 ].value.tableData.splice(params.index, 1)
                      }
                    }
                  });
                },
              },
            ],
            tableData: [],
          },
        },
        {
          name: "Searches",
          type: "table",
          value: {
            tableHeader: [
              {
                prop: "searches",
                label: "searches",
                render: (h, params) => {
                  return h("el-input", {
                    attrs: {
                      size: "mini",
                    },
                    style: {
                      padding: "10px",
                    },
                  });
                },
              },
              {
                prop: "edit",
                label: "编辑",
                width: "50",
                render: (h, params) => {
                  return h("i", {
                    attrs: {
                      class: "el-icon-remove",
                    },
                    on: {
                      click: () => {
                        this[ 'DNSLIST' ][ 2 ].value.tableData.splice(params.index, 1)
                      }
                    }
                  });
                },
              },
            ],
            tableData: [],
          },
        },
        {
          name: "Options",
          type: "table",
          value: {
            tableHeader: [
              {
                prop: "name",
                label: "配置项",
                render: (h, params) => {
                  return h("el-input", {
                    attrs: {
                      size: "mini",
                    },
                    style: {
                      padding: "10px",
                    },
                  });
                },
              },
              {
                prop: "value",
                label: "配置值",
                render: (h, params) => {
                  return h("el-input", {
                    attrs: {
                      size: "mini",
                    },
                    style: {
                      padding: "10px",
                    },
                  });
                },
              },
              {
                prop: "edit",
                label: "编辑",
                width: "50",
                render: (h, params) => {
                  return h("i", {
                    attrs: {
                      class: "el-icon-remove",
                    },
                    on: {
                      click: () => {
                        this[ 'DNSLIST' ][ 3 ].value.tableData.splice(params.index, 1)
                      }
                    }
                  });
                },
              },
            ],
            tableData: [],
          },
        },
        {
          name: "主机别名",
          type: "table",
          value: {
            tableHeader: [
              {
                prop: "ip",
                label: "ip",
                render: (h, params) => {
                  return h("el-input", {
                    attrs: {
                      size: "mini",
                    },
                    style: {
                      padding: "10px",
                    },
                  });
                },
              },
              {
                prop: "mainname",
                label: "主机别名",
                render: (h, params) => {
                  return h("el-input", {
                    attrs: {
                      size: "mini",
                    },
                    style: {
                      padding: "10px",
                    },
                  });
                },
              },
              {
                prop: "edit",
                label: "编辑",
                width: "50",
                render: (h, params) => {
                  return h("i", {
                    attrs: {
                      class: "el-icon-remove",
                    },
                    on: {
                      click: () => {
                        this[ 'DNSLIST' ][ 4 ].value.tableData.splice(params.index, 1)
                      }
                    }
                  });
                },
              },
            ],
            tableData: [],
          },
        },
      ],
      bandwidthlist: [
        {
          name: "入口速率限制",
        },
        {
          name: "出口速率限制",
        },
      ],
    };
  },
  methods: {
    addmoudlelist(params) {
      let { tableHeader, tableData } = params.value;
      let a = tableHeader.map((e) => {
        if (e.prop !== "edit") {
          return e.prop;
        } else {
          return "";
        }
      });
      let b = Object.create(null);
      a.forEach((element) => {
        if (element) {
          b[ element ] = "";
        }
      });
      tableData.push(b);
    },
  },
  beforeCreate() {
    this.DNSLISTS = this.DNSLIST.slice(0, 1);
  },
  watch: {
    showlist(newvalue) {
      if (newvalue) {
        this.DNSLISTS = this.DNSLIST.slice(0, 1);
      } else {
        this.DNSLISTS = this.DNSLIST;
      }
    },
    value(newvalue) {
      if (newvalue !== '3') {
        this.showlist = true
      }
    }
  },
  components: {
    renderdate,
  },
};
</script>

<style scoped lang="scss">
.unitStyle {
  width: 90px;
}
</style>
