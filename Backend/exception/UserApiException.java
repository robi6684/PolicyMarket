package com.monocept.insurance.exception;

import org.springframework.http.HttpStatus;

public class UserApiException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message;
	private HttpStatus status;
	
	public UserApiException(HttpStatus status,String message) {
		super();
		this.message = message;
		this.status = status;
	}
	
	
	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public HttpStatus getStatus() {
		return status;
	}


	public void setStatus(HttpStatus status) {
		this.status = status;
	}


	@Override
	public String toString() {
		return "UserApiException [message=" + message + ", status=" + status + "]";
	}

}
