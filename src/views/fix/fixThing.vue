<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      维修事件
    </div>
    <div class="head-select-btn mw1100">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="全部部门">
            <el-option key="1" label="行政部" value="1" />
            <el-option key="2" label="安保部" value="2" />
            <el-option key="3" label="管理部" value="3" />
          </el-select>
        </el-form-item>
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
          <el-input
            v-model="formInline.user"
            prefix-icon="el-icon-search"
            placeholder="搜索报修单号"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <my-table class="mw1100" :tb="tb" @choose="tbSelect" @editRow="editRow" />
    <!-- 分页 -->
    <pagination
      v-show="total >= 0"
      :total="total"
      :page.sync="form.pageIndex"
      :limit.sync="form.pageSize"
      @pagination="getList"
    />
    <el-dialog
      title="报修详情"
      :visible.sync="centerDialogVisible"
      width="800px"
      center
    >
      <div class="like-table-item">
        <div v-for="item in tabItem" :key="item.name" class="table-item">
          <div class="table-item-lable">{{ item.name }}</div> <span class="table-item-value">{{ item.value }}</span>
        </div>
      </div>
      <el-form
        ref="ruleForm"
        :model="dialogForm"
        label-width="110px"
        class="form-item"
      >
        <el-form-item
          label="报修情况描述"
          prop="fixNo"
          style="padding-top: 24px"
        >
          <el-input
            v-model="dialogForm.fixNo"
            style="width: 80%"
            type="textarea"
            readonly
            :autosize="{ minRows: 10, maxRows: 14 }"
          />
        </el-form-item>
        <el-form-item label="附件上传" prop="img">
          <img
            src="../../assets/img/default.svg"
            style="width: 200px; padding: 12px"
            alt=""
          >
          <img
            src="../../assets/img/default.svg"
            style="width: 200px; padding: 12px"
            alt=""
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >维修接单</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import myTable from '@/components/Table'
import pagination from '@/components/Pagination'
const field = [
  {
    type: 0,
    label: '报修单号',
    key: 'a1'
  },
  {
    type: 0,
    label: '报修部门',
    key: 'a2',
    showOverflow: true
  },
  {
    type: 0,
    label: '报修人',
    key: 'a3'
  },
  {
    type: 0,
    label: '报修主题',
    key: 'a4'
  },
  {
    type: 0,
    label: '报修类型',
    key: 'a5'
  },
  {
    type: 0,
    label: '报修设备名称',
    key: 'a6'
  },
  {
    type: 0,
    label: '状态',
    key: 'a7'
  },
  {
    type: 0,
    label: '报修时间',
    key: 'a8'
  }
]
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
      selected: [],
      centerDialogVisible: false,
      dialogForm: {
        fixNo: ''
      },
      tabItem: [{
        name: '维修单号',
        value: '123456789'
      }, {
        name: '申请部门',
        value: '行政部'
      }, {
        name: '申请人',
        value: '米小宝'
      }, {
        name: '报修主题',
        value: '质量报修'
      }, {
        name: '报修类型',
        value: '设备报修'
      }, {
        name: '报修设备名称',
        value: 'MI001'
      }, {
        name: '报修时间',
        value: '2022-01-01 10:00'
      }],
      listObj: {},
      fileList: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.tb.height = document.body.clientHeight - 240
  },
  methods: {
    getList() {
      this.tb.data = [
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '设备报修',
          a6: 'MI001',
          a7: '待接单',
          a8: '2022-01-01 10:00'
        },
        {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '设备报修',
          a6: 'MI002',
          a7: '待接单',
          a8: '2022-01-01 10:00'
        }, {
          a1: '123456789',
          a2: '行政部',
          a3: '米小宝',
          a4: '质量报修',
          a5: '设备报修',
          a6: 'MI003',
          a7: '待接单',
          a8: '2022-01-01 10:00'
        }
      ]
      this.total = 3
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
      select.forEach((ele) => {
        this.selected.push(ele.id)
      })
    },
    editRow({ row }, btn, index) {
      this.centerDialogVisible = true
    }
  }
}
</script>
