<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      label-position="left"
    >

      <el-form-item
        label="类型"
      >
        <el-select
          size="mini"
          style="width:100%"
          v-model="formData.type"
          placeholder=""
        >
          <el-option
            v-for="items in typeList"
            :label="items.label"
            :value="items.value"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item
        label="提供方应用">
        <el-select
          size="mini"
          style="width:100%"
          v-model="formData.provideId"
          @change="optionsChange"
          placeholder=""
        >
          <el-option
            v-for="items in formSelectList.providerList"
            :label="items.appName"
            :value="items.id"
          ></el-option>
        </el-select>
      </el-form-item>
         <el-form-item
        label="服务编码"
      >
        <el-select
          size="mini"
          style="width:100%"
          v-model="formData.serviceId"
          @change="serviceCodeChange"
          placeholder=""
        >
          <el-option
            v-for="items in formSelectList.serviceCode"
            :label="items.serviceName"
            :value="items.id"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item
        label="消费方应用">
         <el-input disabled   v-model="formData.cosuAppName" size="mini"></el-input> 
      </el-form-item>
       <el-form-item
        label="报文模式"
      >
        <el-select
          size="mini"
          style="width:100%"
          v-model="formData.patternId"
          placeholder=""
        >
          <el-option
            v-for="items in formSelectList.patternList"
            :label="items.patternName"
            :value="items.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拆包文件">
        <el-upload
          class="upload-demo"
          ref="unpackUpload"
          :action="url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="formData.unpackList"
          :before-upload="beforeAvatarUpload"
          :http-request="httpRequestUnpack"
          :auto-upload="false"
           :limit="1"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="组包文件">
        <el-upload
          class="upload-demo"
          ref="packUpload"
          :action="url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :http-request="httpRequest"
          :file-list="formData.packList"
          :auto-upload="false"
           :limit="1"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >选取文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import rendertable from '@/views/projectManagement/components/table'
let  fd 
export default {
  props:{
    formData:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    formSelectList:{
      type:Object,
       default:()=>{
         return {
           providerList:[],
           serviceCode:[],
           patternList:[],
         }
       }
    }
  },
  data() {
    return {
      typeList:[{label:'C端',value:'c'},{label:'P端',value:'p'}],
      url:'',
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
      ],
      unpack:''
    }
  },
  components: {
    rendertable
  },
  methods:{
    serviceCodeChange(val){
       this.$emit('serviceCodeChange',val)
    },
    optionsChange(val){
      this.$emit('optionsChange',val)
    },
     handlePreview(file) {
        console.log(file);
      },
      httpRequest(param){
         console.log({param})
         const params= {
              "type":"x",
              "provideId":"1212",
              "serviceId":"1243",
              "patternId":"534"
            }
          // fd = new FormData()
          fd.append('pack', param.file)
          fd.append('esbBaseUnpackPackConfig',JSON.stringify(params) )
          console.log({fd})
        //  submitInfo(fd).then(res=>{
           
        //  })
    
      // axios({
      //   method: "POST",
      //   url: `${process.env.VUE_APP_BASE_API}/esbBaseUnpackPackConfig/insert`,
      //   data: fd,
      //   headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      //   }).then(function(res) {
      //       console.log(res);
      //   });

      },
      httpRequestUnpack(params){
        console.log('params222',params)
       fd=new FormData()
        // unpackFd = new FormData()
        fd.append('unpack', params.file)
      },
      handleRemove(){

      },
    beforeAvatarUpload(file,id){
      console.log({file})
      //  unpackFd = new FormData()
      // unpackFd.append('unpack', file)
    
    }
  }
}
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>
