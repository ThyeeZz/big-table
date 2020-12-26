const Mock = require('mockjs');
const [Random, data] = [Mock.Random, []]

const start = +new Date();
for (let i = 0; i < 3000; i++) {
  data.push({
    'id': i,
    'boolean': Random.boolean, // 随机生成布尔类型
    'natural': Random.natural(1, 100), // 随机生成1到100之间自然数
    'integer': Random.integer(1, 100), // 生成1到100之间的整数
    'float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    'character': Random.character(), // 生成随机字符串,可加参数定义规则
    'string': Random.string(2, 10), // 生成2到10个字符之间的字符串
    'range': Random.range(0, 10, 2), // 生成一个数组，数组元素从0开始到10结束，间隔为2
    'date': Random.date(), // 生成一个随机日期,可加参数定义日期格式，默认yyyy-mm-dd
    // 'image1': Random.image(Random.size, '#02adea', '#fff', 'png', 'Hello'), // Random.size表示将从size数据中任选一个数据，生成Random.size指定大小的，背景为'#02adea'的，前景色为'#fff'的，格式为'png'的，内容为'Hello'的图片。
    // 'image2': Random.dataImage('200x100', 'Hello Mock.js!'), //只设置大小
    'image1': Random.color(),
    'image2': Random.color(),
    'color': Random.color(), // 生成一个颜色随机值
    'paragraph': Random.color(), //生成2至5个句子的文本
    'name': Random.name(), // 生成姓名
    'url': Random.url(), // 生成url地址
    'address': Random.province(), // 生成地址
    'age': Random.integer(1, 100), // 生成1到100之间的整数
    'gnder': Random.integer(0, 1),
    'data1': Random.color(),
    'data2': Random.color(),
    'data3': Random.color(),
    'data4': Random.color(),
    'data5': Random.color(),
    'data6': Random.color(),
    'data7': Random.color(),
    'data8': Random.color(),
    'data9': Random.color(),
    'data10': Random.color(),
    'data11': Random.color(),
    'data12': Random.color(),
    'data13': Random.color(),
    'data14': Random.color(),
    'calcTime': +new Date() - start
  })
}
Mock.mock('/Get/list', 'get', data);