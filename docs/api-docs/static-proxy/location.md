---
sidebar_position: 2
slug: /static-proxy/location
description: Location dictionary APIs â€?continents, countries, states, cities.
---

# Location

Country/city dictionary for inventory and purchase APIs. Requires `UserId` and `Token` â€?see [Authentication](/static-proxy/authentication).

| Method | Path | Description |
|--------|------|-------------|
| GET | `/open/staticip/location/continents` | List continents |
| POST | `/open/staticip/location/countries` | List countries (`continentId`, `keyword` optional) |
| POST | `/open/staticip/location/states` | List states (`countryId` or `countryCode`) |
| POST | `/open/staticip/location/cities` | List cities (all filters optional; empty body = all enabled cities) |

Use `countryCode` in inventory/purchase APIs. `cityCode` = string value of `cityId`.

For the full Chinese field reference, see the ä¸­æ–‡ version of this site (`/zh/`).
