---
sidebar_position: 3
sidebar_label: DuoPlus 云手机配置教程
description: 在 DuoPlus 云手机中配置 006IP 静态住宅代理的完整教程。
---

# DuoPlus 云手机配置 006IP 静态住宅代理教程

***在使用 006IP 代理服务之前，请确保您的网络环境可以正常访问境外资源。如遇连接问题，请检查本地网络或联系客服获取协助。***


006ip 是面向企业、开发者及跨境业务团队的住宅代理基础设施服务商，提供**动态住宅 IP、静态住宅 IP** 等产品。平台支持国家 / 地区及城市级定位，并可在后台配置 IP 白名单、认证方式和定位模式，适用于合规的数据采集、区域化页面测试、价格监控、广告验证及跨境业务环境维护等场景。

其中，**静态住宅 IP**能够提供长期固定的出口地址，更适合对网络环境连续性和连接稳定性有要求的业务。本教程将以 006IP 静态住宅代理为例，依次介绍账号注册、试用流量领取、代理购买和连接凭证导出，并演示如何在 **DuoPlus 云手机**中完成 006IP 代理配置、连接检测与启动。

> **遇到问题随时联系我们：**
>
> - Telegram：[https://telegram.me/ip006ip](https://telegram.me/ip006ip)
> - 电话：`15673887335`
> - 邮箱：[support@006ip.com](mailto:support@006ip.com)

## 基础流程

### 1、注册并登录 006ip

第一步，打开 [006ip 中文官网](https://006ip.com/zh)，点击页面右上角的「**注册**」。已有账号的用户可直接点击「**登录**」。

![006ip 中文官网注册入口](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-homepage.png)

第二步，在注册页面选择以下任一方式完成注册：

#### 方式一：邮箱注册

选择「**邮箱注册**」，依次填写账号 / 邮箱、邮箱验证码、密码和确认密码。点击「**发送验证码**」后前往邮箱查收验证码，填写完成后勾选同意《服务协议》和《隐私政策》，再点击「**立即注册**」。

![006ip 邮箱注册](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-register-email.png)

#### 方式二：手机号注册

选择「**手机号注册**」，确认国家或地区区号后填写手机号，点击「**发送验证码**」并填写短信验证码。勾选同意《服务协议》和《隐私政策》后，点击「**立即注册**」。

手机号注册成功后会自动登录，账号初始为默认密码状态。请尽快前往账号设置中设置自己的登录密码。

![006ip 手机号注册](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-register-phone.png)

> 官网首页还提供「**使用 Gmail 账号注册**」快捷入口；如使用 Gmail，可按页面授权提示完成注册。

### 2、领取试用流量

006ip 官网当前提供新人试用活动：联系客服可免费领取 **1GB 试用流量**。具体领取条件、可用产品和有效期以活动页面及客服回复为准。

> 可以先用试用流量验证目标地区、协议兼容性和业务连通性，再决定正式套餐。

### 3、购买静态住宅代理

登录 006ip 用户后台后，在左侧导航栏点击「**静态代理**」，再按需选择「**静态住宅原生 IP**」或「**静态住宅广播 IP**」，进入购买页面。

#### 第一步：选择购买模式并设置代理属性

购买页面提供「**快速模式**」和「**自定义模式**」两种配置方式。两种模式都会根据所选资源和配置实时核算价格，但适用需求不同。

##### （1）快速模式

快速模式适合希望直接使用平台默认网络配置、快速完成下单的用户。在此模式下，主要设置以下项目：

| 参数                  | 说明                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **独享级别**          | 可选择独享或共享。独享 IP 更适合对环境纯净度、稳定性和 IP 关联度要求较高的场景；共享 IP 更适合成本优先的常规访问场景。 |
| **国家 / 地区与城市** | 可按国家 / 地区和指定城市定位，也可选择随机范围进行国家级节点分布。                                                    |
| **订阅时长**          | 官方指南列出 30–365 天等周期；中长期套餐可能自动匹配阶梯折扣，最终以购买页面为准。                                     |
| **固定配置**          | 并发连接数（QPS）、端口带宽和 UDP 协议使用页面显示的默认配置。                                                         |

![006ip 静态代理快速模式](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-purchase-quick-mode.png)

##### （2）自定义模式

如需指定 IP 段，或需要调整连接数（QPS）、端口带宽和 UDP 协议，可开启「**自定义模式**」。该模式还支持选择业务用途、按城市和网段库存分配采购数量，并配置订阅时长。不同配置会影响最终计价，提交前应核对页面右侧的订单详情。

![006ip 静态代理自定义模式](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-purchase-custom-mode.png)

#### 第二步：确认订单并完成支付

进入订单确认页面后，系统会为所选 IP 资源锁定库存 **15 分钟**。如果超时未支付，资源会自动释放，需要重新下单。

006ip 官方指南列出的支付方式包括：

- **账户余额支付**；
- **在线支付**；
- **余额 + 在线支付**的组合支付。

当账户余额不足时，可先扣减余额，再通过页面提供的在线渠道补齐差额。使用账户余额抵扣时，需要输入在 006ip 平台设置的支付密码。在线渠道及可用币种以结算页面实际显示为准。

![006ip 订单确认与支付](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-order-payment.png)

### 4、查看并导出代理连接信息

支付成功后，进入左侧「**我的 IP**」菜单，即可查看已购买的静态 IP。列表会显示带宽、QPS、UDP 状态、有效期和资源状态，并支持续费、停用、启用及查看详情等操作。

![006ip 我的 IP 列表](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-my-ip-list.png)

配置 DuoPlus 云手机前，需要准备以下四项连接信息：

- **代理 IP 地址**
- **端口号**
- **用户名**
- **密码**

在「我的 IP」页面点击右上角的「**导出所有账号**」，选择适合客户端的代理格式。可使用标准格式：

```text
HOST:PORT:USERNAME:PASSWORD
```

导出文件包含明文连接凭证。请妥善保存导出文件，不要通过公开聊天、截图或不受信任的渠道发送账密。

![006ip 导出账号凭证](https://cdn.006ip.com/docs/img/guide/static-proxy/006ip-export-credentials.png)

购买与账密导出流程以 [006ip 静态代理使用指南](https://docs.yangtuip.com/zh/static-proxy-user-guide/) 和后台页面的最新提示为准。

## DuoPlus 云手机配置

完成上述流程并获取 006IP 代理的**代理 IP 地址、端口号、用户名和密码**后，即可在 DuoPlus 云手机中完成代理配置。

如果从 006IP 导出的连接信息格式为：

```text
HOST:PORT:USERNAME:PASSWORD
```

则可将 `IP`、`PORT`、`USERNAME`、`PASSWORD` 分别对应到 DuoPlus 的代理服务器、端口以及代理账密中。下面按照你原文中的 DuoPlus 流程完成云手机购买、代理配置、连接检测和启动。

### 1、购买云手机

打开 DuoPlus，在左侧进入 **云手机**。如果当前账号还没有可用的云手机实例，点击右上角 **购买**，然后选择 **购买云手机**。

![在 DuoPlus 中进入购买云手机](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/duoplus-cloud-phone-purchase.png)

进入购买页面后，根据实际需要选择 Android 版本、购买数量和购买时长，确认订单信息后点击 **立即购买**。

![选择 DuoPlus 云手机版本并完成购买](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/duoplus-cloud-phone-complete-purchase.png)

购买完成后，进入对应云手机的配置页面。

### 2、设置云手机名称

在云手机配置页面，先填写便于识别的 **云手机名称**。如有需要，也可以选择对应分组。

![设置 DuoPlus 云手机名称和分组](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/duoplus-cloud-phone-basic-configuration.png)

### 3、配置 006IP 代理

向下找到 **网络** 设置，在 **选择代理** 中选择 **自定义代理**。

本文以 SOCKS5 为例，将从 006IP 获取的代理信息填写到对应位置：

| DuoPlus 配置项 | 006IP 对应信息 |
| --- | --- |
| 名称 | 自定义填写，例如 `proxy1` |
| 代理配置 | 选择 `Socks5` |
| 代理服务器 | 006IP 提供的代理 IP / 主机 |
| 端口 | 006IP 提供的代理端口 |
| 代理账密 | 006IP 提供的代理账号和代理密码 |
| IP 查询渠道 | `IP2Location` |

![在 DuoPlus 中填写 006IP SOCKS5 代理信息](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/duoplus-cloud-phone-proxy-configuration.png)

截图中 **代理 DNS** 设置为 **开启**。如果后续启动云手机后出现无法联网的情况，可以根据 DuoPlus 页面提示关闭代理 DNS 后再次测试。

### 4、检查代理连接

代理信息填写完成后，点击 **检查代理**。

检测成功后，页面会显示 **“代理 IP 连接测试通过”**，并展示当前代理 IP 对应的地区、时区、经纬度等信息。确认检测结果与当前使用的 006IP 代理节点一致。

![检查 DuoPlus 中的 006IP 代理连接](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/duoplus-cloud-phone-proxy-check.png)

确认无误后，点击右下角 **完成配置**。

### 5、启动云手机

配置完成后返回云手机列表，可以看到该实例已经显示对应的代理 IP 和地区信息。

点击右侧 **开机**，即可启动已经配置好 006IP 代理的 DuoPlus 云手机。

![启动已配置 006IP 代理的 DuoPlus 云手机](https://cdn.006ip.com/docs/img/static-proxy/config-tutorial/duoplus-cloud-phone-power-on.png)

---

> 如遇到上述未覆盖的问题，欢迎随时通过以下方式联系我们获取技术支持：
>
> - **Telegram**：[https://telegram.me/ip006ip](https://telegram.me/ip006ip)
> - **电话**：15673887335
> - **邮箱**：[support@006ip.com](mailto:support@006ip.com)
>
> 详细购买、续费和账号导出流程说明请查看 [006ip 静态代理使用指南](https://docs.yangtuip.com/zh/static-proxy-user-guide/)。
