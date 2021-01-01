<template>
  <div id="big-table">
    <div
      :style="{ maxHeight: ` ${maxHeight}px` }"
      class="big-table-warpper"
      v-virturScroll
      ref="wrapper"
    >
      <el-table :data="renderData" style="width: 100%" v-bind="$attrs">
        <el-table-column
          v-for="item in headData"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-bind="$attrs"
          v-on="$listeners"
        >
        </el-table-column>
        <slot></slot>
      </el-table>
    </div>
    <div class="top-button" @click="goTop" v-if="showTopButton">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>
<script>
const handleScroll = (el, binding, VNode) => {};
export default {
  name: "BigTable",
  directives: {
    virturScroll: {
      inserted(el, binding, VNode) {
        el.addEventListener(
          "scroll",
          () => {
            const [scrollHeight, height] = [
              el.scrollHeight,
              parseInt(getComputedStyle(el).height),
            ];
            const scrollBottom = scrollHeight - el.scrollTop;
            if (
              VNode.context.index < VNode.context.CUT_DATA.length - 1 &&
              VNode.context.isBigTable
            ) {
              if (scrollBottom < height + 100) {
                VNode.context.concatData();
                el.scrollTop = scrollHeight - 710;
              }
            }
          },
          false
        );
      },
      unbind(el, binding, VNode) {
        e.removeEventListener(
          "scroll",
          () => {
            const [scrollHeight, height] = [
              el.scrollHeight,
              parseInt(getComputedStyle(el).height),
            ];
            const scrollBottom = scrollHeight - el.scrollTop;
            if (
              VNode.context.index < VNode.context.CUT_DATA.length - 1 &&
              VNode.context.isBigTable
            ) {
              if (scrollBottom < height + 100) {
                VNode.context.concatData();
                el.scrollTop = scrollHeight - 710;
              }
            }
          },
          false
        );
      },
    },
  },
  props: {
    tableData: {
      type: Array,
      require: true,
    },
    headData: {
      type: Array,
      require: true,
    },
    cutLen: {
      type: Number,
      default: 100,
    },
    maxHeight: {
      type: Number,
      default: 600,
    },
    isBigTable: {
      type: Boolean,
      default: true,
    },
    isTreeTable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      index: 0,
      renderData: [],
      CUT_DATA: [],
      scrollHeight: 0,
    };
  },
  computed: {
    showTopButton() {
      return this.index > 0;
    },
  },
  watch: {
    tableData(val) {
      if (!this.isBigTable) {
        // 不切割按照正常table 渲染全部数据
        this.renderData = this.tableData;
        return;
      }
      if (!this.isTreeTable) {
        // 非树形结构，正常切割
        this.CUT_DATA = this.cut(this.tableData, this.cutLen);
        this.renderData = this.CUT_DATA[0];
        return;
      }
      // 树形结构，先转为一维数组进行切割，再转为多维树形结构拼接
      this.CUT_DATA = this.cut(
        this._turnToFlatArray(this.tableData, {
          idLabel: "AreaId",
          pidLabel: "PId",
          childrenLabel: "Datas",
        }),
        this.cutLen
      );
      console.table(this.CUT_DATA[0]);
      this.renderData = this._turnToTreeArray(this.CUT_DATA[0], {
        idLabel: "AreaId",
        pidLabel: "PId",
        childrenLabel: "Datas",
      });
      return;
    },
  },
  methods: {
    cut(arr, len) {
      let [res, temp] = [[], arr.slice()];
      while (temp.length > len) {
        res.push(temp.splice(0, len));
      }
      res.push(temp);
      return res;
    },
    concatData() {
      const { renderData, CUT_DATA } = this;
      this.index++;
      if (!this.isTreeTable) {
        // 非 树形结构处理
        this.renderData = renderData.concat(CUT_DATA[this.index]);
        return;
      }
      // 树形结构处理
      let temp = [];
      for (let i = 0; i < this.index; i++) {
        temp = temp.concat(CUT_DATA[i]);
      }
      this.renderData = renderData.concat(
        this._turnToTreeArray(temp, {
          idLabel: "AreaId",
          pidLabel: "PId",
          childrenLabel: "Datas",
        })
      );
    },
    goTop() {
      this.$refs.wrapper.scrollTop = "0px";
    },
    _turnToFlatArray(arr, { idLabel, pidLabel, childrenLabel }) {
      let temp = (function flat(arr) {
        return arr.reduce((pre, cur) => {
          if (cur[childrenLabel] && cur[childrenLabel].length) {
            let temp = flat(cur[childrenLabel]);
            delete cur[childrenLabel];
            pre = pre.concat(temp);
          }
          pre = pre.concat(cur);
          return pre;
        }, []);
      })(arr);
      temp.sort((a, b) => a[idLabel] - b[idLabel]);
      return temp;
    },
    _turnToTreeArray(arr, { idLabel, pidLabel, childrenLabel }) {
      const [result, dataCopy] = [[], arr.slice()];

      function getChildrenDeeply(arr, id) {
        const children = arr.filter((item) => item[pidLabel] == id);
        if (children && children.length) {
          children.forEach((subItem) => {
            subItem[childrenLabel] = getChildrenDeeply(arr, subItem[idLabel]);
          });
        }
        return children;
      }
      dataCopy.forEach((item) => {
        if (item[pidLabel] == 0) {
          item[childrenLabel] = getChildrenDeeply(arr, item[idLabel]);
          result.push(item);
        }
      });
      return result;
    },
  },
};
</script>
<style scoped>
.big-table-warpper {
  overflow: auto;
}
.top-button {
  border: 1px solid #f1f1f1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #909090;
  position: absolute;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  margin: 0;
}
#big-table {
  position: relative;
}
.top-button:hover {
  box-shadow: 0 0 5px #ddd;
}
.el-icon-caret-top {
  font-size: 18px;
}
</style>