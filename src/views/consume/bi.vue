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
      <div class="head-select-btn mw1000">
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
    <my-table class="mw1000" :tb="tb" @choose="tbSelect" @editRow="editRow" />
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
    key: 'a1'
  },
  {
    type: 0,
    label: '当前库存',
    key: 'a2',
    showOverflow: true
  },
  {
    type: 0,
    label: '申请数量',
    key: 'a3'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a4'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a5'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a6'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a7'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a8'
  }, {
    type: 0,
    label: '出库占比',
    key: 'a9'
  }]
const field2 = [
  {
    id: 2,
    type: 7,
    label: '耗材图片',
    key: 'img'
  },
  {
    id: 3,
    type: 0,
    label: '耗材编号',
    key: 'a10',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '耗材名称',
    key: 'a11'
  }, {
    id: 5,
    type: 0,
    label: '耗材类型',
    key: 'a12'
  }, {
    type: 0,
    label: '单位',
    key: 'a13'
  }, {
    type: 0,
    label: '当前库存',
    key: 'a14'
  }, {
    type: 0,
    label: '申请数量',
    key: 'a15'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a16'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a17'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a18'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a19'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a20'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a21'
  }, {
    type: 0,
    label: '出库占比',
    key: 'a22'
  }]
const field3 = [
  {
    id: 2,
    type: 0,
    label: '部门',
    key: 'a23'
  },
  {
    id: 3,
    type: 0,
    label: '当前库存',
    key: 'a24',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '申请数量',
    key: 'a25'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a26'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a27'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a28'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a29'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a30'
  }, {
    type: 0,
    label: '出库占比',
    key: 'a31'
  }]
const field4 = [
  {
    id: 2,
    type: 0,
    label: '供应商',
    key: 'a32'
  },
  {
    id: 3,
    type: 0,
    label: '当前库存',
    key: 'a33',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '申请数量',
    key: 'a34'
  }, {
    type: 0,
    label: '入库数量',
    key: 'a35'
  }, {
    type: 0,
    label: '出库数量',
    key: 'a36'
  }, {
    type: 0,
    label: '库存占比',
    key: 'a37'
  }, {
    type: 0,
    label: '申请占比',
    key: 'a38'
  }, {
    type: 0,
    label: '入库占比',
    key: 'a39'
  }, {
    type: 0,
    label: '出库占比',
    key: 'a40'
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
        a1: '办公用品',
        a2: '100',
        a3: '150',
        a4: '150',
        a5: '500',
        a6: '10%',
        a7: '10%',
        a8: '10%',
        a9: '10%',

        img: require('../../assets/img/default.svg'),
        a10: '1234567890123',
        a11: '得力A4 70g打印纸',
        a12: '办公用品',
        a13: '包',
        a14: '100',
        a15: '150',
        a16: '150',
        a17: '500',
        a18: '10%',
        a19: '10%',
        a20: '10%',
        a21: '10%',
        a22: '10%',

        a23: '事业1部',
        a24: '100',
        a25: '150',
        a26: '150',
        a27: '500',
        a28: '10%',
        a29: '10%',
        a30: '10%',
        a31: '10%',

        a32: '米宝供应商',
        a33: '100',
        a34: '150',
        a35: '150',
        a36: '150',
        a37: '10%',
        a38: '10%',
        a39: '10%',
        a40: '10%'
      }, {
        a1: '办公用品',
        a2: '100',
        a3: '150',
        a4: '150',
        a5: '500',
        a6: '10%',
        a7: '10%',
        a8: '10%',
        a9: '10%',

        img: require('../../assets/img/default.svg'),
        a10: '1234567890123',
        a11: '得力A4 70g打印纸',
        a12: '办公用品',
        a13: '包',
        a14: '100',
        a15: '150',
        a16: '150',
        a17: '500',
        a18: '10%',
        a19: '10%',
        a20: '10%',
        a21: '10%',
        a22: '10%',

        a23: '行政部',
        a24: '100',
        a25: '150',
        a26: '150',
        a27: '500',
        a28: '10%',
        a29: '10%',
        a30: '10%',
        a31: '10%',

        a32: '米宝供应商',
        a33: '100',
        a34: '150',
        a35: '150',
        a36: '150',
        a37: '10%',
        a38: '10%',
        a39: '10%',
        a40: '10%'
      }, {
        a1: '办公用品',
        a2: '100',
        a3: '150',
        a4: '150',
        a5: '500',
        a6: '10%',
        a7: '10%',
        a8: '10%',
        a9: '10%',

        img: require('../../assets/img/default.svg'),
        a10: '1234567890123',
        a11: '得力A4 70g打印纸',
        a12: '办公用品',
        a13: '包',
        a14: '100',
        a15: '150',
        a16: '150',
        a17: '500',
        a18: '10%',
        a19: '10%',
        a20: '10%',
        a21: '10%',
        a22: '10%',

        a23: '综合部',
        a24: '100',
        a25: '150',
        a26: '150',
        a27: '500',
        a28: '10%',
        a29: '10%',
        a30: '10%',
        a31: '10%',

        a32: '米宝供应商',
        a33: '100',
        a34: '150',
        a35: '150',
        a36: '150',
        a37: '10%',
        a38: '10%',
        a39: '10%',
        a40: '10%'
      }]
      this.total = 3
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
