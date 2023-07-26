# HTML
<input class="cb" type="checkbox" name="size" id="cb_1" value="6"><label for="cb_1">6寸</label>
## 常用属性
1. id 唯一标识符
2. class 类别
3. style 格式
4. title 额外信息（悬停显示等）
## 文档
### 章节
- body
- header 头部 标题 搜索栏等
- nav 导航（可以是多个）
- aside 和主要内容不相关的区域（如侧边栏 广告）
- article 主要内容 独立可重复结构 可嵌套
- section 文档中的区域或一截，专题组（一般带标题），相邻的一般有关联。
- footer 尾部 版权信息 相关文档链接
- hx (h1-h6)
### 文本
- a 超链接 指向另一个文档、内部锚点、Email地址
target = _self/_blank/inner(配合iframe)
- em,strong (strong敲掉成都更重)
- span 给予特定表示
- br
- cite q 引用
- code 代码
- b i 格式化
### 组合内容
- div 分区，可视为其他标签的容器
- p 段落
- ul,ol,dl 列表，ul：无序列表 ol：有序列表 dl：自定义列表
- pre blockquote(cite：为引用出处)
### 嵌入资源
- img 自闭合 alt属性(图片没显示的话会显示的文字)
- iframe 嵌入页面
- object，embed 嵌入外部资源（类型+地址）
- video
- canvas svg 图形图像 map area 热点区域
### 表格
- caption thead tbody tfoot tr td th表头 rowspan colspan
### 表单 form 
- action提交的表单后台地址 method提交的方式
- fieldset 分区 legend分区中的标题
- input （name value）
### 实体字符
- &nbsp &#160 空格
- &quot &#34 引号
- &gt &#62 > &lt &#60 <
- &copy &#169 版权符号
- &amp &#38 &

# CSS

- <link></link> 引入外部样式表
- <style></style> 引入内部样式表
- <p style=""></p> 不建议这样
## 语法
<pre>
selectior{
    property1:value;
    property2:value;
}

注释 /* */
</pre>
<pre>
浏览器私有属性
- chrome,safari: webkit
- firefox: moz
- IE: ms
- opera: o
格式：
.pic{
    -webkit-transform:rotate(-3deg);
    -moz-transform:rotate(-3deg);
    -ms-transform:rotate(-3deg);
    -o-transform:rotate(-3deg);
    transform:rotate(-3deg);
}
</pre>
## 属性值语法
- margin:[&lt;length>|&lt;precetage>|auto ]{1,4}
- 基本元素 组合符号 数量符号
### 基本元素
- 关键字 auto, solid, bold...
- 类型 （基本类型，其他类型）
- 符号
- inherit, initial
### 组合符号
- 空格 &lt;'font-size'> &lt;'font-family'>(12px, arial)
- &&（顺序无关）
- || (顺序没有关系)
- | (只能出现一个)
- []
### 数量符号
- +: 出现一个或多个 ?:可出可不出现 {}:出现次数的范围 *：0，1，或者多 #：出现一次或者多次（逗号隔开）
### @规则语法
- @标识符 xxx;
- @标识符 {}
- 常用：@media @keyframes @font-face...

## 选择器
- 标签选择器 p{color:blue;}
- 类选择器 .special{color:red;} .stress{font-weight:bold;}
- id选择器 #banner{color:black;}
- 通配符选择器 *{color:bule;}
- 属性选择器 
1. [disabled]{background-color:#eee;} 
2. [type=button]{color:blue;}
3. [class~=sports]{color:blue;}(class包含sports)
（按空格隔开才能定位到）
4. sports{} == [class~=sports]{}
5. [lang|=en]{}（en/en-)
6. [href^="#"]{}（开头）
7. [href$=pdf]{}（结尾）
8. [href*="lady.163.com"]{}(包含)
- 伪类选择器 
1. a:link{color:gray;} a:visited{color:red;} a:hover{color:green;} a:active{color:oranger;} 
2. enabled disabled checked(input:enabled:{color:#ccc;})
3. li:first-child{} li:last-child{} li:nth-child(2n+1){} li:nth-last-child(2n+1){} :onlychild{}
4. dd:first-of-type{} dt:last-of-type{} dd:nth-of-type(2n){}
5. span:only-of-type{}
6. :empty :root :not() :target :lang()
- 伪元素选择器（两个：）
1. ::first-letter{}
2. ::first-line{}
3. ::before{content:"before";} ::after{content:"after";}
4. ::selection{color:red;background-color:#ccc;}
- 组合选择器
1. 后代/子选择器：.main h2{} .main>h2{}
2. 兄弟选择器：h2+p{} h2~p{}
- 选择器分组
h1,h2,h3{}
## 继承
- body{font-family:"Microsoft Yahei";}
- 继承属性 color font text-align list-style
- 非继承属性 background border position
## css优先级
- a=行内样式
- b=ID选择器
- c=类、伪类和属性选择器
- d=标签选择器和伪元素选择器
## 层叠
- 相同属性会覆盖（优先级，后面覆盖前面）
- 不同属性会重叠
- 改变优先级
1. 该表先后顺序
2. 提升选择器优先级
3. !important

## 文本
- font-size (length|precentage) 
<br>font-size:12px font-size:2em
- font-family (family-name|generic-family)# 
<br>font-family:arial, Verdana, sans-serif;
- font-seight (normal|bold|bolder|lighter)
<br>font-weight: bold;
- font-style (norma|italic|oblique)
<br>italic:用字体的斜体 oblique:字体变倾斜
<br>font-style: italic;
- line-height(noraml|number|length|percentage)
<br>line-height: 40px; line=height: 3em; line-height: 300%; line-height: 3;
- font: [[&lt;font-sytle>||&lt;font-weight>]?&lt;font-size>[/&lt;line-height>]?&lt;font-family>]
<br>font:italic bold 20px/2 arial,serif; 
- color
<br> red; ##ff0000; rgb(255, 0, 0); rgba(255, 0, 0, 1); rgba(255, 0, 0, 0.5); transparent;
- text-align:left|right|center|justify
- vertical-align:baseline|sub|super|top|text-top|middle|bottom|text-bottom|&lt;percentage>|&lt;length>
- text-indent:&lt;length>|&lt;percentage>
<br> text-indent:2em
- white-space: normal|nowrap|pre|pre-wrap|pre-line
- word-warp: normal|break-word
- word-break: normal|keep-all|break-all
- text-shadow: none|[&lt;length>{2,3}&&&lt;color>?]#
<br> text-shadow:1px 2px 3px #f00;(x轴偏移方向，y轴便宜方向，阴影半径，颜色)
-text-decoration: none|[underline||overline||line-through]
-text-overflow: clip|ellipsis
<br>text-overflow:ellpsis;overflow:hidden;white-space:nowrap;
- cursor:pointer|default|auto|...
- inherit

## 盒模型
content padding border margin
- padding:[&lt;length>|&lt;percentage>]{1,4} T R B L(对面相等，后者省略)
- margin:[&lt;length>|&lt;percentage>]{1,4}
<br> margin合并
- border [&lt;border-width>||&lt;border-style>||&lt;border-color>]
- border-radius:[&lt;length>|&lt;percentage>]{1,4}[/[&lt;length>|&lt;percentage>]{1,4}]?
- overflow: visible|hidden|scroll|auto
- box-sizing: content-box|border-box
- box-shadow: none|&lt;shadow>[,&lt;shadow>]* 
<br> box-shadow: 4px 6px 3px px red
<br>水平偏移 垂直偏移 模糊半径 阴影大小
<br> inset(内阴影 )
- outline (outline-wide outline-style outline-color)不占空间 border外

## 背景
- background-color
- background-image
<br> url() url(" ") url(' ')
- background-repeat(space, round, repeat, no-repeat)
<br>background-repeat:no--repeat repeat,repeat-x;
- background-attachment(scroll, local)
- background-position(length precentage)
- linear-gradient (angel,side-or-corner,color-stop )
<br>background-image:linear-gradient(to right bottom, red, blue);
<br>background-image:linear-gradient(red, green 20%, blue);
- radial-gradient(circle,ellipse)
<br>background-image:radial-gradient();
<br>closest-side, red, blue 
<br>circle, red, blue(半径以farthest-corner 除非自己定义半径 eg.circle 100px)
<br>red, blue(这样是椭圆，半径可以自己定义)eg.(100px 50px at 0 0, red, blue)
<br>red, green 20%, blue
- repeating-*-gradient();
- background-origin: padding-box;(默认)可改为content-box
- background-clip: border-box;(默认)可改为content-box padding-box
- background-size: [&lt;length>|&lt;percentage>|auto]{1,2}|cover|contain
- background: url(red.png) 0 0/20px 20px no-repeat, url(blue.png) 50% 50%/contain no-repeat content-box green

## 布局
- display: block|inline|block-inline|none
<br>block: 默认宽度为父元素 可设置宽高 换行显示 div, p, h1-h6, ul, form,...
<br>inline: 默认宽度为内容宽度 不可设置宽高 同行显示 span, a, label, cite, em, ...
<br>inline-block: 内容宽度 可设置宽高 同行显示 input, textarea, select, button
<br>none: 设置元素不显示
display:none: 消失了，不占据位置
visibility: hidden: 消失了，占据位置
- .content{margin:0,auto} 可实现水平居中
- position: static|relative|absolute|fixed
<br> relative: 参照物为元素本身 
<br> absolute: 默认宽度为内容宽度 脱离文档流 参照物为第一个定位祖先/根元素
<br> fixed: 默认宽度为内容宽度 脱离文档流 参照物为视窗
<br>top/right/bottom/left 元素边缘距离参照物边缘的距离
- z-index: z轴上的排序
- float: left right
<br> 默认宽度为内容宽度 半脱离文档流（对元素，脱离文档流，对内容在文档流） 向指定方向一直移动
<br> float的元素在同一文档流中
- clear: both|left|right
- clear-fix::after{
    content="";
    clear: both;
    display: block;
}
- display: flex;
- flex-direction:row|row-reverse|column|column-reverse
- flex-wrap: no-warp|warp|warp-reverse
- flex-flow: flex-direction 和 flex-wrap 的简写属性。 row no-warp(默认的) flex-direction||flex-wrap
- order: 0(默认的) 相对的值
- flex-basis: 规定弹性项目初始长度
- flex-grow: 规定项目相对于其余项目的增量
- flex: flex-grow||flex-shrink||flex-basis(注意别乱加逗号)
- jusify-content: 在容器中央对齐弹性项目
- align-items: 将弹性 div 元素的所有项目的居中对齐
- align-self: 把弹性元素内的项目之一居中对齐
- align-content: 将行打包到弹性容器的中央

## 变形
- transform:
translate()
rotate()
scaleX()
scaleY()
scale()
skewX()
skewY()
skew()
matrix()
<br>matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
- transform-origin: 设置旋转元素的基点位置
### 3D变形: 
perspective()定义 3D 转换元素的透视视图\
- transform: rotate3d(x,y,z,angle)
- transform: translate3d(value,value,length)
- transform: scale3d(number,number,number)
- y轴正的在下面 
- transform-style: flat|preserve-3d; 默认为flat
- backface-visibility: visible|hidden; 默认为visible

## 动画
<pre>
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}
.aa {  
  width: 100px;
  height: 100px;
  position: relative;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
  }
</pre>
- animation-name
- animation-duration
- animation-delay
- animation-iteration-count
- animation-direction
- animation-timing-function
- animation-fill-mode
- animation
<pre>
div {
  animation-name: example;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</pre>









[百度](http://www.baidu.com)

<img decoding="async" src="http://static.runoob.com/images/runoob-logo.png" width="50%">

![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)

# JS
## 函数
1. 函数定义方式
    1. function Employee() {}
    2. var Employee = function(){}
    3. var Employee = new Function();
2. 用户自定义函数可以当构造器，内置函数不可以当构造器。

场景 | 值
:-: | :-: 
全局环境 | 全局对象（window）
constructor | 新创建的对象
函数调用 | 函数的调用者
new Function | 全局对象（window）
eval | 调用上下文中的this

## 基本类型
- undefined
- null
- typeof 可以识别标准类型(Null除外)，不能识别具体的对象类型
- Object.prototype.toString 可以识别标准和内置，不能识别自定义类型
- constructor 识别标准类型(Undefined、null除外)、内置对象和自定义对象类型
- instanceof 判别内置、自定义类型，不能判别原始类型

## 内置对象
普通对象和构造器对象
- Object 
<br>var obj = {name:'Jerry', age:0};
  1. Object.create
  2. Object.prototype.toString
  3. Object.prototype.hasOwnProperty
- Boolean
 <br>除了对象意外，其他类型转为bool均为false、
- String
  1. String.prototype.indexOf
  <br> var idx = str.index('xxx') str.indexOf('to',idx+1)
  2. String.prototype.replace
  <br>只替换第一个
  3. String.prototype.split
- Number
  1. Number.prototype.toFixed(指定小数位数)
- function
  1. Function.prototype.apply
  2. Function.prototype.bind
- arguments
- 值传递 是在栈内存中复制，如果是引用（到堆内存），则二者指向同一堆内存
- RegExp 定义正则表达式对象
  1. RegExp.prototype.test
- Data 定义日期对象
- Math 
  1. Math.floor 向下取整
  2. Math.ceil 向上取整
  3. Math.round 四舍五入
  4. Math.random 去0-1随机浮点数
- Json 
  1. Json.stringify 将json对象序列化为字符串
  2. Json.parse 将json字符串转换为json对象
- 全局对象 
  1. NaN 不等于任何值包含本身，用isNaN()判断
  2. parseInt 将字符串转数字
  3. eval 计算某个字符串，并执行其中代码
  4. encodedURIComponent 将URI参数中的中文、特殊字符等作为URI一部分进行编码 

# DOM
- collection is live
- list is not live
- 节点操作
  1. 创建节点 document.createElement("");
  2. 修改节点 
  - 修改节点内容 element.textContent element.innerText
  3. 插入节点
  - element.appendChild()
  - element.insertBefore()
  4. 删除节点
  - element.removeChild()
  5. element.innerHTML = ''

## 属性操作
* input.
* input.getAttribute() .setAttribute()
* div.dataset.

## 样式操作
* element.style.cssText = 
* element.style.xxx = 
* window.getComputedStyle(element)


## 规范
1. 分类命名 样式（布局、模块）
2. 命名格式 大小写 长度（权衡长度和可读性）
3. 语义化命名
### 书写格式
1. 单行与多行
2. 空格与分号
3. 属性顺序（显示属性 自身属性 文本属性和其他修饰）
4. Hack方式
5. 值格式
6. HTML规范
7. 图片规范
## 模块化

CSRF
 - 第三方网站引导发出的cookie除了用于CSRF攻击，还可以用于用户追踪。
 - SameSite Cookie用来限制第三方Cookie，从而减少安全风险
  1. Strict： 最为严格，完全禁止第三方cookie（过于严格，会造成不好的用户体验）
  2. Lax： 大多数情况不发送第三方Cookie，只有链接，GET和预加载请求才会发送Cookie
  3. None： 关闭SameSite属性，不过必须同时设置Secure属性，否则无效