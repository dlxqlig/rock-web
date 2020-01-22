# 1. rock-web

# 2. 前言
  该项目为前后端分离项目的前端部分,后端:[rock](https://github.com/dlxqig/rock)
  前端App：【rock-uniapp】(https://github.com/dlxqig/rock-uniapp)

# 3. 演示地址 敬请期待

## 3.1. 参考项目

macrozheng/mall-admin-web，在mall-admin上独立演化。

### 3.1.1. 项目布局

``` lua
src -- 源码目录
├── api -- axios网络请求定义
├── assets -- 静态图片资源文件
├── components -- 通用组件封装
├── icons -- svg矢量图片文件
├── router -- vue-router路由配置
├── store -- vuex的状态管理
├── styles -- 全局css样式
├── utils -- 工具类
└── views -- 前端页面
    ├── home -- 首页
    ├── layout -- 通用页面加载框架
    ├── login -- 登录页
    ├── oms -- 订单模块页面
    ├── pms -- 商品模块页面
    └── sms -- 营销模块页面
```

### 3.1.2. 项目运行

- git clone <https://github.com/dlxqig/rock-web>
- yarn install 或者 npm install
- 启动后台服务
- 配置config/config.js中的BASE_API为后台服务地址
- yarn dev 后者 npm dev
- enjoy

### 开发计划

- [ ] 流程优化。
- [ ] 基于Spring Cloud重构，监控环境集成。
- [ ] 其他。

