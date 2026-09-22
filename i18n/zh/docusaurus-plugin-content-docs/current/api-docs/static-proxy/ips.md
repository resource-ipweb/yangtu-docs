---
sidebar_position: 7
slug: /static-proxy/ips
description: 静态 IP 开放平台资产查询：IP 分页列表、IP 详情。
---

# 我的 IP

**鉴权：** 须 `UserId`、`Token`。

查询当前开发者账号下持有的静态 IP 资产（含完整连接信息与账密）。

---

## 1. IP 分页列表

**`POST /open/staticip/ips/page`**

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `pageIndex` | number | 是 | 页码，从 1 起 |
| `pageSize` | number | 是 | 每页条数 |
| `criteria` | object | 否 | 筛选条件 |

**`criteria` 常用字段：**

| 字段 | 说明 |
|------|------|
| `countryCode` / `country` | 国家代码 |
| `keyword` | IP / 备注等关键词 |
| `usageStatus` | 使用状态筛选 |

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `pageIndex` / `pageSize` / `total` | 分页信息 |
| `results` | IP 列表 |
| `results[].id` | 用户 IP 主键（续费 `resourceIds` 使用） |
| `results[].proxyIp` | 出口 IP |
| `results[].countryCode` / `countryName` | 国家 |
| `results[].cityName` | 城市 |
| `results[].expireTime` | 到期时间 |
| `results[].status` | 资产状态 |

<ApiPlayground name="IP 分页列表" />

---

## 2. IP 详情

**`POST /open/staticip/ips/detail`**

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 用户 IP 主键 |

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `id` | 用户 IP 主键 |
| `proxyIp` | 出口 IP |
| `proxyPort` | 端口 |
| `proxyUser` / `proxyPassword` | 代理账密 |
| `country` / `city` | 地域 |
| `expireTime` | 到期时间 |
| `protocol` | 协议类型 |
| 其他连接字段 | 以实际返回为准 |

<ApiPlayground name="IP 详情" />
