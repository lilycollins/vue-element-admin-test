<template>
  <div class="main-content">
    <div style="width: 90%; margin: 20px auto">
      <div class="sub-title-head">
        <div class="l-box" />
        耗材预申请 - 申请单详情
      </div>
      <h4>基本信息</h4>
      <el-descriptions
        class="margin-top"
        title="带边框列表"
        :column="3"
        :size="size"
        border
      >
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            用户名
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone" />
            手机号
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline" />
            居住地
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets" />
            备注
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building" />
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>
      <!-- <div class="like-table-item">
        <div class="table-item">
          申请单号 <span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          出库单号 <span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          状态 <span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          申请部门 <span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          申请人 <span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          申请时间<span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          使用时间<span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          申请理由<span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          审核人<span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          审核时间<span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          审核建议<span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          出库人<span>{{ form.fixNo }}</span>
        </div>
        <div class="table-item">
          出库时间<span>{{ form.fixNo }}</span>
        </div>
      </div> -->
      <el-table
        ref="multipleTable"
        :data="tableData2"
        tooltip-effect="dark"
        style="width: 100%; margin: 55px 0"
      >
        <el-table-column type="index" width="55" />
        <el-table-column label="耗材图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <img :src="scope.row.img" style="width: 100px">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="耗材编号" />
        <el-table-column prop="address" label="耗材名称" />
        <el-table-column prop="address" label="耗材类型" />
        <el-table-column prop="address" label="单位" />
        <el-table-column prop="address" label="申请数量" />
        <el-table-column prop="address" label="出库数量" />
      </el-table>

      <h4>申请进度</h4>
      <el-steps :active="1">
        <el-step title="提交申请" icon="el-icon-edit" />
        <el-step title="确认中" icon="el-icon-upload" />
        <el-step title="采购出库" icon="el-icon-picture" />
        <el-step title="发放" icon="el-icon-picture" />
      </el-steps>
      <div style="padding-top: 35px">
        <el-button @click="back">返回</el-button>
      </div>
    </div>
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
        date: '2016-05-03',
        name: '王小虎',
        address: '1518 弄',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: '',
      selected: [],
      form: {
        fixNo: ''
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.m50 {
  margin: 50px;
}
</style>
