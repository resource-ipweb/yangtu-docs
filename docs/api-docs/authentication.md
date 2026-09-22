---
sidebar_position: 1
slug: /api-authentication
description: Open Platform API authentication — Token auth, request examples, response format, and error codes.
---
# API Authentication
---
## 1. Overview


**Base URL:**

- **HTTP:** `http://006ip.com/prod-api`
- **HTTPS:** `https://006ip.com/prod-api`

**Supported format:** JSON

**Character encoding:** UTF-8

**Protocols:** Both HTTP and HTTPS are supported. HTTPS is recommended for secure data transfer.

---
## 2. Authentication

**Method:** Token authentication

All API requests must include a valid token in the request header. The system validates the token; invalid tokens return an authentication error.

### Request header format

Include the following header on every API request:

```
Token: your_access_token_here
```

### Example

```
# curl example
curl -X GET "http://006ip.com/prod-api/open/customer/list?pageNum=1&pageSize=10&userName=" -H "token: your-access-token"
```

### Token details

- **Header name:** Token
- **Value:** Access token string issued by the system
- **Length:** Typically a 32–64 character alphanumeric string
- **Expiry:** Tokens expire; obtain a new one when expired
- **Security:** Keep your token confidential and do not share it with third parties

---

## 3. Response format

All APIs return a unified JSON response:

| Field | Type    | Description                                      |
| ----- | ------- | ------------------------------------------------ |
| code  | Integer | Status code; `200` indicates success             |
| msg   | String  | Response message                                 |
| data  | Object  | Response payload; structure varies by endpoint   |

---

## 4. Error codes

Possible error codes for dynamic traffic APIs:

| Code | Description              | Resolution                              |
| ---- | ------------------------ | --------------------------------------- |
| 200  | Invalid authentication token | Verify the token is correct and not expired |
| 200  | Incomplete account info  | Contact an administrator to check the account |
| 500  | Internal server error    | Contact technical support               |

**Error response example:**

```json
{
  "code": 200,
  "msg": "无效的认证令牌",
  "data": null
}
```

---
