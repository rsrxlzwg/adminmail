<template>
  <!-- 应用商城 -->
  <div class="application-store">
    <el-button type="primary" size="medium">同步商店</el-button>
    <!-- 查询部分 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="所有分类">
        <el-select v-model="formInline.region" placeholder="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="mr0">
        <el-input v-model="formInline.user" placeholder="请输入仓库名称" />
      </el-form-item>
      <el-form-item>
        <el-button inline="true" type="info" plain @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="m-t-40 flex-wrap">
      <el-card style="width:30%" class="product-item m-b-30" v-for="item in productData">
        <el-row>
          <el-col :span="12">
            <img :src="item.img" alt="" :style="{width:item.width +'px'}" >
          </el-col>
           <el-col :span="12"  style="text-align:right">
              <div class="font-20 txt-blue bold">{{item.productName}}</div>
              <div class="txt-grey m-t-10">{{item.versionNum}}</div>
          </el-col>
        </el-row>
        <el-row class="m-t-30">
          <el-col :span="24" class="font-14 product-desc">
            {{item.disc}}
          </el-col>
        </el-row>
      </el-card>
    </div>

    
  </div>
</template>

<script>
export default {
  name: "Culster",

  data() {
    return {
      formInline: {
        user: "",
        region:''
      },
      productData: [
        {
          img:require('../../assets/RabbitMQ.png'),
          productName:'rabbitmq',
          versionNum:'0.1.2 [3.8.1]',
          disc:'RabbitMQ is the most widely deployed open source message broker. It supports multiple messaging protocols.',
          width:'100'
        },
        {
          img:require('../../assets/tomcat.png'),
          productName:'tomcat',
          versionNum:'0.4.0 [7.0]',
          disc:'Deploy a basic tomcat application server with sidecar as web archive container',
          width:'50'
        },
       {
          img:require('../../assets/Redis.svg'),
          productName:'redis',
          versionNum:'0.1.2 [5.0.5]',
          disc:'Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.',
          width:'100'
        },
        {
          img:require('../../assets/PostgreSQL.svg'),
          productName:'postgresql',
          versionNum:'0.1.1 [12.0]',     
          disc:'PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.',
          width:'50'
        },
        {
          img:require('../../assets/harbor.png'),
          productName:'harbor',
          versionNum:'1.2.1 [1.9.1]',
          disc:'An open source trusted cloud native registry that stores, signs, and scans content',
          width:'100'
        },
        {
          img:require('../../assets/MongoDB.png'),
          productName:'mongodb',
          versionNum:'0.1.2 [4.2.1]',
          disc:'MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.',
          width:'100'
        },
        {
          img:require('../../assets/Memcached.png'),
          productName:'memcached',
          versionNum:'3.1.0 [1.5.19]',
          disc:'Free & open source, high-performance, distributed memory object caching system.',
          width:'50'
        },
        {
          img:require('../../assets/mysql.png'),
          productName:'mysql',
          versionNum:'1.4.0 [5.7.27]',
          disc:'Fast, reliable, scalable, and easy to use open-source relational database system.',
          width:'70'
        },
        {
          img:require('../../assets/Nginx.png'),
          productName:'nginx',
          versionNum:'1.2.0 [1.17.5]',
          disc:'nginx is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by Igor Sysoev.',
          width:'70'
        },
       
      ]
    };
  },
  methods: {
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    rowClass() {
      return "text-align: center;";
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return "";
    },
    format2(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ``;
    },
    // 编辑表格跳转
    editRow() {
      //   this.$router.replace("/infrastructure/modify");
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.application-store {
  .product-item{
    height: 200px;
    // padding-bottom: 20px;
  }
  .product-desc{
    max-height: 80px;
    overflow-y: scroll;
    line-height: 1.5;
  }
  .mr0 {
    margin-right: 0 !important;
  }
  form.el-form {
    float: right;
  }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>

