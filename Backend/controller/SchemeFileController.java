package com.monocept.insurance.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

import com.monocept.insurance.entities.Scheme;
import com.monocept.insurance.entities.SchemeFile;
import com.monocept.insurance.repository.SchemeFileRepo;
import com.monocept.insurance.repository.SchemeRepo;
import com.monocept.insurance.service.SchemeFileService;

@RestController
@RequestMapping("/schemefileapp")
@CrossOrigin(origins="*")
public class SchemeFileController {
	
	@Autowired
	private SchemeFileService schemeFileService;
	
	@Autowired
	private SchemeFileRepo schemeFileRepo;
	
	@Autowired
	private SchemeRepo schemeRepo;
	
	@ResponseStatus(value = HttpStatus.OK)
	@PostMapping("/upload/{schemename}")
	public void uploadFile(@RequestParam("file")MultipartFile file, @PathVariable("schemename") String schemename) throws IOException{
		Optional<Scheme> getScheme = schemeRepo.findBySchemename(schemename);
		Scheme scheme = getScheme.get();
		schemeFileService.uploadFile(file,scheme);
	}
	
	@GetMapping("/download/{schemeid}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable int schemeid) throws IOException {
		List<SchemeFile> schemeFiles = schemeFileRepo.findAll();
		SchemeFile sfile = null;
		long id=0;
		for(SchemeFile schemeFile : schemeFiles) {
			if(schemeFile.getScheme().getSchemeid() == schemeid) {
				id = schemeFile.getId();
				sfile = schemeFile;
				break;
			}
		}
		byte[] file = schemeFileService.downloadFile(id);
		String mediaType = sfile.getType();
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf(mediaType)).body(file);
	}
	
	@PutMapping("/update/{schemeid}")
	public ResponseEntity<String> updateSchemeFile(@RequestParam("file")MultipartFile file, @PathVariable("schemeid") int schemeid) throws IllegalStateException, IOException{
		return new ResponseEntity<>(schemeFileService.updateFile(file, schemeid),HttpStatus.OK);
	}

}
