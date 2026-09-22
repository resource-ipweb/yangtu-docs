---
sidebar_position: 1
slug: /static-proxy/authentication
description: 静态 IP 开放平台接口认证：获取开发者凭证、请求头格式、响应约定与鉴权错误码。
---

# 接口认证

---

## 1. 概述

**基础 URL：**

- **HTTPS（推荐）：** <ApiBaseUrl />

**数据格式：** `application/json`（`GET` 无 Body 的接口除外）

**字符编码：** UTF-8

静态 IP 开放平台接口挂载在用户端 API 服务上，路径前缀为 `/open/staticip/**`（另有少量免鉴权公共接口见 [公共接口](/static-proxy/common)）。

---

## 2. 获取开发者凭证

在调用业务接口前，须先在**用户控制台**登录账号，获取开发者 ID 与 Token：

| 控制台路径 | 说明 |
|-----------|------|
| 账号信息 → 我的账号 → 基本设置 | 查看 **Authentication** 区域 |

对应字段：

| 控制台字段 | 请求头名称 | 说明 |
|-----------|-----------|------|
| userId（开发者 ID / key） | `UserId` | 开发者身份标识 |
| token | `Token` | 开发者密钥 |

> **注意：** 请求头名为 `UserId`，填写的是开发者 ID（控制台 `key`），不是数值型的用户主键。

---

## 3. 请求头鉴权

**适用路径：** `/open/staticip/**`

每个业务请求须在 HTTP Header 中携带：

| Header | 必填 | 说明 |
|--------|------|------|
| `UserId` | 是 | 开发者 ID |
| `Token` | 是 | 开发者 Token |
| `Content-Type` | POST 有 Body 时 | `application/json` |
| `X-Idempotency-Key` | 写操作推荐 | 幂等键，防网络重试重复下单/续费 |

### 请求示例

```bash
curl -X POST "https://006ip.com/api/open/staticip/inventory/countries" \
  -H "Content-Type: application/json" \
  -H "UserId: your-developer-id" \
  -H "Token: your-developer-token" \
  -d '{"countryCode":"US"}'
```

### 安全建议

- 生产环境**必须使用 HTTPS**
- Token 等同于密码，勿写入客户端日志、勿提交到公开仓库
- Token 可在控制台轮换；轮换后旧 Token 立即失效

---

## 4. 响应格式

统一包装为 `Result<T>`：

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | string | `"0"` 表示成功；失败为错误码字符串（如 `"20000"`） |
| `msg` | string | 说明文案 |
| `data` | object / array | 成功时的业务数据 |
| `timestamp` | number | 服务端时间戳（毫秒） |
| `traceId` | string | 链路追踪 ID |

**成功示例：**

```json
{
  "code": "0",
  "msg": "success",
  "data": {},
  "timestamp": 1783934661982,
  "traceId": "5c361d2f-abdf-4c09-848d-f6b4a2e21636"
}
```

---

## 5. 大整数 ID

请求与响应中所有 id 类 `Long` 字段（含集合元素）在 JSON 中**双向使用字符串**，避免前端精度丢失：

```json
{
  "resourceIds": ["2059463641505337345"],
  "cityId": "1063729307"
}
```

库存/下单接口中的 `cityCode` 即 `cityId` 的字符串形式。

---

## 6. 鉴权错误码

| code | 说明 | HTTP 状态 |
|------|------|-----------|
| `20000` | 开发者凭证无效或已禁用 | 401 |
| `20010` | 缺少 `UserId` 请求头 | 401 |
| `20011` | 缺少 `Token` 请求头 | 401 |

**失败示例：**

```json
{
  "code": "20000",
  "msg": "开发者凭证无效或已禁用",
  "data": null,
  "timestamp": 1783934661982,
  "traceId": "..."
}
```

---

## 7. 典型调用流程

```
获取 UserId + Token（控制台）
  → GET  /open/staticip/location/...     查询国家/城市
  → GET  /open/staticip/purchase/options   购买可选项
  → POST /open/staticip/inventory/countries 查库存
  → POST /open/staticip/purchase/quote      报价
  → POST /open/staticip/purchase/orders/place-and-pay  下单并支付（钱包）
  → POST /open/staticip/orders/detail       查单
```

下一节起为各业务接口明细，见左侧目录。
