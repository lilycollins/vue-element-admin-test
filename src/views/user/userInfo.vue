<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />用户信息</div>
    <div class="head-select-btn mw700">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.user" prefix-icon="el-icon-search" placeholder="搜索用户姓名或部门" />
          </el-form-item>
          <el-form-item>
            <el-button class="search-btn" plain @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
        <el-button type="primary" @click="addIt">创建用户</el-button>
        <el-button type="danger" :disabled="selected.length == 0" @click="disabledIt">删除</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <my-table :tb="tb" class="mw700" @choose="tbSelect" @editRow="editRow" />
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
  label: '用户编号',
  key: 'a1',
  width: 'auto'
},
{
  id: 2,
  type: 0,
  label: '姓名',
  key: 'a2'
},
{
  id: 3,
  type: 0,
  label: '部门',
  key: 'a3'
},
{
  id: 4,
  type: 0,
  label: '角色',
  key: 'a4'
}, {
  id: 5,
  type: 0,
  label: '年龄',
  key: 'a5'
}, {
  type: 0,
  label: '手机号码',
  key: 'a6'
}, {
  type: 0,
  label: '邮箱',
  key: 'a7'
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
        'a1': 'A12345678',
        'a2': '米小宝',
        'a3': '事业部',
        'a4': '职员',
        'a5': '30',
        'a6': '13800138000',
        'a7': '123456@163.com'
      }, {
        'a1': 'A12345678',
        'a2': '库管1',
        'a3': '综合部',
        'a4': '库管',
        'a5': '30',
        'a6': '13800138000',
        'a7': '123456@163.com'
      }, {
        'a1': 'A12345678',
        'a2': '领导1',
        'a3': '综合部',
        'a4': '主任',
        'a5': '30',
        'a6': '13800138000',
        'a7': '123456@163.com'
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
    addIt() {
      this.$router.push({ name: 'userChange', params: {
        type: 'add'
      }})
    },
    disabledIt() {
      this.$alert('确定要禁用吗？', '确认提示', {
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
        this.$router.push({ name: 'userChange', params: {
          type: 'edit'
        }})
      }
    }
  }
}
</script>
