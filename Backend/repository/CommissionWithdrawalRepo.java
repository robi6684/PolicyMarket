package com.monocept.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.insurance.entities.CommissionWithdrawal;

public interface CommissionWithdrawalRepo extends JpaRepository<CommissionWithdrawal,Integer>{

}
