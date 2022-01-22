<template>
  <div class="element-main">
    <div style="width: 90%;margin: 20px auto">
      <div class="sub-title-head"> <div class="l-box" />保修详情</div>
      <h4>基本信息</h4>
      <el-row>
        <el-col :span="8">
          <el-table
            style="width: 100%"
            fit
            highlight-current-row
            :data="getValues"
            :show-header="false"
          >
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table
            style="width: 100%"
            :data="getValues"
            :show-header="false"
          >
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table
            style="width: 100%"
            :data="getValues"
            :show-header="false"
          >
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
      </el-row>
      <div style="padding-top: 35px">
        <p>保修情况描述</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          readonly
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <p>附件上传</p>
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
      </div>
      <h4>保修情况</h4>
      <el-row>
        <el-col :span="8">
          <el-table
            style="width: 100%"
            fit
            highlight-current-row
            :data="getValues"
            :show-header="false"
          >
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table
            style="width: 100%"
            :data="getValues"
            :show-header="false"
          >
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table
            style="width: 100%"
            :data="getValues"
            :show-header="false"
          >
            <el-table-column
              v-for="(item, index) in getHeaders"
              :key="index"
              :prop="item"
            />
          </el-table>
        </el-col>
      </el-row>
      <div style="padding-top: 35px">
        <p>维修情况描述</p>
        <el-input
          v-model="textarea2"
          style="width: 80%"
          type="textarea"
          readonly
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </div>
      <div style="padding-top: 35px">
        <p>附件上传</p>
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
        <img src="../../../assets/img/default.svg" style="width: 200px;padding: 12px" alt="">
      </div>

      <h4>维修点评</h4>
      <div class="fix-div">
        <p style="padding-right: 100px">保修完成度</p><p>{{ a1 }}</p>
      </div>
      <div class="fix-div">
        <p>评分</p>
        <el-rate v-model="score" style="line-height: 60px" />
      </div>
      <div>
        <p>点评描述</p>
        <el-input
          v-model="textarea"
          style="width: 80%"
          type="textarea"
          readonly
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </div>
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
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          people: ''
        }
      ],
      tableData2: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '1518 弄',
        img: require('../../../assets/img/default.svg')
      }],
      textarea: '暂无',
      textarea2: '已完成',
      a1: '维修完成',
      score: 5,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
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
.fix-div {
    width: 300px;
    display: flex;
    justify-content: space-between;
}
</style>
