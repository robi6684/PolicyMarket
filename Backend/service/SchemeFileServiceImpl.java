package com.monocept.insurance.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.monocept.insurance.entities.Scheme;
import com.monocept.insurance.entities.SchemeFile;
import com.monocept.insurance.repository.SchemeFileRepo;
import com.monocept.insurance.repository.SchemeRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SchemeFileServiceImpl implements SchemeFileService {
	
	@Autowired
	private SchemeFileRepo schemeFileRepo;
	
	@Autowired
	private SchemeRepo schemeRepo;
	
	private static final Logger logger = LoggerFactory.getLogger(SchemeFileServiceImpl.class);

	private final String PATH = "C:\\Users\\robi6\\OneDrive\\Desktop\\Monocept Training\\Spring Assignments\\08-FileUploadDownload-app";
	
	//-------------------------------File Upload-------------------------------------------
	public SchemeFile uploadFile(MultipartFile file, Scheme scheme) throws IllegalStateException, IOException{
		String fullPath = PATH+file.getOriginalFilename();
		SchemeFile schemeFile  = new SchemeFile();
		schemeFile.setName(file.getOriginalFilename());
		schemeFile.setType(file.getContentType());
		schemeFile.setPath(fullPath);
		schemeFile.setScheme(scheme);
		file.transferTo(new File(fullPath));
		logger.info("File uploaded successfully");
		return schemeFileRepo.save(schemeFile);
	}
	
	//--------------------------------Download File------------------------------------------
	public byte[] downloadFile(long id) throws IOException{
		Optional<SchemeFile> file = schemeFileRepo.findById(id);
		SchemeFile schemeFile  = file.get();
        String fullPath = schemeFile.getPath();
        logger.info("File downloaded successfully");
        return Files.readAllBytes(new File(fullPath).toPath());
    }

	//-----------------------------------Update File-------------------------------------------
	@Override
	public String updateFile(MultipartFile file, int schemeid) throws IllegalStateException, IOException {
		
		Scheme scheme = schemeRepo.findById(schemeid).get();
		List<SchemeFile> schemeFiles = schemeFileRepo.findAll();
		SchemeFile schemeFile = null;
		
		for(SchemeFile s : schemeFiles) {
			if(s.getScheme().getSchemeid()==schemeid) {
				schemeFile = s;
				break;
			}
		}
		if(schemeFile == null) {
			uploadFile(file,scheme);
		}
		else {
		String fullPath = PATH+file.getOriginalFilename();
		schemeFile.setName(file.getOriginalFilename());
		schemeFile.setType(file.getContentType());
		schemeFile.setPath(fullPath);
		schemeFile.setScheme(scheme);
		file.transferTo(new File(fullPath));
		schemeFileRepo.save(schemeFile);
		}
		logger.info("Scheme file updated successfully");
		return "Scheme file updated successfully";
	}


}
