package com.duonghongluyen.exercise03.service;

import java.util.List;

import com.duonghongluyen.exercise03.entity.Shipping;

public interface ShippingService {
    Shipping addShipping(Shipping shipping);

    Shipping getShippingById(int shippingId);

    List<Shipping> getAllShippings();

    Shipping updateShipping(int shippingId, Shipping updatedShipping);

    void deleteShipping(int shippingId);
}
