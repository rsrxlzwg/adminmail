<template>
  <div>
    <el-card>
      <div class="flex-inline-between">
        <div class="flex">
          <svg-icon
            class-name="hostImg"
            icon-class="hostImg"
          />
          <div class="flex-1 m-l-15 flex-column-center">
            <span class="host-name m-r-10 m-b-5  bold">app-2048-6d6dfbb6ff-z47l7</span>
            <el-tag
              size="mini"
              type="success"
              effect="dark"
              style="width:30%"
            >
              运行中
            </el-tag>
          </div>
        </div>
        <!-- <el-button size="mini" @click="backPage()">返回</el-button> -->
        <el-dropdown @command="handleCommand">
          <el-button size="small">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="console">控制台</el-dropdown-item>
            <el-dropdown-item command="a">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <el-divider></el-divider>
      <ul class="flex-wrap detail-info">
        <li>
          <span>应用：</span>
          <span>-</span>
        </li>
        <li>
          <span>运行中的容器：</span>
          <span>1 / 1</span>
        </li>
        <li>
          <span>重启次数：</span>
          <span>0 次</span>
        </li>
        <li>
          <span>主机：</span>
          <span>node03</span>
        </li>
        <li>
          <span>所属镜像：</span>
          <span>
            k8s.io/k8s/app-2048
          </span>
        </li>
        <li>
          <span>IP：</span>
          <span>
            172.29.186.194
          </span>
        </li>

      </ul>

    </el-card>
    <el-row
      :gutter="20"
      class="m-t-20"
    >
      <el-col :span="4">
        <el-card>
          <ul class="menulists">
            <li
              v-for="item in menus"
              :class="item.id===active?'active':'' "
              @click="changeMenu(item.id)"
            >{{item.label}}</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="20">
        <div v-if="active===1">
          <el-card>
            <el-table
              :data="containerData"
              style="width: 99%"
              highlight-current-row
            >
              <el-table-column
                prop="container"
                label="容器"
              />
              <el-table-column
                prop="mirror"
                label="镜像"
              />
              <el-table-column
                prop="status"
                label="状态"
              />
              <el-table-column
                prop="create"
                label="创建时间"
              />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="console(scope.$index,scope.row)"
                    type="text"
                    size="small"
                  >控制台</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
        <div v-if="active===2">
          <el-card>
            <div
              slot="header"
              class="clearfix"
            >
              <span>基本信息</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in baseData">
                <td>{{tr.key}}</td>
                <td v-if="tr.value.constructor==Array ">
                  <el-tag
                    v-for="tag in tr.value"
                    size="mini"
                    class="m-r-10"
                  >
                    <span>{{tag.tag }} </span> | {{tag.label}}
                  </el-tag>

                </td>
                <td v-if="tr.value.constructor==String ">
                  <span>{{tr.value}}</span>
                </td>
              </tr>
            </table>
          </el-card>
          <el-card style="margin-top:20px">
            <div
              slot="header"
              class="clearfix"
            >
              <span>容器信息</span>
            </div>
            <table class="tabel-resource">
              <tr v-for="tr in tables">
                <td>{{tr.label}}</td>
                <td>
                  <span>{{tr.value}}</span>
                </td>
              </tr>
            </table>
          </el-card>
        </div>
        <div v-if="active===3">
          <el-card>
            <component
              is="advanced"
              :entercode='entercode'
            ></component>
          </el-card>
        </div>
        <div v-if="active===4">
          <el-card>
            <div
              slot="header"
              class="clearfix"
            >
              <span>性能</span>
            </div>
            <el-row>
              <el-col :span="6">
                <el-select
                  v-model="form.type"
                  placeholder
                  size="small"
                >
                  <el-option
                    label="cpu用量"
                    value="cpu"
                  ></el-option>
                  <el-option
                    label="内存用量"
                    value="memory"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="form.time"
                  placeholder
                  size="small"
                >
                  <el-option
                    label="1小时"
                    value="1"
                  ></el-option>
                  <el-option
                    label="6小时"
                    value="2"
                  ></el-option>
                  <el-option
                    label="12小时"
                    value="3"
                  ></el-option>
                  <el-option
                    label="1天"
                    value="4"
                  ></el-option>
                  <el-option
                    label="1周"
                    value="5"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-button size="small">刷新</el-button>
              </el-col>
            </el-row>
            <div
              class="chartsBox m-tb-20"
              v-if="form.type=='memory' "
            >
              <line-charts :lineData="memoryCharts"></line-charts>
            </div>
            <div
              class="chartsBox m-tb-20"
              v-if="form.type=='cpu' "
            >
              <line-charts :lineData="cpuCharts"></line-charts>
            </div>
            <el-table
              :data="performanceData"
              style="width: 99%"
              highlight-current-row
            >

              <el-table-column
                prop="type"
                label=""
              >
                <template slot-scope="scope">
                  <span
                    class="type-icon-c"
                    v-show="scope.row.type===1 "
                  ></span>
                  <span
                    class="type-icon-m"
                    v-show="scope.row.type===2"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="容器名称"
              />
              <el-table-column
                prop="value"
                label="当前值"
              />
              <el-table-column
                prop="min"
                label="最小值"
              />
              <el-table-column
                prop="average"
                label="平均值"
              />
              <el-table-column
                prop="max"
                label="最大值"
              />
            </el-table>

          </el-card>
        </div>
        <div v-if="active===5">
          <el-card>
            <component
              is="advanced"
              :entercode='entercodeLog'
            ></component>
          </el-card>
        </div>
        <el-card v-if="active===6">
          <div
            slot="header"
            class="clearfix"
          >
            <span>事件</span>
          </div>
          <el-table
            :data="eventData"
            style="width: 99%"
            highlight-current-row
          >
            <el-table-column
              prop="time"
              label="时间"
            />
            <el-table-column
              prop="type"
              label="类型"
            />
            <el-table-column
              prop="name"
              label="名称"
            />
            <el-table-column
              prop="target"
              label="目标"
            />
            <el-table-column
              prop="desc"
              label="描述"
            />
            <el-table-column
              prop="num"
              label="次数"
            />

          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      class="deepdialog"
      title="控制台"
      :visible.sync="containerVisible"
      width="30%"
    >
      <el-form
        :model="formGroup"
        label-width="80px"
      >
        <el-form-item label="容器组">
          <el-select
            v-model="formGroup.group"
            size="mini"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              :key="item.value"
              v-for="item in groupItem"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器">
          <el-select
            v-model="formGroup.container"
            size="mini"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              :key="item.value"
              v-for="item in containerItem"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="containerVisible = false"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="containerVisible = false"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import LineCharts from '@/components/Charts/lineCharts'
import advanced from '../components/advanced'
const cpuCharts = {
  name: 'cpu',
  data: [
    {
      name: "cpu",
      value: [ 23, 39, 118, 71, 116, 89, 58, 71, 51, 146, 31, 41, 61, 185, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    }
  ],
  xAxisData: [ "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10" ],
  color: [ 'rgba(115,226,226,0.5)' ],
}
const memoryCharts = {
  name: '内存',
  xAxisData: [ "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10" ],
  data: [
    {
      name: '内存占用',
      value: [ 43, 58, 195, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 200, 17, 0, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    }
  ],
  color: [ 'rgba(18,61,172,0.5)' ],
  title: '在线节点状态'
}
export default {
  components: {
    LineCharts,
    advanced
  },
  data() {
    return {
      chartData: {},
      containerVisible: false,
      performanceData: [
        {
          type: 1,
          name: 'pause',
          value: '0%',
          min: '0%',
          average: '0%',
          max: '0%'
        },
        {
          type: 2,
          name: 'app-2048',
          value: '0%',
          min: '0%',
          average: '0%',
          max: '0%'
        },
      ],
      eventData: [ {
        time: '',
        type: '',
        name: '',
        target: '',
        desc: '',
        num: ''
      } ],
      form: {
        type: 'cpu',
        time: '1小时'
      },
      formGroup: {
        group: 'calico-kube-controllers-c469f555b-gqwnn',
        container: 'calico-kube-dsd44'
      },
      groupItem: [
        {
          label: 'calico-kube-controllers-c469f555b-gqwnn',
          value: 'calico-kube-controllers-c469f555b-gqwnn'
        }
      ],
      containerItem: [
        {
          label: 'calico-kube-controllers-c469f555b-gqwnn',
          value: 'calico-kube-dsd44'
        }
      ],
      memoryCharts: {
        name: '内存',
        xAxisData: [ "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10" ],
        data: [
          {
            name: '内存占用',
            value: [ 43, 58, 195, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 200, 17, 0, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
          }
        ],
        color: [ 'rgba(18,61,172,0.5)' ],
        title: '在线节点状态'
      },
      cpuCharts: {
        name: 'cpu',
        data: [
          {
            name: "cpu",
            value: [ 23, 39, 118, 71, 116, 89, 58, 71, 51, 146, 31, 41, 61, 185, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
          }
        ],
        xAxisData: [ "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10" ],
        color: [ 'rgba(115,226,226,0.5)' ],
      },
      hitData: {
        name: '网络',
        data: [
          {
            name: '接收速率',
            value: [ 20, 37, 91, 72, 68, 67, 54, 42, 42, 115, 41, 33, 64, 112, 4, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
          },
          {
            name: '发送速率',
            value: [ 0, 0, 0, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 200, 17, 55, 0, 0, 2, 8, 0, 0, 99, 0, 156, 0, 143, 0, 244, 0, 98 ]
          }
        ],
        xAxisData: [ "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20", "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26", "2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31", "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10" ],
        color: [ 'rgba(242, 196, 123,0.5)', 'rgba(255,126,133,0.5)' ],
      },
      containerData: [
        {
          container: 'uds-storage-server-6df5d444b9-xrvfg',
          ipv4: '172.29.241.69',
          host: 'master',
          mirror: 'kube-system/kube-agent-parcel-calico-node:v3.13.1',
          rurning: '1/1',
          status: '运行中',
          restart: '0 次',
          cpu: '0.800 核',
          memory: '0.800 核',
          create: '16 天前'
        },
        {
          container: 'uds-storage-server-6df5d444b9-xrvfg',
          ipv4: '172.29.241.69',
          host: 'master',
          mirror: 'kube-system/kube-agent-parcel-calico-node:v3.13.1',
          rurning: '1/1',
          status: '运行中',
          restart: '0 次',
          cpu: '0.800 核',
          memory: '0.800 核',
          create: '16 天前'
        },
        {
          container: 'uds-storage-server-6df5d444b9-xrvfg',
          ipv4: '172.29.241.69',
          host: 'master',
          mirror: 'kube-system/kube-agent-parcel-calico-node:v3.13.1',
          rurning: '1/1',
          status: '运行中',
          restart: '0 次',
          cpu: '0.800 核',
          memory: '0.800 核',
          create: '16 天前'
        },
      ],
      graphicsData: [
        {
          host: 'SVGA II Adapter',
          supplier: 'VMware',
          type: 'VGA compatible controller'
        }
      ],
      networkData: [
        {
          equipment: 'kube-agent-mng',
          MAC: '00:50:56:9b:67:49',
          IPv4: '10.0.5.150',
          equipmentName: 'VMXNET3 Ethernet Controller',
          supplier: 'VMware'
        }
      ],
      memoryData: [
        {
          label: '总计		',
          value: '31.25 G'
        },
        {
          label: '使用量	',
          value: '4.27 G'
        },
        {
          label: 'swap 总计	',
          value: '0.00 G'
        },
        {
          label: 'swap 使用量		',
          value: '0.00 G'
        },
      ],
      cpuData: [
        {
          label: '型号		',
          value: 'Intel(R) Xeon(R) CPU E5-2630 v3 @ 2.40GHz'
        },
        {
          label: 'CPU 	',
          value: '架构	x86_64'
        },
        {
          label: 'CPU 频率	',
          value: '2.40 GHz'
        },
        {
          label: 'CPU 插槽数	',
          value: '16'
        },
        {
          label: '每个插槽的 CPU 内核数		',
          value: '1'
        },
        {
          label: 'CPU 内核数	',
          value: '16'
        },
        {
          label: '逻辑 CPU 数		',
          value: '16'
        },
        {
          label: '超线程	',
          value: '不支持'
        }
      ],
      overviewData: [
        {
          label: '制造商		',
          value: 'VMware, Inc.'
        },
        {
          label: '主机型号',
          value: '	VMware Virtual Platform	'
        },
        {
          label: '虚拟化	',
          value: '该主机是基于 vmware 的虚拟设备'
        },
      ],
      DockerData: [
        {
          label: '容器数		',
          value: '49 / 59 (运行中/总数)'
        },
        {
          label: '镜像数		',
          value: '48'
        },
        {
          label: 'Docker 版本		',
          value: '19.03.8'
        },
        {
          label: 'docker 容器存储		',
          value: '基于 overlay2 驱动	'
        },
        {
          label: '日志驱动			',
          value: 'json-file	'
        },
        {
          label: '内核版本			',
          value: '4.18.0-147.el8.x86_64	'
        },
        {
          label: '操作系统			',
          value: 'CentOS Linux 8 (Core)	'
        },
      ],
      kubeletData: [
        {
          label: '控制 IP 地址	',
          value: '10.0.5.150'
        },
        {
          label: '主机名称	',
          value: 'master01'
        },
        {
          label: 'PodCIDR		',
          value: '172.30.0.0/24'
        },
        {
          label: '容器组数	',
          value: '23'
        },
        {
          label: 'Kubelet 版本		',
          value: 'v1.18.6'
        },
      ],
      kubernetesData: [
        {
          type: 'KubeApiServerProxyNotReady',
          status: 'False',
          heart: '1小时前',
          change: '10小时前',
          reason: 'KubeApiServerProxyReady',
          news: 'kube apiserver proxy is posting ready status.'
        },
        {
          type: 'Ready',
          status: 'True',
          heart: '1小时前',
          change: '1天前',
          reason: 'KubeletReady',
          news: 'kubelet is posting ready status.'
        }
      ],
      notesData: [
        {
          key: 'node.alpha.kubernetes.io/ttl',
          value: '0'
        },
        {
          key: 'volumes.kubernetes.io/controller-managed-attach-detach',
          value: 'true'
        },
      ],
      baseData: [
        {
          key: '标签',
          value: [
            {
              tag: 'app',
              label: 'app-2048'
            },
            {
              tag: 'pod-template-hash',
              label: '6d6dfbb6ff'
            }
          ],
        },
        {
          key: 'ip',
          value: '172.29.186.194'
        },
        {
          key: '重启策略',
          value: 'Always'
        }
      ],
      tables: [
        {
          label: '镜像',
          value: 'k8s.io/k8s/app-2048',
        },
        {
          label: '端口',
          value: '80/TCP',
        },
        {
          label: 'Mount',
          value: 'default-token-vnd9r /var/run/secrets/kub',
        },
        {
          label: 'CPU',
          value: '0.050 核 / 0.050 核',
        },
        {
          label: '内存',
          value: '50 M / 50 M',
        }
      ],
      menus: [
        {
          label: '概览',
          id: 2
        },
        {
          label: '容器',
          id: 1
        },

        {
          label: '高级配置',
          id: 3
        },
        {
          label: '性能',
          id: 4
        },
        {
          label: '实时日志',
          id: 5
        },
        {
          label: '事件',
          id: 6
        },
      ],
      active: 2,
      entercodeLog: `
        I1018 20:07:59.223349       1 client.go:361] parsed scheme: "endpoint"
I1018 20:07:59.223380       1 endpoint.go:68] ccResolverWrapper: sending new addresses to cc: [{https://127.0.0.1:2379  <nil> 0 <nil>}]
I1018 20:07:59.228673       1 client.go:361] parsed scheme: "endpoint"
I1018 20:07:59.228715       1 endpoint.go:68] ccResolverWrapper: sending new addresses to cc: [{https://127.0.0.1:2379  <nil> 0 <nil>}]
I1018 20:08:07.721442       1 secure_serving.go:178] Serving securely on [::]:6443
I1018 20:08:07.721548       1 controller.go:81] Starting OpenAPI AggregationController
I1018 20:08:07.721691       1 dynamic_cafile_content.go:167] Starting request-header::/etc/kubernetes/pki/front-proxy-ca.crt
I1018 20:08:07.722092       1 cluster_authentication_trust_controller.go:440] Starting cluster_authentication_trust_controller controller
I1018 20:08:07.722122       1 shared_informer.go:223] Waiting for caches to sync for cluster_authentication_trust_controller
I1018 20:08:07.722305       1 crd_finalizer.go:266] Starting CRDFinalizer
I1018 20:08:07.722336       1 dynamic_cafile_content.go:167] Starting client-ca-bundle::/etc/kubernetes/pki/ca.crt
I1018 20:08:07.722387       1 dynamic_cafile_content.go:167] Starting client-ca-bundle::/etc/kubernetes/pki/ca.crt
I1018 20:08:07.722399       1 dynamic_cafile_content.go:167] Starting request-header::/etc/kubernetes/pki/front-proxy-ca.crt
I1018 20:08:07.722883       1 controller.go:86] Starting OpenAPI controller
I1018 20:08:07.722947       1 customresource_discovery_controller.go:209] Starting DiscoveryController
I1018 20:08:07.722986       1 naming_controller.go:291] Starting NamingConditionController
I1018 20:08:07.722997       1 establishing_controller.go:76] Starting EstablishingController
I1018 20:08:07.723026       1 nonstructuralschema_controller.go:186] Starting NonStructuralSchemaConditionController
I1018 20:08:07.723051       1 apiapproval_controller.go:186] Starting KubernetesAPIApprovalPolicyConformantConditionController
I1018 20:08:07.723148       1 apiservice
        `,
      entercode: `
          metadata:
          name: app-2048-6d6dfbb6ff-z47l7
          generateName: app-2048-6d6dfbb6ff-
          namespace: default
          selfLink: /api/v1/namespaces/default/pods/app-2048-6d6dfbb6ff-z47l7
          uid: e15586eb-137a-4a0c-986f-dc224ad12eaf
          resourceVersion: '5361077'
          creationTimestamp: '2020-09-28T07:23:28Z'
          labels:
            app: app-2048
            pod-template-hash: 6d6dfbb6ff
          annotations:
            cni.projectcalico.org/ipv4pools: '["default-ipv4-ippool"]'
            kube-agent.k8s.io/parcel.egress.burst: '0'
            kube-agent.k8s.io/parcel.egress.rate: '0'
            kube-agent.k8s.io/parcel.ingress.burst: '0'
            kube-agent.k8s.io/parcel.ingress.rate: '0'
            kubernetes.io/psp: kube-agent-psp-allow-all
          ownerReferences:
            - apiVersion: apps/v1
              kind: ReplicaSet
              name: app-2048-6d6dfbb6ff
              uid: 956d8031-67b0-42aa-8681-9da8dda7d9d7
              controller: true
              blockOwnerDeletion: true
        spec:
          volumes:
            - name: default-token-vnd9r
              secret:
                secretName: default-token-vnd9r
                defaultMode: 420
          containers:
            - name: app-2048
              image: 'k8s.io/k8s/app-2048:latest'
              ports:
                - containerPort: 80
                  protocol: TCP
              resources:
                limits:
                  cpu: 50m
                  memory: 50M
                requests:
                  cpu: 50m
                  memory: 50M
              volumeMounts:
                - name: default-token-vnd9r
                  readOnly: true
                  mountPath: /var/run/secrets/kubernetes.io/serviceaccount
              terminationMessagePath: /dev/termination-log
              terminationMessagePolicy: File
              imagePullPolicy: Always
          restartPolicy: Always
          terminationGracePeriodSeconds: 30
          dnsPolicy: ClusterFirst
          serviceAccountName: default
          serviceAccount: default
          nodeName: node03
          securityContext: {}
          affinity:
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                  - matchExpressions:
                      - key: kubernetes.io/os
                        operator: In
                        values:
                          - linux
          schedulerName: default-scheduler
          tolerations:
            - key: node.kubernetes.io/not-ready
              operator: Exists
              effect: NoExecute
              tolerationSeconds: 300
            - key: node.kubernetes.io/unreachable
              operator: Exists
              effect: NoExecute
              tolerationSeconds: 300
          enableServiceLinks: true
        status:
          phase: Running
          conditions:
            - type: Initialized
              status: 'True'
              lastProbeTime: null
              lastTransitionTime: '2020-09-28T07:23:28Z'
            - type: Ready
              status: 'True'
              lastProbeTime: null
              lastTransitionTime: '2020-09-28T07:24:17Z'
            - type: ContainersReady
              status: 'True'
              lastProbeTime: null
              lastTransitionTime: '2020-09-28T07:24:17Z'
            - type: PodScheduled
              status: 'True'
              lastProbeTime: null
              lastTransitionTime: '2020-09-28T07:23:28Z'
          hostIP: 10.0.5.155
          podIP: 172.29.186.194
          podIPs:
            - ip: 172.29.186.194
          startTime: '2020-09-28T07:23:28Z'
          containerStatuses:
            - name: app-2048
              state:
                running:
                  startedAt: '2020-09-28T07:24:16Z'
              lastState: {}
              ready: true
              restartCount: 0
              image: 'k8s.io/k8s/app-2048:latest'
              imageID: >-
                docker-pullable://k8s.io/k8s/app-2048@sha256:c07746fa071c6e47c0877b66acec9ea6edcc407a6fe4c162f03cd112e90b041d
              containerID: >-
                docker://750425b0e49ab0bc5d1d480cfc6c45752e4e70a0efedf2fe61dd9172280bd294
              started: true
          qosClass: Guaranteed
        `,
    }
  },
  mounted() {
    this.chartData = cpuCharts
  },
  methods: {
    handleCommand(command) {
      if (command == 'console') {
        this.containerVisible = true
      } else {
        this.containerDel(1)
      }
    },
    typeChange(e) {
      console.log({ e })
      if (e == 'cpu') {
        this.chartData = cpuCharts
      } else {
        this.chartData = cpuCharts
      }
    },
    containerDel(i) {
      this.$confirm('删除容器组，请确保业务数据保存在存储中。', '您确定要删除该数据吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.containerData.splice(i,1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    console() {
      this.containerVisible = true
    },
    backPage() {
      this.$router.replace('hostManagement')
    },
    changeMenu(id) {
      this.active = id
    },
    format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return "";
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
.type-icon-c {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: rgba(115, 226, 226, 0.5);
}
.type-icon-m {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: rgba(18, 61, 172, 0.5);
}
.chartsBox {
  display: inline-block;
  width: 100%;
}
.hostImg {
  width: 40px;
  height: 40px;
}
.host-name {
  // display: block;
  color: #595f69;
}
.host-desc {
}
.tabel-resource {
  width: 100%;
  color: #9ba3af;
  border: 1px solid #e4e7ed;
  border-radius: 3px;
  text-align: left;
  margin: 0;
  width: 100%;
  overflow: visible;
  margin-bottom: 20px;
  tr {
    display: flex;
    flex: 1;
    border-color: #e4e7ed;
    border-bottom: 1px solid #f1f3f6;
    td {
      width: 0;
      padding: 10px 10px;
      // height: 40px;
      line-height: 40px;
      font-weight: 400;
      font-size: 14px;
      color: #595f69;
      border-color: #e4e7ed;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      flex: 1 1 auto;
      flex-basis: auto !important;
      position: relative;
      margin: auto;
    }
  }
  tr:last-child {
    border-bottom: none !important;
  }
}
.detail-info {
  li {
    width: 25%;
    display: flex;
    margin-bottom: 20px;
    // color: #9ba3af;
    font-size: 13px;
    span {
      &:nth-child(2) {
        flex: 1;
      }
    }
  }
}

.menulists {
  font-size: 14px;
  margin-bottom: 10px;
  padding: 0;
  list-style-type: none;
  border-radius: 4px;
  // box-shadow: 0 1px 4px 0 rgba(204,209,217,.3);
  font-weight: bold;
  li {
    line-height: 40px;
    position: relative;
    height: 40px;
    // padding: 0 10px;
    cursor: pointer;
    color: #9ba3af;
    // border: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    // background-color: #f5f7fa;
    // text-shadow: 0 1px 0 hsla(0,0%,100%,.9);
  }
  .active {
    color: #000;
    background-color: #fff;
  }
}
</style>