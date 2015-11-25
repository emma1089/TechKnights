/**
 * 
 */
var locations = [];
var user_location="";
var latitude="";
var longitude="";

$(function(){
	//$("#map").hide();
	$.get("http://ipinfo.io", function(response) {
		
		//console.log(response.ip + "  " + response.city + "  "+ response.region);
		user_location = response.city;
		var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location="+user_location+"&page_size=50";
		
			$.ajax({
				url : searchurl,
				dataType : "jsonp",
				success : populate_events,
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
				}
			});
	}, "jsonp");
	
	$("#search_events").click(function(e) {
		get_event_ids();
		e.preventDefault();
	});
	
	$("#getmap").click(function(e) {
		googlemap();
		e.preventDefault();
	});
});



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
	
	var htmleventstag = $(".events");
	var listofevents = result.events.event;
	
	//console.log(listofevents);
	locations = [];
	
	$.each(listofevents, function(i, event) {
		
		var formatteddate=new Date(event.start_time);
		var image="";
		if(event.image!=null ){
			if(event.image.medium !=null){
				image=event.image.medium.url;
				console.log(image);
			}
			else{
				image="";
			}
			
		}
		
		
		htmleventstag.append("<li><img src="+image+"><strong>" + event.title + "</strong><br/> " + formatteddate
				+ "<br/>" + event.venue_address +", "+ event.city_name+"</li>");
		
		var venue = event.venue_address;
		var latitude = event.latitude;
		var longitude = event.longitude;

		locations.push({
			name : event.title,
			latlng : new google.maps.LatLng(latitude, longitude)
		});

	});

	googlemap();
	
}

function googlemap() {
	//$("#map").fadeToggle("slow");
	
	var mycenter = locations[0].latlng;
	var mapoptions = {
		center : mycenter,
		zoom : 8,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById('map'), mapoptions);
	
	for (var i = 0; i < locations.length; i++) {
		
		var myinfowindow = new google.maps.InfoWindow({
		    content: locations[i].name
		});
		
		var marker = new google.maps.Marker({
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