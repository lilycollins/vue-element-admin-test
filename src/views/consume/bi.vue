<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      报表管理
    </div>
    <div>
      <div>
        <el-radio-group
          v-model="tabPosition"
          style="margin-bottom: 30px"
          size="large"
          @change="changeTable"
        >
          <el-radio-button label="1">按类型汇总</el-radio-button>
          <el-radio-button label="2">按耗材汇总</el-radio-button>
          <el-radio-button label="3">按部门汇总</el-radio-button>
          <el-radio-button label="4">按供应商汇总</el-radio-button>
        </el-radio-group>
      </div>
      <div style="display: flex; justify-content: space-between">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-date-picker
              v-model="formInline.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="">
            <el-button
              plain
              class="search-btn"
              @click="onSubmit"
            >查询</el-button>
          </el-form-item>
        </el-form>
        <div class="tag-warp">
          <el-button plain>刷新</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="success">打印</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <my-table :tb="tb" @choose="tbSelect" @editRow="editRow" />
    <!-- 分页 -->
    <pagination
      v-show="total >= 0"
      :total="total"
      :page.sync="form.pageIndex"
      :limit.sync="form.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import myTable from '@/components/Table'
import pagination from '@/components/Pagination'
const field = [
  {
    type: 0,
    label: '耗材分类',
    key: 'a2'
  },
  {
    type: 0,
    label: '当前库存',
    key: 'a3',
    showOverflow: true
  },
  {
    type: 0,
    label: '申请数量',
    key: 'a4'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a4'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a4'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a4'
  }, {
    type: 0,
    label: '出库占比',
    key: 'a4'
  }]
const field2 = [
  {
    id: 2,
    type: 0,
    label: '耗材图片',
    key: 'a2'
  },
  {
    id: 3,
    type: 0,
    label: '耗材编号',
    key: 'a3',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '耗材名称',
    key: 'a4'
  }, {
    id: 5,
    type: 0,
    label: '耗材类型',
    key: 'a4'
  }, {
    type: 0,
    label: '单位',
    key: 'a4'
  }, {
    type: 0,
    label: '当前库存',
    key: 'a4'
  }, {
    type: 0,
    label: '申请数量',
    key: 'a4'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a4'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a4'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a4'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '出库占比',
    key: 'a4'
  }]
const field3 = [
  {
    id: 2,
    type: 0,
    label: '部门',
    key: 'a2'
  },
  {
    id: 3,
    type: 0,
    label: '当前库存',
    key: 'a3',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '申请数量',
    key: 'a4'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a4'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a4'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a4'
  }, {
    type: 0,
    label: '出库占比',
    key: 'a4'
  }]
const field4 = [
  {
    id: 2,
    type: 0,
    label: '供应商',
    key: 'a2'
  },
  {
    id: 3,
    type: 0,
    label: '当前库存',
    key: 'a3',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '申请数量',
    key: 'a4'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a4'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a4'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a4'
  }, {
    type: 0,
    label: '出库占比',
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
      tabPosition: '1',
      tb: {
        fields: field,
        data: [],
        index: true,
        selectionBtn: true,
        height: 'calc(100vh - 340px)'
      },
      total: 0,
      selected: [],
      pickerOptions: {
        shortcuts: [{
          text: '昨天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '上周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '上月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '前三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            picker.$emit('pick', [start, end])
          }
        }]
      }

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
      switch (this.tabPosition) {
        case '1':
          this.tb.fields = field
          break
        case '2':
          this.tb.fields = field2
          break
        case '3':
          this.tb.fields = field3
          break
        case '4':
          this.tb.fields = field4
          break
      }
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
          this.$router.push({
            name: 'checkPlan', params: {
              type: 'edit'
            }
          })
        } else {
          this.$router.push({
            name: 'checkProtect', params: {
              type: 'edit'
            }
          })
        }
        // this.$router.push({ name: 'historyChange', params: {
        //   type: this.tabPosition === 'check' ? 'check' : 'protect'
        // }})
      }
    }
  }
}
</script>
