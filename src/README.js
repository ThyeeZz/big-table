export const readme = `
<div style='text-align: left'>
<p>BigTable Attributes</p>

<p>参数        | 说明                            | 类型    | 默认值</p>
<p>tableData   | BigTable 渲染数据源             | Array    | </p>
<p>headData    | 自定义表头，必须包含 label、prop | Array    |</p>
<p>cutLen      | 每一页展示条数                   | Number   | 100</p>
<p>maxHeight   | 最高高度，如果需要滚动请传此参数  | Number   | 600</p>
<p>isBigTable  | 是否展示为BigTable               | Boolean  | true</p>
<p>isTreeTable | 是否展示为树形结构table,使用树形必传           | Boolean  | false</p>
<hr />
<p>Table-Column Attributes</p>
<p>兼容 el-table 所有参数，如果与el-table-colunm重复可能产生bug，建议只使用简单参数，例如：border,stripe 等等</p>
<hr />
<p>Table-Column Attributes</p>
<p>兼容 el-table-colunm 所有参数，如果使用自定义表头会对所有列进行设置，如demo中的aort-able</p>
<hr />
<p>如果不使用自定义表头，与el-table</p>
<hr />
<p>如果使用自定义表头，需添加公共样式：</p>
body .el-table th.gutter {
  display: table-cell !important;
}
<p>目前未找到其他解决方案</p>
</div>
 `