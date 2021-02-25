<template>
  <div>
    <h3>接入主机</h3>
    <el-row>
      <el-col :span="4">
          <el-steps direction="vertical" :active="active" style="height: 200px;">
            <el-step :title="item.content" :description="item.timestamp" v-for="item in activities"></el-step>
          </el-steps>
      </el-col>
      <el-col :span="18">
         <el-card  > 
             <div slot="header" class="clearfix">
               <div v-show="active===0">
                  <h2>阅读系统要求</h2>
                  <span>要安装控制器，硬件资源必须满足下列要求</span>
               </div>
                <div v-show="active===1">
                  <h2>安装 OS Requirements</h2>
                  <span>OS Requirements 会安装系统软件如 Docker 和 Kubelet</span>
               </div>
                <div v-show="active===2">
                  <h2>安装并接入组件</h2>
               </div>
                
              </div>
              <table class="tabel-resource" v-show="active===0"> 
                <tr v-for="tr in tables">
                  <td>{{tr.label}}</td>
                  <td>
                    <ul>
                      <li v-for="item in tr.values">
                        {{item.label}}
                      </li>
                    </ul>
                  </td>
                </tr>
            </table>
            <div v-show="active===1">
              <h3>1. 获取安装包</h3>
              <p>获取安装包，并上传到相应主机。获取安装包，请联系运维人员 下载到最新的安装包，在「下载文件列表」中找到最新的离线包。安装包中包含有 OS Requirements，系统组件和安装镜像。
                如果您可以连接到互联网，可以使用下面的命令获取 OS Requirements。</p>
                <pre>curl -L https://kub/4.0.2/os-requirements > /usr/local/bin/os-requirements chmod +x /usr/local/bin/os-requirements
                </pre>
              <h3>2. 安装 OS Requirements</h3>
              <p>执行 os-requirements 命令就会开始安装 Docker，按照提示一步步进行即可。</p>
              <pre>/usr/local/bin/os-requirements</pre>
              <p>注意：os-requirements 会检查系统环境是否是满足生产级别。如果有错误提示，请仔细确认。</p>
            </div>
            <div v-show="active===2">
              <p>在被接入的主机中运行下面的命令以接入主机，执行后，会依照第一个控制器的网卡名及子接口信息进行同步规范。并且在安装第一个控制器时，如果选择的镜像存储为 NFS，则会在前两个控制器上分别启动一个镜像仓库用作高可用；否则镜像仓库仅会运行在第一个控制器。
完成相关操作后，请点击“我已经运行了上面的命令了”</p>
<pre>sudo bash -c "$(docker run --rm -i -v /var/run/docker.sock:/var/run/docker.sock 10.0.5.161/kube-system/kub:4.0.2-33372 join --controller-addr 10.0.5.152 )"
</pre>
             <div>  
                <el-radio v-model="radio" label="1">容器引擎</el-radio>
                <el-radio v-model="radio" label="2">控制器</el-radio>
              </div>
            </div>
            <el-row style="margin-top:20px">
              <el-col :span="3"><el-button v-show="active!==0" @click="upStep">上一步</el-button></el-col>
              <el-col :span="3">
                <el-button type="primary" @click="nextStep">
                  <span v-show="active===0">下一步</span>
                  <span v-show="active===1">Docker安装好了</span>
                  <span v-show="active===2">我已经运行上面命令了</span>
                </el-button>
              </el-col>
            </el-row>

          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        radio: '1',
        active:0,
         tables:[
          {
            label:'容器引擎',
            values:[
              {
                label:'支持物理机，虚拟机，云环境'
              },
              {
                label:'操作系统支持 CentOS／RHEL 7.6，7.7，8.1'
              },
              {
                label:'Linux 操作系统最小 2 逻辑 CPU（强烈建议使用 8 个以上 CPU ），Windows 操作系统最小 4 逻辑 CPU（强烈建议使用 16 个以上 CPU ）'
              },
               {
                label:'支Linux 操作系统最小 4G 内存（强烈建议使用 16G 以上内存 ），Windows 操作系统最小8G 内存（强烈建议使用 32G 以上内存 )'
              },
              {
                label:'文件系统 / 不小于 10G，文件系统 /var 不小于 30G'
              },
            ],
          },
           {
            label:'控制器',
             values:[
              {
                label:'支持物理机，虚拟机，云环境'
              },
              {
                label:'操作系统支持 CentOS／RHEL 7.6，7.7，8.1'
              },
              {
                label:'最小 4 逻辑 CPU（CPU 核心数量和主机数线性递增，集群每增加一台主机需增加 0.1 Core。例：5 台主机至少 4.5 Core；280 台以上集群，需要 32 Core）'
              },
               {
                label:'最小 8G 内存（内存量和主机数线性递增，集群每增加一台主机需增加 200M 内存。）'
              },
              {
                label:'文件系统 / 不小于 10G，文件系统 /var 不小于 30G'
              },
            ],
          },
           {
            label:'镜像仓库',
             values:[
              {
                label:'支持物理机，虚拟机，云环境'
              },
              {
                label:'操作系统支持 CentOS／RHEL 7.6，7.7，8.1'
              },
              {
                label:'最小 4 逻辑 CPU（推荐 8 Core）'
              },
               {
                label:'最小 8G 内存（推荐 16 G）'
              },
              {
                label:'当镜像仓库存储选择本地磁盘部署(非高可用模式)，文件系统 /var/local/registry 不小于 100G，推荐 1TB，需要有完善的数据保护和备份'
              },
              {
                label:'当镜像仓库存储选择 NFS 存储卷部署时（高可用模式），对应的文件目录磁盘空间大小 不小于 100G，推荐 1TB，需要有完善的数据保护和备份'
              },
            ],
          }
        ],
        reverse: false,
        activities: [{
          content: '步骤一',
          timestamp: '阅读系统要求'
        }, {
          content: '步骤二',
          timestamp: '安装 OS Requirements'
        }, {
          content: '步骤三',
          timestamp: '安装并接入组件'
        }]
      }
    },
    methods:{
      upStep(){
        if(this.active>=0){
          this.active--
        }
      },
      nextStep(){
        if(this.active<2){
          this.active++

        }else{
          this.$router.push('/hostManagement')
        }
        
      },
    }

    
  }
</script>

<style lang="scss" scoped>
.tabel-resource{
  width: 100%;
  color: #9ba3af;
  border: 1px solid #e4e7ed;
  border-radius: 3px;
  text-align: left;
  margin: 0;
  width: 100%;
  overflow: visible;
  margin-bottom: 20px;
  tr{
    display: flex;
    flex: 1;
    border-color: #e4e7ed;
    border-bottom: 1px solid #f1f3f6;
    td{
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
      flex-basis: auto!important;
      position: relative;
      margin: auto;
    }
  }
  tr:last-child {
  border-bottom: none!important;
  }
}
</style>