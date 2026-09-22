---
sidebar_position: 1
slug: /static-proxy/authentication
description: Static IP open platform authentication — developer credentials, headers, response format, and error codes.
---

# API Authentication

---

## 1. Overview

**Base URL:**

- **HTTPS (recommended):** <ApiBaseUrl />

**Format:** `application/json` (except `GET` endpoints without a body)

**Encoding:** UTF-8

Business APIs use the prefix `/open/staticip/**`. See [Common](/static-proxy/common) for unauthenticated endpoints.

---

## 2. Developer credentials

Log in to the **user console** and open **Account → My Account → Basic Settings** (Authentication section).

| Console field | Request header | Description |
|---------------|----------------|-------------|
| userId (developer ID / key) | `UserId` | Developer principal |
| token | `Token` | Developer secret (credential) |

> The header is named `UserId` but the value is the developer **key**, not the numeric user primary key.

---

## 3. Request headers

**Required for:** `/open/staticip/**`

| Header | Required | Description |
|--------|----------|-------------|
| `UserId` | Yes | Developer ID |
| `Token` | Yes | Developer token |
| `Content-Type` | For POST with body | `application/json` |
| `X-Idempotency-Key` | Recommended for writes | Idempotency key |

```bash
curl -X POST "https://006ip.com/api/open/staticip/inventory/countries" \
  -H "Content-Type: application/json" \
  -H "UserId: your-developer-id" \
  -H "Token: your-developer-token" \
  -d '{"countryCode":"US"}'
```

---

## 4. Response format

Wrapped in `Result<T>`:

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | `"0"` = success |
| `msg` | string | Message |
| `data` | object / array | Payload |
| `timestamp` | number | Server time (ms) |
| `traceId` | string | Trace ID |

---

## 5. Long integer IDs

All id-like `Long` fields are **strings** in JSON (request and response).

`cityCode` in inventory/order APIs is the string form of `cityId`.

---

## 6. Auth error codes

| code | Description | HTTP |
|------|-------------|------|
| `20000` | Invalid or disabled credentials | 401 |
| `20010` | Missing `UserId` header | 401 |
| `20011` | Missing `Token` header | 401 |

---

## 7. Typical flow

```
Obtain UserId + Token (console)
  → Location APIs
  → GET  /open/staticip/purchase/options
  → POST /open/staticip/inventory/countries
  → POST /open/staticip/purchase/quote
  → POST /open/staticip/purchase/orders/place-and-pay
  → POST /open/staticip/orders/detail
```

See the sidebar for endpoint details.
