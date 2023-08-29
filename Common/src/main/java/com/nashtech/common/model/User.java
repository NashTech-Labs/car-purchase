package com.nashtech.common.model;

import com.nashtech.common.model.PaymentDetails;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    private final String firstName;
    private final String lastName;
    private final String userId;
    private final String address;
    private final PaymentDetails paymentDetails;
}