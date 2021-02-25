<template>
  <div>
    <el-row
      v-for="item in bandwidthlist"
      type="flex"
      align="middle"
      style="lineHeight:60px;borderBottom:1px solid #E4E7ED;padding:10px 0"
    >
      <el-col :span="6">
        <span style="fontSize:14px">{{item.name}}</span>
        <i class="el-icon-warning-outline"></i>
      </el-col>
      <el-col :span="18">
        <span v-if="item.name === 'CPU资源'">
          <el-row>
            <el-col :span="24">
              <el-row style="lineHeight:30px">
                <el-col :span="24">
                  <el-radio
                    v-model="radio"
                    label="1"
                  >限制</el-radio>
                  <el-radio
                    v-model="radio"
                    label="2"
                  >不限制</el-radio>
                </el-col>
                <el-col
                  :span="24"
                  v-if="radio == 2"
                ><span>部署的业务容器组入口速率不受约束</span></el-col>
                <el-col
                  v-else
                  :span="24"
                >
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <span>CPU请求值</span>
                      <el-input size="small">
                        <template slot="append">核</template>
                      </el-input>
                    </el-col>
                    <el-col :span="10">
                      <span>CPU限制值</span>
                      <el-input size="small">
                        <template slot="append">核</template>
                      </el-input>
                    </el-col>
                    <el-col>
                      <span>最大限制请求比为4</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </span>
        <span v-else>
          <el-row>
            <el-col :span="24">
              <el-row style="lineHeight:30px">
                <el-col :span="24">
                  <el-radio
                    v-model="radio1"
                    label="1"
                  >限制</el-radio>
                  <el-radio
                    v-model="radio1"
                    label="2"
                  >不限制</el-radio>
                </el-col>
                <el-col
                  :span="24"
                  v-if="radio1 == 2"
                ><span>部署的业务容器组入口速率不受约束</span></el-col>
                <el-col
                  v-else
                  :span="24"
                >
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <span>内存请求值</span>
                      <el-input size="small">
                        <el-select
                          v-model="select1"
                          slot="append"
                          placeholder="请选择"
                          style="width:70px"
                        >
                          <el-option
                            label="MB"
                            value="1"
                          ></el-option>
                          <el-option
                            label="GB"
                            value="2"
                          ></el-option>
                        </el-select>
                      </el-input>
                    </el-col>
                    <el-col :span="10">
                      <span>内存限制值</span>
                      <el-input size="small">
                        <el-select
                          v-model="select2"
                          slot="append"
                          placeholder="请选择"
                          style="width:70px"
                        >
                          <el-option
                            label="MB"
                            value="1"
                          ></el-option>
                          <el-option
                            label="GB"
                            value="2"
                          ></el-option>
                        </el-select>
                      </el-input>
                    </el-col>
                    <el-col>
                      <span>最大限制请求比为1</span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </span>
      </el-col>
    </el-row>
    <!-- <el-row
      type="flex"
      align="middle"
      v-for="item in maplist"
      style="lineHeight:60px"
      class="rowstyle"
    >
      <el-col :span="6">
        <span style="fontSize:14px">
          <span>{{item.name}}</span>
          <i :class="item.icon"></i>
        </span>
      </el-col>
      <el-col :span="18">
        <e-row v-if="item.name === 'CPU资源'">
          <el-col :span="24">
            <el-radio
              v-model="radio"
              label="1"
            >限制</el-radio>
            <el-radio
              v-model="radio"
              label="2"
            >不限制</el-radio>
          </el-col>
          <el-col :span="24">
            <el-card
              style="backgroundColor:#F5F7FA;padding:0 10px"
              shadow='never'
            >
              <el-row
                type="flex"
                justify="space-around"
                style="lineHeight:20px"
              >
                <el-col :span="10">
                  <span> 当前容器组</span>
                  <el-input size="mini"></el-input>
                </el-col>
                <el-col :span="10">
                  <div>
                    目标容器组
                  </div>
                  <el-input size="mini"></el-input>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="24">
            <span>最大限制/请求比 4 倍</span>
          </el-col>
        </e-row>
        <e-row v-else>
          <el-col :span="24">
            <el-radio
              v-model="radio"
              label="1"
            >限制</el-radio>
            <el-radio
              v-model="radio"
              label="2"
            >不限制</el-radio>
          </el-col>
          <el-col :span="24">
            <el-card
              style="backgroundColor:#F5F7FA;padding:0 10px"
              shadow='never'
            >
              <el-row
                type="flex"
                justify="space-around"
                style="lineHeight:20px"
              >
                <el-col :span="10">
                  <span> 当前容器组</span>
                  <el-input size="mini"></el-input>
                </el-col>
                <el-col :span="10">
                  <div>
                    目标容器组
                  </div>
                  <el-input size="mini"></el-input>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="24">
            <span>最大限制/请求比 4 倍</span>
          </el-col>
        </e-row>
      </el-col>
    </el-row> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      radio: "1",
      select1: "1",
      select2: "1",
      radio1: "1",
      maplist: [
        {
          name: "CPU资源",
          icon: "el-icon-warning-outline",
        },
        {
          name: "内存资源",
          icon: "el-icon-warning-outline",
        },
      ],
      bandwidthlist: [
        {
          name: "CPU资源",
          icon: "el-icon-warning-outline",
        },
        {
          name: "内存资源",
          icon: "el-icon-warning-outline",
        },
      ],
    };
  },
  components: {},
};
</script>

<style scoped lang="scss">
.rowstyle {
  border-bottom: 1px solid #ccc;
}
</style>
