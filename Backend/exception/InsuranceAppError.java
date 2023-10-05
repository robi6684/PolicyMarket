package com.monocept.insurance.exception;

public class InsuranceAppError {
	
	private int status;
    private String body;
    private long milli;
    
    
	public InsuranceAppError() {
		super();
	}


	public InsuranceAppError(int status, String body, long milli) {
		super();
		this.status = status;
		this.body = body;
		this.milli = milli;
	}


	public int getStatus() {
		return status;
	}


	public void setStatus(int status) {
		this.status = status;
	}


	public String getBody() {
		return body;
	}


	public void setBody(String body) {
		this.body = body;
	}


	public long getMilli() {
		return milli;
	}


	public void setMilli(long milli) {
		this.milli = milli;
	}

}
