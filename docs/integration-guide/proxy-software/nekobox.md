---
sidebar_position: 3
sidebar_label: NekoBox Chain Proxy Guide (Windows)
description: Complete guide to configuring 006ip static residential proxies in NekoBox (Windows).
---

# NekoBox Chain Proxy Guide (Windows)

***If you already have a working overseas network environment, follow the "Configure NekoBox" section. If you do not, follow the "Chain Proxy" section first.***

006ip provides residential proxy infrastructure for businesses, developers, and cross-border teams, including **dynamic residential IPs** and **static residential IPs**. The platform supports country/region and city-level targeting, plus dashboard options such as IP allowlists, authentication methods, and location modes—suitable for compliant data collection, localized page testing, price monitoring, ad verification, and maintaining cross-border business environments.

**Static residential IPs** offer long-lived fixed egress addresses and are a better fit when you need continuity and connection stability. This guide walks through registration, trial traffic, purchasing, exporting credentials, and configuring proxies in **NekoBox (Windows)**.

> **Need help? Contact us anytime:**
>
> - Telegram: [https://telegram.me/ip006ip](https://telegram.me/ip006ip)
> - Phone: `15673887335`
> - Email: [support@006ip.com](mailto:support@006ip.com)

## Getting Started

### 1. Create and sign in to a 006ip account

Step 1: Open the [006ip website](https://006ip.com), then click **Register** in the top-right corner. If you already have an account, click **Log In**.

![006ip homepage — registration entry](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-homepage.png)

Step 2: On the registration page, choose one of the following methods:

#### Option A: Email registration

Select **Email registration**, then enter your account/email, email verification code, password, and confirm password. Click **Send code**, check your inbox for the code, accept the Terms of Service and Privacy Policy, then click **Register now**.

![006ip email registration](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-register-email.png)

#### Option B: Phone registration

Select **Phone registration**, confirm the country/region code, enter your phone number, click **Send code**, and enter the SMS code. Accept the Terms of Service and Privacy Policy, then click **Register now**.

After phone registration succeeds, you are signed in automatically with a default password. Set your own login password in account settings as soon as possible.

![006ip phone registration](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-register-phone.png)

> The homepage also offers **Sign up with Gmail**. If you use Gmail, follow the on-page authorization flow.

### 2. Claim trial traffic

006ip currently offers a new-user trial: contact support to receive **1GB trial traffic** for free. Eligibility, available products, and validity follow the campaign page and support reply.

> Use trial traffic first to validate target regions, protocol compatibility, and business connectivity before choosing a paid plan.

### 3. Purchase static residential proxies

After signing in to the 006ip dashboard, open **Static Proxies** in the left sidebar, then choose **ISP Proxies** or **Datacenter Proxies** to enter the purchase page.

#### Step 1: Choose a purchase mode and set proxy attributes

The purchase page provides **Quick Configuration** and **Custom Configuration**. Both modes calculate pricing in real time based on your selections, but they fit different needs.

##### (1) Quick Configuration

| Parameter | Description |
| --- | --- |
| **Access Type** | Choose **Dedicated** or **Shared**. Dedicated IPs suit stricter purity, stability, and isolation needs; Shared IPs suit cost-sensitive general access. |
| **Country / region and city** | Target by country/region and city, or choose **Random range** for country-wide distribution. |
| **Period** | Plans from 30–365 days; longer terms may include tiered discounts. Final pricing follows the purchase page. |
| **Fixed configuration** | **Connections (QPS)**, **Bandwidth**, and **UDP** use the default values shown on the page. |

![006ip static proxy — Quick Configuration](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-purchase-quick-mode.png)

##### (2) Custom Configuration

Enable **Custom Configuration** to purchase by IP segment and customize **Connections (QPS)**, **Bandwidth**, and **UDP**. You can also set **Use case**, allocate quantity by city/segment inventory, and choose a **Period**. Different settings affect pricing—review the **Order Summary** on the right before submitting.

![006ip static proxy — Custom Configuration](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-purchase-custom-mode.png)

#### Step 2: Confirm the order and pay

On the checkout page, selected IP inventory is locked for **15 minutes**. If payment is not completed in time, resources are released and you must place the order again.

Supported payment methods include:

- **Account balance**
- **Online payment**
- **Balance + online** combined payment

If balance is insufficient, the available balance is applied first and the remainder can be paid online. Balance payments require your 006ip payment password. Available online channels and currencies follow the checkout page.

![006ip order confirmation and payment](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-order-payment.png)

### 4. View and export proxy connection details

After payment succeeds, open **My IPs** to view purchased static IPs. The list shows bandwidth, QPS, UDP status, expiry, and resource state, and supports renew, disable, enable, and details.

![006ip My IPs list](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-my-ip-list.png)

Before configuring NekoBox, export these four connection fields:

- **Proxy IP address**
- **Port**
- **Username**
- **Password**

On **My IPs**, click **Export Credentials** in the top-right corner and choose a format that fits your client. NekoBox can use:

```text
IP:PORT:USERNAME:PASSWORD
```

Exported files contain plaintext credentials. Store the file securely and do not share credentials via public chats, screenshots, or untrusted channels.

![006ip export credentials](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-export-credentials.png)

For purchase, renewal, and export details, see the [006ip Static Proxy User Guide](/static-proxy-user-guide/) and the latest prompts in the dashboard.

## Configure NekoBox

This section is written for **NekoBox**, a Windows proxy client based on **sing-box**. It supports SOCKS5 / HTTP and is convenient for residential proxy setup. Steps below are for **Windows**.

Complete the purchase flow above and have your proxy server address, port, username, and password ready. Install the latest [NekoRay](https://github.com/MatsuriDayo/nekoray) build as well.

### Step 1: Prepare proxy connection details

Confirm you have:

- **Proxy server address**
- **Port**
- **Username**
- **Password**

### Step 2: Add a proxy IP

Open **NekoBox** and follow these steps:

#### ① Right-click and choose Manual Input

On the main window, **right-click an empty area in the server list** and choose **Manual Input**.

![NekoBox right-click Manual Input](https://cdn.006ip.com/docs/img/guide/static-proxy/nekoray-step1.png)

#### ② Fill in node settings

In the **Edit** dialog:

| Field | Value |
| --- | --- |
| **Type** | `Socks` (SOCKS5) |
| **Name** | `proxy1` or any recognizable name |
| **Address** | Your proxy server address |
| **Port** | Your port (e.g. `7778`) |

Then fill the **Socks** auth section:

| Field | Value |
| --- | --- |
| **Version** | `5` (SOCKS5) |
| **Username** | Your proxy username |
| **Password** | Your proxy password |

> If your 006ip credentials are for HTTP, choose the HTTP type instead. SOCKS5 must use `Socks` with version `5`. Protocol must match the dashboard or the connection will fail.

Click **OK** to save.

![NekoBox edit dialog](https://cdn.006ip.com/docs/img/guide/static-proxy/nekoray-step2.png)

### Step 3: Confirm the node appears in the list

Back on the main window, the server list should show the new node as type `Socks` with the correct address and name.

![NekoBox server list](https://cdn.006ip.com/docs/img/guide/static-proxy/nekoray-step3.png)

> For multiple exported accounts, repeat Step 2 for each line, then switch nodes as needed.

### Step 4: Start the node and enable system proxy

Confirm both:

1. **Enable Tun and System Proxy**: In the top toolbar, check **Tun Mode** and **System Proxy** (title bar shows `[Tun+System Proxy]`)
2. **Select and start the node**: Check the 006ip node in the list, then **right-click → Start**

**After a successful start:**

- Title bar shows something like `[Admin] [Tun+System Proxy] NekoBox ... [Socks] proxy1@Default`
- The node row shows test results and traffic counters
- The bottom log shows connection activity

![NekoBox start node](https://cdn.006ip.com/docs/img/guide/static-proxy/nekoray-step4.png)

Open a browser and visit `https://ipinfo.io` or another IP lookup site. If the returned IP matches your purchased region, configuration succeeded.

![IPinfo result example](https://cdn.006ip.com/docs/img/guide/static-proxy/ipinfo-result.png)

> If the check shows your local IP:
>
> 1. Confirm **Tun Mode** and **System Proxy** are both checked
> 2. Confirm the node is checked and started
> 3. Confirm address, port, username, and password match 006ip exactly
> 4. Confirm protocol type (Socks / HTTP) matches what you purchased

### Step 5: Routing rules (optional)

To send only specific traffic through 006ip, open **Settings** → **Routing**, then add custom rules, for example:

| Example rule | Meaning |
| --- | --- |
| Domain `target-website.com` → 006ip node | Only that domain uses the proxy |
| CIDR `10.0.0.0/8` → Direct | LAN traffic bypasses the proxy |
| Default → Direct / other node | Remaining traffic as needed |

Only matching traffic goes through the 006ip proxy; other traffic keeps its original path.

## Chain Proxy

If your current network cannot directly reach the target-country proxy server, you can configure a chain in NekoBox: first build a path through a reachable overseas upstream proxy, then connect to the downstream target-country proxy.

Path order:

> **Local machine → Upstream proxy (overseas node) → Downstream proxy (target country/region) → Target website**

For example, use a Hong Kong node as upstream and a US static residential node as downstream. After configuration, websites should see the **downstream US IP** as the final egress, not your local IP and not the upstream HK IP.

### 1. Prepare two proxy node credentials

Prepare address, port, username, and password for both:

| Node role | Purpose | Example name |
| --- | --- | --- |
| **Upstream proxy** | First hop that must be reachable in your current network | `proxy1-hk` |
| **Downstream proxy** | Target country/region node and final business egress | `proxy2-us` |

Use a low-latency stable upstream node close to your location. Choose downstream country/region based on business requirements.

> This section uses SOCKS5 nodes as examples. If your nodes are HTTP, choose HTTP type accordingly and ensure protocol matches provider details.

### 2. Add the upstream proxy

In NekoBox, right-click an empty area in the server list and choose **Manual Input**, then fill:

| Field | Value |
| --- | --- |
| **Type** | `Socks` |
| **Name** | e.g. `proxy1-hk` |
| **Address** | Upstream proxy server address |
| **Port** | Upstream proxy port |
| **Version** | `5` |
| **Username / Password** | Upstream proxy credentials |

Click **OK** to save.

![Add upstream overseas proxy in NekoBox](https://cdn.006ip.com/docs/img/nekobox-chain-step1.png)

> The upstream proxy is hop 1 of the full chain. If it fails or has high latency, downstream proxy will also fail. Test it alone first.

### 3. Add the downstream target proxy

Again right-click an empty area in the server list, choose **Manual Input**, and fill:

| Field | Value |
| --- | --- |
| **Type** | Protocol used by downstream proxy, `Socks` in this example |
| **Name** | e.g. `proxy2-us` |
| **Address** | Downstream proxy server address |
| **Port** | Downstream proxy port |
| **Version** | `5` for SOCKS5 |
| **Username / Password** | Downstream proxy credentials |

Click **OK** to save.

![Add downstream target-country proxy in NekoBox](https://cdn.006ip.com/docs/img/nekobox-chain-step2.png)

After saving, both `proxy1-hk` and `proxy2-us` should appear in the list. Test both nodes separately and verify server, port, protocol, and credentials.

### 4. Create a chain proxy and set node order

Right-click an empty area in the server list, choose **Manual Input**, then:

1. Set **Type** to **Chain Proxy**.
2. Set name to `chain-proxy` (or any recognizable name).
3. Click **Select Configurations** and add `proxy1-hk` and `proxy2-us`.
4. Ensure order is `proxy1-hk` on top and `proxy2-us` below.
5. Click **OK** to save.

![Create chain proxy and set node order in NekoBox](https://cdn.006ip.com/docs/img/nekobox-chain-step3.png)

> NekoBox chain order is **top to bottom**, and the last node is the final egress. Keep `proxy1-hk → proxy2-us`. Reversing order may cause wrong egress IP or failures.

### 5. Start the chain proxy

Back in the main window:

1. Select `chain-proxy` in the server list.
2. Right-click it and choose **Start**. Confirm a ✓ marker appears.
3. Enable **Tun Mode** and **System Proxy** at the top.
4. Check logs for connection events and verify traffic counters on the chain entry.

![Start chain proxy and enable Tun/System Proxy in NekoBox](https://cdn.006ip.com/docs/img/nekobox-chain-step4.png)

> Start `chain-proxy` itself, not `proxy1-hk` or `proxy2-us` individually. NekoBox will route through both nodes in the configured order.

### 6. Verify final egress IP

Open `https://ipinfo.io` (or another trusted IP checker) and verify:

- IP matches the downstream proxy IP
- Country/region matches your purchased target route
- Result is neither your local public IP nor the upstream egress IP

![IPinfo result example](https://cdn.006ip.com/docs/img/guide/static-proxy/ipinfo-result.png)

If the result shows the target IP of `proxy2-us`, the chain is configured correctly. Slightly higher latency than single-hop mode is normal.

### 7. Common troubleshooting

| Symptom | What to check |
| --- | --- |
| Chain cannot start | Re-check both nodes' address, port, protocol, username, and password; test upstream node first |
| Downstream keeps timing out | Confirm upstream works in current network; try a lower-latency, more stable upstream node |
| Result shows upstream IP | Check whether downstream is missing from chain list or order is reversed; correct order is `proxy1-hk → proxy2-us` |
| Result still shows local public IP | Ensure `chain-proxy` is started and both **Tun Mode** and **System Proxy** are enabled |
| Connected but slow | Chain adds one extra hop; use nearer/lower-latency upstream and avoid unnecessary proxy layers |

> UI names and button locations may differ slightly by NekoBox version. Follow your current client UI. Use proxies only for legal/compliant scenarios and follow website terms and local laws.

---

> If you run into issues not covered above, contact us:
>
> - **Telegram**: [https://telegram.me/ip006ip](https://telegram.me/ip006ip)
> - **Phone**: 15673887335
> - **Email**: [support@006ip.com](mailto:support@006ip.com)
>
> For purchase, renewal, and credential export details, see the [006ip Static Proxy User Guide](/static-proxy-user-guide/).
