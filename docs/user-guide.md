---
sidebar_position: 4
slug: /user-guide
description: 006ip dynamic proxy user guide — export dynamic residential proxies, parse proxy strings, verify connectivity, custom account rules, and choose proxy gateways.
---

# 006ip Dynamic Proxy User Guide

## 1. How to export dynamic residential proxies in the 006ip dashboard?

![006ip dashboard — dynamic residential proxies](https://cdn.006ip.com/docs/img/en/ba570353e1fa1bcc5d61f84997266984.png)

After logging in to the 006ip dashboard, click **Dynamic Residential Proxy** in the left menu. You will see the page above. Follow these steps to generate full proxy credentials:

### Steps

1. **Get proxy:** Click **Get Proxy** on the left (step ① above).

2. **Country/region:** Choose the country that matches your use case. For example, select **United States** if you need US IPs (step ②). If you do not need state/city-level targeting, leave **State** and **City** empty to receive IPs from anywhere in that country.

3. **Proxy server:** After you select a country, 006ip assigns a **proxy server** automatically (step ③).

4. **IP session duration:** Maximum time a single IP can be used. When the period ends, the IP rotates without disconnecting your session—the account stays usable; only the exit IP changes. Choose a duration that fits your workload (step ④).

5. **Proxy count:** Number of proxy lines to export. For example, enter `5` for five lines (step ⑤). Each export is limited to **1,000** lines. For larger scale, use **custom proxy accounts**: export one line and derive unlimited variants. If you use custom accounts, exporting a single reference line is enough.

6. **Generate:** After completing the steps above, click **Generate Proxy** to download a `.txt` file with your proxies (step ⑥).

7. **Change proxy password:** Set a proxy password the first time you generate accounts. This password applies to generated proxy credentials. Password updates take about **one minute** to take effect. If credentials leak, change the password immediately.

---

## 2. What do the exported proxy fields mean?

Open the downloaded `.txt` file to view proxy lines.

006ip follows SOCKS5/HTTP proxy conventions. Username/password format:

```
proxy_host(IP_or_domain):port:username:password
```

Some providers use:

```
username:password:proxy_host(IP_or_domain):port
```

### Example

**Sample line:**

```
gate1.006ip.com:7778:B_91246_US_1474_10748_10_JFGpdebg:123456
```

**Field breakdown:**

- **Proxy server:** `gate1.006ip.com`
- **Port:** `7778`
- **User ID:** `B_91246`
- **Country code:** `US`
- **State code:** `1474`
- **City code:** `10748`
- **Session duration (minutes):** `10`
- **SID:** `JFGpdebg`
- **Proxy password:** `123456`
- **Protocols:** SOCKS5 and HTTP(S) on the same port

### Diagram

![Proxy string structure](https://cdn.006ip.com/docs/img/en/ad1b427c0399b925b86a8743da4ef96b.png)

### Verify the proxy

Test the exported line with `curl`:

```bash
curl -x B_91246_US_1474_10748_10_JFGpdebg:123456@gate1.006ip.com:7778 ipinfo.io
```

![curl verification result](https://cdn.006ip.com/docs/img/d68a7024f61a00f362c540d7e975c61b.png)

A successful response shows a US IP (country `US`), New York state (code `1474`), New York City (code `10748`).

---

## 3. How to build proxies with custom account rules?

**Custom proxy accounts** follow 006ip formatting rules—manually or programmatically—to produce the proxy lines you need.

### 3.1 Change country, state, and city codes

From the sample above, change country/state/city codes to target other locations. State and city are optional:

```
gate1.006ip.com:7778:B_91246_US___5_JFGpdebg:123456
```

Empty state and city means any location within the US.

### 3.2 Change country and session duration

Starting from:

```
gate1.006ip.com:7778:B_91246_US___5_JFGpdebg:123456
```

For Hong Kong, replace `US` with `HK`:

```
gate1.006ip.com:7778:B_91246_HK___5_JFGpdebg:123456
```

For a 10-minute session instead of 5, change `5` to `10`:

```
gate1.006ip.com:7778:B_91246_HK___10_JFGpdebg:123456
```

### 3.3 Generate many proxies by changing SID

Example base line:

```
gate1.006ip.com:7778:B_91246_US_1474_10748_5_JFGpdebg:123456
```

Change the **SID** to obtain different exit IPs:

```
gate1.006ip.com:7778:B_91246_US_1474_10748_5_JFGpdebg:123456
gate1.006ip.com:7778:B_91246_US_1474_10748_5_Ab000002:123456
gate1.006ip.com:7778:B_91246_US_1474_10748_5_Ab000003:123456
...
gate1.006ip.com:7778:B_91246_US_1474_10748_5_X9999999:123456
```

> **Note:** SID must be exactly **8** alphanumeric characters (letters and digits). Special characters (e.g. `@!%*`) are not allowed.

Changing SID lets you scale proxies or rotate IPs on demand.

### 3.4 Worldwide random proxies

Set the country code to **`000`** for a random country:

```
gate1.006ip.com:7778:B_91246_000___10_JFGpdebg:123456
```

---

## 4. How to choose a proxy server?

006ip operates gateways in three regions:

1. **Americas (North & South):** `gate1.006ip.com:7778`
2. **Asia-Pacific (incl. Oceania):** `gate2.006ip.com:7778`
3. **Europe & Africa:** `gate3.006ip.com:7778`

Pick a gateway based on your workload and where your application runs. The auto-assigned gateway usually offers the lowest latency. Contact 006ip support if you need help choosing.
