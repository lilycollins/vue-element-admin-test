<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      保修事件
    </div>
    <div class="head-select-btn mw1100">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="全部状态">
            <el-option key="1" label="保修派单" value="1" />
            <el-option key="2" label="保维接单" value="2" />
            <el-option key="3" label="进行维修" value="3" />
            <el-option key="4" label="维修结果" value="4" />
            <el-option key="5" label="维修点评" value="5" />
            <el-option key="6" label="已完成" value="6" />
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
            placeholder="搜索维保人"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
        <el-button type="primary" @click="addIt">创建</el-button>
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
  </div>
</template>
<script>
import myTable from '@/components/Table'
import pagination from '@/components/Pagination'
const field = [
  {
    id: 2,
    type: 0,
    label: '保修单号',
    key: 'a1'
  },
  {
    id: 3,
    type: 0,
    label: '保修主题',
    key: 'a2',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '保修类型',
    key: 'a3'
  }, {
    id: 5,
    type: 0,
    label: '保修设备名称',
    key: 'a4'
  }, {
    type: 0,
    label: '保修情况描述',
    key: 'a5'
  }, {
    type: 0,
    label: '状态',
    key: 'a6'
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
          },
          {
            type: 'text',
            key: '2',
            name: '维修点评'
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
    getList() {
      this.tb.data = [{
        a1: '123456789',
        a2: '质量保修',
        a3: '设备保修',
        a4: 'MI001',
        a5: '突然坏了',
        a6: '保修派单'
      }, {
        a1: '123456789',
        a2: '质量保修',
        a3: '系统保修',
        a4: 'MI001',
        a5: '系统崩盘',
        a6: '保修接单'
      }, {
        a1: '123456789',
        a2: '质量保修',
        a3: '系统保修',
        a4: 'MI003',
        a5: '系统崩盘',
        a6: '进行维修'
      }, {
        a1: '123456789',
        a2: '质量保修',
        a3: '系统保修',
        a4: 'MI001',
        a5: '系统崩盘',
        a6: '已修复'
      }, {
        a1: '123456789',
        a2: '质量保修',
        a3: '系统保修',
        a4: 'MI001',
        a5: '突然坏了',
        a6: '待解决'
      }, {
        a1: '123456789',
        a2: '质量保修',
        a3: '系统保修',
        a4: 'MI001',
        a5: '系统崩盘',
        a6: '未修复'
      }, {
        a1: '123456789',
        a2: '质量保修',
        a3: '系统保修',
        a4: 'MI001',
        a5: '突然坏了',
        a6: '已完成'
      }]
      this.total = 7
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
        this.$router.push({ name: 'protectDetail' })
      }
      if (btn.key === '2') {
        this.$router.push({ name: 'protectScore' })
      }
    },
    addIt() {
      this.$router.push({
        name: 'addProtect', params: {
          type: 'add'
        }
      })
    }
  }
}
</script>
