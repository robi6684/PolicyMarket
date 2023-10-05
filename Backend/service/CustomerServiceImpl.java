package com.monocept.insurance.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.insurance.dto.AllCustomerDto;
import com.monocept.insurance.entities.Claim;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.Policy;
import com.monocept.insurance.entities.Role;
import com.monocept.insurance.entities.User;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.exception.NullValueException;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.repository.RoleRepo;
import com.monocept.insurance.repository.UserRepo;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
	
	//------------------------------------Save Customer-------------------------------
	@Override
	public Customer saveCustomer(Customer customer) {
		User user = customer.getUser();
		Optional<Role> getRole = roleRepo.findById(4);
		Role role = getRole.get();
		user.setRole(role);
		userService.saveUser(user);
		customerRepo.save(customer);
		logger.info("Customer saved successfully");
		return customer;
	}

	//-------------------------------------Fetch All Customers----------------------------
	@Override
	public Page<AllCustomerDto> getAllCustomers(int pageno, int pagesize) {
		List<AllCustomerDto> allCustomers = new ArrayList<>();
		List<Customer> customers = customerRepo.findAll();
		if(customers.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Customers fetched successfully");
		for(Customer customer : customers) {
			allCustomers.add(new AllCustomerDto(customer.getCustomerid(),customer.getUser().getUsername(),
					customer.getFirstname(),customer.getEmail()));
		}
		pagesize = (pagesize<allCustomers.size())?pagesize:allCustomers.size();
		if(pagesize == allCustomers.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allCustomers.size());

	    List<AllCustomerDto> pageContent = allCustomers.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allCustomers.size());
	}

	//--------------------------------Delete Customer--------------------------------
	@Override
	public String deleteCustomer(int customerid) {
		customerRepo.deleteById(customerid);
		return "Customer deleted successfully";
	}
	
	//----------------------------------Get Count of Customers------------------------
	@Override
    public long getTotalCustomerCount() {
    	logger.info("Total Customers:" + customerRepo.count());
        return customerRepo.count();
    }

	//----------------------------------Fetch Customer---------------------------------
	@Override
	public Customer getCustomer(String username) {
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		return customer;
	}

	//----------------------------Update Customer Password------------------------------------
	@Override
	public String updatePassword(int customerid, String password) {
		Customer customer = customerRepo.findById(customerid).get();
		User user = customer.getUser();
		user.setPassword(passwordEncoder.encode(password));
		userRepo.save(user);
		return "Password Updated Successfully";
	}

	//---------------------------------Update Customer-----------------------------------------
	@Override
	public String updateCustomer(int customerid, Customer customer) {
		Customer cust = customerRepo.findById(customerid).get() ;
		cust.setAddress(customer.getAddress());
		cust.setFirstname(customer.getFirstname());
		cust.setLastname(customer.getLastname());
		cust.setCity(customer.getCity());
		cust.setMobilenumber(customer.getMobilenumber());
		cust.setEmail(customer.getEmail());
		cust.setState(customer.getState());
		cust.setPincode(customer.getPincode());
		cust.setNominee(customer.getNominee());
		cust.setNomineerelation(customer.getNomineerelation());
		cust.setDateofbirth(customer.getDateofbirth());
		customerRepo.save(cust);
		return "Profile Updated Successfully";
	}
	
	  //----------------------------------Get Count of Policies of Customer-------------------------
	  @Override
	    public int getCustomersPoliciesCount(String username) {
	        Customer customer = customerRepo.findByUsername(username);
	        List<Policy> policies = customer.getPolicies();
	        int policyCount = policies.size();
	        logger.info ("Policies for this customer"+ policyCount);
	        return policyCount;
	    }
	    
	    //---------------------------------Get Count of Claims of Customer---------------------------
	    @Override
	    public int getCustomersClaimsCount(String username) {
	        Customer customer = customerRepo.findByUsername(username);
	        List<Claim> claims = customer.getClaims();
	        int claimCount = claims.size();
	        logger.info ("Claims for this customer"+ claimCount);
	        return claimCount;
	    }

	    //--------------------------------Get Document Status----------------------------------
		@Override
		public String getDocumentStatus(int customerid) {
			Customer customer = customerRepo.findById(customerid).get();
			if(customer == null) {
				throw new NullValueException("Customer is null",HttpStatus.NOT_FOUND);
			}
			return customer.getDocumentstatus();
		}

		//------------------------------Update Document Status-------------------------------------
		@Override
		public String updateStatus(int customerid) {
			Customer customer = customerRepo.findById(customerid).get();
			customer.setDocumentstatus("Verified");
			customerRepo.save(customer);
			return "Document Verified Successfully";
		}

		//-------------------------------Get Customer ID----------------------------------------
		@Override
		public int getId(String username) {
			List<Customer> customers = customerRepo.findAll();
			Customer customer = null;
			for(Customer cust : customers) {
				if(cust.getUser().getUsername().equals(username)) {
					customer = cust;
					break;
				}
			}
			return customer.getCustomerid();
		}

		//--------------------------------Get Document Status----------------------------------
		@Override
		public String getStatus(String username) {
			List<Customer> customers = customerRepo.findAll();
			Customer customer = null;
			for(Customer cust : customers) {
				if(cust.getUser().getUsername().equals(username)) {
					customer = cust;
					break;
				}
			}
			return customer.getDocumentstatus();
		}

		//-------------------------------Get Customer Age-----------------------------------------
		@Override
		public int getAge(String username) {
			List<Customer> customers = customerRepo.findAll();
			Customer customer = null;
			for(Customer cust : customers) {
				if(cust.getUser().getUsername().equals(username)) {
					customer = cust;
					break;
				}
			}
			Date dateOfBirth = customer.getDateofbirth();
	        LocalDate birthDate = dateOfBirth.toLocalDate();
	        LocalDate currentDate = LocalDate.now();
	        Period period = Period.between(birthDate, currentDate);
	        int age = period.getYears();
			return age;
		}

}
