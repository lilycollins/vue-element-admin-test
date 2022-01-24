<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />消防设备巡检计划</div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.user" prefix-icon="el-icon-search" placeholder="搜索巡检人" />
          </el-form-item>
          <el-form-item>
            <el-button plain @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
        <el-button type="primary" @click="addIt">创建</el-button>
        <el-button type="danger" :disabled="selected.length == 0" @click="deleteIt">删除</el-button>
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
const field = [{
  id: 1,
  type: 0,
  label: '巡检任务编号',
  key: 'a1',
  width: 'auto'
},
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
  key: 'a5'
}, {
  type: 0,
  label: '巡检人',
  key: 'a6'
}, {
  type: 0,
  label: '巡检联系电话',
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
        user: ''
      },
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
    getList() {
    //   request({ url: 'root_authorization', method: 'get', params: { ...this.form }}).then((data) => {
      this.tb.data = [{
        a1: '100001',
        a2: '日常巡检',
        a3: '消防广播检查、消防水箱检查、消防配...',
        a4: '消防应急、消防警示设备、消防...',
        a5: '大楼整体、外围',
        a6: '张旭',
        a9: '1234567890',
        a7: '2021-10-28 10:00',
        a8: '2021-10-28 10:00'
      }, {
        a1: '100002',
        a2: '重点巡检',
        a3: '消防广播检查、消防水箱检查、消防配...',
        a4: '消防应急、消防警示设备、消防...',
        a5: '大楼整体、外围',
        a6: '李魁',
        a9: '1234567890',
        a7: '2021-10-28 10:00',
        a8: '2021-10-28 10:00'
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
    addIt() {
      this.$router.push({ name: 'checkPlan', params: {
        type: 'add'
      }})
    },
    deleteIt() {
      this.$alert('确定要删除吗？', '确认提示', {
        confirmButtonText: '确定'
      }).then(() => {
        this.$message.success('操作成功')
      })
    },
    useIt() {
      this.$alert('确定要启用吗？', '确认提示', {
        confirmButtonText: '确定'
      }).then(() => {
        this.$message.success('操作成功')
      })
    },
    editRow({ row }, btn, index) {
      if (btn.key === '1') {
        this.$router.push({ name: 'checkPlan', params: {
          type: 'edit'
        }})
      }
    }
  }
}
</script>
