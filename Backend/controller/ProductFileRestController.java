package com.monocept.insurance.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.ProductFile;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.service.ProductFileService;

@RestController
@RequestMapping("/fileapp")
@CrossOrigin(origins="*")
public class ProductFileRestController {

	@Autowired
	private ProductFileService productFileService;
	
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@ResponseStatus(value = HttpStatus.OK)
	@PostMapping("/upload/{username}")
	public void uploadFile(@RequestParam("file")MultipartFile file, @PathVariable("username") String username) throws IOException{
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username))
			{
				customer = cust;
				break;
			}
		}
		productFileService.uploadFile(file,customer);
	}
	
	@GetMapping("/download/{customerid}/{index}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable("customerid") int customerid, @PathVariable("index") int index) throws IOException {
		Customer customer = customerRepo.findById(customerid).get();
		List<ProductFile> list = customer.getDocuments();
		ProductFile product = list.get(index);
		long id = product.getId();
		byte[] file = productFileService.downloadFile(id);
		String mediaType = product.getType();
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf(mediaType)).body(file);
	}
	
	@PutMapping("/update/{username}/{index}")
	public ResponseEntity<String> updateFile(@RequestParam("file")MultipartFile file, @PathVariable("username") String username, @PathVariable("index") int index) throws IOException {
		return new ResponseEntity<>(productFileService.updateFile(file, username, index),HttpStatus.OK);
	}
	
}
