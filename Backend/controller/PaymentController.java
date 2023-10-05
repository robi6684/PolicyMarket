package com.monocept.insurance.controller;

import java.sql.Date;
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

import com.monocept.insurance.dto.AllPaymentDto;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.Payment;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.service.PaymentService;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/paymentapp")
public class PaymentController {
	
   @Autowired
   private PaymentService paymentService;
   
   @Autowired
   private CustomerRepo customerRepo;
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAllPayments")
	public ResponseEntity<Page<AllPaymentDto>> getPayments(@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(paymentService.getAllPayments(pageno,pagesize),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@PostMapping("/save/{username}/{policynumber}")
	public ResponseEntity<String> savePayment(@RequestBody Payment payment, @PathVariable("username") String username,
			@PathVariable("policynumber") int policynumber){
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		
		return new ResponseEntity<>(paymentService.savePayment(payment, customer.getCustomerid(), policynumber),HttpStatus.CREATED);
		
	}
	
	@GetMapping("/count")
    public ResponseEntity<Long> getTotalPaymentsCount() {
        long totalpaymentCount = paymentService.getTotalPaymentCount();
        return new ResponseEntity<>(totalpaymentCount, HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAllPayments/{fromdate}/{todate}")
	public ResponseEntity<Page<AllPaymentDto>> getPaymentsFromTo(@PathVariable("fromdate")Date fromdate, @PathVariable("todate")Date todate,@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(paymentService.getPaymentsBetweenDates(fromdate, todate, pageno, pagesize),HttpStatus.OK);
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAllPayments/{fromdate}")
	public ResponseEntity<Page<AllPaymentDto>> getPaymentsFrom(@PathVariable("fromdate")Date fromdate,@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(paymentService.getPaymentsFromDate(fromdate, pageno, pagesize),HttpStatus.OK);
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getPayments/{todate}")
	public ResponseEntity<Page<AllPaymentDto>> getPaymentsTo(@PathVariable("todate")Date todate,@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(paymentService.getPaymentsToDate(todate, pageno, pagesize),HttpStatus.OK);
	}
}