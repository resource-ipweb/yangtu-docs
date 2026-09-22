---
sidebar_position: 4
slug: /static-proxy/purchase
description: 静态 IP 开放平台购买：配置项、报价、下单并支付。
---

# 购买

**鉴权：** 须 `UserId`、`Token`。

推荐流程：`options` → `inventory` → `quote` → `place-and-pay`。

---

## 1. 购买配置项

**`GET /open/staticip/purchase/options`**

返回周期、线路、带宽、UDP、业务用途等可选项（同用户端购买页配置）。

**请求参数：** 无

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `exclusivityOptions` | 独享/共享选项 |
| `qualityOptions` | 线路质量（`lineType`） |
| `udpOptions` | UDP 开关 |
| `bandwidthOptions` | 带宽档位 |
| `connLimitOptions` | 连接数档位 |
| `businessOptions` | 业务用途（`common` / `hot` / `all` 分类树） |
| `durationOptions` | 购买天数档位 |

<ApiPlayground name="购买配置项" />

---

## 2. 购买报价

**`POST /open/staticip/purchase/quote`**

根据购买配置计算应付金额，**不落单**。

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config` | object | 是 | 购买配置，见下表 |
| `clientQuoteVersion` | string | 否 | 客户端报价版本（并发校验） |

**`config` 主要字段：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sellMode` | number | 是 | `1` 独享 / `2` 共享 |
| `lineType` | string | 是 | `basic` / `standard` / `premium` |
| `businessId` | string | 是 | 业务用途 ID |
| `isUdp` | boolean | 是 | 是否 UDP |
| `bandwidthLimit` | number | 否 | 带宽上限 M/s，`0` 表示不限速 |
| `connLimit` | number | 是 | 每 IP 并发连接上限 |
| `days` | number | 是 | 购买天数 |
| `allocateStrategy` | number | 是 | `1` 随机 / `2` 指定段 / `3` 指定 IP |
| `purchaseIpCount` | number | 是 | 购买 IP 总数 |
| `proxyType` | string | 否 | 如 `socks5` / `http` |
| `quotaItems` | array | 条件 | `allocateStrategy=1` 时必填，地区配额 |
| `segmentItems` | array | 条件 | `allocateStrategy=2` 时必填，CIDR 段明细 |
| `specificIpItems` | array | 条件 | `allocateStrategy=3` 时必填，指定 IP |

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `quoteId` | 报价快照 ID，下单须回传 |
| `quoteVersion` | 报价版本号，下单须回传 |
| `amount` | 应付金额 |
| `currency` | 币种 |
| `expiresAt` | 报价过期时间 |
| `regionLines` | 地区维度明细 |
| `orderSummary` | 优惠拆分（时长/数量折扣等） |

<ApiPlayground name="购买报价" />

---

## 3. 下单并支付

**`POST /open/staticip/purchase/orders/place-and-pay`**

一键创建订单并以**钱包余额**支付；余额不足原子失败。

**推荐 Header：** `X-Idempotency-Key`（幂等键）

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `quoteId` | string | 是 | 报价返回的 `quoteId` |
| `quoteVersion` | string | 是 | 报价返回的 `quoteVersion` |
| `config` | object | 是 | 须与报价时一致 |

**响应 `data` 主要字段：**

| 字段 | 说明 |
|------|------|
| `orderNo` | 订单号 |
| `orderId` | 订单主键 |
| `status` | 订单状态 |
| `amount` | 实付金额 |
| `currency` | 币种 |
| `deliverIpCount` | 已交付 IP 数 |

**常见业务错误码：** `60004` 余额不足；`60306`–`60309` 下单/幂等相关。

<ApiPlayground name="下单并支付" />

---

## 4. 分配策略与明细结构

### quotaItems（随机模式，`allocateStrategy=1`）

| 字段 | 说明 |
|------|------|
| `type` | `country_random` / `city` / `global_random` / `continent_random` |
| `quantity` | 数量 |
| `countryCode` | 国家代码 |
| `cityId` / `cityCode` | 城市（指定城市时） |

### segmentItems（指定段，`allocateStrategy=2`）

| 字段 | 说明 |
|------|------|
| `cidr` | 网段 |
| `cidrId` | CIDR 资源 ID（可选） |
| `countryCode` / `cityId` | 地域 |
| `purchaseIpCount` | 本段购买数量 |

### specificIpItems（指定 IP，`allocateStrategy=3`）

| 字段 | 说明 |
|------|------|
| `proxyIp` | 出口 IP |
| `proxyId` | 资源池 ID（可选） |
| `countryCode` / `cityId` | 地域 |
