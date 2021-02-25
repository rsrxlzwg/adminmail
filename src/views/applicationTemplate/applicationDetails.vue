<template>
  <div>
    <div>
      <div>
        <el-card>
          <el-row>
            <el-col :span="12" class="font-26">
              <img :src="editForm.img" alt :style="{width:editForm.width +'px'}" />
              {{editForm.productName}}
            </el-col>
            <el-col :span="12" style="text-align:right">
              <el-select
              size="mini"
                v-model="version"
                class="m-r-10"
                style="width:100px"
                placeholder="请选择版本">
                  <el-option label="v1" value="v1"/>
                  <el-option label="v2" value="v2"/>
              </el-select>
              <el-dropdown style="font-size:18px">
                <i class="el-dropdown-link el-icon-more-outline div-pointer"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="addTemp()">部署</el-dropdown-item>
                  <el-dropdown-item @click.native="handleExput()">导出</el-dropdown-item>
                  <el-dropdown-item @click.native="handledel()">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <el-row class="m-t-20" :gutter="30">
        <el-col :span="24">
          <el-card>
            <el-card>
              <el-row>
                <el-col :span="24" class="font-14 product-desc">{{editForm.disc}}</el-col>
              </el-row>
            </el-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="README" name="first">
                <!-- READM 静态样式start-->
                <div class="readme-markdown markdown-body">
                  <h1 id="deprecatedacsengineautoscaler">DEPRECATED: acs-engine-autoscaler</h1>
                  <p>
                    <a href="#">acs-engine-autoscaler</a> is a node-level autoscaler for Kubernetes for clusters created with acs-engine.
                  </p>
                  <h2 id="tldr">TL;DR:</h2>
                  <pre class="hljs pgsql"><code class="console language-console">$ helm install <span class="hljs-keyword">stable</span>/acs-engine-autoscaler -f <span class="hljs-keyword">values</span>.yaml
</code></pre>
                  <p>
                    Where
                    <code>values.yaml</code> contains:
                  </p>
                  <pre class="hljs dts"><code><span class="hljs-symbol">acsenginecluster:</span>
<span class="hljs-symbol">  resourcegroup:</span>
<span class="hljs-symbol">  azurespappid:</span>
<span class="hljs-symbol">  azurespsecret:</span>
<span class="hljs-symbol">  azuresptenantid:</span>
<span class="hljs-symbol">  kubeconfigprivatekey:</span>
<span class="hljs-symbol">  clientprivatekey:</span>
<span class="hljs-symbol">  caprivatekey:</span>
</code></pre>
                  <h2 id="introduction">Introduction</h2>
                  <p>
                    This chart bootstraps an acs-engine-autoscaler deployment on a
                    <a
                      href="#"
                    >Kubernetes</a> cluster using the
                    <a href="#">Helm</a> package manager.
                  </p>
                  <h2 id="prerequisites">Prerequisites</h2>
                  <ul>
                    <li>Kubernetes 1.6+</li>
                  </ul>
                  <h2 id="installingthechart">Installing the Chart</h2>
                  <p>
                    In order for the chart to configure the acs-engine-autoscaler properly during the installation process, you must provide some minimal configuration which can't rely on defaults. This includes all the values in the
                    <code>values.yaml</code> file:
                  </p>
                  <pre class="hljs dts"><code><span class="hljs-symbol">acsenginecluster:</span>
<span class="hljs-symbol">  resourcegroup:</span>
<span class="hljs-symbol">  azurespappid:</span>
<span class="hljs-symbol">  azurespsecret:</span>
<span class="hljs-symbol">  azuresptenantid:</span>
<span class="hljs-symbol">  kubeconfigprivatekey:</span>
<span class="hljs-symbol">  clientprivatekey:</span>
<span class="hljs-symbol">  caprivatekey:</span>
</code></pre>
                  <p>
                    To install the chart with the release name
                    <code>my-release</code>:
                  </p>
                  <pre class="hljs sql"><code class="console language-console">$ helm <span class="hljs-keyword">install</span> <span class="hljs-comment">--name my-release stable/acs-engine-autoscaler</span>
</code></pre>
                  <p>
                    The command deploys acs-engine-autoscaler on the Kubernetes cluster using the supplied configuration. The
                    <a
                      href="#configuration"
                    >configuration</a> section lists the parameters that can be configured during installation.
                  </p>
                  <blockquote>
                    <p>
                      <strong>Tip</strong>: List all releases using
                      <code>helm list</code>
                    </p>
                  </blockquote>
                  <h2 id="verifyinginstallation">Verifying Installation</h2>
                  <p>To verify the acs-engine-autoscaler is configured properly find the pod that the deployment created and look at its logs. The result will look something similar to the following:</p>
                  <pre class="hljs routeros"><code><span class="hljs-keyword">To</span> verify that acs-engine-autoscaler has started, run:

  kubectl <span
  class="hljs-attribute"
>--namespace</span>=default <span class="hljs-builtin-name">get</span> pods -l <span class="hljs-string">"app=olfactory-bunny-acs-engine-autoscaler"</span>

<span class="hljs-keyword">To</span> verify that acs-engine-autoscaler is running as expected, run:
  kubectl logs $(kubectl <span
  class="hljs-attribute"
>--namespace</span>=default <span class="hljs-builtin-name">get</span> pods -l <span class="hljs-string">"app=olfactory-bunny-acs-engine-autoscaler"</span> -o <span class="hljs-attribute">jsonpath</span>=<span class="hljs-string">"{.items[0].metadata.name}"</span>)

$ kubectl <span class="hljs-attribute">--namespace</span>=default <span class="hljs-builtin-name">get</span> pods -l <span class="hljs-string">"app=olfactory-bunny-acs-engine-autoscaler"</span>

NAME                                                     READY     STATUS    RESTARTS   AGE
olfactory-bunny-acs-engine-autoscaler-1715934483-c673v   1/1       Running   0          10s

$ kubectl logs $(kubectl <span
  class="hljs-attribute"
>--namespace</span>=default <span class="hljs-builtin-name">get</span> pods -l <span class="hljs-string">"app=olfactory-bunny-acs-engine-autoscaler"</span> -o <span class="hljs-attribute">jsonpath</span>=<span class="hljs-string">"{.items[0].metadata.name}"</span>)

2017-06-11 23:20:59,352 - autoscaler.cluster - <span class="hljs-builtin-name">DEBUG</span> - Using kube<span class="hljs-built_in"> service </span>account
2017-06-11 23:20:59,352 - autoscaler.cluster - <span class="hljs-builtin-name">INFO</span> - ++++ Running Scaling Loop ++++++
2017-06-11 23:20:59,421 - autoscaler.cluster - <span
  class="hljs-builtin-name"
>INFO</span> - Pods <span class="hljs-keyword">to</span> schedule: 0
2017-06-11 23:20:59,421 - autoscaler.cluster - <span class="hljs-builtin-name">INFO</span> - ++++ Scaling Up Begins ++++++
2017-06-11 23:20:59,421 - autoscaler.cluster - <span
  class="hljs-builtin-name"
>INFO</span> - Nodes: 1
2017-06-11 23:20:59,421 - autoscaler.cluster - <span class="hljs-builtin-name">INFO</span> - <span class="hljs-keyword">To</span> schedule: 0
2017-06-11 23:20:59,421 - autoscaler.cluster - <span class="hljs-builtin-name">INFO</span> - Pending pods: 0
2017-06-11 23:20:59,422 - autoscaler.cluster - <span
  class="hljs-builtin-name"
>INFO</span> - ++++ Scaling Up Ends ++++++
2017-06-11 23:20:59,422 - autoscaler.cluster - <span
  class="hljs-builtin-name"
>INFO</span> - ++++ Maintenance Begins ++++++
2017-06-11 23:20:59,422 - autoscaler.engine_scaler - <span
  class="hljs-builtin-name"
>INFO</span> - ++++ Maintaining Nodes ++++++
2017-06-11 23:20:59,423 - autoscaler.engine_scaler - <span
  class="hljs-builtin-name"
>INFO</span> - node: k8s-agentpool1-29744472-4                                                   state: under-utilized-undrainable
2017-06-11 23:20:59,423 - autoscaler.cluster - <span
  class="hljs-builtin-name"
>INFO</span> - ++++ Maintenance Ends ++++++
<span class="hljs-built_in">..</span>.
</code></pre>
                  <h2 id="uninstallingthechart">Uninstalling the Chart</h2>
                  <p>To uninstall/delete the last deployment:</p>
                  <pre class="hljs vim"><code class="console language-console">$ helm <span class="hljs-keyword">ls</span>
$ helm <span class="hljs-keyword">delete</span> [<span class="hljs-keyword">last</span> deployment]
</code></pre>
                  <p>The command removes all the Kubernetes components associated with the chart and deletes the release.</p>
                  <h2 id="configuration">Configuration</h2>
                  <p>The following tables list the configurable parameters of the acs-engine-autoscaler chart and their default values.</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <code>image.repository</code>
                        </td>
                        <td>Image repository</td>
                        <td>
                          <code>wbuchwalter/kubernetes-acs-engine-autoscaler</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>image.tag</code>
                        </td>
                        <td>
                          Image tag. Possible values listed
                          <a href="#">here</a>.
                        </td>
                        <td>
                          <code>2.1.1</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>image.pullPolicy</code>
                        </td>
                        <td>Image pull policy</td>
                        <td>
                          <code>IfNotPresent</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>podAnnotations</code>
                        </td>
                        <td>Pod annotations</td>
                        <td>
                          <code>{}</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>deploymentAnnotations</code>
                        </td>
                        <td>Deployment annotations</td>
                        <td>
                          <code>{}</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>resources</code>
                        </td>
                        <td>CPU/Memory resource requests/limits</td>
                        <td>
                          <code>{}</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>nodeSelector</code>
                        </td>
                        <td>Node labels for pod assignment</td>
                        <td>
                          <code>{}</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>tolerations</code>
                        </td>
                        <td>Toleration labels for pod assignment</td>
                        <td>
                          <code>[]</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>affinity</code>
                        </td>
                        <td>Affinity settings for pod assignment</td>
                        <td>
                          <code>{}</code>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>resourcegroup</code>
                        </td>
                        <td>Name of the resource group containing the cluster</td>
                        <td>
                          None. You
                          <em>must</em> supply one.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>azurespappid</code>
                        </td>
                        <td>An Azure service principal id</td>
                        <td>
                          None. You
                          <em>must</em> supply one.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>azurespsecret</code>
                        </td>
                        <td>An Azure service principal secret</td>
                        <td>
                          None. You
                          <em>must</em> supply one.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>azuresptenantid</code>
                        </td>
                        <td>An Azure service principal tenant id</td>
                        <td>
                          None. You
                          <em>must</em> supply one.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>kubeconfigprivatekey</code>
                        </td>
                        <td>
                          The key passed to the
                          <code>kubeConfigPrivateKey</code> parameter in your
                          <code>azuredeploy.parameters.json</code> generated with
                          <code>acs-engine</code>
                        </td>
                        <td>
                          None. You
                          <em>must</em> supply one.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>clientprivatekey</code>
                        </td>
                        <td>
                          The key passed to the
                          <code>clientPrivateKey</code> parameter in your
                          <code>azuredeploy.parameters.json</code> generated with
                          <code>acs-engine</code>
                        </td>
                        <td>
                          None. You
                          <em>must</em> supply one.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>caprivatekey</code>
                        </td>
                        <td>
                          The key passed to the
                          <code>caPrivateKey</code> parameter in your
                          <code>azuredeploy.parameters.json</code> generated with
                          <code>acs-engine</code>
                        </td>
                        <td>
                          None. You
                          <em>must</em> supply one.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>acsdeployment</code>
                        </td>
                        <td>[OPTIONAL] The name of the deployment used to deploy the kubernetes cluster initially.</td>
                        <td>
                          <code>azuredeploy</code>.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <code>sleeptime</code>
                        </td>
                        <td>[OPTIONAL] The number of seconds to sleep between scaling loops.</td>
                        <td>60</td>
                      </tr>
                      <tr>
                        <td>
                          <code>ignorepools</code>
                        </td>
                        <td>[OPTIONAL] A list of comma separated pool names the autoscaler should ignore.</td>
                        <td>None.</td>
                      </tr>
                      <tr>
                        <td>
                          <code>spareagents</code>
                        </td>
                        <td>[OPTIONAL] Number of agents per pool that should always remain up.</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>
                          <code>idlethreshold</code>
                        </td>
                        <td>[OPTIONAL] Maximum duration (in seconds) an agent can stay idle before being deleted.</td>
                        <td>1800 (30 minutes)</td>
                      </tr>
                      <tr>
                        <td>
                          <code>overprovision</code>
                        </td>
                        <td>[OPTIONAL] Number of extra agents to create when scaling out.</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>
                    Specify each parameter you'd like to override using a YAML file as described above in the
                    <a
                      href="#installing-the-chart"
                    >installation</a> section.
                  </p>
                  <h2 id="credentials">Credentials</h2>
                  <p>
                    You need to provide a Service Principal to the autoscaler. You can create one using
                    <a
                      href="#"
                    >Azure CLI</a>:
                  </p>
                  <pre class="hljs dsconfig"><code><span class="hljs-string">az </span><span class="hljs-string">ad </span><span class="hljs-string">sp </span><span class="hljs-built_in">create-for-rbac</span>
</code></pre>
                </div>
                <!-- READM 静态样式end-->
              </el-tab-pane>
              <el-tab-pane label="资源" name="second">
                <el-table
                  :data="tableData"
                  style="width: 99%"
                  stripe
                >
                  <el-table-column prop="type" label="资源类型" />
                  <el-table-column prop="name" label="资源名称" />
                  <el-table-column prop="url" label="镜像" />
                </el-table>
                <!-- 分页 -->
                <div class="block">
                  <el-pagination
                    background
                    :current-page="1"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="1"
                  ></el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="模板预览" name="third">
                <!-- 模板预览 静态样式start-->
                <div class="div-black">
                  WARNING: This chart is deprecated
                  <br />---
                  <br />apiVersion: v1
                  <br />data:
                  <br />
                  <span class="m-l-15">azure-sp-app-id: TUlTU0lORw==</span>
                  <br />
                  <span class="m-l-15">azure-sp-secret: TUlTU0lORw==</span>
                  <br />
                  <span class="m-l-15">azure-sp-tenant-id: TUlTU0lORw==</span>
                  <br />
                  <span class="m-l-15">ca-private-key: TUlTU0lORw==</span>
                  <br />
                  <span class="m-l-15">client-private-key: TUlTU0lORw==</span>
                  <br />
                  <span class="m-l-15">kubeconfig-private-key: TUlTU0lORw==</span>
                  <br />kind: Secret
                  <br />metadata:
                  <br />
                  <span class="m-l-15">labels:</span>
                  <br />
                  <span style="margin-left:25px">app: acs-engine-autoscaler</span>
                  <br />
                  <span style="margin-left:25px">chart: acs-engine-autoscaler-2.2.2</span>
                  <br />
                  <span style="margin-left:25px">heritage: Helm</span>
                  <br />
                  <span style="margin-left:25px">release: acs-engine-autoscaler</span>
                  <br />
                  <span class="m-l-15">name: acs-engine-autoscaler-acs-engine-autoscaler</span>
                  <br />type: Opaque
                  <br />
                </div>
                <!-- 模板预览 静态样式end-->
              </el-tab-pane>
              <el-tab-pane label="模板文件" name="fourth">
                <el-row>
                  <el-col :span="4" class="font-14">
                    <el-tree :data="treeData"></el-tree>
                  </el-col>
                  <el-col :span="20" class="font-14">
                    <div class="div-black">
                      acsenginecluster:
                      <br />
                      <span class="m-l-15">azurespappid: null</span>
                      <br />
                      <span class="m-l-15">azurespsecret: null</span>
                      <br />
                      <span class="m-l-15">azuresptenantid: null</span>
                      <br />
                      <span class="m-l-15">caprivatekey: null</span>
                      <br />
                      <span class="m-l-15">clientprivatekey: null</span>
                      <br />
                      <span class="m-l-15">kubeconfigprivatekey: null</span>
                      <br />
                      <span class="m-l-15">resourcegroup: null</span>
                      <br />
                      affinity: {}
                      <br />
                      deploymentAnnotations: {}
                      <br />image:
                      <br />
                      <span class="m-l-15">pullPolicy: IfNotPresent</span>
                      <br />
                      <span class="m-l-15">repository: wbuchwalter/kubernetes-acs-engine-autoscaler</span>
                      <br />
                      <span class="m-l-15">tag: 2.1.1</span>
                      <br />
                      nodeSelector: {}
                      <br />
                      podAnnotations: {}
                      <br />replicaCount: 1
                      <br />
                      resources: {}
                      <br />tolerations: []
                      <br />
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 底部操作按钮 -->
    <!-- <div class="m-t-20 btn">
      <el-button @click="back">返回</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      version:'v1',
      activeName: "first",
      reverse: true,

      editForm: {
        disc: "描述",
        productName: "标题",
      },
      tableData: [
        {
          name: "RELEASE-NAME-acs-engine-autoscaler",
          type: "Secret",
          url: "-",
        }
      ],
      treeData: [
        {
          label: 'templates',
          children: [{
            label: 'NOTES.txt'
          }, {
            label: '_helpers.tpl'
          }, {
            label: 'deployment.yaml'
          }, {
            label: 'secrets.yaml'
          }]
        }, {
          label: 'Chart.yaml',
        }, {
          label: 'values.yaml',
        }, {
          label: '.helmignore',
        }, {
          label: 'README.md',
        }
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.editForm = this.$route.query.rows;
    },
    //导出
    handleExput() {
      this.$confirm('您确定导出 '+this.editForm.versionNum+' 版本吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '导出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
     //删除
    handledel() {
      this.$confirm('您确定要删除应用模板 ' + this.editForm.productName + ' 下的 '+this.editForm.versionNum+' 版本，不可撤销', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
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
    //添加模板
    addTemp() {
      this.$router.push({ path: "appNewTemp", query: { rows: this.editForm } });
    },
    handleClick() { },
    onSubmit() { },
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
.cluster-container {
  padding: 10px 15px;
  /deep/ .el-form-item {
    // width: 50%;
  }
  /deep/ .el-select {
    display: block;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  margin-bottom: 20px;
}
.btn {
  text-align: center;
}
.div-black {
  line-height: 30px;
  background-color: #3d444f;
  color: #c8deff;
  padding: 10px;
}
.block {
    float: right;
    margin: 12px;
  }
</style>