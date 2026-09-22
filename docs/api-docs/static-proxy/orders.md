---
sidebar_position: 6
slug: /static-proxy/orders
description: Order query APIs â€?detail and status.
---

# Orders

Requires `UserId` and `Token`.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/open/staticip/orders/detail` | Order detail (IPs, credentials, delivery summary) |
| POST | `/open/staticip/orders/status` | Lightweight status poll |

Body: `{ "orderNo": "..." }`.

Order `status`: 0 cancelled, 1 unpaid, 2 paying, 3 paid, 4 pay failed, 5 expired, 10 refunded, 20 completed.
