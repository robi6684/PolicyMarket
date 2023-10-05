package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.Payment;

public interface PaymentRepo extends JpaRepository<Payment,Integer> {

}
