package com.techknights.wham.controller;

import java.security.SecureRandom;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.swing.JOptionPane;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.techknights.wham.dao.loginDAO;
import com.techknights.wham.model.Person;
import com.techknights.wham.util.SendMail;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private Person user;

	@Autowired
	private loginDAO loginDAO;

	@Autowired
	private SendMail sendMail;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {

		return "homepage";
	}

	@RequestMapping(value = "checkSendAuthentication", method = RequestMethod.GET)
	public String checkSendAuthentication(Model model,
			@RequestParam("user-email") String UserName) {
		if (!loginDAO.CheckUnique(UserName)) {
			model.addAttribute("forgoterror", "An email will be sent to "
					+ UserName + ".Please check your inbox");
			SecureRandom random = new SecureRandom();
			byte bytes[] = new byte[20];
			random.nextBytes(bytes);
			String token = bytes.toString();
			StringBuilder url = new StringBuilder(
					"http://localhost:8080/wham/authenticate?user-email=");
			url.append(UserName);
			url.append("&auth-code=");
			url.append(token);

			loginDAO.addAuthCode(UserName, token);
			loginDAO.displayPerson(UserName);

			sendMail.send(
					UserName,
					"Hi "
							+ UserName
							+ ",\n\nPlease click on the link below to change your password. \n\n"
							+ url
							+ "\n\nPlease note that this link can only be used once. \n\nFrom,\nWHAM");
System.out.println("here");
			return "forgotPassword";
		} else {
			model.addAttribute("forgoterror", "Username does not exist!");
			return "forgotPassword";
		}
	}

	@RequestMapping(value = "checkLogin", method = RequestMethod.GET)
	public String checkLogin(Model model,
			@RequestParam("user-email") String UserName,
			@RequestParam("user-pw") String Password) {
		if (loginDAO.checkLogin(UserName, Password)) {
			user= new Person();
			user.setUserName(UserName);
			user.setPassword(Password);
		
			return "homepage";
		} else {
			model.addAttribute("loginerror", "Unable to login");
			return "login";
		}
	}
	
	@RequestMapping(value = "event_details", method = RequestMethod.GET)
	public String event_details(Model model) {;
		return "event_details";
	}
	
	@RequestMapping(value = "changePassword", method = RequestMethod.GET)
	public String changePassword(Model model,
			@RequestParam("user-pw") String Password) {
		loginDAO.updatePassword(user.getUserName(), Password);
		return "login";
	}

	@RequestMapping(value = "authenticate", method = RequestMethod.GET)
	public String checkAuthentication(Model model,
			@RequestParam("user-email") String UserName,
			@RequestParam("auth-code") String auth) {
		if (loginDAO.checkAuth(UserName, auth)) {
			//loginDAO.addAuthCode(UserName, "");
			user= new Person();
			user.setUserName(UserName);
			return "changePassword";
		}
		return "ErrorAuthenticate";
	}

	@RequestMapping(value = "gotoForgotPassword", method = RequestMethod.GET)
	public String gotoForgotPassword(Model model) {

		return "forgotPassword";
	}

	@RequestMapping(value = "createUser", method = RequestMethod.GET)
	public String createUser(Model model,
			@RequestParam("user-email") String UserName,
			@RequestParam("user-pw") String Password,
			@RequestParam("user-pw-repeat") String PasswordRepeat,
			HttpServletRequest request) {
		System.out.println(request);
		if (!loginDAO.CheckUnique(UserName)) {
			model.addAttribute("createError", "Username " + UserName
					+ " already exists! Please use another username.");
			return "signup";

		}
		loginDAO.addPerson(UserName, Password);
		model.addAttribute("loginerror",
				"User successfully created. Login to proceed");
		return "login";
	}

	@RequestMapping(value = "gotosignup", method = RequestMethod.GET)
	public String gotoSignUp(Model model) {
		return "signup";

	}

	@RequestMapping(value = "gotologin", method = RequestMethod.GET)
	public String gotoLogin(Model model) {
		return "login";
	}

}
