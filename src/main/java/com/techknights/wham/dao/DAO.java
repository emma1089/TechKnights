package com.techknights.wham.dao;

import org.hibernate.HibernateException;
import org.hibernate.Session;

public class DAO {
	public Session getSession(){
		   
		   return HibernateUtil.getSessionFactory().openSession();
	   }
		 
	   protected DAO() {
	   }

	   //Begins a transaction
	   protected void begin() {
	       getSession().beginTransaction();
	   }

	   //Writes/Saves the changes
	   protected void commit() {
	       getSession().getTransaction().commit();
	   }

	   //Rolls back any changes made
	   protected void rollback() {
	       try {
	           getSession().getTransaction().rollback();
	       } catch (HibernateException e) {
	          
	       }
	       try {
	           getSession().close();
	       } catch (HibernateException e) {
	          
	       }
	      
	   }

	   //Close the session 
	   public  void close() {
	       getSession().close();
	   }
}
