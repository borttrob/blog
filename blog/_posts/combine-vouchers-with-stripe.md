---
title: Using vouchers with Stripe payment.
date: 2020-12-02
published: true
tags: ['Stripe','Voucher']
canonical_url: false
description: ""
---

An obvious requirement for a payment/checkout system is to accept **vouchers**, i.e. codes that can be entered during checkout and lead to a price reduction. Introducing such a system means that you suddenly have **two payment services** where each has to confirm it's part of the payment. E.g. 30€ paid by voucher credit and 20€ paid by credit card. A natural requirement is that the payment process must be transactional, i.e. if the voucher service or credit card service rejects the payment, both payments must be rolled back. Let's explore how you can implement such a system with [Stripe](https://stripe.com).

[Stripe](https://stripe.com) is one of the most widely used Payment Gateways, but since you came here voluntarily you know this already. In a just world Stripe would provide a native voucher system and therefore the pains of synchronizing voucher and card payment would be hidden from us poor developers. But unfortunately Stripe doesn't have a native voucher system. Therefore we have to implement a synchronisation wrapper on our own.

(Note: Stripe *has* [a coupon system](https://stripe.com/docs/payments/checkout/discounts) that is only available for [Stripe Checkout](https://stripe.com/de/payments/checkout). If you only need discount/promo codes in your application you can stop reading.)

### Options

There are three alternatives how this synchronisation could look like

1. Redeem the voucher. If successful, perform stripe payment. 
2. Perform Stripe payment. If successful, redeem the voucher.
3. Redeem voucher and perform Stripe payment in parallel.

Let's discuss these possibilities in detail.

#### 1. Redeem the voucher. If successful, perform stripe payment. 

First we have to consider that different payment methods have different ways to give feedback about payment success. E.g card payment, have an almost instantaneous feedback if the payment was successful. There is almost no delay between the time the user clicks the *Pay* button and the success callback.

On the other hand some payment methods forward you to the website of the payment provider, e.g. Giropay or Sofort, which are popular in Germany. The user could abandon the process after being forwarded to the website of the payment provider. You won't get any information whatsoever about  the state the user is in. Only if the payment succeeded or there was some technical issue that cancelled the payment. 

If you only use payment methods of the first type - Congratulations! You can stop reading and implement this option without any problems.

If, on the other hand, you have to support payment methods of the second type, you might have a problem. Assume you have redeemed the voucher, forwarded the user to e.g. Giropay website, and the user abandoned the payment session. In other words you have invalidated the voucher, but the user didn't buy anything. The voucher won't work if the user tries to buy something in the future, which in turn results in a bad user experience. 

What can you do to resolve this?

One possibility is to introduce a **session timeout**. If the user doesn't complete the payment within e.g. 30 min, cancel the session and undo the voucher redemption. The obvious drawback is that the user won't be able to use the voucher for 30min.

Another possibility is to allow only a **single checkout session per user**. If the user abandons the payment process and starts another checkout session, the previous checkout session gets automatically cancelled. Cancelling the checkout session means the voucher redemption is rolled back. The drawback is that the user won't be able to perform multiple checkouts at same time, which may or may not be a problem in your application context. Note: the concept of a "Shopping Cart" is effectively the concept of a single checkout session.

#### 2. Perform Stripe payment first. If successful, redeem the voucher.

Here we let the user pay with his payment provider of choice. When payment succeeds our backend gets notified by a Stripe WebHook call, and we can finally redeem the voucher. 

It is possible (but not very likely) that when we get the Stripe success notification, the voucher was already redeemed in another checkout session. Especially if you consider that the user can take as much time as he/she wants when redirected to e.g. Giropay. The user could abandon checkout session No. 1, open another tab, buy something and then return to the first checkout session to finish. In this case the Stripe payment must be rolled back/cancelled.

Unfortunately stripe doesn't refund its transaction fees if you roll back a payment. As of today the fees are around 3% of the sales volume. Depending on your margin and the probability of such roll backs this can be a substantial cut of you margin.

Again, a single checkout solution, like a "shopping cart" would mitigate this drawback. In our case we wanted our checkout process as lightweight as possible to increase conversion. Therefore, we decided against a shopping cart.

### 3. Redeem voucher and perform Stripe payment in parallel.

This option combines the drawbacks of the previous options. Therefore, I won't discuss it further.

## Summary

Unfortunately Stripe doesn't have a native voucher system. In this post I presented multiple options to integrate your own voucher system with Stripe. Each option has its own drawbacks, that may or may not be significant to your application. 

For option 1 you have to implement either a session timeout or a "shopping cart". In option 2 you have to swallow Stripe transaction fees because of the occasional roll back of the Stripe payment. 

All in all until Stripe implements their own voucher system, a silver bullet solution doesn't seem to exist.

### References

[Stripe coupon system](https://stripe.com/docs/payments/checkout/discounts)

