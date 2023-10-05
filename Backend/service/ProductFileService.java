package com.monocept.insurance.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.monocept.insurance.entities.Customer;
import com.monocept.insurance.entities.ProductFile;

public interface ProductFileService {
	ProductFile uploadFile(MultipartFile file, Customer customer)throws IllegalStateException, IOException;
	byte[] downloadFile(long id)throws IOException;
	String updateFile(MultipartFile file,String username, int index)throws IllegalStateException, IOException;
}
