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
        v-model="code"
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

export default {
  props: {
    entercode: {
      type: String,
      default: `
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
        theme: "monokai",
        extraKeys: { "Ctrl": "autocomplete" },
        hintOptions: {
          completeSingle: false
        }
      }
    }
  },
  methods: {
    dowlond() {
      saveAs(new Blob([ this.code ], { type: "text/plain;charset=utf-8" }), 'Advancedconfiguration.txt')
    },
    showcode() {
      this.$confirm(this.code, 'YAML输出')
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
  top: -14px;
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
