---
sidebar_position: 4
slug: /api-dynamic-account-sub
description: Dynamic proxy sub-account API — create, update, list sub-accounts, and fetch proxy credentials.
---
# Sub-Accounts
---
Base URL (`baseUrl`): `http://api.006ip.com:8004`

## 1. Create sub-account

**POST** `{baseUrl}/api/agent/childAccount/add`

### Request parameters

| Name      | Required | Type    | Description                                      |
| --------- | -------- | ------- | ------------------------------------------------ |
| username  | Yes      | String  | Sub-account (2–12 letters/digits)                |
| pwd       | Yes      | String  | Password (4–12 letters/digits)                   |
| limitFlow | No       | Integer | Traffic cap in MB; `< 0` = unlimited (default -1) |

### Response fields

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| code | Integer | `200` = success; other values = failure |
| msg  | String  | Message                                 |

### Response example

```text
{
    "code": 200,
    "msg": "查询成功"
}
```

## 2. Update sub-account password

**POST** `{baseUrl}/api/agent/childAccount/updatePwd`

### Request parameters

| Name     | Required | Type   | Description                        |
| -------- | -------- | ------ | ---------------------------------- |
| username | Yes      | String | Sub-account                        |
| pwd      | Yes      | String | New password (4–12 letters/digits) |

### Response fields

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| code | Integer | `200` = success; other values = failure |
| msg  | String  | Message                                 |

### Response example

```text
{
  "code": 200,
  "msg": "操作成功"
}
```

## 3. Update sub-account traffic limit

**POST** `{baseUrl}/api/agent/childAccount/updateLimitFlow`

### Request parameters

| Name      | Required | Type    | Description                          |
| --------- | -------- | ------- | ------------------------------------ |
| username  | Yes      | String  | Sub-account                          |
| limitFlow | Yes      | Integer | Cap in MB; `< 0` = unlimited (default -1) |

### Response fields

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| code | Integer | `200` = success; other values = failure |
| msg  | String  | Message                                 |

### Response example

```text
{
  "code": 200,
  "msg": "操作成功"
}
```

## 4. Update sub-account status

**POST** `{baseUrl}/api/agent/childAccount/updateStatus`

### Request parameters

| Name     | Required | Type    | Description                    |
| -------- | -------- | ------- | ------------------------------ |
| username | Yes      | String  | Sub-account                    |
| status   | Yes      | Integer | `0` = disabled; `1` = active   |

### Response fields

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| code | Integer | `200` = success; other values = failure |
| msg  | String  | Message                                 |

### Response example

```text
{
  "code": 200,
  "msg": "操作成功"
}
```

## 5. List sub-accounts

**POST** `{baseUrl}/api/agent/childAccount/users`

### Response fields

| Name          | Type    | Description                          |
| ------------- | ------- | ------------------------------------ |
| code          | Integer | `200` = success; other values = failure |
| data          | Array   |                                      |
| download_flow | Float   | Download traffic (MB)                |
| upload_flow   | Float   | Upload traffic (MB)                  |
| limit_flow    | Integer | Cap in MB; `< 0` = unlimited         |
| pwd           | String  | Password                             |
| username      | String  | Username                             |
| status        | Integer | `0` = disabled; `1` = active         |

### Response example

```text
{
    "msg": "操作成功",
    "code": 200,
    "data": [
        {
            "download_flow": 33.52092,
            "upload_flow": 5.37097,
            "limit_flow": -2,
            "id": 1,
            "pwd": "password22",
            "username": "username11",
            "status": 1
        }
    ]
}
```

## 6. Get proxy user

**GET** `{baseUrl}/api/agent/account?country=us&times=5`

### Request parameters

| Name    | Required | Type    | Description                          |
| ------- | -------- | ------- | ------------------------------------ |
| country | Yes      | String  | Country/region code (English)        |
| times   | Yes      | Integer | IP session duration                  |
| repeat  | No       | Integer | `1` = allow duplicate; `0` = dedupe (default 1) |

### Response fields

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| code     | Integer | `200` = success |
| data     | Json   |             |
| userName | String | Username    |
| passWord | String | Password    |

### Response example

```text
{
    "msg": "操作成功",
    "code": 200,
    "data": {
        "passWord": "987654321a123456789",
        "userName": "100951637280-ABCDEFG"
    }
}
```

## 7. Batch get proxy users

**GET** `{baseUrl}/api/agent/account2?country=us&times=5&limit=3`

### Request parameters

| Name    | Required | Type    | Description                          |
| ------- | -------- | ------- | ------------------------------------ |
| country | Yes      | String  | Country/region code (English)        |
| times   | Yes      | Integer | IP session duration                  |
| limit   | Yes      | Integer | Number of accounts to return         |
| repeat  | No       | Integer | `1` = allow duplicate; `0` = dedupe (default 1) |

### Response fields

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| code | Integer | `200` = success                |
| data | Array   | Items as `username:password`   |

### Response example

```text
{
    "msg": "操作成功",
    "code": 200,
    "data": [
        "100951637280-AvKUhzlR:123456789a987654321",
        "100951637280-wAfsZkSi:123456789a987654321",
        "100951637280-nOO1SJQu:123456789a987654321"
    ]
}
```

## 8. Sub-account format reference

### 8.1 Sticky session format

```text
{account12}_custom_zone_us_st_{areaId}_city_{cityId}_sid_{sid8}_time_{minutes_under_90}

Global random:
{account12}_custom_zone_global_sid_{sid8}_time_{minutes_under_90}

Continent random:
{account12}_custom_zone_asia_sid_{sid8}_time_{minutes_under_90}
{account12}_custom_zone_europe_sid_{sid8}_time_{minutes_under_90}
{account12}_custom_zone_africa_sid_{sid8}_time_{minutes_under_90}
{account12}_custom_zone_america_sid_{sid8}_time_{minutes_under_90}
```

### 8.2 Rotating format

```text
{account12}_custom_zone_us_st_{areaId}_city_{cityId}

Global random:
{account12}_custom_zone_global

Continent random:
{account12}_custom_zone_asia
{account12}_custom_zone_europe
{account12}_custom_zone_africa
{account12}_custom_zone_america
```
