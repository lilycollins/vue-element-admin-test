<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />消防设施维保计划</div>
    <div class="head-select-btn mw700">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.user" prefix-icon="el-icon-search" placeholder="搜索维保人" />
          </el-form-item>
          <el-form-item>
            <el-button class="search-btn" plain @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
        <el-button type="primary" @click="addIt">创建</el-button>
        <el-button type="danger" :disabled="selected.length == 0" @click="deleteIt">导出</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <my-table class="mw700" :tb="tb" @choose="tbSelect" @editRow="editRow" />
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
  label: '维保编号',
  key: 'a1',
  width: 'auto'
},
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
  label: '维保人联系电话',
  key: 'a5'
}, {
  id: 6,
  type: 0,
  label: '维保时间',
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
         a1: '20220101001',
        a2: '火灾报警设备、消防应急设备',
        a3: '火灾报警设备：消防传感器、前端报警控制器；消防应急设备：室外消防栓、灭火器、防火卷帘、排烟风道阀',
        a4: '张旭',
        a5: '1234567890',
        a6: '2021-10-28 10:00'
      }, {
        a1: '20220101001',
        a2: '火灾报警设备、消防应急设备',
        a3: '消防灭火设备：喷淋头、楼层水阀控制器；消防控制设备：消防报警主机、消防管理主机、消防电源',
        a4: '李魁',
        a5: '1234567890',
        a6: '2021-10-28 10:00'
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
      this.$router.push({ name: 'checkProtect', params: {
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
        this.$router.push({ name: 'checkProtect', params: {
          type: 'edit'
        }})
      }
    }
  }
}
</script>
