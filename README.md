# 006ip OPenAPI 文档

## 环境要求

- Node.js >= 20

## 本地开发

1. 拉取仓库到本地

2. 安装依赖

   ```bash
   npm install
   ```

   若依赖安装异常，可使用 lockfile 重新安装：

   ```bash
   npm ci
   ```

3. 启动开发服务（热更新）

   ```bash
   # 英文（默认，访问 /）
   npm start

   # 中文（访问 /zh/）
   npm run start:zh
   ```

   默认地址：<http://localhost:3000>

## 本地打包与预览

用于查看**生产构建**效果（与线上部署一致）：

```bash
# 1. 打包
npm run build

# 2. 启动静态预览服务
npm run serve
```

启动后访问 <http://localhost:3000>：

- 英文：`http://localhost:3000/`
- 中文：`http://localhost:3000/zh/`

> `build` 产物输出在 `build/` 目录；`serve` 用于本地预览该目录，不会自动重新编译，修改文档后需重新执行 `npm run build`。

## iframe 嵌入预览

页面 URL 携带 `?link=insert` 时，会隐藏顶部导航、侧边菜单、面包屑和页脚，例如：

```
http://localhost:3000/api-authentication/?link=insert
http://localhost:3000/zh/api-authentication/?link=insert
```

## 其他说明

- `page` 分支为只读，不能操作。
