package com.techknights.wham.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "Event")

public class Event {
	@Id
	@Column(name = "id")
	String id;
	
	@Column(name="name")
	String name;
	
	@Column(name="startTime")
	String startTime;
	
	@Column(name="venue")
	String venue;
	
	@Column(name="edate")
	String edate;
	
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "events")
	private Set<Person> users = new HashSet<Person>(0);

	public void setName(String uName) {
		name = uName;
	}

	public String getName() {
		return name;
	}
	
	public void setEdate(String d) {
		edate = d;
	}

	public String getEdate() {
		return edate;
	}
	public void setVenue(String venue) {
		this.venue = venue;
	}

	public String getVenue() {
		return this.venue;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	

	public String getId() {
		return id;
	}
	
	public void setStartTime(String time) {
		startTime = time;
	}

	public String getStartTime() {
		return startTime;
	}
	
	public Set<Person> getUsers() {
		return this.users;
	}

	public void setUsers(Set<Person> users) {
		this.users = users;
	}
	
	public int hashCode(){
        System.out.println("In hashcode");
        int hashcode = 0;
        hashcode = id.hashCode();
        return hashcode;
    }
     
    public boolean equals(Object obj){
        System.out.println("In equals");
        if (obj instanceof Event) {
        	Event e = (Event) obj;
            return (e.id.equals(this.id));
        } else {
            return false;
        }
    }
}
