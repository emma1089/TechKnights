package com.techknights.wham.controller;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
//import java.text.DateFormat;
//import java.util.Date;
import java.util.Locale;

//import javax.servlet.http.HttpServletRequest;
//import javax.swing.JOptionPane;








import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.swing.JOptionPane;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techknights.wham.dao.loginDAO;
import com.techknights.wham.model.Event;
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
	
	@Autowired
	private BusinessLogic bl;
	
	private Person loggedUser;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {

		return "homepage";
	}

	@RequestMapping(value = "checkSendAuthentication", method = RequestMethod.GET)
	public String checkSendAuthentication(Model model,
			@RequestParam("user-email") String UserName) {
		if (!loginDAO.CheckExists(UserName)) {
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
			//loginDAO.displayPerson(UserName);

			sendMail.send(
					UserName,
					"Hi "
							+ UserName
							+ ",\n\nPlease click on the link below to change your password. \n\n"
							+ url
							+ "\n\nPlease note that this link can only be used once. \n\nFrom,\nWHAM");
		
			return "forgotPassword";
		} else {
			model.addAttribute("forgoterror", "Username does not exist!");
			return "forgotPassword";
		}
	}
	
	@RequestMapping(value = "saveCategory", method = RequestMethod.POST)
	@ResponseBody
	public void saveCategory(@RequestParam(value="CategoryList[]") String[] Categories)  {
	loginDAO.addCategories(loggedUser.getUserName(),Categories);
	List<String> categoryList=loginDAO.getCategories(loggedUser.getUserName());
//	ObjectMapper mapper = new ObjectMapper(); 
//	String categories = mapper.writeValueAsString(categoryList);
//	model.addAttribute("categories",categories);
	//return "redirect:login";
	}
	
	@RequestMapping(value = "removeEvent", method = RequestMethod.POST)
	@ResponseBody
	public void removeEvent(@RequestParam(value="id") String eventID)  {
		System.out.println(eventID);
	loginDAO.removeEvent(eventID,loggedUser.getUserName());
	}
	
	@RequestMapping(value = "likeEvent", method = RequestMethod.POST)
	@ResponseBody
	public void likeEvent(@ModelAttribute(value="event") Event event)  {
	loginDAO.addEvent(loggedUser.getUserName(),event);
//	loggedUser.setEvents();
//	List<Event> events = new ArrayList<Event>();
//	events.addAll(loggedUser.getEvents());
//	Iterator it= events.iterator();
//	while(it.hasNext()){
//		Event ev=(Event) it.next();
//		System.out.println(ev.getId());
//	}
	loggedUser.setEvents(loginDAO.getEvents(loggedUser.getUserName()));
	

	
	//List<String> categoryList=loginDAO.getCategories(loggedUser.getUserName());
//	ObjectMapper mapper = new ObjectMapper(); 
//	String categories = mapper.writeValueAsString(categoryList);
//	model.addAttribute("categories",categories);
	//return "redirect:login";
	}
	
	@RequestMapping(value = "resetCategory", method = RequestMethod.GET)
	public String resetCategory(Model model) throws JsonProcessingException {
	//loginDAO.addCategories(loggedUser.getUserName(),Categories);
	List<String> categoryList=loginDAO.getCategories(loggedUser.getUserName());
	ObjectMapper mapper = new ObjectMapper(); 
	String categories = mapper.writeValueAsString(categoryList);
//	ModelAndView model = new ModelAndView("homepage");
//	model.addObject("categories",categories);
//	return model;
	model.addAttribute("loggedInUser", loggedUser);
	model.addAttribute("categories",categories);
	return "homepage";
	}
	
	
//	@RequestMapping(value = "getCategory", method = RequestMethod.GET)
//	public @ResponseBody Set<String> getCategory() {
//		Set<String> categories=loginDAO.getCategories(loggedUser.getUserName());
//		return categories;
//		}


	@RequestMapping(value = "checkLogin", method = RequestMethod.GET)
	public String checkLogin(Model model,
			@RequestParam("user-email") String UserName,
			@RequestParam("user-pw") String Password,
			HttpServletRequest request) throws JsonProcessingException {
		if (loginDAO.checkLogin(UserName, Password)) {
			user= new Person();
			user.setUserName(UserName);
			user.setPassword(Password);
			request.getSession().setAttribute("loggedInUser", user);
			model.addAttribute("loggedInUser", user);
			List<String> categoryList=loginDAO.getCategories(UserName);
			ObjectMapper mapper = new ObjectMapper(); 
			String categories = mapper.writeValueAsString(categoryList);
			loggedUser=user;
			model.addAttribute("categories",categories);
			return "homepage";
		} else {
//			ModelAndView model2 = new ModelAndView("login");
//			model2.addObject("loginerror", "Unable to login");
//			return model2;
			model.addAttribute("loginerror", "Unable to login");
			return "login";
		}
	}
	
	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout(Model model,
			HttpServletRequest request) {
			request.getSession().setAttribute("loggedInUser",null);
			model.addAttribute("loggedInUser", null);
			return "homepage";
	}
	
	//returns event ids for all events
	@RequestMapping(value = "event_details", method = RequestMethod.GET)
	public String event_details(Model model) throws JsonProcessingException {
		if(loggedUser!=null){
		List<Event> events = new ArrayList<Event>();
		events.addAll(loginDAO.getEvents(loggedUser.getUserName()));
		Iterator it=events.iterator();
		List<String> eventIDs =new ArrayList<String>();
		while(it.hasNext()){
			Event e= (Event) it.next();
			eventIDs.add(e.getId());
		}

		
		ObjectMapper mapper = new ObjectMapper(); 
		String eIDs = mapper.writeValueAsString(eventIDs);
		loggedUser=user;
		model.addAttribute("events",eIDs);
		model.addAttribute("loggedInUser", loggedUser);
		}
		return "event_details";
	}
	
//	@RequestMapping(value = "displayEvents", method = RequestMethod.GET)
//	public String displayEvents(Model model) {
//		System.out.println("here");
//	model.addAttribute("events",loggedUser.getEvents());
//		return "displayEvents";
//	}
	@RequestMapping(value = "displayEvents", method = RequestMethod.GET)
	public String displayEvents(Model model) {
		model.addAttribute("loggedInUser", loggedUser);
		
		List<Event> events = new ArrayList<Event>();
		events.addAll(loginDAO.getEvents(loggedUser.getUserName()));
		Iterator it= events.iterator();
		//System.out.println("123");
		while(it.hasNext()){
			Event ev=(Event) it.next();
			//System.out.println(ev.getId());
		}
		model.addAttribute("events",events);
		return "displayEvents";
	}
	
//	@RequestMapping(value = "displayEvent", method = RequestMethod.GET)
//	public ModelAndView displayEvent() {
//		System.out.println("here1");
//		ModelAndView model= new ModelAndView("displayEvents");
//		model.addObject("loggedInUser", loggedUser);
//		model.addObject("events",loggedUser.getEvents());
//		return model;
//	}
	
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
			@RequestParam("user-pw-repeat") String PasswordRepeat//,
		//	HttpServletRequest request
			) {
		//System.out.println(request);
		if (!loginDAO.CheckExists(UserName)) {
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
