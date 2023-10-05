package com.monocept.insurance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.monocept.insurance.dto.AllSchemeDto;
import com.monocept.insurance.entities.Plan;
import com.monocept.insurance.entities.Scheme;
import com.monocept.insurance.exception.ListEmptyException;
import com.monocept.insurance.exception.UserApiException;
import com.monocept.insurance.repository.PlanRepo;
import com.monocept.insurance.repository.SchemeRepo;

@Service
public class SchemeServiceImpl implements SchemeService {
	
	@Autowired
	private SchemeRepo schemeRepo;
	
	@Autowired
	private PlanRepo planRepo;
	
	private static final Logger logger = LoggerFactory.getLogger(SchemeServiceImpl.class);
	
	//-----------------------------------Save Scheme--------------------------
	@Override
	public Scheme saveScheme(Scheme scheme, int planid) {
		Optional<Plan> getPlan = planRepo.findById(planid);
		Plan plan = getPlan.get();
		Optional<Scheme> sc = schemeRepo.findBySchemename(scheme.getSchemename());
		if(sc.isPresent()) {
			throw new UserApiException(HttpStatus.BAD_REQUEST,"Scheme Already Exists");
		}
		scheme.setPlan(plan);
		schemeRepo.save(scheme);
		logger.info("Scheme saved successfully");
		return scheme;
	}

	//--------------------------------Fetch All Schemes----------------------------
	@Override
	public Page<AllSchemeDto> getAllSchemes(int planid, int pageno, int pagesize) {
		List<AllSchemeDto> allSchemes = new ArrayList<>();
		List<Scheme> schemes = schemeRepo.findAll();
		if(schemes.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		logger.info("Schemes fetched successfully");
		for(Scheme scheme : schemes) {
			if(scheme.getPlan().getPlanid() == planid) {
			allSchemes.add(new AllSchemeDto(scheme.getSchemeid(),scheme.getSchemename(),scheme.getMinage(),scheme.getMaxage(),scheme.getMinamount(),scheme.getMaxamount(),
					scheme.getMininvesttime(),scheme.getMaxinvesttime(),scheme.getProfitratio(),scheme.getRegistrationcommission()));
			}
		}
		if(allSchemes.size()== 0) {
			logger.error("List is empty");
			throw new ListEmptyException("List is empty", HttpStatus.NOT_FOUND);
		}
		pagesize = (pagesize<allSchemes.size())?pagesize:allSchemes.size();
		if(pagesize == allSchemes.size())
			pageno = 0;
		
		
		Pageable pageRequest = PageRequest.of(pageno, pagesize);

		int start = (int) pageRequest.getOffset();
	    int end = Math.min((start + pageRequest.getPageSize()), allSchemes.size());

	    List<AllSchemeDto> pageContent = allSchemes.subList(start, end);
	    return new PageImpl<>(pageContent, pageRequest, allSchemes.size());
	}

	//-------------------------------Update Scheme---------------------------------
	@Override
	public String updateScheme(Scheme scheme, int schemeid) {
		Scheme s = schemeRepo.findById(schemeid).get();
		List<Scheme> schemes = schemeRepo.findAll();
		
		for(Scheme sc : schemes) {
			if(!(sc.getSchemeid() == schemeid))
			if(sc.getSchemename().equals(scheme.getSchemename())) {
				throw new UserApiException(HttpStatus.BAD_REQUEST,"Scheme Already Exists");
			}
		}

		s.setMaxage(scheme.getMaxage());
		s.setMaxamount(scheme.getMaxamount());
		s.setMaxinvesttime(scheme.getMaxinvesttime());
		s.setMinage(scheme.getMinage());
		s.setMinamount(scheme.getMinamount());
		s.setMininvesttime(scheme.getMininvesttime());
		s.setProfitratio(scheme.getProfitratio());
		s.setRegistrationcommission(scheme.getRegistrationcommission());
		s.setSchemename(scheme.getSchemename());
		schemeRepo.save(s);
		logger.info("Scheme updated successfully");
		return "Scheme updated successfully";
	}

	//-------------------------------Fetch Scheme---------------------------------------
	@Override
	public AllSchemeDto getScheme(String schemename, int planid) {
		Plan plan = planRepo.findById(planid).get();
		List<Scheme> schemes = plan.getSchemes();
		Scheme scheme = null;
		
		for(Scheme sc : schemes) {
			if(sc.getSchemename().equals(schemename)) {
				scheme = sc;
				break;
			}
		}
		if(scheme == null) {
			throw new ListEmptyException("List is empty",HttpStatus.NOT_FOUND);
		}
		logger.info("Scheme fetched successfully");
		return new AllSchemeDto(scheme.getSchemeid(),scheme.getSchemename(),scheme.getMinage(),scheme.getMaxage(),scheme.getMinamount(),scheme.getMaxamount(),
				scheme.getMininvesttime(),scheme.getMaxinvesttime(),scheme.getProfitratio(),scheme.getRegistrationcommission());

	}
	
}
