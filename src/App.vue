<template>
  <div id="app">
    <div>
      <div>
        <el-button type="primary" @click="queryData">查询</el-button>
      </div>
      <big-table
        :tableData="tableData"
        :cutLen="500"
        :headData="headeData"
        :maxHeight="600"
        border
        stripe
        sortable
        :sort-method="(a, b) => a - b"
      >
        <el-table-column prop="color" label="color"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button @click="handleClick(row)">click me</el-button>
          </template>
        </el-table-column>
      </big-table>
    </div>
    <div v-html="readme"></div>
  </div>
</template>

<script>
import axios from "axios";
import  {readme}  from "./README";
export default {
  name: "App",
  data() {
    return {
      readme: readme,
      tableData: [],
      headeData: [
        {
          label: 'ID',
          prop: 'id',
          width: '80px'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: "data1",
          prop: "data1",
        },
        {
          label: "data2",
          prop: "data2",
        },
        {
          label: "data3",
          prop: "data3",
        },
        {
          label: "data4",
          prop: "data4",
        },
        {
          label: "data5",
          prop: "data5",
        },
        {
          label: "data6",
          prop: "data6",
        },
        {
          label: "data7",
          prop: "data7",
        },
        {
          label: "data8",
          prop: "data8",
        },
        {
          label: "data9",
          prop: "data9",
        },
        {
          label: "data10",
          prop: "data10",
        },
        {
          label: "data11",
          prop: "data11",
        },
        {
          label: "data12",
          prop: "data12",
        },
        {
          label: "data13",
          prop: "data13",
        },
        {
          label: "data14",
          prop: "data14",
        },
      ],
    };
  },
  methods: {
    queryData() {
      axios.get("/Get/list").then((res) => {
        this.tableData = res.data;
      });
    },
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
