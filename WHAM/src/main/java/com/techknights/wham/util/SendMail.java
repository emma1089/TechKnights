package com.techknights.wham.util;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.swing.JOptionPane;
public class SendMail {
	public void send(String userName,String msg) {
		final String gmailu = "whamreply@gmail.com";
		final String gmailp = "TechKnights";
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
		javax.mail.Session session = javax.mail.Session.getDefaultInstance(
				props, new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(gmailu, gmailp);
					}
				});
		try {
		
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("whamreply@gmail.com"));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(userName));
			message.setSubject("Password Recovery- Wham");
			message.setText(msg);
			Transport.send(message);
		} catch (MessagingException e) {
			// throw new RuntimeException(e);
			JOptionPane.showMessageDialog(null, e);
		}
	}


}
