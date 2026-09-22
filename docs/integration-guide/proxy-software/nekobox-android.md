---
sidebar_position: 4
sidebar_label: NekoBox Chain Proxy Guide (Android)
description: Complete guide to configuring 006ip static residential proxies in NekoBox (Android).
---

# NekoBox Chain Proxy Guide (Android)

***If you already have a working overseas network environment, follow the "Configure NekoBox" section. If you do not, follow the "Chain Proxy" section first.***

006ip provides residential proxy infrastructure for businesses, developers, and cross-border teams, including **dynamic residential IPs** and **static residential IPs**. The platform supports country/region and city-level targeting, plus dashboard options such as IP allowlists, authentication methods, and location modes—suitable for compliant data collection, localized page testing, price monitoring, ad verification, and maintaining cross-border business environments.

**Static residential IPs** offer long-lived fixed egress addresses and are a better fit when you need continuity and connection stability. This guide walks through registration, trial traffic, purchasing, exporting credentials, and configuring proxies in **NekoBox (Android)**.

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

Quick Configuration is for users who want platform default network settings and a fast checkout. Configure:

| Parameter | Description |
| --- | --- |
| **Access Type** | Choose Dedicated or Shared. Dedicated IPs suit stricter purity, stability, and isolation needs; Shared IPs suit cost-sensitive general access |
| **Country / region and city** | Target by country/region and city, or choose a random range for country-wide distribution |
| **Period** | Plans from 30–365 days; longer terms may include tiered discounts. Final pricing follows the purchase page |
| **Fixed configuration** | Connections (QPS), Bandwidth, and UDP use the default values shown on the page |

![006ip static proxy — Quick Configuration](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-purchase-quick-mode.png)

##### (2) Custom Configuration

Enable **Custom Configuration** to purchase by IP segment and customize Connections (QPS), Bandwidth, and UDP. You can also set Use case, allocate quantity by city/segment inventory, and choose a Period. Different settings affect pricing—review the Order Summary on the right before submitting.

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

This section is written for **NekoBox**. NekoBox is a proxy client with a simple UI and support for SOCKS5 / HTTP and other protocols, making it convenient for residential proxy setup. Steps below are for **Android**.

Complete the purchase flow above, have your proxy server address, port, username, and password ready, and install NekoBox on your Android device.

### 1. Prepare proxy connection details

Confirm you have:

- **Proxy server address**
- **Port**
- **Username**
- **Password**

### 2. Add a 006ip proxy node

Open **NekoBox** and follow these steps:

#### ① Tap the add button in the top-right

On the NekoBox home screen, tap the file icon with **+** in the top-right to open the node type menu.

![Tap the add button in the top-right of NekoBox](https://cdn.006ip.com/docs/img/neko-android-step1-add.png)

#### ② Choose the proxy protocol

In the list, select the protocol that matches the credentials you exported from 006ip. Screenshots in this guide use **HTTP**, so tap **HTTP**.

![Select HTTP in the node type menu](https://cdn.006ip.com/docs/img/neko-android-step2-select-http.png)

> Protocol must match the 006ip export: choose **HTTP** for HTTP proxies, or **SOCKS** for SOCKS5. A mismatched protocol will prevent the node from connecting.

#### ③ Fill in server settings

On the **Server configuration** page:

| Field | Value |
| --- | --- |
| **Profile name** | `proxy1` or any recognizable name |
| **Server** | Your proxy server address |
| **Server port** | Your port (e.g. `7778`) |
| **Username (optional)** | Your proxy username |
| **Password (optional)** | Your proxy password |

006ip static residential proxies usually require username/password authentication, so fill both fields even if marked optional. Keep other options at defaults; unless required, leave **Transport encryption** and **Multiplexing** off.

When finished, tap **✓** in the top-right to save the node.

![Fill HTTP server address, port, and credentials](https://cdn.006ip.com/docs/img/neko-android-step3-config-proxy1.png)

### 3. Start the node and establish the VPN connection

After saving, the node appears on the NekoBox home screen. Tap it so a pink selection marker appears on the left, then tap the **paper-plane button** at the bottom center to connect.

On first start, Android may prompt for VPN permission—tap **OK** or **Allow**. After a successful connection:

- A **VPN** indicator appears in the status bar
- Latency appears next to the node (e.g. `292ms`)
- The bottom of the screen shows **Connected** and handshake time
- The paper-plane button shows the connected state

![Start the node and confirm connection success](https://cdn.006ip.com/docs/img/neko-android-step4-connect.png)

Open a browser and visit `https://ipinfo.io` or another IP lookup site. If the IP and region match your purchased proxy, configuration succeeded.

![Check proxy egress IP](https://cdn.006ip.com/docs/img/neko-android-step9-ip-check.png)

> If the check shows your local IP:
>
> 1. Confirm NekoBox shows **Connected** and the status bar has a VPN indicator
> 2. Confirm the selected node is the 006ip node you just added
> 3. Confirm address, port, username, and password match the exported credentials exactly
> 4. Confirm protocol type (SOCKS / HTTP) matches the dashboard
> 5. Confirm you allowed the Android VPN connection request

### 4. Add or switch multiple nodes (optional)

If you exported multiple 006ip accounts, repeat the steps above for each one. Use distinct names such as `proxy0` and `proxy1` for easier identification.

![Add a second HTTP proxy node](https://cdn.006ip.com/docs/img/neko-android-step5-config-proxy0.png)

To switch nodes, disconnect the current connection first, tap the target node on the home screen until the pink selection marker appears, then tap the paper-plane button again to start.

## Chain Proxy

If your current network cannot directly reach the target-country proxy server, configure a **chain proxy** in NekoBox: first build a path through a reachable overseas upstream proxy, then connect to the downstream target-country proxy.

Path order:

> **Local device → Upstream proxy (overseas node) → Downstream proxy (target country/region) → Target website**

For example, use a Hong Kong node as upstream and a US static residential node as downstream. After configuration, websites should see the **downstream US IP** as the final egress, not your local public IP and not the upstream HK IP.

### 1. Prepare two proxy node credentials

Prepare address, port, username, and password for both:

| Node role | Purpose | Example name |
| --- | --- | --- |
| **Upstream proxy** | First hop that must be reachable in your current network | `proxy0` |
| **Downstream proxy** | Target country/region node and final business egress | `proxy1` |

Use a low-latency stable upstream node close to your location. Choose the downstream country/region based on business requirements.

> This section uses two HTTP nodes as examples. If your nodes use SOCKS5, choose the SOCKS type and ensure the protocol matches provider details.

### 2. Add the upstream and downstream proxies

Follow the earlier **Add a 006ip proxy node** steps to create upstream `proxy0` and downstream `proxy1`. Fill each node’s server address, port, username, and password, then tap **✓** to save.

After saving, both nodes should appear on the home screen. Optionally select and start each node separately first to confirm address, port, protocol, and credentials.

> The upstream proxy is hop 1 of the full chain. If it fails or has high latency, the downstream proxy will also fail. Confirm the upstream works in your current network first.

### 3. Create the chain proxy

On the NekoBox home screen, tap the file icon with **+** in the top-right, scroll the type list, and choose **Chain Proxy**.

![Select Chain Proxy in the add menu](https://cdn.006ip.com/docs/img/neko-android-step6-chain-menu.png)

On the **Chain settings** page:

1. Set **Profile name** to `chain proxy` or another recognizable name
2. Tap **Add server configuration**
3. Add the upstream and downstream proxies to the chain in order
4. Confirm the list order is `proxy0 → proxy1` (upstream above, downstream below)
5. Tap **✓** in the top-right to save

![Add two nodes and set chain proxy order](https://cdn.006ip.com/docs/img/neko-android-step7-chain-settings.png)

> Arrange the chain as **upstream → downstream**, with the downstream node as the final egress. Names like `proxy0` and `proxy1` are examples only—follow the actual roles you created. Reversing order may cause a wrong egress IP or connection failures.

### 4. Start the chain proxy

Back on the home screen, tap the `chain proxy` entry until the pink selection marker appears, then tap the paper-plane button at the bottom center to connect.

After a successful connection, latency appears next to `chain proxy`, the bottom shows **Connected**, and a VPN indicator appears in the status bar.

![Select and start the chain proxy](https://cdn.006ip.com/docs/img/neko-android-step8-chain-connected.png)

> Start the `chain proxy` entry itself, not `proxy0` or `proxy1` individually. NekoBox routes through both nodes in the configured order.

### 5. Verify final egress IP

Open a browser and visit `https://ipinfo.io` or another trusted IP lookup site. Verify:

- The IP matches the downstream proxy IP
- The country/region matches your purchased target route
- The result is neither your local public IP nor the upstream egress IP

![Chain proxy egress IP check example](https://cdn.006ip.com/docs/img/neko-android-step9-ip-check.png)

If the result shows the downstream target IP, the chain is configured correctly. Slightly higher latency than single-hop mode is normal.

### 6. Common troubleshooting

| Symptom | What to check |
| --- | --- |
| Chain cannot start | Re-check both nodes’ address, port, protocol, username, and password; test the upstream node first |
| Downstream keeps timing out | Confirm the upstream works in your current network; try a lower-latency, more stable overseas upstream |
| Result shows upstream IP | Check whether the downstream is missing from the chain list, or whether order is reversed; correct order is upstream → downstream |
| Result still shows local public IP | Confirm `chain proxy` is selected and started, VPN permission is granted, and the status bar shows VPN |
| Connected but slow | Chain adds one extra hop; use a nearer/lower-latency upstream and avoid unnecessary proxy layers |

> Button names, positions, and VPN prompts may differ slightly by NekoBox version or Android system. Follow your current client UI. Use proxies only for legal/compliant scenarios and follow website terms and local laws.

---

> If you run into issues not covered above, contact us:
>
> - **Telegram**: [https://telegram.me/ip006ip](https://telegram.me/ip006ip)
> - **Phone**: 15673887335
> - **Email**: [support@006ip.com](mailto:support@006ip.com)
>
> For purchase, renewal, and credential export details, see the [006ip Static Proxy User Guide](/static-proxy-user-guide/).
