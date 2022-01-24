<template>
  <div class="element-main">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材入库 - 创建入库单
      </div>
      <div>
        <p>入库单号</p>
        <el-input
          v-model="textarea"
          style="width: 350px"
          placeholder="请输入修正单号"
        />
        <p>供应商</p>
        <el-select
          v-model="textarea"
          style="width: 350px"
          filterable
          placeholder="请选择供应商"
        >
          <el-option key="1" label="巡检" value="1" />
          <el-option key="2" label="维保" value="2" />
        </el-select>
        <p>备注</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 14 }"
          placeholder="请输入备注"
        />
      </div>
      <div class="tag-warp" style="margin: 45px 0 25px 0">
        <el-button type="primary" @click="chooseIt">选择耗材</el-button>
        <el-button
          type="danger"
          :disabled="selected.length == 0"
          @click="handleClick"
        >删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData2"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="55" />
        <el-table-column label="耗材图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img" style="width: 100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="a1" label="耗材编号" />
        <el-table-column prop="a2" label="耗材名称" />
        <el-table-column prop="a3" label="耗材类型" />
        <el-table-column prop="a4" label="单位" />
        <el-table-column prop="a5" label="入库单价" />
        <el-table-column prop="a6" label="入库数量" />
        <el-table-column prop="a7" label="小计" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="color: red"
              size="small"
              @click="handleClick(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="padding-top: 35px">
        <el-button @click="back">取消</el-button>
        <el-button type="primary" @click="back">提交</el-button>
      </div>
    </div>
    <el-dialog
      title="选择耗材"
      :visible.sync="centerDialogVisible"
      width="800px"
      center
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="formInline.user"
            prefix-icon="el-icon-search"
            placeholder="搜索耗材编号/名称"
          />
        </el-form-item>
        <el-form-item label="">
          <el-cascader
            :options="options"
            :props="{ multiple: true, checkStrictly: true }"
            clearable
            placeholder="请选择耗材分类"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="耗材图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img" style="width: 100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="耗材编号" width="120">
          <template slot-scope="scope">{{ scope.row.a1 }}</template>
        </el-table-column>
        <el-table-column prop="a2" label="耗材名称" width="120" />
        <el-table-column prop="a3" label="单位" />
        <el-table-column prop="a4" label="耗材类型" />
      </el-table>
      <div style="text-align: right; padding: 15px 0">
        <el-pagination
          :current-page="formInline.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="formInline.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <el-radio-group v-model="radio">
        <el-radio :label="1">按表格勾选</el-radio>
        <el-radio :label="3">本页全选</el-radio>
        <el-radio :label="6">所有全选</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          prop: 'date',
          label: '申请单号'
        },
        {
          prop: 'name',
          label: '申请部门'
        },
        {
          prop: 'address',
          label: '使用时间'
        },
        {
          prop: 'people',
          label: '审核人'
        }
      ],
      tableData2: [{
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '办公用品',
        a4: '包',
        a5: '10.00',
        a6: '10',
        a7: '500.00',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: '',
      selected: [],
      centerDialogVisible: false,
      formInline: {
        user: '',
        currentPage: 1,
        pageSize: 20
      },
      total: 5,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      tableData: [{
        a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '包',
        a4: '办公用品',
        img: require('../../../assets/img/default.svg')
      }, {
       a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '包',
        a4: '办公用品',
        img: require('../../../assets/img/default.svg')
      }, {
       a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '包',
        a4: '办公用品',
        img: require('../../../assets/img/default.svg')
      }, {
       a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '包',
        a4: '办公用品',
        img: require('../../../assets/img/default.svg')
      }, {
       a1: '1234567890123',
        a2: '得力A4 70g打印纸',
        a3: '包',
        a4: '办公用品',
        img: require('../../../assets/img/default.svg')
      }],
      multipleSelection: [],
      radio: null
    }
  },
  computed: {
    getHeaders() {
      return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
    },
    getValues() {
      return this.headers.map(item => {
        return this.tableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { 'title': item.label })
      })
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    handleClick(row) {
      this.$alert('确定要删除吗？', '确认提示', {
        confirmButtonText: '确定'
      }).then(() => {
        this.$message.success('操作成功')
      })
    },
    chooseIt() {
      this.centerDialogVisible = true
      this.total = this.tableData.length
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    onSubmit() { }
  }
}
</script>

<style lang="scss" scoped>
.m50 {
  margin: 50px;
}
</style>
