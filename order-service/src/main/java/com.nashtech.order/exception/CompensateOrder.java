package com.nashtech.order.exception;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompensateOrder {
    private String orderId;
    private String userId;
    private String productId;
    private String paymentId;
    private String shipmentId;
    private String reasonToFailed;
}
