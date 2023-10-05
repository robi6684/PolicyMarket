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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.dto.AllAgentDto;
import com.monocept.insurance.dto.AllCommissionDto;
import com.monocept.insurance.dto.PolicyRegistrationDto;
import com.monocept.insurance.entities.Agent;
import com.monocept.insurance.entities.Commission;
import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.Payment;
import com.monocept.insurance.entities.Policy;
import com.monocept.insurance.entities.PolicyRegistration;
import com.monocept.insurance.entities.PremiumType;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.repository.AgentRepo;
import com.monocept.insurance.repository.CommissionRepo;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.repository.PaymentRepo;
import com.monocept.insurance.repository.PolicyRegistrationRepo;
import com.monocept.insurance.service.AgentService;
import com.monocept.insurance.service.CommissionService;
import com.monocept.insurance.service.PolicyService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/agentapp")
public class AgentController {
	
	@Autowired
	private AgentService agentService;
	@Autowired
	private CustomerRepo customerRepo;
	@Autowired
	private PolicyService policyService;
	@Autowired
	private PaymentRepo paymentRepo;
	@Autowired
	private PolicyRegistrationRepo policyRegistrationRepo;
	@Autowired
	private AgentRepo agentRepo;
	@Autowired
	private CommissionRepo commissionRepo;
	@Autowired
	private CommissionService commissionService;
	

	@PreAuthorize("hasRole('EMPLOYEE')")
	@PostMapping("/save")
	public ResponseEntity<String> saveAgent(@RequestBody Agent agent){
		agentService.saveAgent(agent);
		return new ResponseEntity<>("Agent Added Successfully",HttpStatus.CREATED);
	}
	
	

	@GetMapping("/getAllAgents")
	public ResponseEntity<Page<AllAgentDto>> getAgents(@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(agentService.getAllAgents(pageno,pagesize),HttpStatus.OK);
	}
	
	
	@DeleteMapping("/delete/{agentid}")
	public ResponseEntity<String> deleteAgent(@PathVariable("agentid") int agentid){
		String message = agentService.deleteAgent(agentid);
		return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@PostMapping("/saveCustomer/{username}")
	public ResponseEntity<String> saveCustomer(@RequestBody Customer customer, @PathVariable("username") String username){
		String message = agentService.saveCustomer(customer, username);
		return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@GetMapping("/getCustomers/{username}")
	public ResponseEntity<Page<PolicyRegistrationDto>> getCustomers(@PathVariable("username") String username,@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(agentService.getCustomers(username, pageno, pagesize),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@PostMapping("/registerPolicy/{username}/{agentusername}/{schemeid}/{investtime}/{paymentType}/{tax}/{totalamount}")
	public ResponseEntity<Integer> savePolicy(@RequestBody Policy policy, @PathVariable("username") String username,
			@PathVariable("schemeid") int schemeid, @PathVariable("investtime") int investtime,
			@PathVariable("agentusername") String agentusername,@PathVariable("paymentType") String paymentType, @PathVariable("tax") double tax, @PathVariable("totalamount") int totalamount ){
		
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		
		List<Agent> agents = agentRepo.findAll();
		Agent agent = null;
		for(Agent a : agents) {
			if(a.getUser().getUsername().equals(agentusername)) {
				agent = a;
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
		
		List<PolicyRegistration> data = policyRegistrationRepo.findAll();
		PolicyRegistration policyRegistration = null;
		
		for(PolicyRegistration d : data) {
			if(d.getAgentid() == agent.getAgentid() && d.getCustomerid() == customer.getCustomerid()) {
				if(d.getPolicynumber() == 0) {
					d.setPolicynumber(getPolicy.getPolicynumber());
					policyRegistration = d;
					break;
				}
			}
		}
		
		if(policyRegistration == null) {
	
			policyRegistration = new PolicyRegistration(agent.getAgentid(),customer.getCustomerid(),
					getPolicy.getPolicynumber(),issueDate);
		}
		
		policyRegistrationRepo.save(policyRegistration);
		
		double comm = 0;
		if(getPolicy.getPremiumtype() == PremiumType.Yearly) {
			comm = ((investtime*12)/12) * getPolicy.getPremiumamount();
		}
		else if(getPolicy.getPremiumtype() == PremiumType.Quarterly) {
			comm = ((investtime*12)/4) * getPolicy.getPremiumamount();		
		}
		else if(getPolicy.getPremiumtype() == PremiumType.Monthly) {
			comm = ((investtime*12)) * getPolicy.getPremiumamount();
		}
		comm= comm * ((getPolicy.getScheme().getRegistrationcommission())/100 );
		Commission commission = new Commission(customer.getCustomerid(),getPolicy.getPolicynumber(),
				issueDate,comm,"Pending",agent,null);
		commissionRepo.save(commission);
		agent.setCommission(agent.getCommission() + comm);
		agentRepo.save(agent);
		return new ResponseEntity<>(getPolicy.getPolicynumber(),HttpStatus.CREATED);
		
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@GetMapping("/getAgent/{username}")
	public ResponseEntity<Agent> getAgent(@PathVariable("username") String username){
		return new ResponseEntity<>(agentService.getAgent(username),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@PutMapping("/updateAgent/{agentid}")
	public ResponseEntity<String> updateAgent(@RequestBody Agent agent, @PathVariable("agentid")int agentid){
		String message = agentService.updateAgent(agentid, agent);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@GetMapping("/getCustomersCount/{username}")
    public ResponseEntity<Integer> getCustomersAndCountByUsername(@PathVariable String username) {
        int customerCount = agentService.getCustomersAndCountByUsername(username);
        return new ResponseEntity<>(customerCount, HttpStatus.OK);
    }
	
	
	@PreAuthorize("hasRole('AGENT')")
	@GetMapping("/commission/{username}")
    public ResponseEntity<Double> getAgentCommission(@PathVariable String username) {
        double commission = agentService.getAgentCommission(username);
        return new ResponseEntity<>(commission, HttpStatus.OK);
    }
	
	@PreAuthorize("hasRole('AGENT')")
	@GetMapping("getAgentPolicies/{username}")
	public ResponseEntity<Integer>getAgentPolicies(@PathVariable String username){
		int policies = agentService.getAgentPolicyCount(username);
		return new ResponseEntity<>(policies,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@PutMapping("/updatePassword/{agentid}/{password}")
	public ResponseEntity<String> updatePassword(@PathVariable("agentid")int agentid, @PathVariable("password") String password){
		String message = agentService.updatePassword(agentid, password);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('AGENT')")
	@PostMapping("/sendMail/{mails}/{message}")
	public ResponseEntity<String> sendMail(@PathVariable("mails") String[] mails, @PathVariable("message") String message){
		return new ResponseEntity<>(agentService.sendMail(mails, message),HttpStatus.OK);
	}
	
	@GetMapping("/count")
    public ResponseEntity<Long> getTotalAgentCount() {
        long totalAgentCount = agentService.getTotalAgentCount();
        return new ResponseEntity<>(totalAgentCount, HttpStatus.OK);
    }
	
	@GetMapping("/commissions/{username}")
    public ResponseEntity<Page<AllCommissionDto>> getAllCommissions(@PathVariable String username,@RequestParam int pageno,@RequestParam int pagesize) {
        Page<AllCommissionDto> commissions = commissionService.getAllCommissions(username, pageno, pagesize);
        return new ResponseEntity<>(commissions, HttpStatus.OK);
    }
	
	@GetMapping("/get/{username}")
	public ResponseEntity<AllAgentDto> get(@PathVariable("username") String username){
		Agent agent = agentService.getAgent(username);
		if(agent == null)
			throw new ListEmptyException("List is empty",HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(new AllAgentDto(agent.getAgentid(),agent.getUser().getUsername(),
				agent.getFirstname(),agent.getLastname(),agent.getCommission()),HttpStatus.OK);
	}
	

}