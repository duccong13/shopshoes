package com.nvl.novatech.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002, "User not existed", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1003, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    PRODUCT_NOT_EXISTED(1004, "Product not existed", HttpStatus.BAD_REQUEST),
    PRODUCT_EXISTED(1005, "Product existed", HttpStatus.BAD_REQUEST),
    ADDRESS_NOT_EXISTED(1005, "Address not existed", HttpStatus.BAD_REQUEST),
    CAN_NOT_DELETE(1006, "Can't delete", HttpStatus.BAD_REQUEST),
    CAN_NOT_UPDATE(1006, "Can't update", HttpStatus.BAD_REQUEST),
    CART_EXISTED(1007, "Cart already exists", HttpStatus.BAD_REQUEST),
    CART_ITEM_EXISTED(1007, "Cart item already exists", HttpStatus.BAD_REQUEST),
    REVIEW_NOT_EXISTED(1007, "Review not existed", HttpStatus.BAD_REQUEST),
    ORDER_NOT_EXISTED(1007, "Order not existed", HttpStatus.BAD_REQUEST)
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private int code;
    private String message;
    private HttpStatusCode statusCode;

}
