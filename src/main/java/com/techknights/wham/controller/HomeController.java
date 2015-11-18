package com.techknights.wham.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.techknights.wham.dao.loginDAO;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	@Autowired
	private loginDAO loginDAO;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		return "login";
	}

	@RequestMapping(value = "checkLogin", method = RequestMethod.GET)
	public String checkLogin(Model model,
			@RequestParam("user-email") String UserName,
			@RequestParam("user-pw") String Password) {
		if (loginDAO.checkLogin(UserName, Password)) {
			return "home";
		} else {
			model.addAttribute("loginerror", "Unable to login");
			return "login";
		}
	}

	@RequestMapping(value = "createUser", method = RequestMethod.GET)
	public String createUser(Model model,
			@RequestParam("user-email") String UserName,
			@RequestParam("user-pw") String Password,
			@RequestParam("user-pw-repeat") String PasswordRepeat) {
		if(!loginDAO.CheckUnique(UserName)){
			model.addAttribute("createError", "Username " +UserName +" already exists! Please use another username.");
			return "signup";
			
		}
		loginDAO.addPerson(UserName, Password);
		model.addAttribute("loginerror", "User successfully created. Login to proceed");
		return "login";
	}
	
	@RequestMapping(value = "gotosignup", method = RequestMethod.GET)
	public String gotoSignUp( Model model) {
		return "signup";
		
	}
	@RequestMapping(value = "gotologin", method = RequestMethod.GET)
	public String gotoLogin( Model model) {
		return "login";	
	}

}
