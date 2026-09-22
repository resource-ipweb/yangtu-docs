---
sidebar_position: 2
slug: /static-proxy/location
description: 静态 IP 开放平台地理位置字典：大洲、国家、州省、城市列表。
---

# 地理位置

查询国家/城市字典，供库存、下单等接口使用 `countryCode`、`cityId`（`cityCode`）。

**鉴权：** `/open/staticip/**` 须携带 `UserId`、`Token`（见 [接口认证](/static-proxy/authentication)）。

---

## 1. 大洲列表

**`GET /open/staticip/location/continents`**

返回已启用的大洲，供国家列表筛选。

**请求参数：** 无

**响应 `data` 数组元素：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `continentId` | string | 大洲 ID |
| `nameZh` | string | 中文名 |
| `nameEn` | string | 英文名 |

<ApiPlayground name="大洲列表" />

---

## 2. 国家列表

**`POST /open/staticip/location/countries`**

**Body（均可选）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `continentId` | string | 按大洲筛选 |
| `keyword` | string | 匹配中/英文国名 |

**响应 `data` 数组元素：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `countryId` | string | 国家 ID |
| `continentId` | string | 大洲 ID |
| `countryCode` | string | ISO2 国家代码（下单/库存使用） |
| `nameZh` / `nameEn` | string | 中/英文名称 |
| `continentName` | string | 所属大洲名称 |

<ApiPlayground name="国家列表" />

---

## 3. 州/省列表

**`POST /open/staticip/location/states`**

有州/省的国家（如 US）建议先选州省，再查城市。

**Body（均可选）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `countryId` | string | 国家 ID，与 `countryCode` 二选一 |
| `countryCode` | string | ISO2 国家代码 |
| `keyword` | string | 匹配州省名称 |

**响应 `data` 数组元素：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `stateId` | string | 州/省 ID |
| `countryId` | string | 国家 ID |
| `countryCode` | string | 国家代码 |
| `nameZh` / `nameEn` | string | 中/英文名称 |
| `countryName` | string | 所属国家名称 |

<ApiPlayground name="州/省列表" />

---

## 4. 城市列表

**`POST /open/staticip/location/cities`**

**Body 均可选；Body 可省略或传 `{}` 表示查询全部已启用城市。**

| 字段 | 类型 | 说明 |
|------|------|------|
| `stateId` | string | 州/省 ID |
| `countryId` | string | 国家 ID，与 `countryCode` 二选一 |
| `countryCode` | string | ISO2 国家代码 |
| `keyword` | string | 单独使用时可全局模糊搜索 |

**响应 `data` 数组元素：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `cityId` | string | 城市 ID；库存接口 `cityCode` 即此值的字符串 |
| `countryId` | string | 国家 ID |
| `stateId` | string | 州/省 ID（无州省时为空） |
| `countryCode` | string | 国家代码 |
| `nameZh` / `nameEn` | string | 中/英文名称 |
| `countryName` | string | 国家名称 |
| `stateName` / `stateNameEn` | string | 州/省名称 |

<ApiPlayground name="城市列表" />
