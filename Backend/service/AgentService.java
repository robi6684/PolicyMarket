package com.monocept.insurance.service;

import org.springframework.data.domain.Page;

import com.monocept.insurance.dto.AllAgentDto;
import com.monocept.insurance.dto.PolicyRegistrationDto;
import com.monocept.insurance.entities.Agent;
import com.monocept.insurance.entities.Customer;

public interface AgentService {

	String saveAgent(Agent agent);
	Page<AllAgentDto> getAllAgents(int pageno, int pagesize);
	String deleteAgent(int agentid);
	String saveCustomer(Customer customer,String username);
	Page<PolicyRegistrationDto> getCustomers(String username, int pageno,int pagesize);
	String updateAgent(int agentid, Agent agent);
	Agent getAgent(String username);
	int getCustomersAndCountByUsername(String username);
	double getAgentCommission(String username);
	int getAgentPolicyCount(String username);
	String updatePassword(int agentid, String password);
	String sendMail(String[] mails, String text);
	long getTotalAgentCount();
}
