<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      统计分析
    </div>
    <div style="display: flex; justify-content: space-between">
      <h4>出入库分析</h4>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="padding-top: 8px"
      >
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="营业统计类型">
            <el-option key="1" label="日统计" value="1" />
            <el-option key="2" label="月统计" value="2" />
            <el-option key="3" label="年统计" value="2" />
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
      </el-form>
    </div>
    <div id="main" style="width: 100%; height: 400px" />
    <div style="display: flex; justify-content: space-between">
      <h4>耗材总量分析</h4>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="padding-top: 8px"
      >
        <el-form-item label="">
          <el-date-picker
            v-model="formInline.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
    </div>
    <div id="main2" style="width: 50%; height: 400px" />
    <div style="display: flex; justify-content: space-between">
      <h4>部门领用数据</h4>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="padding-top: 8px"
      >
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="营业统计类型">
            <el-option key="1" label="日统计" value="1" />
            <el-option key="2" label="月统计" value="2" />
            <el-option key="3" label="年统计" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="formInline.a5"
            type="datetime"
            placeholder="选择时间"
          />
        </el-form-item>
      </el-form>
    </div>
    <div id="main3" style="width: 100%; height: 400px" />
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      form: {
        pageIndex: 1,
        pageSize: 20
      },
      formInline: {
        user: '',
        time: ''
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.initEcharts()
    this.initEcharts2()
    this.initEcharts3()
  },
  methods: {
    getList() {

    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    onSubmit() {
      this.form.pageIndex = 1
      this.getList()
    },
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '出库', '入库'],
            ['1月', 43.3, 85.8],
            ['2月', 83.1, 73.4],
            ['3月', 86.4, 65.2],
            ['4月', 72.4, 53.9],
            ['5月', 43.3, 85.8],
            ['6月', 83.1, 73.4],
            ['7月', 86.4, 65.2],
            ['8月', 72.4, 53.9],
            ['9月', 43.3, 85.8],
            ['10月', 83.1, 73.4],
            ['11月', 86.4, 65.2],
            ['12月', 72.4, 53.9]
          ]
        },
        color: [
          '#5470c6',
          '#91cc75'
        ],
        xAxis: { type: 'category' },
        yAxis: {},

        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    initEcharts2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main2'))

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#5470c6',
          '#91cc75',
          '#fac858',
          '#ee6666',
          '#73c0de',
          '#3ba272',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc'
        ],
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '耗材1' },
              { value: 735, name: '耗材2' },
              { value: 580, name: '耗材3' },
              { value: 484, name: '耗材4' },
              { value: 300, name: '耗材5' }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    initEcharts3() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main3'))

      // 指定图表的配置项和数据
      var option = {
        color: ['#5470c6'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        barWidth: 3,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['事业1部', '综合部', '行政部', '技术部', '事业2部', '事业3部', '财政部'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '20%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
