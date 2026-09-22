---
sidebar_position: 6
slug: /static-proxy/orders
description: 静态 IP 开放平台订单查询：详情、状态。
---

# 订单查询

**鉴权：** 须 `UserId`、`Token`。

---

## 1. 订单详情

**`POST /open/staticip/orders/detail`**

返回订单详情，含规格摘要、IP 连接信息与账密、交付数量等（相对用户端 UI 字段已裁剪）。

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `orderNo` | string | 是 | 订单号 |

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `orderNo` | 订单号 |
| `status` | 订单状态（见下表） |
| `productName` | 产品名称 |
| `amount` / `discountAmount` / `currency` | 金额信息 |
| `createTime` / `payTime` | 创建/支付时间 |
| `purchaseIpCount` / `deliverIpCount` | 购买/已交付 IP 数 |
| `details` | 规格与 IP 列表（含连接信息、账密） |
| `refundSummary` | 退款摘要（如有） |

**订单状态（`status`）：**

| 值 | 说明 |
|----|------|
| 0 | 已取消 |
| 1 | 未支付 |
| 2 | 支付中 |
| 3 | 已支付 |
| 4 | 支付失败 |
| 5 | 已过期 |
| 10 | 已退款 |
| 20 | 已完成 |

<ApiPlayground name="订单详情" />

---

## 2. 订单状态

**`POST /open/staticip/orders/status`**

轻量查询，适用于轮询场景。

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `orderNo` | string | 是 | 订单号 |

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `orderNo` | 订单号 |
| `status` | 订单状态码 |

<ApiPlayground name="订单状态" />
