package com.monocept.insurance.service;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.ProductFile;
import com.monocept.insurance.repository.CustomerRepo;
import com.monocept.insurance.repository.ProductFileRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductFileServiceImpl implements ProductFileService{
	
	@Autowired
	private ProductFileRepo productFileRepo;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	private static final Logger logger = LoggerFactory.getLogger(ProductFileServiceImpl.class);

	private final String PATH = "C:\\Users\\robi6\\OneDrive\\Desktop\\Monocept Training\\Spring Assignments\\08-FileUploadDownload-app";
	
	//----------------------------------Upload File------------------------------------------
	public ProductFile uploadFile(MultipartFile file, Customer customer) throws IllegalStateException, IOException{
		String fullPath = PATH+file.getOriginalFilename();
		ProductFile productfile  = new ProductFile();
		productfile.setName(file.getOriginalFilename());
		productfile.setType(file.getContentType());
		productfile.setPath(fullPath);
		productfile.setCustomer(customer);
		customer.setDocumentstatus("Pending");
		customerRepo.save(customer);
		file.transferTo(new File(fullPath));
		logger.info("File uploaded successfuly");
		return productFileRepo.save(productfile);
	}
	
	//---------------------------------------Download File------------------------------------
	public byte[] downloadFile(long id) throws IOException{
		ProductFile productfile  = productFileRepo.findById(id).get();
        String fullPath = productfile.getPath();
        System.out.println(fullPath);
        logger.info("File Downloaded Successfully");
        return Files.readAllBytes(new File(fullPath).toPath());
    }

	//---------------------------------------Update File---------------------------------------
	@Override
	public String updateFile(MultipartFile file, String username, int index) throws IllegalStateException, IOException {
		List<Customer> customers = customerRepo.findAll();
		Customer customer = null;
		for(Customer cust : customers) {
			if(cust.getUser().getUsername().equals(username)) {
				customer = cust;
				break;
			}
		}
		ProductFile productfile = customer.getDocuments().get(index);
		
		String fullPath = PATH+file.getOriginalFilename();
		productfile.setName(file.getOriginalFilename());
		productfile.setType(file.getContentType());
		productfile.setPath(fullPath);
		productfile.setCustomer(customer);
		customer.setDocumentstatus("Pending");
		customerRepo.save(customer);
		file.transferTo(new File(fullPath));
		productFileRepo.save(productfile);
		logger.info("File updates successfully");
		return "File updated successfully";
	}

}
