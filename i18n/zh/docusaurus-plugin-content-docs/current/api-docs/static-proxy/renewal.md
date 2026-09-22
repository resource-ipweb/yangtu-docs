---
sidebar_position: 5
slug: /static-proxy/renewal
description: 静态 IP 开放平台续费：报价、续费并支付。
---

# 续费

**鉴权：** 须 `UserId`、`Token`。

`resourceIds` 为 **用户静态 IP 主键**（`t_static_user_ip.id`），可从 [我的 IP](/static-proxy/ips) 列表获取。

---

## 1. 续费报价

**`POST /open/staticip/renewals/quote`**

按资源 ID 列表与续费天数计算应付金额，**不落单**。

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `resourceIds` | string[] | 是 | 待续费用户 IP 主键列表 |
| `periodDays` | number | 是 | 续费天数（如 30 / 60 / 90 / 180 / 365） |

**响应 `data`：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `amount` | number | 预估应付金额 |
| `currency` | string | 币种 |

<ApiPlayground name="续费报价" />

---

## 2. 续费并支付

**`POST /open/staticip/renewals/orders/place-and-pay`**

一键创建续费订单并以钱包余额支付。

**推荐 Header：** `X-Idempotency-Key`

**Body：** 与报价相同（`resourceIds` + `periodDays`）

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `orderNo` | 续费订单号 |
| `orderId` | 订单主键 |
| `status` | 订单状态 |
| `amount` | 实付金额 |
| `currency` | 币种 |
| `successCount` | 续费成功 IP 数 |
| `failCount` | 续费失败 IP 数 |
| `errors` | 部分失败时的逐 IP 明细 |

**常见错误码：** `60004` 余额不足。

<ApiPlayground name="续费并支付" />
