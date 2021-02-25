<template>
  <div class="main">
    <ul class="dowlond">
      <li @click="dowlond">
        <i class="el-icon-download"></i>
      </li>
      <li @click="showcode">
        <i class="el-icon-c-scale-to-original"></i>
      </li>
    </ul>
    <el-card>
      <codemirror
        v-model="entercode"
        :options="cmOption"
      />
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { saveAs } from 'file-saver';
import { codemirror } from 'vue-codemirror'


// import base style
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'

export default {
  props: {
    entercode: {
      type: String,
      default: `
      apiVersion: v1
items:
- apiVersion: storage.k8s.io/v1
  kind: StorageClass
  metadata:
    creationTimestamp: "2020-10-12T06:37:22Z"
    managedFields:
    - apiVersion: storage.k8s.io/v1
      fieldsType: FieldsV1
      fieldsV1:
        f:provisioner: {}
        f:reclaimPolicy: {}
        f:volumeBindingMode: {}
      manager: kubectl
      operation: Update
      time: "2020-10-12T06:37:22Z"
    name: local-nfs-storage
    resourceVersion: "554"
    selfLink: /apis/storage.k8s.io/v1/storageclasses/local-nfs-storage
    uid: 2f0da038-69d4-42b5-beb7-ded440c5da49
  provisioner: nfs.io/local
  reclaimPolicy: Delete
  volumeBindingMode: Immediate
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""
        `
    }
  },
  data() {
    return {
      code: `
        kind: Service
        apiVersion: v1
        metadata:
        name: app-2048
        namespace: default
        selfLink: /api/v1/namespaces/default/services/app-2048
        uid: 37def6a0-3208-4b1c-ac09-c9621039b628
        resourceVersion: '5668722'
        creationTimestamp: '2020-09-28T07:23:28Z'
        labels:
        app.kubernetes.io/managed-by: Helm
        kube-agent.k8s.io/app: app-2048
        annotations:
        io.k8s.kube-agent.serviceSelectorType: labels
        spec:
        ports:
        - name: app-2048-80
        protocol: TCP
        port: 80
        `,
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: 'text/javascript',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "blackboard",
        extraKeys: { "Ctrl": "autocomplete" },
        hintOptions: {
          completeSingle: false
        }
      }
    }
  },
  methods: {
    dowlond() {
      saveAs(new Blob([ this.entercode ], { type: "text/plain;charset=utf-8" }), 'Advancedconfiguration.txt')
    },
    showcode() {
      this.$confirm(this.entercode, 'YAML输出')
    }
  },
  watch: {
    entercode(value) {
      this.code = value
    }
  },
  components: {
    codemirror
  }
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  top: 0;
  left: 0;
}
.dowlond {
  position: absolute;
  top: -10px;
  right: 100px;
  box-shadow: 5px 5px 5px #ccc;
  li {
    cursor: pointer;
    display: inline;
    padding: 5px 6px;
    background-color: #f1f1f1;
    border: 1px solid #f1f1f1;
    border-radius: 2px;
  }
  li:nth-child(1) {
    border-right: 1px solid #ccc;
  }
}
</style>
