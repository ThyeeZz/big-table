<template>
  <div id="big-table">
    <div
      :style="{ maxHeight: ` ${maxHeight}px` }"
      class="big-table-warpper"
      v-virturScroll
      ref="wrapper"
    >
      <el-table
        :data="renderData"
        style="width: 100%;"
        v-bind="$attrs"
      >
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
      this.CUT_DATA = this.cut(this.tableData, this.cutLen);
      this.renderData = this.CUT_DATA[0];
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
      this.renderData = renderData.concat(CUT_DATA[this.index]);
    },
    goTop() {
      this.$refs.wrapper.scrollTop = "0px";
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