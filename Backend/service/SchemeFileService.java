package com.monocept.insurance.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.monocept.insurance.entities.Scheme;
import com.monocept.insurance.entities.SchemeFile;

public interface SchemeFileService {
	SchemeFile uploadFile(MultipartFile file, Scheme scheme)throws IllegalStateException, IOException;
	byte[] downloadFile(long id)throws IOException;
	String updateFile(MultipartFile file,int schemeid)throws IllegalStateException, IOException;

}
