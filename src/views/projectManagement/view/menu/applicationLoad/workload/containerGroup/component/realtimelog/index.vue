<template>
  <div>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span style="fontSize:14px">实时日志</span>

      </div>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="21">
          <span
            style="fontSize:14px;color:#ccc"
            class="textline"
          >以下为容器app_atarae_aeweeawe_api;app_atarae_aeweeawe_api得实时日志</span>
        </el-col>
        <!-- 注释下载和复制按钮 -->
        <!-- <el-col :span="3">
          <el-row :gutter="2">
            <el-col :span="20">
              <el-button
                size="mini"
                icon="el-icon-download"
              >下载日志</el-button>
            </el-col>
            <el-col :span="4">
              <el-button
                class="el-button__icon"
                icon="el-icon-copy-document"
              ></el-button>
            </el-col>
          </el-row>
        </el-col> -->
      </el-row>
      <el-row>
        <!-- <renderdate
          :tableHeader='tableHeader'
          :tableData='tableData'
        /> -->
      </el-row>
      <realtimelog :entercode='entercode' />
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
import realtimelog from '@/views/projectManagement/components/codemirror'
export default {
  data() {
    return {
      entercode: `
I1028 02:19:25.235648       1 main.go:518] Determining IP address of default interface
I1028 02:19:25.236270       1 main.go:531] Using interface with name ens33 and address 192.168.169.4
I1028 02:19:25.236293       1 main.go:548] Defaulting external address to interface address (192.168.169.4)
W1028 02:19:25.236326       1 client_config.go:517] Neither --kubeconfig nor --master was specified.  Using the inClusterConfig.  This might not work.
I1028 02:19:25.333591       1 kube.go:119] Waiting 10m0s for node controller to sync
I1028 02:19:25.333714       1 kube.go:306] Starting kube subnet manager
I1028 02:19:26.335317       1 kube.go:126] Node controller sync successful
I1028 02:19:26.335345       1 main.go:246] Created subnet manager: Kubernetes Subnet Manager - worker1
I1028 02:19:26.335350       1 main.go:249] Installing signal handlers
I1028 02:19:26.335409       1 main.go:390] Found network config - Backend type: vxlan
I1028 02:19:26.335485       1 vxlan.go:121] VXLAN config: VNI=1 Port=0 GBP=false Learning=false DirectRouting=false
I1028 02:19:26.360057       1 main.go:305] Setting up masking rules
I1028 02:19:26.360954       1 main.go:313] Changing default FORWARD chain policy to ACCEPT
I1028 02:19:26.361042       1 main.go:321] Wrote subnet file to /run/flannel/subnet.env
I1028 02:19:26.361048       1 main.go:325] Running backend.
I1028 02:19:26.361054       1 main.go:343] Waiting for all goroutines to exit
I1028 02:19:26.361090       1 vxlan_network.go:60] watching for new subnet leases
      `
    }
  },
  components: {
    realtimelog
  }
}
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
