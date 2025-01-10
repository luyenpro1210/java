package com.duonghongluyen.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.duonghongluyen.exercise03.entity.ShippingRate;

import java.util.UUID;

public interface ShippingRateRepository extends JpaRepository<ShippingRate, UUID> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh nếu cần
}
