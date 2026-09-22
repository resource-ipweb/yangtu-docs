---
sidebar_position: 1
slug: /api-dynamic-ip
description: Dynamic IP API — city/state IP volume distribution and proxy group IDs.
---
# Dynamic IP
---
## 1. Get city IP volume distribution

**GET** `/api/agent/cityCount/{countryId}/{areaId}`

### Request parameters

| Name      | Required | Type   | Description        |
| --------- | -------- | ------ | ------------------ |
| countryId | Yes      | String | Country/region ID  |
| areaId    | Yes      | String | State/province ID  |

### Response fields

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| code | Integer | `200` = success; other values = failure          |
| row  | Array   |                                                  |
|      | cityId  | String | City ID                                   |
|      | cityName | String | City name                                |
|      | label   | String | IP volume tier: low / medium / high (少/较多/多) |

### Response example

```text
{
    "rows": [
        {
            "cityName": "Cupertino",
            "cityId": "30113",
            "label": "少"
        },
        {
            "cityName": "Cypress",
            "cityId": "16025",
            "label": "较多"
        },
        {
            "cityName": "Rancho Santa Margarita",
            "cityId": "13083",
            "label": "多"
        }
    ],
    "code": 200,
    "msg": "查询成功"
}
```

## 2. Get proxy group ID

**GET** `/api/agent/account?country=us&times=5&repeat=1`

### Request parameters

| Name    | Required | Type    | Description                          |
| ------- | -------- | ------- | ------------------------------------ |
| country | Yes      | String  | Country/region code (English)        |
| times   | Yes      | Integer | Session duration                     |
| repeat  | Yes      | Integer | `1` = allow duplicate; `0` = dedupe  |

### Response fields

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| code | Integer | `200` = success; other values = failure |
| data | String  | Group ID                                |

### Response example

```text
{
    "msg": "成功",
    "code": 200,
    "data": "100004509283"
}
```

## 3. Batch get proxy group IDs

**GET** `/api/agent/account?countrys=us&times=5&repeat=1`

### Request parameters

| Name    | Required | Type    | Description                          |
| ------- | -------- | ------- | ------------------------------------ |
| country | Yes      | String  | Country/region code (English)        |
| times   | Yes      | Integer | Session duration                     |
| repeat  | Yes      | Integer | `1` = allow duplicate; `0` = dedupe  |

### Response fields

| Name    | Type    | Description                             |
| ------- | ------- | --------------------------------------- |
| code    | Integer | `200` = success; other values = failure |
| data    | Array   |                                         |
| country | String  | Country code                            |
| groupId | String  | Group ID                                |

### Response example

```text
{
    "msg": "成功",
    "code": 200,
    "data": [
        {
            "country": "US",
            "groupId": "100004509283"
        },
        {
            "country": "AE",
            "groupId": "101626509765"
        }
    ]
}
```

## 4. Get state IP volume distribution

**GET** `/api/agent/countArea/{countryId}`

### Request parameters

| Name      | Required | Type   | Description       |
| --------- | -------- | ------ | ----------------- |
| countryId | Yes      | String | Country/region ID |

### Response fields

| Name     | Type    | Description                                      |
| -------- | ------- | ------------------------------------------------ |
| code     | Integer | `200` = success; other values = failure          |
| row      | Array   |                                                  |
| areaId   | String  | State ID                                         |
| areaName | String  | State name                                       |
| label    | String  | IP volume tier: low / medium / high (少/较多/多) |

### Response example

```text
{
    "rows": [
        {
            "areaId": "1583",
            "areaName": "California",
            "label": "少"
        },
        {
            "areaId": "2703",
            "areaName": "North Dakota",
            "label": "较多"
        },
        {
            "areaId": "2713",
            "areaName": "Alaska",
            "label": "多"
        }
    ],
    "code": 200,
    "msg": "查询成功"
}
```

---


© 2025 Dynamic IP API — v1.0.0

Last updated: December 26, 2025
