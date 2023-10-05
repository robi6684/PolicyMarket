package com.monocept.insurance.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.dto.AllPolicyDto;
import com.monocept.insurance.dto.PremiumDto;
import com.monocept.insurance.dto.ReceiptDto;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.Payment;
import com.monocept.insurance.entities.Policy;
import com.monocept.insurance.exception.NullValueException;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.repository.PaymentRepo;
import com.monocept.insurance.service.PolicyService;

@RestController
@RequestMapping("/policyapp")
@CrossOrigin(origins="*")
public class PolicyController {
	
	@Autowired
	private PolicyService policyService;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private PaymentRepo paymentRepo;
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@PostMapping("/save/{username}/{schemeid}/{investtime}/{paymentType}/{tax}/{totalamount}")
	public ResponseEntity<Integer> savePolicy(@RequestBody Policy policy, @PathVariable("username") String username,
			@PathVariable("schemeid") int schemeid, @PathVariable("investtime") int investtime,
			@PathVariable("paymentType") String paymentType, @PathVariable("tax") double tax, @PathVariable("totalamount") int totalamount ){
		
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		
		Policy getPolicy = policyService.savePolicy(policy, customer.getCustomerid(), schemeid, investtime);
		Payment payment = new Payment();
		payment.setPolicy(getPolicy);
		payment.setAmount(getPolicy.getPremiumamount());
		payment.setCustomer(customer);
		LocalDate currentDate = LocalDate.now();
		Date issueDate = Date.valueOf(currentDate);
		payment.setDate(issueDate);
		payment.setPaymenttype(paymentType);
		payment.setTax(tax);
		payment.setTotalpayment(totalamount);
		paymentRepo.save(payment);
		return new ResponseEntity<>(getPolicy.getPolicynumber(),HttpStatus.CREATED);
		
	}
	
	@GetMapping("/getReceipt/{policynumber}")
	public ResponseEntity<ReceiptDto> getReceipt(@PathVariable("policynumber") int policynumber){
		return new ResponseEntity<>(policyService.getReceipt(policynumber),HttpStatus.CREATED);
		
	}
	
	@GetMapping("/getAllPolicies/{username}")
	public ResponseEntity<Page<AllPolicyDto>> getPolicies(@PathVariable String username,@RequestParam int pageno, @RequestParam int pagesize ){
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		if(customer == null) {
			throw new NullValueException("Customer is null",HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(policyService.getAllPolicies(customer.getCustomerid(),pageno,pagesize),HttpStatus.OK);
	}
	
	@GetMapping("/getPremiums/{policynumber}")
	public ResponseEntity<List<PremiumDto>> premiums(@PathVariable("policynumber")int policynumber){
		return new ResponseEntity<>(policyService.getPremiums(policynumber),HttpStatus.ACCEPTED);
		
	}
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@GetMapping("/getStatus/{policynumber}")
	public ResponseEntity<String> getStatus(@PathVariable("policynumber")int policynumber){
		System.out.println("Hiiiii");
		return new ResponseEntity<>(policyService.getStatus(policynumber),HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/getAmount/{policynumber}")
	public ResponseEntity<Double> getAmount(@PathVariable("policynumber")int policynumber){
		return new ResponseEntity<>(policyService.getAmount(policynumber),HttpStatus.ACCEPTED);
		
	}

}
