/**
 * 
 */
var locations = [];
var user_location="";


$(function(){
	//$("#map").hide();
	
	
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
       
    	alert("Geolocation is not supported by this browser.");
        
    }
	
	
	
	$("#search_events").click(function(e) {
		get_event_ids();
		e.preventDefault();
	});
	
	
	$('#events').on("click", '.div_event_name', function () {
		var ID=$(this).find('.each_event_id').val(); 
		
        sessionStorage.setItem("event_ID", ID);
        window.open("event_details.jsp", "_blank");
    });
	
	
	$('#map').on("click", '.div_event_name', function () {
		var ID=$(this).find('.each_event_id').val(); 
		
        sessionStorage.setItem("event_ID", ID);
        window.open("event_details.jsp", "_blank");
    });
	
});



function showPosition(position) {
	latitude_longitude = position.coords.latitude + "," + position.coords.longitude;
	console.log(latitude_longitude);
	
	user_location = latitude_longitude;
	//http://api.eventful.com/rest/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&where=32.746682,-117.162741&within=25
	var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&where="+user_location+"&within=25";
	console.log("inside showPosition function : "+searchurl);
		$.ajax({
			url : searchurl,
			dataType : "jsonp",
			success : populate_events,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
			}
		});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            
            $.get("http://ipinfo.io", function(response) {
        		
        		console.log(response.ip + "  " + response.city + "  "+ response.region);
        		user_location = response.city+" "+response.region;
        		var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location="+user_location+"&page_size=50";
        		console.log("inside error function : "+searchurl);
        			$.ajax({
        				url : searchurl,
        				dataType : "jsonp",
        				success : populate_events,
        				error : function(XMLHttpRequest, textStatus, errorThrown) {
        					alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
        				}
        			});
        	}, "jsonp");
            
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

function get_event_ids() {
	$("#waitingclass").show();
	
	var location = $("#location").val().toLowerCase();
	var category = $("#category").val().toLowerCase();
	
	//console.log(user_location);
	if (location == "") {
		var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location="
				+ user_location+"&page_size=50";
	} else {
	location.replace(/\s+/g,"+");
	//console.log(location);
		var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location="+ location+"&page_size=50";
	}
	$('#location').val('');
	$('#category').val('');
	

	//console.log(searchurl);
	$(".events").empty();
	$.ajax({
		url : searchurl,
		dataType : "jsonp",
		success : populate_events,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
		}
	});

}


function populate_events(result) {
	$("#waitingclass").hide();
	
	var htmleventstag = $("#events");
	htmleventstag.empty();
	var listofevents = result.events.event;
	
	//console.log(listofevents);
	locations = [];
	
	$.each(listofevents, function(i, event) {
		
		var formatteddate=new Date(event.start_time);
		var image="";
		if(event.image!=null ){
			if(event.image.medium !=null){
				image=event.image.medium.url;
				
			}
			else{
				image="http://www.montana.edu/nsfadvance/images/upcomingEventsGraphic.png";
			}
			
		}
		else{
			image="http://www.montana.edu/nsfadvance/images/upcomingEventsGraphic.png";
		}
		
		htmleventstag.append("<li><div class='div_event_name'><img src="+image+"></img><br><strong>" + event.title + "</strong><br/> " + formatteddate
				+ "<br/>" + event.venue_address +", "+ event.city_name+	"<input type='hidden' class='each_event_id' value='" + event.id + "' /></div></li>");
	
		var custom_eventaddress="";
		if(event.venue_address==null){
			custom_eventaddress=event.city_name;
		}
		else{
			custom_eventaddress=event.venue_address+", "+event.city_name;
		}
		locations.push({
			name : event.title,
			latlng : new google.maps.LatLng(event.latitude, event.longitude),
			imagelink: image,
			venue_name:event.venue_name,
			id:event.id,
			address:custom_eventaddress
		});

	});

	googlemap();
	
}

function googlemap() {
	//$("#map").fadeToggle("slow");
	
	var mycenter = locations[0].latlng;
	var mapoptions = {
		center : mycenter,
		zoom : 9,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById('map'), mapoptions);
	
	for (var i = 0; i < locations.length; i++) {
		
		var contentstr="<div class='div_event_name'><strong>"+locations[i].name+
		"</strong><img class='infowindowimage' width='80' src=" + locations[i].imagelink + "><br>"+
		locations[i].venue_name+"<br>"+locations[i].address+"<input type='hidden' class='each_event_id' value='" + locations[i].id + "' /></div>";
		
		var myinfowindow = new google.maps.InfoWindow({
		    content:  contentstr
		});
		
		var marker = new google.maps.Marker({
			record_id:i,
			position : locations[i].latlng,
			map : map,
			title : locations[i].name,
			infowindow: myinfowindow
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			
	        this.infowindow.open(map, this);

		});
		
	}
	
	google.maps.event.addDomListener(window, 'load');
	
}

