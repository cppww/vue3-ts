- TCP/IP / 如何保证数据包传输的有序可靠？
  - ACK 超时重发（数据包保留在缓冲区）

- TCP和UDP的区别
  - 单播，可靠，头部消耗小 单/多/广，不可靠，头部消耗小，速率高，实时性好

- 跨域的原理
  - 跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的。
  - 同源策略,是浏览器对 JavaScript 实施的安全限制，只要协议、域名、端口有任何一个不同，都被当作是不同的域。
  - 跨域原理，即是通过各种方式，避开浏览器的安全限制。
  - 解决方案
    - jsonp：ajax 请求受同源策略影响，不允许进行跨域请求，而 script 标签 src 属性中的链 接却可以访问跨域的 js 脚本（JSON 只支持 get，因为 script 标签只能使用 get 请求）
    - document.domain 基础域名相同 子域名不同
    - window.name 利用在一个浏览器窗口内，载入所有的域名都是共享一个window.name
    - CORS CORS(Cross-origin resource sharing)跨域资源共享 服务器设置对CORS的支持原理：服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求
    - proxy代理 目前常用方式,通过服务器设置代理
    - window.postMessage() 利用h5新特性window.postMessage()

- Cookie、sessionStorage、localStorage 的区别
  - 相同:存在客户端
  - 不同：
    - cookie不超过4k，另外两个可以达到5M+，大得多
    - cookie有效期之前有效，localStorage永久存储除非删除，不然一直有效，sessionStorge浏览器窗口关闭后自动删除
    - cookie数据会自动传递到服务器，sS和lS数据保存在本地。


- 粘包
  - 原因：
    - 发送端需要等缓冲区满才发送出去，造成粘包
    - 接收方不及时接收缓冲区的包，造成多个包接收
  - 方法：
    - 对于发送方引起的粘包现象，用户可通过编程设置来避免，TCP提供了强制数据立即传送的操作指令push，TCP软件收到该操作指令后，就立即将本段数据发送出去，而不必等待发送缓冲区满；
    - 对于接收方引起的粘包，则可通过优化程序设计、精简接收进程工作量、提高接收进程优先级等措施，使其及时接收数据，从而尽量避免出现粘包现象；
    - 由接收方控制，将一包数据按结构字段，人为控制分多次接收，然后合并，通过这种手段来避免粘包。分包多发。
    - 一种比较周全的对策是：接收方创建一预处理线程，对接收到的数据包进行预处理，将粘连的包分开。实验证明这种方法是高效可行的。

- 从输入URL到页面加载的全过程
  - 在浏览器中输入URL
  - 查找缓存（浏览器、系统、路由、ISP）
  - DNS域名解析（DNS 服务器是基于UDP的）
  - 建立TCP连接
  - 发起HTTP请求（该请求报文作为TCP三次握手的第三次数据发送给服务器）
  - 服务器响应并返回结果
  - 关闭TCP连接（四次挥手）
  - 浏览器渲染
    - 构建dom树
    - 构建css规则树
    - 构建render渲染树
    - 布局（Layout）
    - 绘制（painting）
  - js引擎解析过程
    - 创建window对象
    - 加载文件
    - 预编译
    - 解释执行
  
- 浏览器重绘与重排（回流）的区别？
  - 重绘：元素外观发生改变，没有改变布局
  - 重排：DOM的变化影响了几何信息
  - 二者代价都很高，重绘不一定重排，重排一定重绘
  - 添加、删除、更新DOM节点；display、visibilty、添加样式/动画、移动、用户行为等都可能触发

- 如何避免重绘或者重排？
  - 集中改变样式，不要一条一条修改dom
  - 不把dom节点的属性值放在循环里当变量
  - 动画的里的组件使用fixed或者absolute等等。
  - 不使用table布局，因为一个小的改动会造成整个table的重新布局
  - 尽量只修改position:absolute或fixed元素，对其他元素影响不大
  - 动画用GPU加速，translate使用3D变化
  - 提升为合成层（由GPU合成、只repaint本身、对于 transform 和 opacity 效果，不会触发 layout 和 paint）

- 303 （查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。
- 304 （未修改） 自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。
- 304过程:
  - a. 浏览器请求资源时首先命中资源的Expires 和 Cache-Control。
  - b. 强缓存失效，进入协商缓存阶段，首先验证ETagETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。服务器根据客户端上送的If-None-Match值来判断是否命中缓存。
  - c. 协商缓存Last-Modify/If-Modify-Since阶段。

- 浏览器缓存机制
  - 浏览器第一次向服务器发起该请求后拿到请求结果，会根据响应报文中HTTP头的缓存标识，决定是否缓存结果，是则将请求结果和缓存标识存入浏览器缓存中
  - 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
  - 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

- 强制缓存（Expires 和 Cache-Control，其中Cache-Control优先级比Expires高）
  - 强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。
    - 不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求（跟第一次发起请求一致）。
    - 存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用协商缓存。
    - 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果
- 协商缓存（Last-Modified / If-Modified-Since 和 Etag / If-None-Match，其中Etag / If-None-Match的优先级比Last-Modified / If-Modified-Since高）
  -  协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，**由服务器根据缓存标识**决定是否使用缓存的过程
    - 协商缓存生效，返回304
    - 协商缓存失效，返回200和请求结果

- 进程是资源分配的最小单位，线程是CPU调度的最小单位
- 协程，英文Coroutines，是一种基于线程之上，但又比线程更加轻量级的存在，这种由程序员自己写程序来管理的轻量级线程叫做『用户空间线程』，具有对内核来说不可见的特性。

- HTML5
  - 语义化指的是合理正确的使用语义化的标签来创建页面结构。
  - 语义化标签：header nav main article section aside footer
  - 语义化有点：
    - 在没CSS样式的情况下，页面整体也会呈现很好的结构效果
    - 代码结构清晰，易于阅读，
    - 利于开发和维护 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
    - 有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重

- CSS优先级
  - !important
  - 行内样式
  - id选择器
  - 类/伪类/属性选择器
  - 元素/伪元素选择器
  - 关系/通配符选择器

- position
  - fixed
  - absolute
  - relative
  - sticky
  - Static

- CSS 盒模型
  - content padding border margin

- BFC(Block Formatting Context 块级格式上下文)
  - BFC是CSS布局的一个概念，是一个独立的渲染区域，规定了内部box如何布局，并且这个区域的子元素不会影响到外面的元素。
    - 内部的Box会在垂直方向，一个接一个地放置
    - Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
    - 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反
    - BFC的区域不会与float box重叠
    - BFC是一个独立容器，容器里面的子元素不会影响到外面的元素
    - 计算BFC的高度时，浮动元素也参与计算高度
    - 元素的类型和display属性，决定了这个Box的类型。不同类型的Box会参与不同的Formatting Context。
  - 创建BFC
    - 根元素，即HTML元素
    - float的值不为none
    - position为absolute或fixed
    - display的值为inline-block、table-cell、table-caption
    - overflow的值不为visible
  - 使用场景
    - 去除边距重叠现象
    - 清除浮动（让父元素的高度包含子浮动元素）
    - 避免某元素被浮动元素覆盖
    - 避免多列布局由于宽度计算四舍五入而自动换行
- 水平居中
  - 行内元素：text-align: center
  - 确定宽度的块级元素:
    - margin:0, auto
    - margin-left: (father_width - son_width)/2，前提是父的position: relative
  - 不定宽的块级元素：
    - table + margin
    - flex justify-content: center
    - display: inline-block, text-align: center
    - 绝对定位＋transform

- 水平居中
  - line-height
  - 父元素相对定位，子元素绝对定位(margin/transform)
  - flex: 父级设置display: flex, 子类设置margin:auto
  - table 布局，父级通过转换成表格形式，然后子级设置 vertical-align 实现。（需要注意的是：vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素）。

- 隐藏页面某个元素的方法
  - opacity: 0：不改变布局，事件还可以响应
  - visibility: hidden：不改变布局，事件无法再响应，重绘
  - display: none：改变布局，重排

- css画个三角形
  <pre>
  div:after{
  content: "";
  position: absolute;
  height: 0px;
  width: 0px;
  border-top: 100px solid yellow;
  border-right: 100px solid transparent;
  border-left: 100px solid transparent;
  }
  </pre>

- 清除浮动
  - 元素中添加clear样式
  - 添加额外标签 clear
  - 父级添加overflow
  - 父级class添加clearfix，，使用伪元素.clearfix:after
  - <pre>.clearfix:after {
    content: '.';
    height: 0;
    display: block;
    clear: both;
    }</pre>
  
- 布局
  - flex
  - Rem 相对于根(html)的 font-size 大小来计算。简单的说它就是一个相对单例 如:font-size:10px;,那么（1rem = 10px）（适合移动端布局，数据量太大，与js代码有一定耦合性，必须把改变font-size的代码放在css样式前面）
  - 百分比（计算困难，相对父元素的属性并不唯一）
  - 浮动（缺点：脱离文档流）

- 移动端适配
  - rem：改变一个元素在不同设备上占据的css像素个数）没有破坏完美视口，但是px转rem有点复杂
  - viewpoint：每一个元素在不同设备上占据的css像素的个数是一样的。破坏完美视口，但是设计图量取的大小就是可以设置的大小

- js数据类型
  - 基本数据类型（值类型）：Number, String, Boolean, Symbol, null, undefined
  - 引用数据类型（复杂数据类型）：Object, Function, Array, Data, RegExp

- typeof
  - 不能把object, Array, null区分开
- instanceof
  - 能区分引用数据类型，不能区分基本数据类型。将引用类型转换成包装对象就可以区分了。想直接区分的话可以使用typeof
- toString.call()
  - 精准判断，写法繁琐，最好进行封装

- var, let, const
  - var：没有块的概念，可以跨块，不能跨函数。可以先使用再声明，存在变量提升。
  - let：在块中生效，不能跨块也不能跨函数
  - const：用来定义常量，必须初始化，只在块作用域中生效，且不能修改
  - var允许重复声明同一变量，let和const不允许
  - 在全局上下文中，基于let声明的全局变量和全局对象GO（window）没有任何关系 ; var声明的变量会和GO有映射关系；
  - 暂时性死区是浏览器的bug：检测一个未被声明的变量类型时，不会报错，会返回undefined
  - let /const/function会把当前所在的大括号(除函数之外)作为一个全新的块级上下文，应用这个机制，在开发项目的时候，遇到循环事件绑定等类似的需求，无需再自己构建闭包来存储，只要基于let的块作用特征即可解决。

- js垃圾回收机制
  - 存在大量不被释放的内存（堆/栈/上下文），页面性能会变得很慢。
    - 标记清除，进入执行环境，被标记进入幻境，离开执行环境，被标记离开环境。垃圾回收器会销毁带标记的值，并回收它们的内存空间。
    - 谷歌浏览器：查找引用，浏览器不定时查找，没被占用就回收
    - IE：引用计数法，当前内存被占用，计数就加一，移除就减一，减到0，浏览器就回收它。
  - 优化手段：内存优化算法，手动释放
    - 堆内存： fn=null
    - 栈内存： 在上下文中，把外部占用的堆占用取消即可。
  - 内存泄露：
    - 全局变量
    - 闭包
    - DOM元素引用
    - 定时器

- 作用域和作用域链（创建函数的时候，已经声明了当前函数的作用域[[scope]]:EC(G)，函数执行的时候，形成一个全新的私有上下文EC(FN)）
  - 定义：变量和函数可访问的范围，有当前环境和上层环境的变量对象组成
    - 全局作用域：代码再程序的任何地方都能被访问。
    - 函数作用域：只有在函数内部或固定的代码块才能被访问。
  - 作用：隔离变量，不同作用域同名变量不会冲突

- 闭包的两大作用：保护/保存
  - 概念：函数执行时，形成的私有上下文EC(FN),正常情况下，代码执行完会出栈后释放，但是可能会有私有上下文中某个东西被外部占用，导致不释放。
  - 作用
    - 保护：划分独立区域，不被外界影响
    - 保存：如果没被释放，私有变量可供上下文调用，相当于把值保存了下来。
  - 特性
    - 内部函数可以访问外部函数的参数和变量。设计私有的方法和变量，避免全局变量的污染。
    - 闭包是密闭的容器，存储数据的。
    - 闭包是一个对象，存储数据的格式为key-value
    - 函数嵌套函数
    - 将函数内部和外部连接起来，可以读取函数内部的变量，让这些变量值一直保存在内存中。
  - 形成条件
    - 函数的嵌套
    - 内部函数引用外部函数的局部变量，延长外部函数的生命周期
  - 用途
    - 模仿块级作用域
    - 保护外部函数的变量
    - 封装私有化变量
    - 创建模块
  - 事件绑定回调方法就是典型的闭包，优点：延长局部变量生命周期；缺点：可能会导致内存泄露

- call、apply：用this值和参数来调用参数，call接受一个参数列表，apply接受一个包含多个参数的数组。
- bind：创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

- java this的五种情况
  - 普通函数 指向window
  - 函数作为对象的方法 指向该对象
  - 构造器调用 指向返回的对象
  - 箭头函数 指向定义在的对象下，如果有嵌套，则绑定到最近一层的
  - 基于Function.prototype上的 apply 、 call 和 bind 调用模式

- 原型和原型链
  - 每个 class都有显示原型 prototype。 每个实例都有隐式原型 _ proto_。 实例的_ proto_指向对应 class 的 prototype
  - 原型：每当创建一个对象时，对象有一些预定义的属性，这些prototype指向原型对象。
  - 原型链：函数的原型链对象constructor默认指向函数本身，原型对象除了有原型属性外，为了实现继承，还有一个原型链指针__proto__，该指针指向上一层对象，可以不断调用该指针知道=null，获取原型链上的原型对象。
  - 特点：js中的对象用过引用来传递，每次创建对象时并没有一个它自己的原型副本，因此改变原型时，与之相关的对象都会改变。

- new运算符实现
  - 创建一个空对象
  - 设置原型，对象的原型设置为函数的prototype
  - 函数的this子项这个对象，并执行构造函数
  - 判断函数类型，返回相应的对象（值类型：创建的对象；引用类型：引用类型对象）

- Eventloop事件循环
  - js是单线程的，防止函数执行事件过长阻塞后面的代码，同步代码压入执行栈，异步代码推入异步队列。
  - 异步队列
    - 宏队列：宿主环境提供的，执行事件较长，优先级比微任务队列低（setImmediate setTimeout setInterval ajax script UI渲染）
    - 微任务队列，语言本身提供的（Promise.then，MutationObserver，then，messageChannel等）
  - js运行环境有浏览器和node。浏览器环境包含js引擎线程和渲染线程，两个线程互斥。node中只有js引擎线程。不同环境执行机制有差异，不同任务进入不同的队列，当主程结束，先执行准备好的微任务再执行准备好的宏任务，一次轮询结束。
  - 浏览器中的eventloop（由js的宿主环境浏览器实现的）
    1. 函数入栈，当栈中遇到了异步任务，交给webapis处理，接着执行栈中同步任务，直到栈为空
    2. 期间webapis完成此事件，将微任务和宏任务放进相应的队列
    3. 执行清空微任务队列
    4. 将宏任务的第一项放到栈的顶端，然后开始循环之前的步骤
  - node中的eventloop：基于V8引擎运行在服务端的js环境，处理高并发，I/0密集场景有优势。。
    1. timers: 计时器，执行setTimeout和setInterval的回调
    2. pending callbacks: 执行延迟到下一个循环迭代的 I/O 回调
    3. idle, prepare: 队列的移动，仅系统内部使用
    4. poll轮询: 检索新的 I/O 事件;执行与 I/O 相关的回调。事实上除了其他几个阶段处理的事情，其他几乎所有的异步都在这个阶段处理。
    5. check: 执行setImmediate回调，setImmediate在这里执行
    6. close callbacks: 执行close事件的callback，一些关闭的回调函数，如：socket.on('close', ...)

- setTimeout、Promise、Async/Await的区别
  - setTimeout是异步任务，回调函数放在宏队列中，等执行栈清空和微队列执行完后才执行
  - Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等。
  - async/await:async函数返回一个Promise对象，当遇到await时就先返回，等到触发的异步操作完成后在执行函数体内的语句。
- Async/Await 如何通过同步的方式实现异步
  - Async/Await就是一个自执行的generate函数，利用generate函数的特性可以把异步的代码改成同步的。第一个请求的返回值作为后面一个请求的参数，其中每一个参数都是一个promise对象

- 介绍节流防抖原理、区别以及应用
  - 节流：事件触发后，一定时间内，事件处理函数不能被再次调用。（规定事件内，函数只调用一次，且是最先的那次）nowtime - lasttime > delay才触发函数，并更新lasttime
  - 防抖：事件多次触发后，事件处理函数只执行一次。（每次函数出发后，会等待一定时间，如果时间没有再次被触发，才会执行时间处理函数，否则重新计时）每次触发函数清除计时器，并重新调用settimeout
  - 使用场景：
    - 节流：滚动加载更多，搜索框联想，高频点击，表单重复提交
    - 防抖：搜索框搜索输入，输入完以后自动搜索、信息输入验证、窗口大小resize变化后再重新渲染

- MVVM:视图模型双向绑定
  - 把MVC中的Controller演变成了ViewModel。Model层代表数据模型，View代表UI组件，ViewModel代表两者之间的桥梁，数据会绑定到ViewModel层然后自动将数据渲染到页面，视图更新时会通知ViewModel层更新数据。以前是操作DOM结构更新视图，现在是数据驱动视图。
  - 优点
    1. 低耦合。View可独立于Model变化和修改，Model可以绑定不同的View。
    2. 可重用性
    3. 独立开发
    4. 可测试

- Vue底层实现原理
  - Vue.js采用数据劫持结合订阅者-发布者的方式，通过Object.defineProperty()来劫持各个setter、getter函数，再数据发生变动之后发布消息给订阅者，并触发相应的监听回调函数。
  - Vue是典型的MVVM框架。使设计变得简单且直观。
  - Observer（数据监听器，通过Object.defineProperty()监听数据的变动，函数内部可以定义setter和getter，数据改变时触发setter，并通知订阅者Watcher。
  - Compile（指令解析器，解析模板中的命令，将模板变量替换成数据，然后初始化渲染页面视图，将每个指令对应的节点绑定更新函数，添加鉴定数据的订阅者，一旦数据发生变化，收到通知更新视图。
  - Watcher（订阅者，作为Observer和Compile之间通信的桥梁。
    1. 自身实例化时往属性订阅器（dep）里面添加自己
    2. 自身必须有一个update()方法
    3. 待属性变化dep.notice()通知时候，能调用自身update()，并发Complie中绑定的回调。

- Vue生命周期（beforexxx，xxxed）
  - create：实例创建
  - mount：实例被挂载到真实DOM节点
  - update：实例data发生变化，重新渲染
  - destory：实例被销毁

- computed和watch。computed拥有缓存功能，声明式的描述一个值依赖的其他值，当所依赖的值发生变化后，计算属性也会发生变化。watch监听的是已在data中的数据，如果数据发生变化，会触发watch中的方法。
  - watch 属性监听，键是需要观察的属性，值是回调函数，需要在数据变化时执行异步或开销较大的操作时使用。
  - computed 计算属性，属性的结果会被缓存，所依赖的属性未改变，结果从缓存读取。属性改变，return最新的结果。
  - 使用场景
    - computed：一个属性受多个属性影响。eg. 商品结算
    - watch：一条属性影响多条数据。eg. 搜索数据

- 组件中data为什么是一个函数
  - 一个组件被复用多次，也就会创建很多个实例，相当于都调用了同一个构造函数。
  - 不同组件间的实例不互相影响，所以data不能是对象，得是函数。

- v-for v-if不建议一起用
  - vue2.x中，v-for优先级更高，所以每次v-for，都要进行v-if，造成性能浪费。
  - 3.x 版本中 v-if 总是优先于 v-for 生效。语法上可能歧义，因此避免两者一起使用。
  - 这种场景建议使用 computed，先对数据进行过滤

- React/Vue项目中key的作用
  - 在diff算法中更快的找到节点，提高diff速度，更高效的更新虚拟dom。
    - 对比新旧虚拟节点，从而更新节点。根据新节点的key去对比旧节点，如果没找到旧节点，就当作是新增一个节点。不采用key的话就是进行遍历查找，速度更慢。
  - 为了在数据变化时强制更新组件，以避免“就地复用”带来的副作用。
    - 当 Vue.js 用 v-for 更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序。

- Vue组件通信方式
  - props/$emit 父子组件通信
    - 父->子 props 子->父 $on、$emit 父->子孙 Provide、inject 官方不推荐使用，但是写组件库时很常用
  - $emit/$on自定义事件 兄弟组件通信
    - Event Bus实现跨组件通信 Vue.prototype.$bus = new Vue()
  - vuex跨级组件通信
    - $attrs\$listeners Provide、inject

- nextTick的实现
  - nexttick是一个vue的全局API，在下次DOM更新循环结束之后执行回调函数。可以在回调中获取更新后的DOM节点。
  - 更新DOM时异步执行，只要监听到数据变化，Vue开启一个队列，缓冲同一时间循环中的所有数据变更。如果同一个watcher被触发多次，只会被推入到队列一次，这样对去除重复数据减少不必要的计算非常有用。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用。
  - 比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可；
  - 我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数，然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在nextTick中看到dom操作结果。

- nextTick实现原理
  - 在下次DOM执行结束之后执行回调函数，在修改数据之后立即使用nexttick来获取更新后的DOM。
  - 主要使用了宏任务和微任务。
    - 根据执行环境分别尝试采用Promise、MutationObserver、setImmediate，如果以上都不行则
    - 采用setTimeout定义一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法来清空队列。

- 使用过插槽么？用的是具名插槽还是匿名插槽或作用域插槽
  - vue中的插槽非常好用，slot是用来占位的。包含三种插槽
    - 默认插槽（匿名）：没有名字，只要默认的都填到这里
    - 具名插槽：有名字的
    - 作用域插槽

- keep-alive的实现
  - 作用：实现组件缓存，保存住这些组件的状态，避免反复渲染导致的性能问题。需要缓存组件频繁切换，不需要重复渲染。
  - 使用场景：tabs标签页 后台导航 vue性能优化

## TS
- Ts是Js的超集 增强能力，增强类型安全
- 有枚举类型
- any可以赋值和反向赋值，unkonwn只能赋值
- never：永远不存在值的类型（防御性编程）
- 元组需要显示的标识每一个元素的类型
- 函数重载
- 类：增加了关键字public protected private 
- 抽象类：只能被继承不能被实例化，作为基类，抽象方法必须背子类实现
- interface implements
- ｜联合类型可以在声明元素时选择多个类型，&交叉类型可以在原有属性实现扩展，取并集
- 同名类型取交集 同名的非基础类型会进行相关的元素组合关系
- type&interface 组合或者交叉类型一般用type，涉及到类一般用interface
  - 相同点：都可以用于继承，都可以定义对象或者函数
  - 不同点：
    1. interface本意是用来定义对象的，type只是一个别名
    2. interface可以重复声明，type不行
    3. interface没法用来定义基础对象
- 泛型 解决输入输出可关联的问题
  - 写在<>中，一般用T表示
  - 方法制定：1.定义要使用的类型 2.TS自动推倒
  - 作用：临时占位，之后通过传来的类型推倒
  - typeof：获取类型、keyof：获取所有键
  - in遍历枚举类型、T[k]索引访问、extends泛型约束
  - Partial将类型变为可选
  <pre>
      type Partial<T> = {
        [P in keyof T]? : T[P];
      };
  </pre>
  - Required将类型变为必选
  - Readonly将类型变为只读
- declare 三方库需要类型声明文件
- .d.ts 声明文件定义
- @types 三方库TS类型包
- tsconfig.json 定义TS的配置
- 泛型约束后端接口类型。<T extends keyof API>(url:T, obj: API[T])可解决路径错误和参数错误