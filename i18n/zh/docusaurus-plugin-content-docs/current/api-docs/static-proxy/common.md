---
sidebar_position: 8
slug: /static-proxy/common
description: 静态 IP 新开放平台公共接口：连通性检测。
---

# 公共接口

以下接口**无需** `UserId` / `Token` 鉴权。

---

## 连通性检测

**`GET /open/main/ping`**

探测服务可用性与网络连通，返回服务器当前时间与应用标识。

**请求参数：** 无

**响应 `data`：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `serverTime` | string | 服务器当前时间 |
| `service` | string | 应用标识（如 `iproxy-open`） |

**示例：**

```bash
curl -X GET "https://006ip.com/api/open/main/ping"
```

```json
{
  "code": "0",
  "msg": "success",
  "data": {
    "serverTime": "2026-07-13T14:00:00+08:00",
    "service": "iproxy-open"
  }
}
```

<ApiPlayground name="连通性检测" />
