<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item ,key) in showlist"
        style="padding:0 10px"
        :label="item.name"
        :name="key"
        :key="key"
      >
        <span v-if="key == activeName">
          <el-row
            style="lineHeight:60px"
            type="flex"
            align="middle"
          >
            <el-col :span="4">
              <span>{{item.name}}</span>
            </el-col>
            <el-col :span="20">
              <span v-if="key == 0">
                <ul>
                  <li
                    v-for="(item,key) in radiolist"
                    style="lineHeight:30px"
                  >
                    <el-radio
                      v-model="radio"
                      :label="key + 1"
                    >{{item.name}}</el-radio>
                  </li>

                </ul>
                <span v-if="radio == 1">
                  无状态服务将被部署在任意 Linux 主机上。
                </span>
                <span v-if="radio == 2">
                  <el-card
                    shadow='never'
                    style="backgroundColor:#F5F7FA"
                  >
                    <el-select
                      size="small"
                      v-model="selectvalue"
                      placeholder="请选择"
                      style="width:50%;lineHeight:0px"
                    >
                      <el-option
                        label="kubernetes.io/arch=amd64"
                        value="1"
                      >
                      </el-option>
                    </el-select>
                    <div v-if="selectvalue">
                      <renderdate
                        :tableHeader='tableHeader'
                        :tableData='tableData'
                        :option="{ headerfontsize: 12,lineHeight: 30}"
                        :showpagination='false'
                      />

                    </div>
                  </el-card>
                  <span>
                    该无状态服务将只部署在指定标签的 Linux 主机上
                  </span>
                </span>
                <span v-if="radio == 3">
                  <el-card
                    shadow='never'
                    style="backgroundColor:#F5F7FA"
                  >
                    <el-row>
                      <el-col :span="8">
                        <el-input
                          size="small"
                          placeholder="搜索"
                          prefix-icon="el-icon-search"
                        >
                        </el-input>
                      </el-col>
                    </el-row>
                    <renderdate
                      :tableHeader='tableHeader'
                      :tableData='tableData'
                      :option="{ headerfontsize: 12,lineHeight: 30}"
                    />
                  </el-card>
                </span>
                <span v-if="radio == 4">
                  <codemirror
                    style="lineHeight:20px"
                    entercode=''
                    :showedit='false'
                  />
                </span>
              </span>
              <span v-if="key == 1">
                <ul>
                  <li
                    v-for="(item,key) in releaselist"
                    style="lineHeight:30px"
                    :key="key"
                  >
                    <el-radio
                      v-model="radio1"
                      :label="key + 1"
                    >{{item.name}}</el-radio>
                  </li>
                </ul>
                <span v-if="radio1 == 1">
                  <el-card
                    shadow='never'
                    style="backgroundColor:#F5F7FA"
                  >
                    <el-row
                      v-for="item in Strategy"
                      :gutter="10"
                    >
                      <el-col :span="14">
                        <span>
                          {{item.name}}
                        </span>
                      </el-col>
                      <el-col :span="4">
                        <el-input size="mini"></el-input>
                      </el-col>
                      <!-- <el-col :span="5">
                        <el-switch
                          v-model="value1"
                          active-text="按月付费"
                        >
                        </el-switch>
                      </el-col> -->
                    </el-row>
                    <el-row></el-row>
                  </el-card>
                  <span>
                    新版本服务会逐渐替代旧版本，这可以缩短甚至消除应用在发布过程中的中断时间。
                  </span>
                </span>
                <span v-if="radio1 == 2">
                  旧版本服务全部停止后，新版本再开始运行。
                </span>
              </span>
              <span v-if="key == 2">
                已启用
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
import codemirror from "@/views/projectManagement/components/codemirror";
export default {
  data() {
    return {
      value1: "",
      selectvalue: "",
      radio: 1,
      radio1: 1,
      activeName: 0,
      Strategy: [
        {
          name: '发布过程中，最大不可用实例数'
        },
        {
          name: '发布过程中，最大增量实例数'
        }
      ],
      showlist: [
        {
          name: "调度策略",
        },
        {
          name: "发布策略",
        },
        {
          name: "高可用",
        },
      ],
      radiolist: [
        {
          name: "任意 Linux 主机",
        },
        {
          name: "指定标签下的任意 Linux 主机",
        },
        {
          name: "指定的 Linux 主机",
        },
        {
          name: "其他",
        },
      ],
      releaselist: [
        {
          name: "滚动发布",
        },
        {
          name: "重建",
        },
      ],
      tableHeader: [
        {
          type: "selection",
          width: "10",
          render: (h, params) => {
            return h("el-checkbox");
          },
        },
        {
          prop: "name",
          label: "名称",
        },
        {
          prop: "rose",
          label: "角色",
        },
        {
          prop: "state",
          label: "状态",
        },
        {
          prop: "ip",
          label: "IP",
        },
      ],
      tableData: Array(3).fill({
        name: "node01",
        rose: "容器引擎",
        state: "健康",
        ip: "10.0.5.153",
      }),
    };
  },
  components: {
    renderdate,
    codemirror,
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-card__body {
  padding: 10px;
}
</style>
