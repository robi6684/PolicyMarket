package com.monocept.insurance.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandle extends ResponseEntityExceptionHandler {
	
	
	/*-------------------------User Already Exists Exception------------------------------*/
	@ExceptionHandler(UserApiException.class)
	public ResponseEntity<InsuranceAppError> handleException(UserApiException userApiException,WebRequest webRequest){
		InsuranceAppError error = new InsuranceAppError(userApiException.getStatus().value(), 
				userApiException.getMessage(), System.currentTimeMillis());
		return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ListEmptyException.class)
	public ResponseEntity<InsuranceAppError> handleException(ListEmptyException exception, WebRequest webRequest){
		InsuranceAppError error = new InsuranceAppError(exception.getStatus().value()
				,exception.getMessage(), System.currentTimeMillis());
		return new ResponseEntity<>(error, exception.getStatus());
	}
	
	@ExceptionHandler(NullValueException.class)
	public ResponseEntity<InsuranceAppError> handleException(NullValueException exception, WebRequest webRequest){
		InsuranceAppError error = new InsuranceAppError(exception.getStatus().value()
				,exception.getMessage(), System.currentTimeMillis());
		return new ResponseEntity<>(error, exception.getStatus());
	}

}
