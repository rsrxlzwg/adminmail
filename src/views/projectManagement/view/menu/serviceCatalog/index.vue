<template>
  <div>
    <el-row :gutter="13">
      <el-col :span="7">
        <el-card style="marginBottom:10px">
          <el-input
            v-model="filterText"
            size="mini"
            placeholder="输入关键字进行过滤"
          />
        </el-card>
        <el-card style="marginTop:8px">
          <div @mouseleave="enterleave">
            <el-tree
                ref="tree"
                draggable

                highlight-current

                :filter-node-method="filterNode"

                :expand-on-click-node="false"
                :data="data"
                :props="defaultProps"
                :default-expand-all="true"

                :render-content="renderContent">
            </el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="16"
        style="margin-top: 10px"
      >
        <el-card>
          <el-form
            ref="fileData"
            :model="fileData"
            label-width="85px"
            style="width:50%;margin:0 auto"
          >
            <el-form-item label="上级目录">
            <!-- <el-input
                size="small"
                v-model="fileData.parentName"
                placeholder=""
              ></el-input> -->
      <el-select
          ref="selectTree"
          size="mini"
          style="width:100%"
          v-model="fileData.parentName"
          placeholder=""
          @visible-change='showselect'

        >
          <el-option ref="selectoption" value="">
            <el-tree
              ref="tree"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              :render-content="selectRenderContent"
              :data="data"
              :props="defaultProps"
              :default-expand-all="true"
              @node-click="handleNodeClick"

            />
          </el-option>
        </el-select>
            </el-form-item>
            <el-form-item label="目录编码">
              <el-input
                size="small"
                v-model="fileData.catalogCode"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item label="目录名称">
              <el-input
                size="small"
                v-model="fileData.catalogName"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item label="目录描述">
              <el-input
                size="small"
                type="textarea"
                v-model="fileData.catalogDes"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="width:150px;margin:0 auto">
            <el-button @click="clearData"
              size="mini"
            >取 消</el-button>
            <el-button
              type="primary"
              @click="submitHandle"
              size="mini"
            >确 定</el-button>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
//import headercontener from '@/views/projectManagement/components/fieldset'
import {getTree,submitInfo,getObject,editInfo,deleteOne} from '@/api/serviceManagement/offlineManagement/serviceCatalog'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

let checknode = ''
export default {
  data() {
    return {
      filterText: '',
      fileData: {
        catalogCode: '',
        parentName:'',
        parentId: '',
        catalogDes: '',
        catalogName: '',
        id:'',
      },
      // parentData:{
      //   id: '',
      //   catalogDes: '',
      //   catalogName: '',
      // },
      checknode: {},
      filterText: '',
      selectid: '',
      dialogVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'catalogName',
        value:'id',
        des:'catalogDes'
      },
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted(){
    this.getCatalogTree()

  },

  methods: {
    showselect() {
      this.$nextTick(_ => this.$refs[ 'selectoption' ].$el.setAttribute('style', 'padding:0;height:100%'))
    },
    renderContent(h, { node, data, store }) {
        return (

          <el-row style="flex:1;display:flex;align-items:center"  >
            <el-col span={18} >
              <div on-click={()=>this.editClick(data)}>  {node.label}</div>
             </el-col>
            <el-col span={4}>
              <span>
                <el-button size="mini" type="text" icon="el-icon-circle-plus"   on-click={()=>this.addClick(data)}></el-button>
                <el-button size="mini" type="text" icon="el-icon-delete" on-click={()=>this.delClick(data)} ></el-button>
              </span>
            </el-col>
            </el-row>

            );

    },
    selectRenderContent(h, { node, data, store }) {
      return h('span', {
        style: {
          lineHeight: '100%',
          width: '100%'
        },
        on: {
          mouseenter: () => {
            this.checknode = data.label
          },
          // click: () => {
          //      console.log({node, data, store})
          //      this.fileData.parentDirectory=data.label
          //   }
        }
      }, [ h('el-row', {
        style: {
          width: '100%'
        },
        attrs: {
          type: 'flex',

        },
      }, [
        data.children ? h('i', {
          attrs: {
            class: 'el-icon-folder-opened'
          }
        }) : h('i', {
          attrs: {
            class: 'el-icon-tickets'
          }
        }),
        h('el-col', {
          attrs: {
            span: 18
          },
        }, node.label),
      ]) ])
    },
    getCatalogTree(){
            this.fileData.parentName=''
            this.fileData.parentId = ''
            this.fileData.catalogDes=''
            this.fileData.catalogName=''
            this.fileData.catalogCode=''
            this.fileData.id=null
      getTree().then(res => {
        if(res.code===200){
            this.data = res.data
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }

      })

    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ',draggingNode, dropNode.label, dropType,ev);
      },
    editClick(data){
      this.selectid=1
      var parentData={
      id: '',
      catalogDes: '',
      catalogName: '',
      };
      getObject(data.parentId).then(res => {
        if(res.code===200){
         // parentData = res.data
         if(res.data!=null){
          parentData.id=res.data.id
          parentData.catalogDes=res.data.catalogDes
          parentData.catalogName=res.data.catalogName
         }
        }else{
           this.$message({
              type: 'error',
              message: res.message
          });
        }
      this.fileData.parentName = parentData.catalogName
      this.fileData.parentId = parentData.id
      this.fileData.catalogCode = data.catalogCode
      this.fileData.catalogName = data.catalogName
      this.fileData.catalogDes = data.catalogDes
      this.fileData.id=data.id
      })



    },
    addClick(data) {
      this.selectid=2
      this.fileData.catalogDes=''
      this.fileData.catalogName=''
      this.fileData.catalogCode = ''
      this.fileData.id=null
      this.fileData.parentName = data.catalogName
      this.fileData.parentId = data.id


    },

    delClick(data){
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
     deleteOne(data.id).then(res=>{
        if(res.code===200){
           this.$message({
                type: 'success',
                message:'删除成功'
            });

          this.getCatalogTree()
        }
      })
      })

    },
    enterleave() {
      this.checknode = ''
    },
    clearData(){
            this.fileData.parentName=''
            this.fileData.parentId = ''
            this.fileData.catalogDes=''
            this.fileData.catalogName=''
            this.fileData.catalogCode = ''
            this.fileData.id=null
    },
    submitHandle(){
      const params=this.fileData
        console.log('00',params)
      if(this.selectid===2){

        this.submitFun(params)
     }
      if(this.selectid===1){

        this.editFun(params)
    }

    },
    submitFun(params){
      submitInfo(params).then(res=>{
        if(res.code===200){
           this.$message({
                type: 'success',
                message:'添加成功'
            });
            this.getCatalogTree()
        }
      })
    },
    editFun(params){
      editInfo(params).then(res=>{
        if(res.code===200){
           this.$message({
                type: 'success',
                message:'编辑成功'
            });
            this.dialogVisible=false

            this.getCatalogTree()
        }
      })
    },
    handleNodeClick(node) {
      checknode = node
      console.log("ssdsdsdadsasdasdasdasdasdasdasdasdasd",node)
      // this.fileData.catalogDes=''
      // this.fileData.catalogName=''
      // this.fileData.id=''
       this.fileData.parentName = node.catalogName
       this.fileData.parentId = node.id
       this.$refs.selectTree.blur()

    },
    filterNode(value, data) {
      if (!value) return true
      return data.catalogName.indexOf(value) !== -1
    },
    // renderContent(h, { node, data, store }) {
    //   return h('span', {
    //     style: {
    //       lineHeight: '100%',
    //       width: '100%'
    //     },
    //     on: {
    //       mouseenter: () => {
    //         this.checknode = data.label
    //       },
    //     }
    //   }, [ h('el-row', {
    //     style: {
    //       width: '100%'
    //     },
    //     attrs: {
    //       type: 'flex',

    //     },
    //   }, [
    //     data.children ? h('i', {
    //       attrs: {
    //         class: 'el-icon-folder-opened'
    //       }
    //     }) : h('i', {
    //       attrs: {
    //         class: 'el-icon-tickets'
    //       }
    //     }),
    //     h('el-col', {
    //       attrs: {
    //         span: 18
    //       },
    //     }, node.label),
    //   ]) ])
    // }


  },
  components: {

  }
}
</script>

<style scoped lang="scss">
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
