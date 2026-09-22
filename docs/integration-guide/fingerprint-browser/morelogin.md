---
sidebar_position: 13
sidebar_label: MoreLogin Fingerprint Browser Guide
description: Complete guide to configuring 006ip static residential proxies in MoreLogin.
---

# MoreLogin Fingerprint Browser — 006IP Proxy Guide

***Before using 006IP proxy services, make sure your local network can reliably access international websites and services. If you encounter connection issues, check your local network connection or contact customer support for assistance.***


006IP is a residential proxy infrastructure provider serving enterprises, developers, and teams operating across international markets. Its offerings include **dynamic residential IPs  and static residential IPs**. The platform supports country/region- and city-level geo-targeting, with dashboard controls for IP allowlisting, proxy authentication methods, and location targeting options. It is suitable for compliant web data collection, localized website testing, price monitoring, ad verification, and maintaining stable network environments for cross-border operations.

Among these offerings, **static residential IPs** provide a long-term, fixed egress IP address, making them better suited for use cases that require IP consistency and stable connectivity. In this guide, we will use a 006IP static residential proxy as an example and walk through account registration, claiming free trial proxy traffic, purchasing a proxy, exporting proxy credentials, and configuring and testing the 006IP proxy in the **MoreLogin fingerprint browser**.

> **Need help? Contact us anytime:**
>
> - Telegram: [https://telegram.me/ip006ip](https://telegram.me/ip006ip)
> - Phone: `15673887335`
> - Email: [support@006ip.com](mailto:support@006ip.com)

## Basic Setup

### 1. Register and Sign In to 006IP

First, open the [006IP website](https://006ip.com/) and click **Sign up** in the upper-right corner. If you already have an account, click **Sign in** instead.

![006ip website sign-up entry](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/006ip-homepage-en.png)

Next, choose either of the following registration methods:

#### Option 1: Register by Email

Select **Email Register**, then enter your account/email, email verification code, password, and confirmation password. Click **Send Code**, check your email for the verification code, enter it, agree to the **Terms** and **Privacy Policy**, and then click **Sign Up**.

![006ip email registration](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/006ip-register-email-en.png)

#### Option 2: Register by Mobile Number

Select **Mobile Register**, confirm the correct country or region calling code, enter your phone number, click **Send Code**, and enter the SMS verification code. Agree to the **Terms** and **Privacy Policy**, then click **Sign Up**.

After registering with a mobile number, you will be signed in automatically. The account initially uses the default password state, so go to your account settings and set your own login password as soon as possible.

![006ip mobile registration](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/006ip-register-phone-en.png)

> The homepage also provides a **Sign Up with Gmail** shortcut. If you use Gmail, follow the on-screen authorization prompts to complete registration.

### 2. Claim Free Trial Proxy Traffic

006IP currently offers a trial promotion for new users: contact customer support to receive **1 GB of free proxy traffic**. Eligibility requirements, supported products, and the validity period are subject to the current promotion page and confirmation from customer support.

> You can use the trial traffic to verify the target location, proxy protocol compatibility, and connectivity for your use case before purchasing a paid plan.

### 3. Purchase a Static Residential Proxy

After signing in to the 006IP dashboard, click **Static Proxies** in the left-hand navigation menu, then select **ISP Proxies** or **Datacenter Proxies** as needed to open the purchase page.

#### Step 1: Choose a Purchase Mode and Configure Proxy Settings

The purchase page provides two configuration options: **Quick Configuration** and **Custom Configuration**. Both calculate pricing in real time based on the selected resources and configuration, but they are designed for different requirements.

##### (1) Quick Configuration

Quick Configuration is suitable for users who want to use the platform's default network configuration and place an order quickly. In this mode, you mainly configure the following options:

| Setting | Description |
| --- | --- |
| **Access Type** | Choose **Dedicated** or **Shared**. Dedicated IPs are better suited for use cases with stricter requirements for IP reputation, stability, and isolation from other users. Shared IPs are better suited for standard access scenarios where cost is the priority. |
| **Country/Region and City** | Target a specific country/region and city, or select a random location for country-level IP allocation. |
| **Subscription Period** | The official guide lists subscription periods ranging from 30 to 365 days. Medium- and long-term plans may automatically qualify for tiered discounts. Final pricing is subject to the purchase page. |
| **Default Settings** | **Connections (QPS)**, port bandwidth, and UDP use the default values displayed on the page. |

![006ip static proxy Quick Configuration](https://cdn.006ip.com/docs/img/static-proxy/en/purchase-quick-mode.png)

##### (2) Custom Configuration

If you need to specify an IP range or adjust **Connections (QPS)**, port bandwidth, or UDP, enable **Custom Configuration**. This mode also allows you to select a use case, allocate the purchase quantity based on city and subnet inventory, and choose the subscription period. Different configurations affect the final price, so review the **Order Summary** on the right before submitting the order.

![006ip static proxy Custom Configuration](https://cdn.006ip.com/docs/img/static-proxy/en/purchase-custom-mode.png)

#### Step 2: Confirm the Order and Complete Payment

After entering the order confirmation page, the system reserves the selected IP inventory for **15 minutes**. If payment is not completed within that time, the reserved IP resources will be released automatically and you will need to place the order again.

The payment methods listed in the official 006IP guide include:

- **Account balance**;
- **Online payment**;
- **A combination of account balance and online payment**.

If your account balance is insufficient, you can apply the available balance first and pay the remaining amount through one of the online payment methods shown on the page. When using your account balance, you need to enter the payment password configured on the 006IP platform. Available online payment channels and supported currencies are subject to what is displayed on the checkout page.

![006ip order confirmation and payment](https://cdn.006ip.com/docs/img/static-proxy/en/order-payment.png)

### 4. View and Export Proxy Connection Details

After payment is completed, open **My IPs** from the left-hand menu to view your purchased static IPs. The list displays bandwidth, QPS, UDP status, expiration date, and resource status, and also provides options to renew, disable, enable, and view details.

![006ip My IPs list](https://cdn.006ip.com/docs/img/static-proxy/en/my-ip-list.png)

Before configuring MoreLogin, prepare the following four proxy connection details:

- **Proxy IP address**
- **Port**
- **Username**
- **Password**

On the **My IPs** page, click **Export Credentials** in the upper-right corner and select the proxy credential format required by your client. You can use the standard format:

```text
HOST:PORT:USERNAME:PASSWORD
```

The exported file contains plaintext proxy credentials. Store it securely and do not share the credentials through public chats, screenshots, or untrusted channels.

![006ip export proxy credentials](https://cdn.006ip.com/docs/img/static-proxy/en/export-credentials.png)

For the latest purchase and credential export procedures, refer to the [006IP Static Proxy User Guide](/static-proxy-user-guide/) and the current instructions shown in the dashboard.

## Configure MoreLogin

After completing the steps above and obtaining the proxy server address, port, username, and password from 006IP, you can add the proxy to a MoreLogin browser profile.

### 1. Open the Browser Profile and Access Proxy Settings

Open **MoreLogin**, select **Profiles** from the left-hand menu, and make sure you are on the **Browser** list.

![MoreLogin browser profile list](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/morelogin-1-en.png)

Find the browser profile you want to configure. In the **Proxy** column, click the edit icon to open the **Modify Proxy** window.

If you do not have an available profile yet, you can click **New profile** in the upper-right corner to create one before configuring the proxy.

### 2. Add a 006IP Proxy

In the **Modify Proxy** window, select **New proxy**.

![Add a new proxy in MoreLogin](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/morelogin-2-en.png)

Then enter the proxy connection details obtained from the 006IP dashboard in the previous section:

| MoreLogin Setting | What to Enter |
| --- | --- |
| **Proxy type** | Select the protocol that matches your current 006IP proxy, such as `HTTP`, `HTTPS`, or `SOCKS5`. |
| **IP query channel** | You can keep the default `IP2Location` option. |
| **Proxy server** | Enter the proxy host and port provided by 006IP. |
| **Proxy account** | Enter the proxy username provided by 006IP. |
| **Proxy password** | Enter the corresponding proxy password. |
| **Refresh URL** | If the current proxy provides a refresh URL, enter it here. If not, leave this field blank. |

For example, if the credentials exported from 006IP use the following format:

```text
HOST:PORT:USERNAME:PASSWORD
```

Enter them in MoreLogin as follows:

```text
HOST:PORT → MoreLogin "Proxy server"
USERNAME  → MoreLogin "Proxy account"
PASSWORD  → MoreLogin "Proxy password"
```

![Enter 006IP proxy information in MoreLogin](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/morelogin-3-en.png)

> **Note:** The proxy type selected in MoreLogin must match the protocol used by the 006IP proxy. Otherwise, the proxy may fail to connect properly.

### 3. Check the Proxy Connection

After entering the proxy information, click **proxy detection** at the bottom of the window.

If the check is successful, MoreLogin will display **Check passed!** along with the current proxy egress IP address and location information.

![Check the 006IP proxy in MoreLogin](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/morelogin-4-en.png)

After confirming that the proxy check has passed, click **Confirm** in the lower-right corner to save the proxy settings.

### 4. Save and Launch the Browser Profile

After saving, return to the MoreLogin profile list.

![MoreLogin profile list after saving the proxy](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/morelogin-5-en.png)

The **Proxy** column will now show the proxy information and location associated with the current browser profile.

Click **Start** for the profile to launch the browser. Once launched, the profile will connect to the network through the configured 006IP proxy.

To further verify that the proxy is active, you can visit `https://ipinfo.io` or another IP lookup service from within the current MoreLogin browser profile and confirm that the displayed egress IP matches your 006IP proxy.

### 5. Troubleshooting

| Issue | What to Check |
| --- | --- |
| Unable to connect to the proxy | Verify that the proxy server address and port are correct, and make sure the current 006IP proxy is still active. |
| Authentication failed | Recheck the proxy username and password provided by 006IP, and make sure no extra spaces were included when copying the credentials. |
| Proxy detection fails | Check whether your local network can reach the proxy server. |
| Credentials are entered but the proxy still does not work | Confirm that the proxy type selected in MoreLogin matches the actual protocol of the 006IP proxy. |
| The browser shows your local IP after launch | Return to the proxy settings and confirm that the proxy was saved and bound to the current browser profile. |
| The detected geolocation does not match the expected location | Verify that the 006IP proxy you entered corresponds to the country/region or city you purchased. |

> Interface layouts and button labels may vary slightly between MoreLogin versions. Always follow the interface shown in your current client. Use proxies only for lawful and compliant business purposes, and comply with the target website's Terms of Service and all applicable local laws and regulations.

---

> If you encounter an issue not covered above, feel free to contact us for technical support:
>
> - **Telegram**: [https://telegram.me/ip006ip](https://telegram.me/ip006ip)
> - **Phone**: 15673887335
> - **Email**: [support@006ip.com](mailto:support@006ip.com)
>
> For detailed instructions on purchasing, renewing, and exporting account credentials, see the [006IP Static Proxy User Guide](/static-proxy-user-guide/).
