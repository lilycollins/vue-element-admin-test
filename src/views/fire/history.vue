<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />历史记录查询</div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="changeTable">
          <el-radio-button label="check">巡检历史记录</el-radio-button>
          <el-radio-button label="protect">维保历史记录</el-radio-button>
        </el-radio-group>
      </div>
      <div class="tag-warp">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-date-picker
              v-model="formInline.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.user" prefix-icon="el-icon-search" placeholder="搜索执行人" />
          </el-form-item>
          <el-form-item>
            <el-button plain @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 表格 -->
    <my-table :tb="tb" @choose="tbSelect" @editRow="editRow" />
    <!-- 分页 -->
    <pagination v-show="total>=0" :total="total" :page.sync="form.pageIndex" :limit.sync="form.pageSize" @pagination="getList" />
  </div>
</template>
<script>
import myTable from '@/components/Table'
import pagination from '@/components/Pagination'
const field = [
  {
    id: 2,
    type: 0,
    label: '巡检名称',
    key: 'a2'
  },
  {
    id: 3,
    type: 0,
    label: '巡检内容制定',
    key: 'a3',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '设备类型',
    key: 'a4'
  }, {
    id: 5,
    type: 0,
    label: '所属建筑',
    key: 'a4'
  }]
const field2 = [
  {
    id: 2,
    type: 0,
    label: '维保名称',
    key: 'a2'
  },
  {
    id: 3,
    type: 0,
    label: '维保内容制定',
    key: 'a3',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '维保人',
    key: 'a4'
  }, {
    id: 5,
    type: 0,
    label: '维保联系电话',
    key: 'a4'
  }]
export default {
  components: {
    myTable,
    pagination
  },
  data() {
    return {
      form: {
        pageIndex: 1,
        pageSize: 20
      },
      formInline: {
        user: '',
        time: ''
      },
      tabPosition: 'check',
      tb: {
        fields: field,
        data: [],
        index: true,
        selectionBtn: true,
        height: null,
        operationName: '操作',
        operationWidth: '180',
        OperationBtn: [
          {
            type: 'text',
            key: '1',
            name: '编辑'
          }
        ]
      },
      total: 0,
      selected: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.tb.height = document.body.clientHeight - 240
  },
  methods: {
    changeTable() {
      this.tb.fields = this.tabPosition === 'check' ? field : field2
    },
    getList() {
    //   request({ url: 'root_authorization', method: 'get', params: { ...this.form }}).then((data) => {
      this.tb.data = [{
        'a1': '主任',
        'a2': '办公室主任',
        'a3': '启用',
        'a4': '2021-01-02  12:12'
      }, {
        'a1': '职员',
        'a2': '办公室主任',
        'a3': '禁用',
        'a4': '2021-01-02  12:12'
      }]
      this.total = 2
    //     this.tb.data.forEach((e) => {
    //       e.auth_method_str = auth_method[e.auth_method]
    //     })
    //   })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val
      this.getList()
    },
    onSubmit() {
      this.form.pageIndex = 1
      this.getList()
    },
    tbSelect(select) {
      this.selected = []
      select.forEach(ele => {
        this.selected.push(ele.id)
      })
    },
    editRow({ row }, btn, index) {
      if (btn.key === '1') {
        if (this.tabPosition === 'check') {
          this.$router.push({ name: 'checkPlan', params: {
            type: 'edit'
          }})
        } else {
          this.$router.push({ name: 'checkProtect', params: {
            type: 'edit'
          }})
        }
        // this.$router.push({ name: 'historyChange', params: {
        //   type: this.tabPosition === 'check' ? 'check' : 'protect'
        // }})
      }
    }
  }
}
</script>
