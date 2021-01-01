# big-table

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration

## BigTable Attributes

BigTable Attributes

参数        | 说明                            | 类型    | 默认值
tableData   | BigTable 渲染数据源             | Array    | 
headData    | 自定义表头，必须包含 label、prop | Array    |
cutLen      | 每一页展示条数                   | Number   | 100
maxHeight   | 最高高度，如果需要滚动请传此参数  | Number   | 600
isBigTable  | 是否展示为BigTable               | Boolean  | true
isTreeTable | 是否展示为树形结构table,使用树形必传           | Boolean  | false

Table-Column Attributes
兼容 el-table 所有参数，如果与el-table-colunm重复可能产生bug，建议只使用简单参数，例如：border,stripe 等等

Table-Column Attributes
兼容 el-table-colunm 所有参数，如果使用自定义表头会对所有列进行设置，如demo中的aort-able

如果不使用自定义表头，与el-table

如果使用自定义表头，需添加公共样式：
body .el-table th.gutter {
  display: table-cell !important;
}
目前未找到其他解决方案


See [Configuration Reference](https://cli.vuejs.org/config/).
