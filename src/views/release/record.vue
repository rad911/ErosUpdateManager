<!--
灰度发布首页
@authors Root (root@mylonly.com)
@date    2018-05-10 21:38:02
@version 1.0.0
-->
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('release.appName')" v-model="listQuery.appName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('release.memo')" v-model="listQuery.memo__contains"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('release.jsVersion')" v-model="listQuery.jsVersion"></el-input>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.ordering">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%" @cell-dblclick="memoUpdate">
      <el-table-column align="center" :label="$t('release.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" :label="$t('release.jsVersion')" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.jsVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('release.appName')" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.appName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('release.appPlatform')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.appPlatform}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('release.appVersion')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.appVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('release.deviceToken')" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.deviceToken}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('release.deviceName')">
        <template slot-scope="scope">
          <span>{{scope.row.deviceName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('release.osVersion')">
        <template slot-scope="scope">
          <span>{{scope.row.osVersion}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('release.date')">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('release.memo')" >
        <template slot-scope="scope">
          <span>{{scope.row.memo}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { recordList, updateRecordMemo, jsVersions } from '@/api/release'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 0,
        limit: 20,
        appName: undefined,
        memo__contains: undefined,
        jsVersion: undefined,
        ordering: '-id'
      },
      jsVersions: [],
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: 'id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        jsVersion: undefined,
        android: undefined,
        ios: undefined,
        timestamp: undefined,
        appName: '',
        published: false,
        jsPath: undefined,
        isForceUpdate: false,
        changelog: '',
        memo: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      recordList(this.listQuery).then(response => {
        this.list = response.data.results
        this.total = response.data.count
        this.listLoading = false
      })
    },
    getJSVersions() {
      jsVersions().then(resData => {
        console.log('resData:', resData)
        this.jsVersions = resData.data
      })
    },
    handleFilter() {
      this.listQuery.offset = 0
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = (val - 1) * this.listQuery.limit
      this.getList()
    },
    memoUpdate(row, column, cell, event) {
      console.log('memo update:', row, column, cell, event)
      if (column.label === '备注信息') {
        this.$prompt('请备注信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: row.memo
        }).then(({ value }) => {
          row.memo = value
          updateRecordMemo(row).then(resData => {
            this.$message({
              type: 'success',
              message: '修改备注成功 '
            })
            this.handleFilter()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '修改备注失败'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    }
  }
}
</script>

