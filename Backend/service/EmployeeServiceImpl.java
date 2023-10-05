package com.monocept.insurance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

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
import com.monocept.insurance.dto.AllEmployeeDto;
import com.monocept.insurance.entities.Employee;
import com.monocept.insurance.entities.Role;
import com.monocept.insurance.entities.User;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.repository.EmployeeRepo;
import com.monocept.insurance.repository.RoleRepo;
import com.monocept.insurance.repository.UserRepo;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepo userRepo;
	
	
	private static final Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);

	//----------------------------------------Save Employee-----------------------------------
	@Override
	public String saveEmployee(Employee employee) {
		User user = employee.getUser();
		Optional<Role> getRole = roleRepo.findById(2);
		Role role = getRole.get();
		user.setRole(role);
		userService.saveUser(user);
		employeeRepo.save(employee);
		logger.info("Employee saved successfully");
		return "Employee saved successfully";
	}

	//------------------------------Fetch All Employees-----------------------------------
	@Override
	public Page<AllEmployeeDto> getAllEmployees(int pageno, int pagesize) {
		List<AllEmployeeDto> allEmployees = new ArrayList<>();
		List<Employee> employees = employeeRepo.findAll();
		if(employees.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Employees fetched successfully");
		for(Employee employee : employees) {
			allEmployees.add(new AllEmployeeDto(employee.getEmployeeid(),employee.getUser().getUsername(),
					employee.getFirstname(),employee.getLastname(),employee.getSalary()));
		}
		pagesize = (pagesize<allEmployees.size())?pagesize:allEmployees.size();
		if(pagesize == allEmployees.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allEmployees.size());

	    List<AllEmployeeDto> pageContent = allEmployees.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allEmployees.size());
	}

	//-----------------------------------Delete Employee-------------------------------
	@Override
	public String deleteEmployee(int employeeid) {
		employeeRepo.deleteById(employeeid);
		logger.info("Employees deleted successfully");
		return "Employee deleted successfully";
	}

	//-----------------------------------Update Salary----------------------------------
	@Override
	public String updateSalary(int employeeid, double salary) {
		Optional<Employee> getEmployee = employeeRepo.findById(employeeid);
		Employee employee = getEmployee.get();
		employee.setSalary(salary);
		employeeRepo.save(employee);
		logger.info("Salary updated successfully");
		return "Salary updated successfully";
	}

	//-----------------------------------Update Employee-----------------------------------
	@Override
	public String updateEmployee(int employeeid, Employee employee) {
		Employee emp = employeeRepo.findById(employeeid).get();
		emp.setFirstname(employee.getFirstname());
		emp.setLastname(employee.getLastname());
		employeeRepo.save(emp);
		logger.info("Profile updated successfully");
		return "Profile Updated Successfully";
	}

	//--------------------------------Update Employee Password---------------------------------
	@Override
	public String updatePassword(int employeeid, String password) {
		Employee emp = employeeRepo.findById(employeeid).get();
		User user = emp.getUser();
		user.setPassword(passwordEncoder.encode(password));
		userRepo.save(user);
		logger.info("Password updated successfully");
		return "Password Updated Successfully";
	}

	//------------------------------------Fetch Employee-----------------------------------------
	@Override
	public Employee getEmployee(String username) {
		List<Employee> employees = employeeRepo.findAll();
		Employee employee = null;
		for(Employee emp : employees) {
			if(emp.getUser().getUsername().equals(username)) {
				employee = emp;
				break;
			}
		}
		logger.info("Employee fetched successfully");
		return employee;
	}

	//-------------------------------Reply to Query--------------------------------------------------
	@Override
	public String replyQuery(String recipientEmail, String text) {
		 // Sender's email details
        String senderEmail = "robi6684v@gmail.com";
        
        String host = "smtp.gmail.com";

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");


        // Create a session with the sender's credentials
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("robi6684v@gmail.com", "kqdgnxdrfwghyfyj");
            }
        });

        try {
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(senderEmail));
                message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
                message.setSubject("Reply to your query in Policy Market");
                message.setText(text);

                // Send the email
                Transport.send(message);
                System.out.println("Email sent to: " + recipientEmail);
     
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        logger.info("Mail Sent Successfully");
        return "Mail Sent Successfully";
	}
	
	//----------------------------Get Count of Employee------------------------------------------
	@Override
    public long getTotalEmployeeCount() {
    	logger.info("Total Employee:" + employeeRepo.count());
        return employeeRepo.count();
    }

}
