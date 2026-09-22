---
sidebar_position: 2
slug: /api-dynamic-flow
description: Dynamic traffic API — recharge and usage records, flow reports, recharge/deduct traffic, and consumption details.
---

# Dynamic Traffic

---

## 1. Get my traffic recharge records

**GET** `/open/dynamic/myRechargeFlowList`

**Description:** Returns your traffic recharge records with pagination and filters.

### Request parameters

| Name      | Type    | Required | Description                         | Default |
| --------- | ------- | -------- | ----------------------------------- | ------- |
| pageNum   | Integer | No       | Page number                         | 1       |
| pageSize  | Integer | No       | Page size                           | 10      |
| type      | Integer | No       | `0` = recharge; `1` = consumption   | 0       |
| account   | String  | No       | Target account                      | null    |
| startDate | String  | No       | Start date (`yyyy-MM-dd`)           | null    |
| endDate   | String  | No       | End date (`yyyy-MM-dd`)             | null    |

### Response format

| Field                  | Type            | Description                          |
| ---------------------- | --------------- | ------------------------------------ |
| code                   | Integer         | `200` = success                      |
| msg                    | String          | Message                              |
| data                   | Object          | Payload                              |
| data.total             | Long            | Total records                        |
| data.rows              | `Array<Object>` | Rows                                 |
| data.rows[].customerId | Long            | Customer ID                          |
| data.rows[].account    | String          | Account                              |
| data.rows[].flowCount  | BigDecimal      | Traffic (MB)                         |
| data.rows[].typeDesc   | String          | Type description                     |
| data.rows[].createId   | Long            | Operator ID                          |
| data.rows[].createBy   | String          | Operator account                     |
| data.rows[].createTime | String          | Created at (`yyyy-MM-dd HH:mm:ss`)   |

### Request example

```bash
GET http://006ip.com/prod-api/open/dynamic/myRechargeFlowList?pageNum=1&pageSize=10&type=0&account=test@cc.cc&startDate=2025-04-20&endDate=2025-09-20
```

### Response example

**Success:**

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 2,
    "rows": [
      {
        "customerId": 12345,
        "account": "customer1",
        "flowCount": 100.0,
        "typeDesc": "充值",
        "createId": 98765,
        "createBy": "admin",
        "createTime": "2025-11-17 10:30:00"
      },
      {
        "customerId": 12346,
        "account": "customer2",
        "flowCount": -20.0,
        "typeDesc": "消耗",
        "createId": 98765,
        "createBy": "admin",
        "createTime": "2025-11-17 11:15:00"
      }
    ],
    "code": 200,
    "msg": "查询成功"
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

---

## 2. Get traffic recharge records credited to me

**GET** `/open/dynamic/rechargeFlowListForMe`

**Description:** Returns recharge records where you are the recipient, with pagination and filters.

### Request parameters

| Name      | Type    | Required | Description               | Default |
| --------- | ------- | -------- | ------------------------- | ------- |
| pageNum   | Integer | No       | Page number               | 1       |
| pageSize  | Integer | No       | Page size                 | 10      |
| account   | String  | No       | Source recharge account   | null    |
| startDate | String  | No       | Start date (`yyyy-MM-dd`) | null    |
| endDate   | String  | No       | End date (`yyyy-MM-dd`)   | null    |

### Response format

Same as [Get my traffic recharge records](#1-get-my-traffic-recharge-records).

### Request example

```bash
GET http://006ip.com/prod-api/open/dynamic/rechargeFlowListForMe?pageNum=1&pageSize=10&type=0&account=admin@cc.cc&startDate=2025-04-20&endDate=2025-09-20
```

### Response example

**Success:**

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": {
    "total": 1,
    "rows": [
      {
        "customerId": 12347,
        "account": "customer3",
        "flowCount": 50.0,
        "typeDesc": "充值",
        "createId": 54321,
        "createBy": "myself",
        "createTime": "2025-11-17 09:15:00"
      }
    ],
    "code": 200,
    "msg": "查询成功"
  }
}
```

---

## 3. Get agent customer traffic usage report

**GET** `/open/dynamic/flowReport`

**Description:** Returns traffic usage per customer with pagination and filters.

### Request parameters

| Name       | Type    | Required | Description                                              | Default |
| ---------- | ------- | -------- | -------------------------------------------------------- | ------- |
| pageNum    | Integer | No       | Page number                                              | 1       |
| pageSize   | Integer | No       | Page size (max 2000)                                     | 100     |
| customerId | Long    | No       | Filter by customer ID; omit for all customers under agent | null    |
| startDate  | String  | No       | Start date (`yyyy-MM-dd`)                                | null    |
| endDate    | String  | No       | End date (`yyyy-MM-dd`)                                  | null    |

### Response format

| Field                    | Type    | Description                |
| ------------------------ | ------- | -------------------------- |
| code                     | Integer | `200` = success            |
| msg                      | String  | Message                    |
| data                     | Object  | Payload                    |
| data.rows[].reportDate   | String  | Date (`yyyy-MM-dd`)        |
| data.rows[].customerId   | Integer | Customer ID                |
| data.rows[].userName     | String  | Login username             |
| data.rows[].uploadFlow   | Double  | Upload traffic (MB)        |
| data.rows[].downloadFlow | Double  | Download traffic (MB)      |

### Request example

```bash
curl -X GET "http://006ip.com/prod-api/open/dynamic/flowReport?customerId=39&pageSize=10&pageNum=1&startDate=2021-12-26&endDate=2025-12-26" -H "token: your-access-token"
```

### Response example

**Success:**

```json
{
  "msg": "操作成功",
  "code": 200,
  "data": {
    "total": 1049,
    "rows": [
      {
        "reportDate": "2025-12-25",
        "customerId": 39,
        "userName": "xxxx@gmaill.com",
        "uploadFlow": 596.9,
        "downloadFlow": 57500.89
      }
    ],
    "code": 200,
    "msg": "查询成功",
    "other": null
  }
}
```

## 4. Multi-type traffic summary

**GET** `/api/agent/getFlowTotalFull`

### Response fields

| Name                   | Type    | Description           |
| ---------------------- | ------- | --------------------- |
| code                   | Integer | `200` = success       |
| msg                    | String  | Message               |
| data                   | Json    | Object                |
| account                | Json    | Primary account traffic |
| account.flowCount      | Float   | Recharged traffic (MB) |
| account.consumeFlow    | Float   | Consumed traffic (MB)  |
| account.residualFlow   | Float   | Remaining traffic (MB) |
| account2               | Json    | Secondary account traffic |
| account2.flowCount     | Float   | Recharged traffic (MB) |
| account2.consumeFlow   | Float   | Consumed traffic (MB)  |
| account2.residualFlow  | Float   | Remaining traffic (MB) |

### Response example

```text
{
    "msg": "操作成功",
    "code": 200,
    "data": {
        "account2": {
            "consumeFlow": 0.00,
            "residualFlow ": 5242880.00,
            "flowCount": 5242880,
            "residualFlow": 5242880.00
        },
        "account": {
            "consumeFlow": 0.0,
            "residualFlow ": 0.00,
            "flowCount": 0.00,
            "residualFlow": 0.00
        }
    }
}
```

## 5. NNI traffic consumption details

**GET** `/api/agent/getNNIFlowConsumeDetail?startDate=2023-06-20&endDate=2023-06-21`

### Request parameters

| Name      | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| startDate | No       | String | Start date  |
| endDate   | No       | String | End date    |

### Response fields

| Name | Type    | Description              |
| ---- | ------- | ------------------------ |
| code | Integer | `200` = success          |
| msg  | String  | Message                  |
| data | Array   |                          |
| date | String  | Date                     |
| flow | Float   | Consumed traffic (MB)    |

### Response example

```text
{
    "msg": "操作成功",
    "code": 200,
    "data": [
        {
            "date": "2023-06-20",
            "flow": 21889.75
        },
        {
            "date": "2023-06-21",
            "flow": 32335.47
        }
    ]
}
```

## 6. Traffic consumption details

**GET** `/api/agent/getFlowConsumeDetail?startDate=2023-06-20&endDate=2023-06-21`

### Request parameters

| Name      | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| startDate | No       | String | Start date  |
| endDate   | No       | String | End date    |

### Response fields

| Name         | Type  | Description           |
| ------------ | ----- | --------------------- |
| code         | Integer | `200` = success     |
| msg          | String | Message              |
| data         | Array  |                      |
| date         | String | Date                 |
| uploadFlow   | Float  | Upload traffic (MB)  |
| downloadFlow | Float  | Download traffic (MB)|

### Response example

```text
{
    "msg": "操作成功",
    "code": 200,
    "data": [
        {
            "date": "2023-06-20",
            "downloadFlow": 21889.75,
            "uploadFlow": 6529.83
        },
        {
            "date": "2023-06-21",
            "downloadFlow": 32335.47,
            "uploadFlow": 11423.92
        }
    ]
}
```

## 7. Recharge traffic

**GET** `/api/agent/rechargeTrafficCount?customerId=88&orderId=123456&trafficCount=1.01`

### Request parameters

| Name         | Required | Type  | Description                          |
| ------------ | -------- | ----- | ------------------------------------ |
| customerId   | Yes      | String | Target customer ID                  |
| orderId      | Yes      | String | Order ID (idempotency)               |
| trafficCount | Yes      | float | Amount to recharge (GB)              |

### Response fields

| Name | Type    | Description                                                                 |
| ---- | ------- | --------------------------------------------------------------------------- |
| code | Integer | `200` success; `203` order already processed; `204` not your channel customer; else failure |
| msg  | String  | Message                                                                     |

### Response example

```text
{
    "msg": "该订单已处理",
    "code": 201
}

{
    "msg": "充值成功",
    "code": 200
}
```

## 8. Deduct traffic

**GET** `/api/agent/deductionFlow?customerId=88&trafficCount=1.01`

### Request parameters

| Name         | Required | Type  | Description              |
| ------------ | -------- | ----- | ------------------------ |
| customerId   | Yes      | String | Target customer ID      |
| trafficCount | Yes      | float | Amount to deduct (GB)    |

### Response fields

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| code | Integer | `200` = success; other values = failure |
| msg  | String  | Message                                 |

### Response example

```text
{
    "msg": "扣除成功",
    "code": 200
}
```

---


© 2025 Dynamic Traffic API — v1.0.0

Last updated: December 26, 2025
