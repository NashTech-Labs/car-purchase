package com.nashtech.common.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentDetails {
    private String name;
    private String cardNumber;
    private Integer validUntilMonth;
    private Integer validUntilYear;
    private Integer cvv;
}
