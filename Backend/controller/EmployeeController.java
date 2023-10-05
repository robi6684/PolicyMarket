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

import com.monocept.insurance.dto.AllEmployeeDto;
import com.monocept.insurance.entities.Employee;
import com.monocept.insurance.entities.Query;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.repository.QueryRepo;
import com.monocept.insurance.service.EmployeeService;


@RestController
@RequestMapping("/employeeapp")
@CrossOrigin(origins="*")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private QueryRepo queryRepo;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/save")
	public ResponseEntity<String> saveEmployee(@RequestBody Employee employee){
		String message = employeeService.saveEmployee(employee);
		return new ResponseEntity<>(message,HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getAllEmployees")
	public ResponseEntity<Page<AllEmployeeDto>> getEmployees(@RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(employeeService.getAllEmployees(pageno,pagesize),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{employeeid}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("employeeid") int employeeid){
		String message = employeeService.deleteEmployee(employeeid);
		return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateSalary/{employeeid}/{salary}")
	public ResponseEntity<String> updateSalary(@PathVariable("employeeid") int employeeid, 
			@PathVariable("salary") double salary){
		String message = employeeService.updateSalary(employeeid, salary);
		return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
	}
	
	@PreAuthorize("hasRole('EMPLOYEE')")
	@PutMapping("/updatePassword/{employeeid}/{password}")
	public ResponseEntity<String> updatePassword(@PathVariable("employeeid")int employeeid, @PathVariable("password") String password){
		String message = employeeService.updatePassword(employeeid, password);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	
	@GetMapping("/getEmployee/{username}")
	public ResponseEntity<Employee> getEmployee(@PathVariable("username") String username){
		return new ResponseEntity<>(employeeService.getEmployee(username),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('EMPLOYEE')")
	@PutMapping("/updateEmployee/{employeeid}")
	public ResponseEntity<String> updateEmployee(@RequestBody Employee employee, @PathVariable("employeeid")int employeeid){
		String message = employeeService.updateEmployee(employeeid, employee);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('EMPLOYEE')")
	@PostMapping("/reply/{id}/{email}/{text}")
	public ResponseEntity<String> reply(@PathVariable("id")int id,@PathVariable("email")String email,@PathVariable("text")String text){
		String message = employeeService.replyQuery(email, text);
		Query query = queryRepo.findById(id).get();
		query.setStatus("Replied");
		queryRepo.save(query);
		return new ResponseEntity<> (message,HttpStatus.OK);
	}
	
	@GetMapping("/count")
    public ResponseEntity<Long> getTotalEmployeeCount() {
        long totalEmployeeCount = employeeService.getTotalEmployeeCount();
        return new ResponseEntity<>(totalEmployeeCount, HttpStatus.OK);
    }
	
	@GetMapping("/get/{username}")
	public ResponseEntity<AllEmployeeDto> getEmp(@PathVariable("username") String username){
		Employee employee = employeeService.getEmployee(username);
		if(employee == null) {
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(new AllEmployeeDto(employee.getEmployeeid(),employee.getUser().getUsername()
				,employee.getFirstname(),employee.getLastname(),employee.getSalary()), HttpStatus.OK);
		
	}
	

}
