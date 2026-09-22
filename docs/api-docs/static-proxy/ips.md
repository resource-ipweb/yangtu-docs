---
sidebar_position: 7
slug: /static-proxy/ips
description: Asset APIs â€?IP page list and detail.
---

# My IPs

Requires `UserId` and `Token`.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/open/staticip/ips/page` | Paginated IP list |
| POST | `/open/staticip/ips/detail` | Single IP detail (full connection info and credentials) |

Page body: `pageIndex`, `pageSize`, optional `criteria` (country, keyword, usage status).

Detail body: `{ "id": "user-ip-primary-key" }` â€?use this `id` in renewal `resourceIds`.
