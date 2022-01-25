<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />变动明细</div>
    <div style="display: flex; justify-content: space-between">
      <div>
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
            <el-select v-model="formInline.type" placeholder="全部变动">
              <el-option key="2" label="入库" value="2" />
              <el-option key="3" label="出库" value="3" />
              <el-option key="4" label="盘点" value="4" />
              <el-option key="5" label="修正" value="5" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tag-warp">
        <el-button @click="back">返回</el-button>
        <el-button plain>刷新</el-button>
        <el-button type="success" :disabled="selected.length == 0" @click="deleteIt">导出</el-button>
      </div>
    </div>

    <div class="like-table-item" style="padding: 12px 0">
      <div class="table-item">
        耗材名称 <span>{{ form.a1 }}</span>
      </div>
      <div class="table-item">
        当前库存 <span>{{ form.a2 }}</span>
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
  label: '操作单号',
  key: 'a1',
  width: 'auto'
},
{
  id: 2,
  type: 0,
  label: '申请部门',
  key: 'a2'
},
{
  id: 3,
  type: 0,
  label: '申请人',
  key: 'a3',
  showOverflow: true
},
{
  id: 4,
  type: 0,
  label: '操作人',
  key: 'a4'
}, {
  id: 5,
  type: 0,
  label: '变动类型',
  key: 'a5'
}, {
  id: 6,
  type: 0,
  label: '增加数量',
  key: 'a6'
}, {
  type: 0,
  label: '减少数量',
  key: 'a7'
}, {
  type: 0,
  label: '库存数量',
  key: 'a8'
}, {
  type: 0,
  label: '变动时间',
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
        pageSize: 20,
        a1: '得力A4 70g打印纸',
        a2: '100'
      },
      formInline: {
        user: ''
      },
      tb: {
        fields: field,
        data: [],
        index: true,
        selectionBtn: false,
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
         a1: 'W12345678',
        a2: '行政部',
        a3: '米小宝',
        a4: '库管1',
        a5: '出库',
        a6: '',
        a7: '-10',
        a8: '41',
        a9: '2022-01-01 10:00'
      }, {
         a1: 'O12345678',
        a2: '',
        a3: '',
        a4: '库管1',
        a5: '入库',
        a6: '',
        a7: '',
        a8: '52',
        a9: '2022-01-01 10:00'
      }, {
         a1: 'P12345678',
        a2: '',
        a3: '米小宝',
        a4: '库管1',
        a5: '出库',
        a6: '+50',
        a7: '',
        a8: '1',
        a9: '2022-01-01 10:00'
      }, {
         a1: 'J12345678',
        a2: '行政部',
        a3: '米小宝',
        a4: '库管1',
        a5: '出库',
        a6: '',
        a7: '-10',
        a8: '1',
        a9: '2022-01-01 10:00'
      }]
      this.total = 4
    //     this.tb.data.forEach((e) => {
    //       e.auth_method_str = auth_method[e.auth_method]
    //     })
    //   })
    },
    back() {
      this.$router.go(-1)
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
