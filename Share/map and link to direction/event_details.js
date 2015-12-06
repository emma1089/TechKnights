/*These variables are for liked events*/
var global_title="";
var global_date="";
var global_time="";
var global_venue="";
var global_address="";

var dest_latitude="";
var dest_longitude="";
var src_latitude="";
var src_longitude="";
var title="";

$(function(){
	
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
       
    	console.log("Geolocation is not supported by this browser.");
        
    }
	$("#events").on("click", "#up",function(){
		//alert("here");
		  $(this).toggleClass('clicked');
		  console.log(global_title+" "+global_date+" "+global_time+" "+global_venue+" "+global_address);
		  
//	    $.ajax({
//        type : "POST",
//        url : "likeEvent",
//        data : {            
//               "title": global_title,
//               "date":global_date,
//               "time":global_time,
//               "venue":global_venue,
//               "address":global_address
//        },
//        success : function(response) {
//        	var oldimg = "http://blogs.nature.com/news/files/elections%20small.JPG";
//            var newimg = "https://wiki.sugarlabs.org/images/7/74/Ubuntu-small.jpg";
//            element.src = element.bln ? oldimg : newimg;
//            element.bln = !element.bln; 
//        },
//        error : function(e) {
//           alert('Error: ' + e);
//        }
//    }); 
		  
		});
	
	var ID = sessionStorage.getItem("event_ID");
	//console.log(ID);
	var eventurl = "http://api.eventful.com/json/events/get?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&id="+ID;
	
	$.ajax({
		url : eventurl,
		dataType : "jsonp",
		success : eventdetails,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
		}
	});
	
	
	
});




function showPosition(position) {
	src_latitude = position.coords.latitude;
	src_longitude=position.coords.longitude;
	
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
        	console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
        	console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
        	console.log("An unknown error occurred.");
            break;
    }
}


function eventdetails(eventdetails){
	//console.log(eventdetails);
	
	var date=new Date(eventdetails.start_time);
	
	var displayDate = (date.getMonth()+1)+ '/' +date.getDate()+ '/' +date.getFullYear();
	var time=formate_date(date);
	
	var htmleventstag = $("#events");
	
	dest_latitude=eventdetails.latitude;
	dest_longitude=eventdetails.longitude;
	title=eventdetails.title;
	$("h2").html(title);
	
	
	/*These global variables are for passing values to database*/
	global_title=title;
	global_date=displayDate;
	global_time=time;
	
	var description="";
	if(eventdetails.description != null){
		description="<b>Description :</b> "+eventdetails.description;
	}
	else{
		description="<b>Description :</b> No description for the event present";
	}
	
	if(eventdetails.images!=null ){
		if(eventdetails.images.image.medium !=null){
			image=eventdetails.images.image.medium.url;
			
		}
		else{
			image="http://www.montana.edu/nsfadvance/images/upcomingEventsGraphic.png";
		}
		
	}
	else{
		image="http://www.montana.edu/nsfadvance/images/upcomingEventsGraphic.png";
	}
	//console.log(image);
	
	var strperformer="";
	if(eventdetails.performers !=null){
		if(eventdetails.performers.performer !=null){
			var perfomer="";
			perfomer=eventdetails.performers.performer;
			var name=perfomer.name;
			var url=perfomer.url;
			var bio=perfomer.short_bio;
			strperformer="<b>Performer Details : </b><p class='bg-success'><b>"+name+"</b><br>"+bio+"<br><a href="+url+" target='_blank'><b>Performer Details!</b></a></p>";
		}
	}
	
	else{
		strperformer="<b>Performer Details :</b> No performer details present";
	}
	
	
	
	var venue_name="";
	if(eventdetails.venue_name !=null){
		venue_name="<b>Venue : </b>"+eventdetails.venue_name;
		global_venue=eventdetails.venue_name;
	}else{
		venue_name="<b>Venue : </b>Venue details are not specified by the organizer";
		global_venue="Venue details are not specified by the organizer";
	}
		
	
	var privacy="";
	if(eventdetails.privacy ==1){
		privacy="<b>Privacy : It's a public event</b>";
	}else if(eventdetails.privacy ==2){
		privacy="<b>Privacy : It's a Private event</b>";
	}else if(eventdetails.privacy ==3){
		privacy="<b>Privacy : It's a Private but shareable event</b>";
	}else {
		privacy="<b>Privacy : No details specified by the organizer</b>";
	}
	
	
	var price="";
	var free="";
	var final_price_display="";
	
	if(eventdetails.price == null & eventdetails.free ==null){
		final_price_display= "Price : No price specified";
	}else if(eventdetails.free != null){
		
		if(eventdetails.free==1){
			final_price_display= "<b><i>Event is free!</i></b>";
		}else{
			final_price_display= "<b><i>Event is not free!</i></b>";
		}
		
	}else if(eventdetails.price != null){
		final_price_display="Price : "+eventdetails.price;	
	}
	
	if(eventdetails.price !=null){
		price="Price : "+eventdetails.price;
	}else{
		price="Price : No price specified";
	}
	
	var complete_address="";
	if(eventdetails.address !=null || eventdetails.city!=null || eventdetails.region!=null || eventdetails.country_abbr!=null){
		complete_address="<b>Address : </b>"+eventdetails.address+"<br>"+eventdetails.city+", "+eventdetails.region+" "+eventdetails.country_abbr;
		global_address=eventdetails.address+", "+eventdetails.city+", "+eventdetails.region+", "+eventdetails.country_abbr;
	}else{
		complete_address="<b>Address : </b>Address details are not specified by the organizer";
		global_address="Address details are not specified by the organizer";
	}
		
	
	
	htmleventstag.append("<li><table class='table'><tr><td><strong>On : " 
			+ displayDate+ "<br> At : "
			+time+"</strong><br>"
			+venue_name+"<br>"
			+complete_address+"</td>" +
					"<td><div id='up' class='up fontawesome-thumbs-up'></div>" +
					"</td></tr></table><img class='img-thumbnail' src="
			+image+"></img><br>"
			+ description +"<br><br><input type='hidden' class='each_event_id' value='"
			+ eventdetails.postal_code + "' />"
			+privacy+"<strong><p class='text-danger'>"
			+final_price_display+"</p></strong><br>"
			+strperformer+"</li>");

	
	
	
	
	var strticket="";
	var tickets=[];
	if(eventdetails.links!=null){
		tickets=eventdetails.links.link;
		if(tickets.length>0){
			
			$.each(tickets, function(i, ticket) {
			
			var tik_desc=ticket.description;
			var date =new Date(ticket.time);
			var tik_displayDate = (date.getMonth()+1)+ '/' +date.getDate()+ '/' +date.getFullYear()+' '+formate_date(date);
			
			var url=ticket.url;
			//strticket="<p class='bg-success'>Buy here : "+tik_desc+"<br>"+tik_displayDate+"<br><a href="+url+"target=_blank><b>Get Tickets here!</b></a></p>";
			strticket="<p class='bg-success'>Buy here : "+tik_desc+"<br>"+tik_displayDate+"<br><a href="+url+" target='_blank'><b>Get Tickets here!</b></a></p>";
			$("#tickets").append("<div class='ticket_class'>"+strticket+"</div>");
		});
		}
	}
	else{
		strticket="No ticketing details available";
		$("#tickets").append("<div class='ticket_class'>"+strticket+"</div>");
	}
	
	
	//console.log(tickets);
	
	var categories=[];
	categories=eventdetails.categories.category;
	if(categories.length>0){
		
		$.each(categories, function(i, category) {
			var strcategory="";
		var cat_name=category.name;
		
		//strticket="<p class='bg-success'>Buy here : "+tik_desc+"<br>"+tik_displayDate+"<br><a href="+url+"target=_blank><b>Get Tickets here!</b></a></p>";
		strcategory="<p class='bg-success'>"+cat_name+"</p>";
		$("#categories").append("<div class='ticket_class'><b>"+strcategory+"</b></div>");
	});
	}
	
	var tags=[];
	tags=eventdetails.tags.tag;
	if(tags.length>0){
		
		$.each(tags, function(i, tag) {
			var strtag="";
		var tag_title=tag.title;
		
		//strticket="<p class='bg-success'>Buy here : "+tik_desc+"<br>"+tik_displayDate+"<br><a href="+url+"target=_blank><b>Get Tickets here!</b></a></p>";
		strtag="<p class='bg-success'>"+tag_title+"</p>";
		$("#tags").append("<div class='ticket_class'><b>"+strtag+"</b></div>");
	});
	}
	
	
	if(eventdetails.venue_name !=null){
	$("#venue_name").html("Events Happening at <b>"+eventdetails.venue_name+" venue: </b>");
	var venueurl = "http://api.eventful.com/json/venues/get?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&id="+eventdetails.venue_id;
	
	$.ajax({
		url : venueurl,
		dataType : "jsonp",
		//asyn:false,
		success : venuedetails,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
		}
	});
	
	}
	
	googlemap();
}

function venuedetails(venue){
//	console.log(venue);
//	var description="";
//	if(venue.description !=null){
//		description=venue.description;
//	}
//	else{
//		description="Venue description not specified";
//	}
//	 $("#venue_desc").append(description);
	
	 
	 var events_at_venue=[];
	 if(venue.events != null){
		 //console.log(events_at_venue);
		 events_at_venue=venue.events.event;
			if(events_at_venue.length>0){
				
				$.each(events_at_venue, function(i, event) {
					var strevents="";
					var title=event.title;
					var description=event.description;
					var url=event.url;
				//strticket="<p class='bg-success'>Buy here : "+tik_desc+"<br>"+tik_displayDate+"<br><a href="+url+"target=_blank><b>Get Tickets here!</b></a></p>";
					strevents="<a href="+url+" target='_blank'><p class='bg-success'><b>"+title+"</b></p></a>";
				$("#venues").append("<div class='ticket_class'>"+strevents+"</div>");
			});
			}
		 
		 
	 }else{
		 events_at_venue="No events at venue";
	 }
	 
	
}

function formate_date(date){
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strtime = hours + ':' + minutes + ' ' + ampm;
	  return strtime;
}


function googlemap() {
	//console.log(src_latitude+" , "+src_longitude);
	//console.log(dest_latitude+" , "+dest_longitude);
	//var myLatLng = new google.maps.LatLng(latitude,longitude);
	 var directionsDisplay = new google.maps.DirectionsRenderer;
	  var directionsService = new google.maps.DirectionsService;
	  if(!src_latitude){
		  console.log("if part");
		  	var myLatLng = {lat: parseFloat(dest_latitude), lng: parseFloat(dest_longitude)};

		  	var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 12,
		    center: myLatLng
		  });

		  var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    title: title
		  });
		 // google.maps.event.addDomListener(window, 'load');
		  $("#mode").hide();
	  }
	  else
	  {
		  var map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 11,
			  center: {lat: parseFloat(src_latitude) , lng: parseFloat(src_longitude)}
		  });
		  directionsDisplay.setMap(map);

		  calculateAndDisplayRoute(directionsService, directionsDisplay);
		  document.getElementById('mode').addEventListener('change', function() {
		  calculateAndDisplayRoute(directionsService, directionsDisplay);
		  });
	  }
	}

	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	  var selectedMode = document.getElementById('mode').value;
	  directionsService.route({
	    origin:{lat: parseFloat(src_latitude) , lng: parseFloat(src_longitude)},  // Haight.
	    destination: {lat: parseFloat(dest_latitude) , lng: parseFloat(dest_longitude)},  // Ocean Beach.
	    // Note that Javascript allows us to access the constant
	    // using square brackets and a string value as its
	    // "property."
	    travelMode: google.maps.TravelMode[selectedMode]
	  }, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	  });

}