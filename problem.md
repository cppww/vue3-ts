1. app.vue中设置css格式，不然内容只有很小一坨，默认居中
2. 图片不设置cover无法全填充
3. 全填充后的图片会有溢出部分，即页面会往下滑
4. 设置style lang=scss报错（npm install --save-dev sass 解决。--save-dev命令用于安装开发环境所需的依赖包，这些依赖包通常不需要在生产环境中使用。
5. export出去的属性名没有被使用到。 解决：名字取错了
6. app.vue 100%有问题（没解决）
7. find 报错
8. userooter useroot
9. handler target
10. router push的params。route获取不到。不被建议：This change will break your app. This behavior has worked in some scenarios but has been advised against for years as it's an anti-pattern in routing for many reasons, one of them being reloading the page lose the params. Fortunately, there are multiple alternatives to this anti-pattern:
11. onMounted 生命周期钩子搞懂(里面加then
12. ?为可选
13. 导出时，需要定义导出变量的名字
14. 范型
15. ref创建出来的是对象，要用.value才能获取到其中的值