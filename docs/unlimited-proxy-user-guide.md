---
sidebar_position: 4.5
slug: /unlimited-proxy-user-guide
description: 006ip unlimited residential traffic user guide — purchase unlimited residential traffic plans, view purchased services and credentials, understand proxy string fields, and verify connectivity.
---

# 006IP Unlimited Residential Traffic User Guide

## 1. How to purchase unlimited residential traffic

Log in to your 006IP dashboard. In the left navigation, go to **Unlimited Residential Traffic > Purchase Plan**. On this page, select the plan options that match your usage needs and complete the payment.

### Step 1: Select your plan options

On the **Purchase Plan** page, configure the following options:

- **Dedicated Server:** Choose a proxy host entry closer to your application server's network. This usually helps reduce connection latency.
- **Bandwidth:** Select the bandwidth included with the plan, such as `100 Mbps`, `200 Mbps`, `300 Mbps`, or `1000 Mbps`. If you need more bandwidth, select **Custom** and contact Sales for a quote.
- **Service period:** Select the length of the service term, such as `30 days`, `60 days`, `90 days`, `180 days`, or `360 days`.

![Unlimited proxy purchase plan](https://cdn.006ip.com/docs/img/unlimited-proxy/en/unlimited-purchase-plan.png)

> The Dedicated Server option selects the region of the proxy host (ingress gateway), not the country of the residential exit IP. After activation, the system assigns a host and port. The host is the connection address, and the port is the network channel on that address; both must be used together with your credentials. Prefer a region closer to the application server that initiates requests — this usually helps reduce connection latency. Choose the residential exit country separately when you use the proxy.

Unlimited Residential Traffic plans are primarily configured by **bandwidth and service period**. Traffic usage is unlimited during the active service period. Available bandwidth is determined by the plan you purchase.

After selecting the plan options, review the following information in the **Order Details** panel on the right:

- Product type
- Bandwidth
- Country/region
- Service period
- Total order amount

After confirming that the order information is correct, review and accept the **Terms of Service** and **Privacy Policy**, then click **Buy Now** to create the order.

### Step 2: Choose a payment method

After the order is created, you will be taken to the payment page. 006IP supports two payment methods: **Account Balance** and **Online Payment**.

#### Option 1: Pay with account balance

If your account has sufficient funds, select **Use Available Account Balance**.

Once selected, the system will prioritize your account balance for payment. Confirm that the **Amount Due** and **Balance Payment** amounts are correct, then click **Pay Now**.

If your account balance is insufficient, you can add funds to your account first, or deselect the balance payment option and use an online payment method instead.

![Unlimited proxy balance payment](https://cdn.006ip.com/docs/img/unlimited-proxy/en/balance-payment.png)

Notes:

- Resources for unpaid orders are temporarily reserved. The page shows a reservation period of **15 minutes**, so we recommend completing payment within that time.
- If you want the plan to renew automatically at the end of the service period, select **Enable Auto-Renewal (Account Balance)** on the payment page. Make sure your account has sufficient funds so the renewal payment can be processed successfully.
- Before purchasing, carefully verify the country/region, bandwidth, and service period. Pricing may vary depending on the selected plan configuration.

#### Option 2: Pay online

If you do not want to use your account balance, deselect **Use Available Account Balance**, then choose an available payment method under **Online Payment**.

The payment methods currently available on the page include:

- Alipay
- UnionPay
- USDT (`TRC20`)
- Alipay (Hong Kong)

After selecting a payment method, click **Pay Now** and follow the on-screen instructions to complete the payment.

![Unlimited proxy online payment](https://cdn.006ip.com/docs/img/unlimited-proxy/en/online-payment.png)

After payment is completed successfully, the system will begin provisioning the Unlimited Residential Traffic line for your order.

Provisioning typically takes approximately **3 to 5 minutes** after the order is confirmed. Once the service is ready, you can view and use the purchased proxy resources from the Unlimited Residential Traffic section of the dashboard.

---

## 2. View purchased unlimited residential traffic

Once your Unlimited Residential Traffic plan has been activated, you can view the corresponding service instance, proxy credentials, and connection information in the 006IP dashboard.

### Step 1: Open Get Proxy

In the left-hand navigation, click **Get Proxy**. The page will display information for the currently selected Unlimited Residential Traffic service, including:

- **Service Host**
- **Service Instance**
- **Service Status**
- **Bandwidth**
- **Remaining Time**

When the service status shows **In Use**, the current instance has been activated and you can view and use its proxy connection information.

### Step 2: View your purchased service instances

Click **My Services** in the upper-right corner of the page.

![Unlimited proxy my services entry](https://cdn.006ip.com/docs/img/unlimited-proxy/en/my-services-entry.png)

The **My Services** panel lists all Unlimited Residential Traffic service instances under your account. Each instance displays:

- Service instance name
- Service instance ID
- Current status
- Bandwidth
- Proxy host
- Service period
- Remaining time

You can search for a service by **name or instance ID** using the search box at the top, or filter the list by service status.

After locating the instance you want to use, click the corresponding service to switch to that instance's proxy details page.

![Unlimited proxy service instance list](https://cdn.006ip.com/docs/img/unlimited-proxy/en/service-instance-list.png)

The bandwidth, service period, and remaining time shown in the service list apply to each individual instance. If your account has multiple plans, make sure you have selected the correct service instance before using the proxy.

### Step 3: View proxy credentials

After selecting the service instance you want to use, open the **Credentials** section to view the proxy connection information for that instance.

The **Credential Information** area includes:

- **Proxy Host:** The host address used to connect to the proxy server.
- **Proxy Username:** The base username generated for the current Unlimited Residential Traffic service.
- **Proxy Password:** The authentication password used to connect to the proxy server.
- **Proxy String:** The complete proxy connection string generated from the current configuration. You can copy and use it directly.

![Unlimited proxy credentials](https://cdn.006ip.com/docs/img/unlimited-proxy/en/credentials-panel.png)

A copy button is available next to each item. You can copy the information directly into a browser, proxy client, anti-detect browser, or application code.

To view the proxy password, click the visibility icon next to the password. To change the password, click **Change Password**.

> Keep your proxy username and password secure. Do not publish or share your credentials with unauthorized users.

---

## 3. What does each part of the proxy string mean?

006IP uses the standard username-and-password authentication format for SOCKS5 and HTTP proxies. The proxy string is structured as follows:

```text
U_{account}_{country_code}_{area_id}_{city_id}_{time}_{sid}:{password}@{proxy_server}:{port}
```

### Example

**Example proxy string:**

```text
U_63j7gpxb00_000___5_V97E147405:PdnVkSrJbZS8@139.162.18.5:7778
```

**Field breakdown:**

- **Account:** `63j7gpxb00` — your Unlimited Residential Traffic service account. This value stays the same.
- **Country code:** `000` — the country code. For example, `AF` means Afghanistan, while `000` means a random location worldwide.
- **Area ID:** The state or region code. For example, `1674` means Kabul. If left blank, the proxy uses a random state or region within the selected country.
- **City ID:** The city code. For example, `11220` means Kabul. If left blank, the proxy uses a random city within the selected state or region.
- **Time:** `5` — the sticky IP duration in minutes, from `5` to `90`. When the selected duration expires, the exit IP rotates automatically without dropping the connection.
- **SID:** `V97E147405` — the session ID. It can contain letters and numbers and can be up to `12` characters long. Changing the SID creates a separate proxy session.
- **Proxy password:** `PdnVkSrJbZS8`
- **Proxy server:** `139.162.18.5`
- **Port:** `7778` — the same port supports SOCKS5 and HTTP(S), so you do not need to switch ports when changing protocols.

![Unlimited proxy string breakdown](https://cdn.006ip.com/docs/img/unlimited-proxy/en/proxy-string-breakdown.png)

### Verify that the proxy is working

You can quickly check whether the proxy above is working by running the following `curl` command:

```bash
curl -x http://U_63j7gpxb00_000___5_V97E147405:PdnVkSrJbZS8@139.162.18.5:7778 ipinfo.io -v
```

![Unlimited proxy curl verification](https://cdn.006ip.com/docs/img/unlimited-proxy/en/curl-verification.png)

After running the `curl` command, a successful result returns a working proxy IP and its location details.
