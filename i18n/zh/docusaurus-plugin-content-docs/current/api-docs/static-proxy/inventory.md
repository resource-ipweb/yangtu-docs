---
sidebar_position: 3
slug: /static-proxy/inventory
description: 静态 IP 开放平台库存查询：国家库存树、CIDR 段库存。
---

# 库存查询

**鉴权：** 须 `UserId`、`Token`。

购买前按条件查询可购数量；`condition` 结构与 [购买](/static-proxy/purchase) 报价/下单一致。

---

## 1. 国家库存树

**`POST /open/staticip/inventory/countries`**

按洲/国家/城市返回可购数量。

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `countryCode` | string | 否 | 收窄单国；`ALL` 或不传表示不限 |
| `continentCode` | string | 否 | 大洲代码 |
| `keyword` | string | 否 | 匹配国家/城市名称 |
| `needInventory` | boolean | 否 | `true` 返回 `available`（默认）；`false` 轻量树，`available` 为 null |
| `condition` | object | 否 | 购买条件试算，见下表 |

**`condition` 字段：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `sellMode` | number | 是 | `1` 独享 / `2` 共享 |
| `lineType` | string | 是 | `basic` / `standard` / `premium` |
| `maxShare` | number | 否 | 共享上限，共享模式默认 `10` |
| `allocateStrategy` | number | 否 | `1` 随机 / `2` 指定段 / `3` 指定 IP |
| `businessId` | string | 否 | 业务用途 ID |
| `isUdp` | boolean | 否 | 是否 UDP |

**响应 `data` 数组元素：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `continentId` | string | 大洲 ID |
| `countryId` | string | 国家 ID |
| `countryCode` | string | 国家代码 |
| `nameZh` / `nameEn` | string | 国名 |
| `available` | number | 该国可购 IP 总数 |
| `cities` | array | 城市明细 |
| `cities[].cityId` | string | 城市 ID |
| `cities[].nameZh` / `nameEn` | string | 城市名 |
| `cities[].available` | number | 城市可购数 |

<ApiPlayground name="国家库存树" />

---

## 2. CIDR 段库存

**`POST /open/staticip/inventory/cidrs`**

指定国家（及可选城市）下 CIDR 段列表及余量。

**Body：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `countryCode` | string | 是 | 国家代码 |
| `cityCode` | string | 否 | 城市 ID 的字符串形式 |
| `keyword` | string | 否 | CIDR 关键词 |
| `condition` | object | 是 | 购买条件（同上） |
| `sort` | object | 否 | 排序 |
| `sort.field` | string | 否 | `price` / `stock` |
| `sort.direction` | string | 否 | `asc` / `desc` |

**响应 `data` 数组元素：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `cidrId` | string | CIDR 资源主键 |
| `cidr` | string | 网段，如 `1.2.3.0/24` |
| `countryCode` | string | 国家代码 |
| `cityId` | string | 城市 ID |
| `nameZh` / `nameEn` | string | 展示名称 |
| `available` | number | 可用 IP 数 |
| `unitPrice` | number | 单价 |
| `currency` | string | 币种 |
| `ipCount` | number | 网段 IP 总数 |
| `cidrKey` | string | 业务键（指定段下单用） |
| `availableBitmap` | string | 可用位图（指定 IP 时用） |

<ApiPlayground name="CIDR 段库存" />
