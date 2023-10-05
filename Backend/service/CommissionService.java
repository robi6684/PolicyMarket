package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllCommissionDto;
import com.monocept.insurance.dto.WithdrawalDto;
import com.monocept.insurance.entities.CommissionWithdrawal;

public interface CommissionService {

	Page<AllCommissionDto> getAllCommissions(String username, int pageno, int pagesize);
	String saveCommisionWithdrawal(CommissionWithdrawal commissionWithdrawal, int commissionid);
	Page<WithdrawalDto> getWithdrawals(int pageno, int pagesize);
	String updateStatus(int id);

}