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
    key: 'a1'
  },
  {
    id: 3,
    type: 0,
    label: '巡检内容制定',
    key: 'a2',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '设备类型',
    key: 'a3'
  }, {
    id: 5,
    type: 0,
    label: '巡检任务编号',
    key: 'a4'
  }, {
    type: 0,
    label: '所属建筑',
    key: 'a5'
  }, {
    type: 0,
    label: '巡检人',
    key: 'a6'
  }, {
    type: 0,
    label: '巡检人联系电话',
    key: 'a7'
  }, {
    type: 0,
    label: '巡检开始时间',
    key: 'a8'
  }, {
    type: 0,
    label: '巡检结束时间',
    key: 'a9'
  }]
const field2 = [
  {
    id: 2,
    type: 0,
    label: '维保名称',
    key: 'a10'
  },
  {
    id: 3,
    type: 0,
    label: '维保内容制定',
    key: 'a11',
    showOverflow: true
  },
  {
    type: 0,
    label: '维保人',
    key: 'a12'
  }, {
    type: 0,
    label: '维保联系电话',
    key: 'a13'
  }, {
    type: 0,
    label: '维保时间',
    key: 'a14'
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
            name: '详情'
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
        a1: '日常巡检',
        a2: '消防广播检查、消防水箱检查、消防配...',
        a3: '消防应急、消防警示设备、消防...',
        a4: '100001',
        a5: '大楼整体、外围',
        a6: '张旭',
        a7: '1234567890',
        a8: '2021-10-28 10:00',
        a9: '2021-10-28 10:00',
        a10: '火灾报警设备、消防应急设备',
        a11: '火灾报警设备：消防传感器、前端报警控制器；消防应急设备：室外消防栓、灭火器、防火卷帘、排烟风道阀',
        a12: '张旭',
        a13: '1234567890',
        a14: '2021-10-28 10:00'
      }, {
        a1: '日常巡检',
        a2: '消防广播检查、消防水箱检查、消防配...',
        a3: '消防应急、消防警示设备、消防...',
        a4: '100002',
        a5: '大楼整体、外围、控制室',
        a6: '李魁',
        a7: '1234567890',
        a8: '2021-10-28 10:00',
        a9: '2021-10-28 10:00',
        a10: '消防灭火设备、消防控制设备',
        a11: '消防灭火设备：喷淋头、楼层水阀控制器；消防控制设备：消防报警主机、消防管理主机、消防电源',
        a12: '李魁',
        a13: '1234567890',
        a14: '2021-10-28 10:00'
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
      const routerName = this.tabPosition === 'check' ? 'checkPlan' : 'checkProtect'
          this.$router.push({ name: routerName, params: {
            type: 'detail'
          }})
    }
  }
}
</script>
