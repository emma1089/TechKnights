package com.techknights.wham.Validator;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.techknights.wham.model.Person;

public class LoginValidator implements Validator {

	@Override
	public boolean supports(Class arg0) {
		return Person.class.equals(arg0);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		
		
	}

}
