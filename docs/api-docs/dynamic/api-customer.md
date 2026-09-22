---
sidebar_position: 2
slug: /api-dynamic-customer
description: Agent customer API — list customers, create accounts, update passwords, and change account status.
---

# Agent Customers

---
## 1. List agent customers

**GET** `/open/customer/list`

**Description:** Returns agent customer records with pagination and optional filters.

#### Request parameters

| Name     | Type    | Required | Description      | Default |
| -------- | ------- | -------- | ---------------- | ------- |
| pageNum  | Integer | No       | Page number      | 1       |
| pageSize | Integer | No       | Page size        | 10      |
| userName | String  | No       | Customer account | null    |

#### Response format

| Field                    | Type            | Description                    |
| ------------------------ | --------------- | ------------------------------ |
| code                     | Integer         | `200` = success                |
| msg                      | String          | Message                        |
| data                     | Object          | Payload                        |
| data.total               | Long            | Total records                  |
| data.rows                | `Array<Object>` | Rows                           |
| data.rows[].trafficCount | BigDecimal      | Recharged traffic (MB)         |
| data.rows[].residualFlow | BigDecimal      | Remaining traffic (MB)         |
| data.rows[].customerId   | Long            | Customer ID                    |
| data.rows[].userName     | String          | Login username                 |

#### Request example

```bash
curl -X GET "http://006ip.com/prod-api/open/customer/list?pageNum=1&pageSize=10&userName=" -H "token: your-access-token"
```

#### Response example

**Success:**

```json
{
  "msg": "操作成功",
  "code": 200,
  "data": {
    "total": 1,
    "rows": [
      {
        "trafficCount": 512000000.0,
        "residualFlow": 205587097.6,
        "customerId": 39,
        "userName": "bazhuayu@gmaill.com"
      }
    ],
    "code": 200,
    "msg": "查询成功",
    "other": null
  }
}
```

**Authentication failed:**

```json
{
  "code": 200,
  "msg": "无效的认证令牌",
  "data": null
}
```

## 2. Create account

**GET** `/api/agent/addUser?userName=lisi@q.com`

**Description:** Create a user account.

### Request parameters

| Name     | Required | Type   | Description                    |
| -------- | -------- | ------ | ------------------------------ |
| userName | Yes      | String | Account email                  |

### Response fields

| Name       | Type    | Description                                                                 |
| ---------- | ------- | --------------------------------------------------------------------------- |
| code       | Integer | `200` success; `201` name exists (your channel); `202` exists (other channel); else failure |
| msg        | String  | Message                                                                     |
| customerId | Integer | Customer ID                                                                 |
| Token      | String  | User token                                                                  |
| password   | String  | Random verification password                                                |

### Response example

```text
{
    "msg": "注册失败，该用户名已存在,不是该渠道的客户",
    "code": 202
}

{
    "msg": "操作成功",
    "password": "abcdefg",
    "code": 200,
    "customerId": 888,
    "Token": "AAEYX6KEXMJUZ86NVZRASRZF50A"
}
```

## 3. Update proxy password

**GET** `/api/agent/updatePwd?customerId=888&password=123456`

### Request parameters

| Name       | Required | Type   | Description        |
| ---------- | -------- | ------ | ------------------ |
| customerId | Yes      | String | Target customer ID |
| password   | Yes      | String | New password       |

### Response fields

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| code | Integer | `200` success; `201` name exists (your channel); else failure |
| msg  | String  | Message                                          |

### Response example

```text
{
    "msg": "成功",
    "code": 200
}
```

## 4. Enable or disable customer

**GET** `/api/agent/changeStatus?customerId=888&customerState=1`

### Request parameters

| Name          | Required | Type    | Description                  |
| ------------- | -------- | ------- |------------------------------|
| customerId    | Yes      | String  | Target customer ID           |
| customerState | Yes      | Integer | `1` = active; `0` = disabled |

### Response fields

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| code | Integer | `200` success; `201` name exists (your channel); else failure |
| msg  | String  | Message                                          |

### Response example

```text
{
    "msg": "成功",
    "code": 200
}
```

---
© 2025 Agent Customer API — v1.0.0

Last updated: December 26, 2025
