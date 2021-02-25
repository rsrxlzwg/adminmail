<template>
  <!-- 镜像仓库 -->
  <div class="mirror-container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <!-- 镜像列表 -->
      <el-tab-pane
        label="镜像列表"
        name="first"
      >
        <div class="flex-inline-between">
          <el-button
            type="primary"
            size="medium"
            @click="onAdd"
          >创建镜像</el-button>
          <!-- 查询部分 -->
          <el-form
            :inline="true"
            :model="searchData"
            class="demo-form-inline"
          >
            <el-form-item label>
              <el-select
                v-model="searchData.name"
                placeholder="请选择镜像空间"
              >
                <el-option
                  label="全部镜像"
                  value="all"
                />
                <el-option
                  label="dcsregistry"
                  value="dcsregistry"
                />
              </el-select>
              <el-button
                type="info"
                plain
                @click="onSubmit"
              >搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 99%"
          stripe
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="id"
            label="镜像名称"
          />
          <el-table-column
            prop="name"
            label="镜像空间"
            sortable
          />
          <el-table-column
            prop="username"
            label="镜像地址"
          />
          <el-table-column
            prop="type"
            label="最新版本"
          />
          <el-table-column
            prop="created_at"
            label="更新时间"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="addVersion"
              >添加版本</el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handleEdit(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            background
            :current-page="1"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <!-- 仓库管理 -->
      <el-tab-pane
        label="仓库管理"
        name="second"
      >
        <div class="store-manage">
          <el-row :gutter="20">
            <!-- 菜单 -->
            <el-col :span="4">
              <div class="manage-side">
                <ul class="menu-list">
                  <li
                    v-for="(item,index) in menuList"
                    id="item"
                    :key="index"
                    :class="{ active:index==current}"
                    @click="chooseMenu(index)"
                  >{{ item }}
                  </li>
                </ul>
              </div>
            </el-col>
            <!-- 内容 -->
            <el-col
              :span="19"
              :offset="1"
            >
              <!-- 镜像空间 -->
              <div
                v-if="current === 0"
                class="mirror-room"
              >
                <div class="manage-content">
                  <!-- 列表上部分 -->
                  <div class="top">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <el-button
                          type="primary"
                          size="medium"
                        >创建镜像空间</el-button>
                      </el-col>
                      <el-col
                        :span="8"
                        :offset="12"
                      >
                        <!-- 查询部分 -->
                        <el-form
                          :inline="true"
                          :model="searchData"
                          class="demo-form-inline"
                        >
                          <el-form-item label>
                            <el-input placeholder="请输入镜像空间名称">
                              <el-button slot="append">搜索</el-button>
                            </el-input>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 列表展示 -->
                  <el-table
                    :data="tableData"
                    style="width: 99%"
                    size="mini"
                    :header-cell-style="headClass"
                    border
                  >
                    <el-table-column
                      prop="id"
                      label="镜像空间名称"
                      sortable
                    />
                    <el-table-column
                      prop="name"
                      label="访问类型"
                    />
                    <el-table-column
                      prop="username"
                      label="镜像数量"
                    />
                    <el-table-column
                      label="操作"
                      width="160px"
                    >
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="small"
                        >下载Token</el-button>
                        <el-button
                          type="text"
                          size="small"
                          @click.native.prevent="handleEdit(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="block">
                    <el-pagination
                      background
                      :current-page="1"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.length"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    />
                  </div>
                </div>
              </div>
              <!-- 镜像同步 -->
              <div
                v-if="current === 1"
                class="mirror-sync"
              >
                <p>同步规则</p>
                <div class="manage-content">
                  <!-- 列表上部分 -->
                  <div class="top">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <el-button
                          type="primary"
                          size="medium"
                        >创建规则</el-button>
                      </el-col>
                      <el-col
                        :span="8"
                        :offset="12"
                      >
                        <!-- 查询部分 -->
                        <el-form
                          :inline="true"
                          :model="searchData"
                          class="demo-form-inline"
                        >
                          <el-form-item label>
                            <el-input placeholder="请输入规则名称">
                              <el-button slot="append">搜索</el-button>
                            </el-input>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 列表展示 -->
                  <el-table
                    class="sync-table"
                    :data="tableData"
                    style="width: 99%"
                    size="mini"
                    :header-cell-style="headClass"
                    border
                  >
                    <el-table-column
                      prop="id"
                      label="规则名称"
                      sortable
                    />
                    <el-table-column
                      prop="name"
                      label="目标"
                    />
                    <el-table-column
                      prop="username"
                      label="镜像"
                    />
                    <el-table-column
                      prop="type"
                      label="触发模式"
                    >1111</el-table-column>
                    <el-table-column
                      prop="created_at"
                      label="同步状态"
                    />
                    <el-table-column label="操作" />
                  </el-table>
                  <!-- 分页 -->
                  <div class="block">
                    <el-pagination
                      background
                      :current-page="1"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.length"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    />
                  </div>
                </div>
                <p class="clear">同步目标</p>
                <div class="target">
                  <!-- 列表上部分 -->
                  <div class="top">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <el-button
                          type="primary"
                          size="medium"
                        >添加目标</el-button>
                      </el-col>
                      <el-col
                        :span="8"
                        :offset="12"
                      >
                        <!-- 查询部分 -->
                        <el-form
                          :inline="true"
                          :model="searchData"
                          class="demo-form-inline"
                        >
                          <el-form-item label>
                            <el-input placeholder="请输入目标名称">
                              <el-button slot="append">搜索</el-button>
                            </el-input>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 列表展示 -->
                  <el-table
                    class="sync-table"
                    :data="tableData"
                    style="width: 99%"
                    size="mini"
                    :header-cell-style="headClass"
                    border
                  >
                    <el-table-column
                      prop="id"
                      label="目标名称"
                      sortable
                    />
                    <el-table-column
                      prop="name"
                      label="目标地址"
                    />
                    <el-table-column
                      prop="username"
                      label="用户名"
                    />
                    <el-table-column
                      prop="type"
                      label="远程验证证书"
                    >1111</el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="small"
                        >编辑</el-button>
                        <el-button
                          type="text"
                          size="small"
                          @click.native.prevent="handleEdit(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="block">
                    <el-pagination
                      background
                      :current-page="1"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.length"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    />
                  </div>
                </div>
              </div>
              <!-- 存储管理 -->
              <div
                v-if="current === 2"
                class="store-manage"
              >
                <p>镜像存储 <el-button
                  class="float-right"
                  type="primary"
                  size="mini"
                >保存</el-button>
                </p>
                <el-card class="box-card">
                  <el-form
                    ref="form"
                    label-width="140px"
                    label-position="left"
                  >
                    <el-form-item label="类型">
                      <el-select
                        placeholder="请选择类型"
                        style="width:100%"
                      >
                        <el-option
                          label="文件系统"
                          value="1"
                        />
                        <el-option
                          label="S3兼容对象存储"
                          value="2"
                        />
                      </el-select>
                    </el-form-item>
                    <el-divider />
                    <el-form-item label="镜像名称">
                      <span>/var/local/kube-agent/registry</span>
                    </el-form-item>
                  </el-form>
                </el-card>
                <p>垃圾回收</p>
                <el-card class="box-card">
                  <el-row style="height:30px;line-height:30px">
                    <el-col :span="4">

                      <span>垃圾回收</span>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="清理和回收存储空间中未被引用的镜像层级文件"
                        placement="top"
                      >
                        <i class="el-icon-question" />
                      </el-tooltip>
                    </el-col>
                    <el-col
                      :span="19"
                      :offset="1"
                    >
                      <el-button
                        type="primary"
                        size="mini"
                      >立即回收</el-button>
                    </el-col>
                  </el-row>
                </el-card>
                <p>镜像备份</p>
                <el-card class="box-card">
                  <el-row style="height:30px;line-height:30px">
                    <el-col :span="4">
                      <span>解决方案</span>
                    </el-col>
                    <el-col
                      :span="19"
                      :offset="1"
                    >
                      <ul
                        style="overflow:auto"
                        class="pushUlStyle"
                      >
                        <li>
                          您可以通过 rsync 来进行备份，将该命令加入 crontab，可以每天做增量备份</li>
                        <li>rsync -avz &lt;node_ip&gt;:/var/local/kube-agent/registry /data/imgBackup
                          <i
                            slot="suffix"
                            class="el-icon-document-copy"
                          />
                        </li>
                      </ul>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
              <!-- 安全扫描 -->
              <div
                v-if="current === 3"
                class="safe-manage"
              >
                <p>镜像扫描配置</p>
                <el-card class="box-card">
                  <el-row style="height:30px;line-height:30px">
                    <el-col :span="4">
                      <span>使用镜像扫描</span>
                    </el-col>
                    <el-col
                      :span="19"
                      :offset="1"
                    >
                      <el-switch
                        v-model="startStatus"
                        active-text="启用"
                        inactive-text="不启用"
                      />
                    </el-col>
                  </el-row>
                  <div v-if="startStatus === true">
                    <el-divider />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>扫描驱动</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-radio
                          v-model="scanDriver"
                          label="1"
                        >Clair</el-radio>
                      </el-col>
                    </el-row>
                    <el-divider />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>自动扫描</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-switch
                          v-model="autoStart"
                          active-text="启用"
                          inactive-text="不启用"
                        />
                      </el-col>
                    </el-row>
                    <el-divider />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>扫描所有镜像</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-button type="primary">
                          立即扫描</el-button>
                      </el-col>
                    </el-row>
                    <el-divider />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>定时扫描</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-radio
                          v-model="settingRadio"
                          label="1"
                        >无</el-radio>
                        <el-radio
                          v-model="settingRadio"
                          label="2"
                        >自定义</el-radio>
                      </el-col>
                    </el-row>
                    <el-divider />
                    <el-row
                      v-if=" settingRadio ==='2'"
                      style="height:30px;line-height:30px"
                    >
                      <el-col
                        :span="19"
                        :offset="5"
                      >
                        每 <select
                          v-model="settingTime"
                          style="width:10%"
                          @change="selectedTime"
                        >
                          <option
                            v-for="item in timeOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                          />
                        </select> 的
                        <el-time-picker
                          v-model="selectTime"
                          :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }"
                        />
                        <p class="displayTime">下次运行时间 (UTC) : {{ displaySelectTime }}</p>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
              <!-- 镜像通知 -->
              <div
                v-if="current === 4"
                class="mirror-notify"
              >
                <div class="manage-content">
                  <!-- 列表上部分 -->
                  <div class="top notify">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <el-button
                          type="primary"
                          size="medium"
                        >创建镜像空间</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 列表展示 -->
                  <el-table
                    :data="tableData"
                    style="width: 99%"
                    size="mini"
                    :header-cell-style="headClass"
                    border
                  >
                    <el-table-column
                      prop="id"
                      label="名称"
                      sortable
                    />
                    <el-table-column
                      prop="name"
                      label="通知URL"
                    />
                    <el-table-column
                      prop="username"
                      label="HTTP请求头"
                    />
                    <el-table-column
                      prop="type"
                      label="超时阀值（秒）"
                    />
                    <el-table-column
                      prop="create_at"
                      label="重新尝试间隔（秒）"
                    />
                    <el-table-column
                      prop="type"
                      label="最大尝试次数"
                    />
                    <el-table-column
                      prop="create_at"
                      label="事件数"
                    />
                    <el-table-column
                      label="操作"
                      width="160px"
                    >
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="small"
                        >编辑</el-button>
                        <el-button
                          type="text"
                          size="small"
                          @click.native.prevent="handleEdit(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="block">
                    <el-pagination
                      background
                      :current-page="1"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.length"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    />
                  </div>
                </div>
              </div>
              <!-- 缓存服务 -->
              <div
                v-if="current === 5"
                class="cache-serve"
              >
                <div class="manage-content">
                  <!-- 列表上部分 -->
                  <div class="top notify">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <el-button
                          type="primary"
                          size="medium"
                        >添加缓存服务</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- 列表展示 -->
                  <el-table
                    :data="tableData"
                    style="width: 99%"
                    size="mini"
                    :header-cell-style="headClass"
                    border
                  >
                    <el-table-column
                      prop="id"
                      label="名称"
                      sortable
                    />
                    <el-table-column
                      prop="name"
                      label="缓存服务器地址"
                    />
                    <el-table-column
                      prop="username"
                      label="IP规则"
                    />
                    <el-table-column
                      label="操作"
                      width="160px"
                    >
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="small"
                        >编辑</el-button>
                        <el-button
                          type="text"
                          size="small"
                          @click.native.prevent="handleEdit(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="block">
                    <el-pagination
                      background
                      :current-page="1"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.length"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    />
                  </div>
                </div>
              </div>
              <!-- 仓库配置 -->
              <div
                v-if="current === 6"
                class="store-config"
              >
                <p>基本信息 <el-button
                  class="float-right"
                  type="primary"
                  size="mini"
                >保存</el-button>
                </p>
                <el-card class="box-card">
                  <el-row style="height:30px;line-height:30px">
                    <el-col :span="4">
                      <span>仓库地址</span>
                    </el-col>
                    <el-col
                      :span="19"
                      :offset="1"
                    >
                      <ul style="overflow:auto">
                        <li>
                          10.0.5.161</li>
                        <li style="margin-bottom:10px;font-size:12px; background-color: #f4f4f5;border: 1px solid #d3d4d6;padding:4px">目前仅支持连接 3.1.1 或以上版本的镜像仓库的地址
                        </li>
                      </ul>
                    </el-col>
                  </el-row>
                  <el-divider class="clear" />
                  <el-row style="height:30px;line-height:30px">
                    <el-col :span="4">
                      <span>仓库模式</span>
                    </el-col>
                    <el-col
                      :span="19"
                      :offset="1"
                    >
                      <el-radio
                        v-model="modelRadio"
                        label="1"
                      >只读</el-radio>
                      <el-radio
                        v-model="modelRadio"
                        label="2"
                      >读写</el-radio>
                    </el-col>
                  </el-row>
                </el-card>
                <p>构建配置 <el-button
                  class="float-right"
                  type="primary"
                  size="mini"
                >保存</el-button>
                </p>
                <el-card class="box-card">
                  <el-row style="height:30px;line-height:30px">
                    <el-col :span="4">
                      <span>构建配置</span>
                    </el-col>
                    <el-col
                      :span="19"
                      :offset="1"
                    >
                      <ul style="overflow:auto">
                        <li>
                          <el-switch
                            v-model="configStart"
                            active-text="开启"
                            inactive-text="关闭"
                          />
                        </li>
                        <li style="margin-bottom:10px;font-size:12px; background-color: #f4f4f5;border: 1px solid #d3d4d6;padding:4px">
                          默认关闭构建配置，禁止使用构建配置、构建镜像、构建记录、制作镜像和镜像构建配置等功能。
                        </li>
                      </ul>
                    </el-col>
                  </el-row>
                  <div v-if="configStart === true">
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>全局镜像构建任务并发数</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-input v-model="configNum" />
                      </el-col>
                    </el-row>
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>单镜像构建并发</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <ul style="overflow:auto">
                          <li>
                            <el-switch
                              v-model="singleStart"
                              active-text="已启用"
                              inactive-text="已关闭"
                            />
                          </li>
                          <li style="margin-bottom:10px;font-size:12px; background-color: #f4f4f5;border: 1px solid #d3d4d6;padding:4px">
                            单个镜像支持同时构建可以提高构建速度，但会占用更多系统资源。
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>镜像构建超时（秒）</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <ul
                          style="overflow:auto"
                          class="pushUlStyle"
                        >

                          <li>
                            <el-input v-model="mirrorOvertime" />
                          </li>
                          <li style="margin-bottom:10px;font-size:12px; background-color: #f4f4f5;border: 1px solid #d3d4d6;padding:4px">
                            每次构建的超时时间，超时的构建将会被停止，超时时间包括构建前的等待时间。
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>单镜像构建任务 CPU 限制</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <ul
                          style="overflow:auto"
                          class="pushUlStyle"
                        >
                          <li>
                            <el-input v-model="mirrorOvertime">
                              <template slot="append">核</template>
                            </el-input>
                          </li>
                          <li style="margin-bottom:10px;font-size:12px; background-color: #f4f4f5;border: 1px solid #d3d4d6;padding:4px">
                            单个构建可以使用的最大 CPU 核数，可以是小数。
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>单镜像构建任务内存限制</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <ul
                          style="overflow:auto"
                          class="pushUlStyle"
                        >
                          <li>
                            <el-input
                              v-model="singleLimit"
                              class="input-with-select"
                            >
                              <el-select
                                slot="append"
                                v-model="singleLimitSelect"
                                placeholder="请选择"
                                style="width:100px"
                              >
                                <el-option
                                  label="GB"
                                  value="1"
                                />
                                <el-option
                                  label="MB"
                                  value="2"
                                />
                                <el-option
                                  label="KB"
                                  value="3"
                                />
                              </el-select>
                            </el-input>
                          </li>
                          <li style="margin-bottom:10px;font-size:12px; background-color: #f4f4f5;border: 1px solid #d3d4d6;padding:4px">
                            单个构建可以使用的最大内存
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>镜像构建调度策略</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-radio
                          v-model="configPlan"
                          label="1"
                        >调度至控制节点构建</el-radio>
                        <el-radio
                          v-model="configPlan"
                          label="2"
                        >调度至选定节点构建（推荐）</el-radio>
                      </el-col>
                    </el-row>
                    <el-row
                      v-if="configPlan === '2' "
                      style="height:30px;line-height:30px"
                    >
                      <el-col
                        :span="19"
                        :offset="5"
                      >
                        <el-row
                          :gutter="20"
                          style="height:30px;line-height:30px"
                        >
                          <el-col :span="4">
                            <p>主机标签</p>
                          </el-col>
                          <el-col
                            :span="19"
                            :offset="1"
                          >
                            <el-select
                              v-model="hostTag"
                              style="margin:10px 0"
                              placeholder="请选择主机标签"
                            >
                              <el-option
                                label="未指定"
                                value="1"
                              />
                              <el-option
                                label="xxx"
                                value="2"
                              />
                            </el-select>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>满足镜像构建策略的主机</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-table
                          size="mini"
                          border
                          :data="tableData"
                          style="width: 100%"
                        >
                          <el-table-column
                            prop="user"
                            label="名称"
                            width="180"
                          />
                          <el-table-column
                            prop="type"
                            label="ip"
                            width="180"
                          />
                          <el-table-column
                            prop="username"
                            label="角色"
                          />
                        </el-table>
                      </el-col>
                    </el-row>
                    <el-divider class="clear" />
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="4">
                        <span>基础镜像设置</span>
                      </el-col>
                      <el-col
                        :span="19"
                        :offset="1"
                      >
                        <el-input
                          v-model="configText"
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 10}"
                          placeholder="请输入内容"
                        />
                      </el-col>
                    </el-row>
                    <el-row style="height:30px;line-height:30px">
                      <el-col :span="10" class="pull-left">
                        <span style="margin-bottom:10px;font-size:12px;color:#9ba3af;padding:4px">可以通过修改配置项来更新基础镜像列表</span>
                      </el-col>
                      <el-col :span="8" :offset="6" class="pull-right">
                        <el-link type="primary">恢复到默认配置</el-link> <el-link type="primary">离线使用基础镜像</el-link>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getList } from '../../api/base/setUpCredentials'

export default {
  name: 'Mirror',
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
            id:'addon-resizer',
            name:'addon-resizer',
            username:'10.0.5.161/kube-system/add',
            type:'2.1',
            created_at:'2020-09-28 14:55:11',
          }
      ],
      searchData: {
        user: ''
      },
      // 仓库管理  菜单数据
      menuList: [
        '镜像空间',
        '镜像同步',
        '存储管理',
        '安全扫描',
        '镜像通知',
        '缓存服务',
        '仓库配置'
      ],
      current: 0,
      contentPage: '',
      // 安全扫描  启用状态
      startStatus: false,
      // 扫描驱动
      scanDriver: '1',
      // 自动扫描
      autoStart: false,
      // 定时扫描
      settingRadio: '1',
      // 自定义
      settingTime: '天',
      timeOptions: ['天', '周', '月'],
      // 安全扫描   底部初始化时间展示
      selectTime: new Date(),
      // 安全扫描   底部时间展示
      displaySelectTime: '',
      modelRadio: '1',
      // 构建配置
      configStart: false,
      // 全局镜像构建任务并发数
      configNum: 1,
      // 单镜像构建并发
      singleStart: false,
      // 镜像构建超时（秒）
      mirrorOvertime: '10',
      // 单镜像构建任务内存限制
      singleLimit: '20',
      singleLimitSelect: '1',
      // 镜像构建调度策略
      configPlan: '2',
      // 主机标签
      hostTag: '',
      configText: `
platforms:
  Tomcat:
    image: "k8s.io/k8s/tomcat"
    version_filter: "^[0-8]+\\.\\d+\\.\\d+-jre\\d$"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        RUN rm -rf /usr/local/tomcat/webapps/ROOT
        COPY ["{{ filename }}", "/usr/local/tomcat/webapps/ROOT.war"]
    package_suggestion: "请上传支持 <a href=\"https://hub.docker.com/_/tomcat/\" target=\"_blank\">Tomcat</a> 的 WAR 包"
    package_example_url: "/desserts/app-samples/sample.war"
    package_description: "WAR 包是 Java Web 程序标准打包方式，可以用 Maven 等工具构建"
  WebSphere:
    image: "k8s.io/websphere-liberty"
    version_filter: ".*-webProfile.*"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        ADD ["{{ filename }}", "/config/dropins/{{ filename }}"]
    package_suggestion: "请上传支持 <a href=\"https://hub.docker.com/_/websphere-liberty/\" target=\"_blank\">WebSphere</a> 的 WAR 包"
    package_example_url: "/desserts/app-samples/sample.war"
    package_description: "WAR 包是 Java Web 程序标准打包方式，可以用 Maven 等工具构建"
  .Net Core:
    image: "k8s.io/k8s/aspnetcore"
    version_filter: "\\d\\.\\d\\.\\d"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        ADD ["{{ filename }}", "/app"]
        WORKDIR /app
        EXPOSE 80
        ENTRYPOINT ["dotnet", "aspnetapp.dll"]
    package_suggestion: "请上传 <a href=\"https://hub.docker.com/r/microsoft/aspnetcore/\" target=\"_blank\">ASP.net</a> 包"
    package_example_url: "/desserts/app-samples/aspnetapp.tar.gz"
    package_description: "Microsoft ASP.net 包需要包含一个可执行的 aspnetapp.dll 文件"
  PHP:
    image: "k8s.io/php"
    version_filter: "\\d+\\.\\d+\\.\\d+-apache"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        ADD ["{{ filename }}", "/var/www/html/"]
    package_suggestion: "请上传 <a href=\"https://hub.docker.com/_/php/\" target=\"_blank\">PHP</a> 的 tar 包"
    package_example_url: "/desserts/app-samples/php-sample.tar.gz"
    package_description: ""
  Ruby:
    image: "k8s.io/ruby"
    version_filter: "\\d+\\.\\d+\\.\\d+$"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        RUN mkdir -p /usr/src/app
        WORKDIR /usr/src/app
        ADD ["{{ filename }}", "/usr/src/app"]
        RUN bundle install
        EXPOSE 4567
        CMD ["ruby", "app.rb", "-o", "0.0.0.0"]
    package_suggestion: "请上传 <a href=\"https://hub.docker.com/_/ruby/\" target=\"_blank\">Ruby</a> 的 tar 包"
    package_example_url: "/desserts/app-samples/ruby-sample.tar.gz"
    package_description: "tar 包中需包含 Gemfile 文件"
  Python:
    image: "k8s.io/python"
    version_filter: "\\d+\\.\\d+\\.\\d+$"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        RUN mkdir -p /usr/src/app
        WORKDIR /usr/src/app
        ADD ["{{ filename }}", "/usr/src/app/"]
        RUN pip install -r requirements.txt
        EXPOSE 5000
        CMD ["python","app.py"]
    package_suggestion: "请上传 <a href=\"https://hub.docker.com/_/python/\" target=\"_blank\">Python</a> 的 tar 包"
    package_example_url: "/desserts/app-samples/python-sample.tar.gz"
    package_description: "tar 包中需包含 requirements.txt 和 app.py"
  Node.js:
    image: "k8s.io/node"
    version_filter: "\\d+\\.\\d+\\.\\d+$"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        RUN mkdir -p /usr/src/app
        WORKDIR /usr/src/app
        ADD ["{{ filename }}", "/usr/src/app"]
        RUN npm install
        EXPOSE 5000
        CMD ["npm", "start"]
    package_suggestion: "请上传 <a href=\"https://hub.docker.com/_/node/\" target=\"_blank\">Node.js</a> 的 tar 包"
    package_example_url: "/desserts/app-samples/node-sample.tar.gz"
    package_description: "tar 包中需包含 package.json 文件"
  Static Web:
    image: "k8s.io/nginx"
    version_filter: "\\d+\\.\\d+\\.\\d+$"
    dockerfile_template: |
        FROM {{ image_name }}:{{ image_tag }}
        ADD ["{{ filename }}", "/usr/share/nginx/html/"]
    package_suggestion: "请上传支持 <a href=\"https://hub.docker.com/_/nginx/\" target=\"_blank\">Nginx</a> 的静态文件包"
    package_example_url: "/desserts/app-samples/2048-sample.tar.gz"
    package_description: "静态文件包中需含有所有需要的文件"
      `
    }
  },
  mounted() {
    // this.getList()
  },
  beforeMount() {
    // 安全扫描   底部时间初始展示，由于默认选中 天 ，即在当前时间加上一天
    this.selectTime = new Date(
      this.selectTime.setDate(this.selectTime.getDate() + 1)
    )
    this.displaySelectTime = this.dateFormat(this.selectTime)
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 获取列表数据
    getList() {
      getList().then((res) => {
        // console.log(res)
        this.tableData = res.data
      })
    },
    // 创建镜像
    onAdd() {
      this.$router.replace('/mirror/create')
    },
    // 删除操作
    handleEdit(index, row) {
      // console.log(index, row);
      this.$confirm('确认删除吗？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    headClass() {
      return 'text-align: center;background:#eef1f6;'
    },
    rowClass() {
      return 'text-align: center;'
    },
    onSubmit() {
      // 搜索
      // console.log('submit!')
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    // 添加版本
    addVersion() {
      this.$router.replace('/mirror/addVerison')
    },
    // 仓库管理  选择菜单对应的内容页
    chooseMenu(index) {
      this.current = index
      this.contentPage = this.menuList[index]
      // console.log(this.contentPage)
    },
    // 安全扫描   底部时间展示
    selectedTime(e) {
      // console.log(e.target.value)
      var value = e.target.value
      if (value === '天') {
        this.selectTime = new Date()
        this.displaySelectTime = new Date(
          this.selectTime.setDate(this.selectTime.getDate() + 1)
        )
      } else if (value === '周') {
        this.selectTime = new Date()
        this.displaySelectTime = new Date(
          this.selectTime.setDate(this.selectTime.getDate() + 7)
        )
      } else {
        this.selectTime = new Date()
        this.displaySelectTime = new Date(
          this.selectTime.setDate(this.selectTime.getMonth() + 1)
        )
      }
    },
    // 格式化时间
    dateFormat(selectTime) {
      var date = new Date(selectTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var hh = date.getHours()
      hh = hh < 10 ? '0' + hh : hh
      var mm = date.getMinutes()
      mm = mm < 10 ? '0' + mm : mm
      var ss = date.getSeconds()
      ss = ss < 10 ? '0' + ss : ss
      const time = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      return time
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
.mirror-container {
  .mr0 {
    margin-right: 0 !important;
  }
  .block {
    float: right;
    margin: 12px;
  }
  // 仓库管理
  .store-manage {
    .manage-side {
      .menu-list {
        list-style: none;
        li {
          color: #9ba3af;
          border: 1px solid #e4e7ed;
          padding: 5px;
          cursor: pointer;
        }
        li.active,
        li:hover {
          color: #3d444f;
        }
      }
    }
    .clear {
      clear: both;
    }
    .float-right {
      float: right;
    }
    .pushUlStyle {
      li:nth-of-type(odd) {
        color: #909399;
        padding: 4px;
      }
      li:nth-of-type(even) {
        background-color: #f4f4f5;
        padding: 4px;
        border: 1px solid #d3d4d6;
      }
      li i {
        float: right;
      }
    }
    .displayTime {
      color: #909399;
    }
    // 镜像通知
    .notify {
      margin-bottom: 20px;
    }
  }
}
</style>

