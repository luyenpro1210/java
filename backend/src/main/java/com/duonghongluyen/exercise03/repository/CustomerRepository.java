package com.duonghongluyen.exercise03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.duonghongluyen.exercise03.entity.Customer;

import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {
}
