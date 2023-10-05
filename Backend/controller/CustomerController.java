package com.monocept.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.dto.AllCustomerDto;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.service.CustomerService;

@RestController
@RequestMapping("/customerapp")
@CrossOrigin(origins="*")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/save")
	public ResponseEntity<String> saveCustomer(@RequestBody Customer customer){
		customerService.saveCustomer(customer);
		return new ResponseEntity<>("Customer saved successfully",HttpStatus.CREATED);
	}
	
	@GetMapping("/getAllCustomers")
	public ResponseEntity<Page<AllCustomerDto>> getCustomers(@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(customerService.getAllCustomers(pageno, pagesize),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{customerid}")
	public ResponseEntity<String> deleteCustomer(@PathVariable("customerid") int customerid){
		String message = customerService.deleteCustomer(customerid);
		return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/count")
    public ResponseEntity<Long> getTotalCustomerCount() {
        long totalCustomerCount = customerService.getTotalCustomerCount();
        return new ResponseEntity<>(totalCustomerCount, HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@PutMapping("/updatePassword/{customerid}/{password}")
	public ResponseEntity<String> updatePassword(@PathVariable("customerid")int customerid, @PathVariable("password") String password){
		String message = customerService.updatePassword(customerid, password);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@GetMapping("/getCustomer/{username}")
	public ResponseEntity<Customer> getAgent(@PathVariable("username") String username){
		return new ResponseEntity<>(customerService.getCustomer(username),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('CUSTOMER')")
	@PutMapping("/updateCustomer/{customerid}")
	public ResponseEntity<String> updateAgent(@RequestBody Customer customer, @PathVariable("customerid")int customerid){
		String message = customerService.updateCustomer(customerid, customer);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	
	@GetMapping("/getCustomersPolicyCount/{username}")
    public ResponseEntity<Integer> getCustomersPolicyByUsername(@PathVariable String username) {
        int policyCount = customerService.getCustomersPoliciesCount(username);
        return new ResponseEntity<>(policyCount, HttpStatus.OK);
    }
	
	
	
	@GetMapping("/getCustomersClaimCount/{username}")
    public ResponseEntity<Integer> getCustomersClaimByUsername(@PathVariable String username) {
        int claimCount = customerService.getCustomersClaimsCount(username);
        return new ResponseEntity<>(claimCount, HttpStatus.OK);
    }
	
	@GetMapping("/getDocumentStatus/{customerid}")
    public ResponseEntity<String> getDocumentStatus(@PathVariable("customerid") int customerid) {
        String status = customerService.getDocumentStatus(customerid);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
	

	@PreAuthorize("hasRole('EMPLOYEE')")
	@PutMapping("/updateStatus/{customerid}")
	public ResponseEntity<String> updateStatus(@PathVariable("customerid")int customerid){
		String message = customerService.updateStatus(customerid);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	

	@GetMapping("/getId/{username}")
	public ResponseEntity<Integer> updateStatus(@PathVariable("username")String username){
		int id = customerService.getId(username);
		return new ResponseEntity<> (id,HttpStatus.OK);
	}
	
	@GetMapping("/getStatus/{username}")
    public ResponseEntity<String> getStatus(@PathVariable("username") String username) {
        String status = customerService.getStatus(username);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

	@GetMapping("/getAge/{username}")
    public ResponseEntity<Integer> getAge(@PathVariable("username") String username) {
        return new ResponseEntity<>(customerService.getAge(username), HttpStatus.OK);
    }
	
	@GetMapping("/get/{username}")
	public ResponseEntity<AllCustomerDto> getCust(@PathVariable("username") String username){
		Customer customer = customerService.getCustomer(username);
		if(customer == null) {
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(new AllCustomerDto(customer.getCustomerid(),customer.getUser().getUsername()
				,customer.getFirstname(),customer.getEmail()), HttpStatus.OK);
		
	}

}
