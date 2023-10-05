package com.monocept.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.insurance.dto.AllSchemeDto;
import com.monocept.insurance.entities.Scheme;
import com.monocept.insurance.service.SchemeService;

@RestController
@RequestMapping("/schemeapp")
@CrossOrigin(origins="*")
public class SchemeController {
	
	@Autowired
	private SchemeService schemeService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/save/{planid}")
	public ResponseEntity<Scheme> saveScheme(@PathVariable("planid")int planid, @RequestBody Scheme scheme){
		Scheme getScheme = schemeService.saveScheme(scheme,planid);
		return new ResponseEntity<>(getScheme,HttpStatus.CREATED);
	}
	
	@GetMapping("/getAllSchemes/{planid}")
	public ResponseEntity<Page<AllSchemeDto>> getSchemes(@PathVariable("planid")int planid, @RequestParam int pageno, @RequestParam int pagesize ){
		return new ResponseEntity<>(schemeService.getAllSchemes(planid, pageno, pagesize),HttpStatus.OK);
	}
	
	@PutMapping("/update/{schemeid}")
	public ResponseEntity<String> update(@RequestBody Scheme scheme, @PathVariable("schemeid") int schemeid){
		return new ResponseEntity<>(schemeService.updateScheme(scheme, schemeid),HttpStatus.OK);
	}
	
	@GetMapping("/get/{schemename}/{planid}")
    public ResponseEntity<AllSchemeDto> getPlan(@PathVariable("schemename") String schemename, @PathVariable("planid") int planid) {
        return new ResponseEntity<>(schemeService.getScheme(schemename,planid), HttpStatus.OK);
    }

}
