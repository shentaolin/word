# <center>Js</center>

##一、`URL`
###1.`URL`结构
协议、域名、端口、路径、参数、查询字段、片段
![URL示例](https://upload-images.jianshu.io/upload_images/301420-e308f1b76b1bfc97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/902/format/webp)
>图中中括号是可选项

* `protocol` <font color=red>协议</font>，常用的协议有<font color=red>http、https、ftp</font>
* `hostname` 主机地址，可以是<font color=red>域名</font>，也可以是IP地址;如：<font color=red>www.baidu. com</font>
* `port` <font color=red>端口</font> http协议默认端口是：80端口，如果不写默认就是<font color=red>:80</font>端口
* `path` <font color=red>路径</font> 网络资源在服务器中的指定路径
* `parameter` <font color=red>参数</font> 如果要向服务器传入参数，在这部分输入
* `query` <font color=red>查询字符串</font> 如果需要从服务器那里查询内容，在这里编辑
* `fragment` <font color=red>片段</font> 网页中可能会分为不同的片段，如果想访问网页后直接到达指定位置，可以在这部分设置

###2.`URL`参数存取
>Vue环境
```
this.$router.push({ query: { name: '111',key:'222' } })  //添加URL参数
console.log(window.location.search) //获取URL参数：?name=111&key=222
```


##二、数据请求
###1.`axios`
>npm install axios
```
import axios from "axios";

...

getAxios() {
    axios({
        url: "http://api.test.jgjapp.com/jlcfg/cities",
        method: "get", //method默认是get请求
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params: {
            // ？search后面的值写在params中
            level: "2",
            citycode: "110000"
        }
    })
        .then(function(res) {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
},
```

###2.`axios`跨域请求

**若协议 + 域名 + 端口号均相同，那么就是同域；否则是跨域**

>**<font color='red'>外部公用接口：`https://www.apiopen.top/api.html`</font>**


跨域请求接口：`https://yinshusi.com/msBank/zhz/get_code?type=job&pcode=1000000`

**Rract项目**
>也可以在`webpack.config.js`中做与`Vue`项目相同的设置

打开项目生成的package.json文件，增加文件内容如下：
![跨域](https://images2018.cnblogs.com/blog/1274956/201807/1274956-20180720163948882-1629145220.png)
```
"proxy":{
  "/msBank":{
    "target":"https://yinshusi.com/msBank",
    "changeOrigin":true
  }
}
```


**Vue项目**

在vue项目的根目录下添加 vue.config.js文件

```
module.exports = {
    devServer: {
        proxy: {
            '/msBank': {
                target: 'https://yinshusi.com/msBank',   // 需要请求的地址
                changeOrigin: true,  // 是否跨域
                pathRewrite: {
                    '^/msBank': '/'  // 替换target中的请求地址，也就是说，在请求的时候，url用'/msBank'代替'https://yinshusi.com/msBank'
                }
            },
            '/userFeedback': {
                target: 'https://api.apiopen.top/userFeedback',  
                changeOrigin: true,  
                pathRewrite: {
                    '^/userFeedback': '/'  
                }
            }
            <!-- 可配置多个跨域接口 -->
        }, 
    }
}
```
<table>
  <tr>
    <td bgcolor=yellow>
      <font color=red>配置后需要重新启动项目</font>
    </td>
  </tr>
</table>

>npm install axios
```
import axios from "axios";

...

getData() {
  axios({
    url: 'msBank/zhz/get_code',
    method: "GET", //默认是get请求
    params: {
      //？search后面的值写在params中
      type:'job',
      pcode:'1000000'
    }
  })
    .then(function(val) {
      console.log(val);
    })
    .catch(function(err) {
      console.log(err);
    });
},

postData() {
  axios({
    url: "userFeedback",
    method: "POST", //默认是get请求
    params: {
      //？search后面的值写在params中
      apikey:'9648872f9aa08da137ce45fe1dda8279',
      text: "反馈内容",
      email: "18380439999"
    }
  })
    .then(function(val) {
      console.log(val);
    })
    .catch(function(err) {
      console.log(err);
    });
}
```

###3.`axios`封装
`api.js:`
```
import axios from 'axios'
import { Message, Loading } from 'element-ui'

// true 测试服务器 false 开发服务器
const test = false

const baseURL = `http://api.${test ? 'test.jgjapp' : 'jgjapp'}.com/`
const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

let loadingInstance = null,
count = 0//控制loading加载框，用计数方式控制是为了防止页面中同时请求多个接口加载框提前关闭的情况

<!-- steps4_发送请求 -->
instance.interceptors.request.use((config) => {
  let { data: configData } = config
  count++
  if (configData.loading) {
    loadingInstance = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }

  let token = localStorage.getItem('token') || ''

  delete configData.loading

  let formData = new FormData()//通过FormData构造函数创建一个空对象
  for (let k in configData) {
    formData.append(k, configData[k])//可以通过append()方法来追加数据
  }
  //固定参数
  formData.append('os', 'WP')
  formData.append('client_type', 'wp')
  formData.append('token', token)


  let data = {
    os: 'WP',
    client_type: 'wp',
    token,
    ...config.data
  }

  if (config.method === 'get') {
    config.params = {
      ...data
    }
  } else if (config.method === 'post') {
    config.data = formData// 等同于qs.stringify(data)
  }

  return config
})

<!-- steps4_请求返回 -->
instance.interceptors.response.use((res) => {
  if (count > 0) {
    count--
  }
  if (loadingInstance && count === 0) {
    loadingInstance.close()
    loadingInstance = null
  }

  let { data } = res
  // todo:有的接口没有返state
  // void 0===undefined
  if ((data.state !== void 0 && data.state == 0) || (data.code !== void 0 && data.code != 0)) {
    // 登录失效,请重新登录
    if (data.errno == 10035 || data.code == 10035) {
      localStorage.removeItem('token')
    }
    Message({
      center: true,
      customClass: 'message-center',
      message: data.errmsg || data.msg,
      type: 'error'
    })
    return data
  } else {
    data = data.values || data.result
  }
  return data
}, error => {
  if (count > 0) {
    count--
  }
  if (loadingInstance && count === 0) {
    loadingInstance.close()
    loadingInstance = null
  }
})

<!-- steps3 -->
/**
 *
 * @param {string} url 接口地址
 * @param {string} method 方法 'post' || 'get'
 * @param {object} config 要提交的数据
 */
const create = (url, method, config = {}) => {
  config = {
  	loading: true,
  	...config
  }
  return instance({
  	url,
  	method,
  	data: {
  	  ...config
  	}
  })
}

<!-- steps2 -->
const hire = {
  getList: config => create('接口地址','请求方式',参数),
  getDetail: config => create('recruitment/pro-recruitment-detail','get',config),
}

<!-- steps1 -->
export default {
  hire,
}

```

`getList.vue:`
```
import api from "../api";

...

methods：{
  // 请求数据
  async getList(pid) {
    const data = await api.hire.getList({
      pid: pid
    });
    // console.log("数据：", data);
  }
}
```



###4.`jsonp`
>npm install jsonp
```
import jsonp from "jsonp"

...

<!-- 简易版 -->
methods: {
    getJsonp() {
        jsonp(
            `http://api.map.baidu.com/place/v2/suggestion?query=1&output=json&ak=vaVH6Ls3Tisndi940ma2keNeGSm0UvH4&region="110100"`,
            null,
            (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                }
            }
        );
    }
}

<!-- 参数版 -->
methods: {
    <!-- 处理参数 -->
    params(data) {
      let url = "";
      for (let k in data) {
        let val = data[k] !== undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(val)}`;
      }
      return url ? url.substring(1) : "";
    },

    <!-- jsonp请求 -->
    getJsonp() {
      let url = "http://api.map.baidu.com/place/v2/suggestion";
      let data = {
        query: 1,
        output: "json",
        ak: "vaVH6Ls3Tisndi940ma2keNeGSm0UvH4",
        region: "110100"
      };
      jsonp(
        (url += (url.indexOf("?") < 0 ? "?" : "&") + this.params(data)),
        (err, data) => {
          if (err) {
            console.error(err);
          } else {
            console.log(data);
          }
        }
      );
    }
  }
```



##三、`async/await`异步
>用 async/await 来处理异步; (async就是异步的意思)

**<font color=red size=4>异步函数也就意味着该函数的执行不会阻塞后面代码的执行</font>**


<table>
  <tr>
    <td bgcolor=yellow>
      <font color=red>async函数中，await关键字后面的逻辑会在得到函数返回结果后才执行，await起到阻塞（函数暂停）的作用</font>
    </td>
  </tr>
</table>

```
testFun(){
  this.asyncFun()
  console.log('1-testFun')
},
async asyncFun(){
  console.log('2-asyncFun')
  //-------------------------------------await关键字
  await axios({                    
    url: "http://api.test.jgjapp.com/jlcfg/cities",
    method: "get", //method默认是get请求
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: {
      // ？search后面的值写在params中
      level: "2",
      citycode: "110000"
    }
  })
    .then(function(res) {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
    //-----------------------------------await结果出来才会继续下面的代码
    console.log('3-awaitFun')                        
}

<!-- 输出结果： -->
2-asyncFun
1-testFun
返回数据
3-awaitFun
```

##四、数据转换、操作
###1.`join()`数组转字符串
>需要将数组元素用某个字符连接成字符串
```
var a, b;
a = new Array(0,1,2,3,4);
b = a.join("-");      //"0-1-2-3-4"
```

###2.`split()`字符串转数组
>将字符串按某个字符切割成若干个字符串，并以数组形式返回
```
var s = "abc,abcd,aaa";
ss = s.split(",");// 在每个逗号(,)处进行分解  ["abc", "abcd", "aaa"]
var s1 = "helloworld";
ss1 = s1.split('');  //["h", "e", "l", "l", "o", "w", "o", "r", "l", "d"]
```

###3.`splice()`数组添加/删除项目
>该方法会改变原始数组
```
var s=['a','b','c'];
console.log(s.splice(2,1)); // 打印["c"]
console.log(s); // 打印["a", "b"]
```

###4.`substring()`截取指定索引字符
>返回一个索引和另一个索引之间的字符串
`str.substring(indexStart, [indexEnd])`
```
var str = 'abcdefghij';
str.substring(1, 2));   // b
```

###5.`substr()`截取指定长度字符
>返回从指定位置开始的字符串中指定字符数的字符
`str.substr(start, [length])`
```
var str = 'abcdefghij';
str.substr(1, 2));   // bc
```

###6.`replace()`替换字符
>只替换第一个匹配的字符
```
var d = '飞鸟慕鱼博客博主为墨除,其推出了几款zblog的插件，都是以墨除XXXX为命名的';
txt = d.replace('墨除','墨初');
console.log(txt);
//打印结果：飞鸟慕鱼博客博主为墨初,其推出了几款zblog的插件，都是以墨除XXXX为命名的
```
>全局替换
```
var d = '飞鸟慕鱼博客博主为墨除,其推出了几款zblog的插件，都是以墨除XXXX为命名的';
txt = d.replace(/墨除/g,'墨初');
console.log(txt);
//打印结果：飞鸟慕鱼博客博主为墨初,其推出了几款zblog的插件，都是以墨初XXXX为命名的
```

###7.`trim()`去除字符左右空格
>去掉字符序列左边和右边的空格;
字符串中间的空格不进行处理
```
str = " i love you    "
str = trim(str);    //i love you
```

###8.`...new Set(arr)`数组去重
```
var arr = [1, 2, 3, 3, 4];
console.log(...new Set(arr))
>> [1, 2, 3, 4]
```

##五、标签
###1.`iframe`
```
<iframe src="http://localhost:8080" id="Iframe" frameborder="0" scrolling="no" style="border:0px;"></iframe>
```

**跨域下的iframe自适应高度**
> 跨域的时候，由于js的同源策略，父页面内的js不能获取到iframe页面的高度。需要一个页面来做代理。
方法如下：
假设www.a.com下的一个页面a.html要包含www.b.com下的一个页面c.html。
我们使用www.a.com下的另一个页面agent.html来做代理，通过它获取iframe页面的高度，并设定iframe元素的高度。

a.html中包含iframe:
```
<iframe src="http://www.b.com/c.html" id="Iframe" frameborder="0" scrolling="no" style="border:0px;"></iframe>
```

在c.html中加入如下代码：
```
<iframe id="c_iframe"  height="0" width="0"  src="http://www.a.com/agent.html" style="display:none" ></iframe>
<script type="text/javascript">
  (function autoHeight(){
    var b_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
    var b_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
    var c_iframe = document.getElementById("c_iframe");
    c_iframe.src = c_iframe.src + "#" + b_width + "|" + b_height;  // 这里通过hash传递b.htm的宽高
  })();
</script>
```

最后，agent.html中放入一段js:
```
<script type="text/javascript">
  var b_iframe = window.parent.parent.document.getElementById("Iframe");
  var hash_url = window.location.hash;
  if(hash_url.indexOf("#")>=0){
    var hash_width = hash_url.split("#")[1].split("|")[0]+"px";
    var hash_height = hash_url.split("#")[1].split("|")[1]+"px";
    b_iframe.style.width = hash_width;
    b_iframe.style.height = hash_height;
  }
</script>
```

**iframe是否加载完毕**
```
window.onload = function(){
    var ifm= document.getElementById("Iframe"); 
    if(ifm.attachEvent){
        // IE
        // alert('ifm加载完毕')
    }else{
        // 非IE
        // alert('ifm加载完毕')
    }
}
```

##六、浏览器

###1.监听窗口大小
```
data(){
  return{
    messageTop:'',
  }
},

...

mounted() {
  let _this = this
  _this.messageTop = window.innerHeight;
  window.addEventListener("resize", function() {
    // 变化后需要做的事
    _this.messageTop = window.innerHeight;
  });
},
```

###2.页面滚动
```
mounted(){
  window.addEventListener('scroll',this.handleScroll,true)
},
destroyed () {
  window.removeEventListener('scroll', this.handleScroll,true)
},
methods: {
  handleScroll(e){      
    var scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;      // 执行代码
    console.log(scrollTop)    //滚动距离
  },
  <!-- 直接回到页面顶部事件 -->
  toTop(){
    window.scrollTo(0,0)
  }
  <!-- 平滑的滚动回顶部事件 -->
  toTop() {
    // window.scrollTo(0, 0);
    let distance =
      document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
    let step = distance / 50; //每步的距离
    (function jump() {
      if (distance > 0) {
        distance -= step;
        // document.documentElement.scrollTop = distance;
        // document.body.scrollTop = distance;
        window.scrollTo(0, distance);
        setTimeout(jump, 10);
      }
    })();
  }
},
```

##七、开服务器
```
python -m SimpleHTTPServer
```

##八、媒体查询
>`@media`
```
.homeMain {
  width: 100%;
  max-width: 1140px;
}
<!-- 如果文档宽度小于 1200px homeMain则修改最大宽度为1100px  -->
@media (min-width: 1200px) {
  .homeMain {
    max-width: 1100px;
  }
}
<!-- 如果文档宽度小于 1000px homeMain则修改最大宽度为700px -->
@media (min-width: 1000px) {
  .homeMain {
    max-width: 700px;
  }
}
```

##九、滚动条样式
```
<ul class="ull">
  <li>1231</li>
  <li>1231</li>
  <li>1231</li>
  <li>1231</li>
  <li>1231</li>
  <li>1231</li>
</ul>

...

.ull {
  height: 100px;
  overflow: auto;
}
.ull::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  scrollbar-arrow-color: red;
}
.ull::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 6px;
  background: rgba(144, 147, 153, 0.5);
}
.ull::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
}
```