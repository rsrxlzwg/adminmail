<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="版本名称">
        <el-input
          v-model="formData.name2"
          size="mini"
        />
      </el-form-item>
      <el-form-item label="文件" enctype="multipart/form-data">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :file-list="formData.fileList"
                :show-file-list="true"
                :http-request="httpRequestUnpack"
                :auto-upload="false"
                :limit="1"
              >
                <el-button
                  slot="trigger"
                  size="mini"
                  type="primary"
                >选取文件</el-button>
              </el-upload>
      </el-form-item>
        <el-form-item label="版本号">
        <el-input
          v-model="form.name2"
          size="mini"
        />
      </el-form-item>
      <!-- <el-form-item
        v-for="item in [{name:'所属应用名称',model:'region',option:['C端']}]"
        :label="item.name"
      >
        <el-select
          size="mini"
          style="width:100%"
          v-model="form[item.model]"
          placeholder=""
        >
          <el-option
            v-for="items in item.option"
            :label="items"
            :value="items"
          ></el-option>
        </el-select>
      </el-form-item> -->
    
      <el-form-item label="版本描述">
        <el-input
          type='textarea'
          v-model="formData.name3"
          size="mini"
        />
      </el-form-item>
      <!-- <el-form-item label="组包文件">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >选取文件</el-button>
        </el-upload>
      </el-form-item> -->
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import {getInfo,uploadInfo,downloadInfo,deleteOne} from '@/api/serviceManagement/appManage/terminalVersion'

export default {
   props:{
    formData:{
      type:Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      fileList: [],
      fileList1: [],
      activeName: 'first',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableHeader: [
        // {
        //   prop: 'secection',
        //   label: '选择',
        //   render: (h, { row }) => {
        //     return h('el-checkbox')
        //   }
        // },
        {
          prop: 'key',
          label: 'key',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'key' ]
              },
              on: {
                input: (e) => {
                  row[ 'key' ] = e
                }
              }
            })
          }
        },
        {
          prop: 'value',
          label: 'value',
          render: (h, { row }) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'value' ]
              },
              on: {
                input: (e) => {
                  row[ 'value' ] = e
                }
              }
            })
          }
        }
      ],
      tableData: [
        {
          key: '',
          value: ''
        }
      ],
      tableHeader1: [
        {
          prop: 'servicename',
          label: '服务名称'
        },
        {
          prop: 'Enforce',
          label: '强制执行'
        }
      ],
      tableData1: [
        {
          servicename: 'serversditifineserver',
          Enforce: 'false'
        }
      ]
    }
  },
  components: {
    rendertable
  },
  methods:{
    httpRequestUnpack(param){

         console.log({param})
         const params= {
            "versionName": "22",
            "versionNum": "2",
            "versionDesc": "0"
            }
          let fd = new FormData()
          fd.append('file', param.file)
          // fd.append('versionName','aaa' )
          // fd.append('versionNum','22' )
          // fd.append('versionDesc','aaa' )
          const esbGovTerminalVersion=JSON.stringify(params)
          fd.append('esbGovTerminalVersion',new Blob([esbGovTerminalVersion],{type: "application/json"}) )
          console.log({fd})
           uploadInfo(fd).then(res=>{
            if(res.code===200){
              this.$message({
                    type: 'success',
                    message:'添加成功'
                });
                // this.dialogVisible=false
                // this.getList()
            }
          })
    }
  }
}
</script>

<style scoped lang="scss">
// .upload-demo{
//   display: flex;
// }
// // /deep/ .el-upload{
// //     float: right;
  
// // }
// /deep/.el-upload-list{
//   width: 70%;
//     margin-bottom: -10px;
// }
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>
