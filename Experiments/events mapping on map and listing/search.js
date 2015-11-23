/**
 * 
 */
var locations = [];
var user_location = "";
var latitude_longitude="";

$(function() {
	
	console.log("search event jquery");

	$("#waitingclass").hide();
	$("#map").hide();
	$("#getmap").hide();
	
	$.get("http://ipinfo.io", function(response) {
		//console.log(response.ip + "  " + response.city + "  "+ response.region);
		user_location = response.city;
		// $("#ip").html(response.ip);
		// $("#address").html(response.city + ", " + response.region);
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
	$("#map").hide();
	var location = $("#location").val().toLowerCase();
	var category = $("#category").val().toLowerCase();
	var event_name = $("#event_name").val().toLowerCase();
	// console.log(location+" "+category+" "+event_name);
	if (location == "") {
		var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location="
				+ user_location;
	} else {
		var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location="
				+ location;
		
	}
	//var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location=boston&page_size=50"
	
	$('#location').val('');
	$('#category').val('');
	$('#event_name').val('');

	console.log(searchurl);
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
	// console.log(result.search_time);
	// console.log(listofevents);
	locations = [];
	
	$.each(listofevents, function(i, event) {

		htmleventstag.append("<li><strong>" + event.title + "</strong><br/> " + event.start_time
				+ "<br/>" + event.venue_address +", "+ event.city+"</li>");
		var venue = event.venue_address;
		var latitude = event.latitude;
		var longitude = event.longitude;

		locations.push({
			name : venue,
			latlng : new google.maps.LatLng(latitude, longitude)
		});
		
	$("#getmap").show();
		/*
		 * var eventurl =
		 * "http://api.eventful.com/json/events/get?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&id="+event.id;
		 * console.log(searchurl);
		 * 
		 * $.ajax({ url : eventurl, dataType : "jsonp", success :
		 * get_each_event, error : function(XMLHttpRequest, textStatus,
		 * errorThrown) { alert("Status: " + XMLHttpRequest + "Error: " +
		 * errorThrown); } });
		 */

	});
}
/*function get_each_event(result) {
	console.log(result.title);
	// var htmleventstag = $(".events");
	// htmleventstag.append("<li>" + result.title + "</li>");
}*/

function googlemap() {
	$("#map").fadeToggle("slow");

	var mycenter = locations[0].latlng;
	var mapoptions = {
		center : mycenter,
		zoom : 8,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	// console.log(mapoptions);
	// setting
	var map = new google.maps.Map(document.getElementById('map'), mapoptions);

	var markeroption = {
		position : mycenter,
		animation : google.maps.Animation.BOUNCE
	};
	
	//var bounds=new google.maps.LatLngBounds();
	for (var i = 0; i < locations.length; i++) {
		//console.log(i);
		var marker = new google.maps.Marker({
			position : locations[i].latlng,
			map : map,
			title : locations[i].name
		});
	//	map.fitbounds(bounds);
		marker.setMap(map);
	}

	/*
	 * var infooption={ content:"Hello World!" }; 
	 * var infowindow = new google.maps.InfoWindow(infooption); 
	 * google.maps.event.addListener(marker, 'mouseover', function (e) { infowindow.open(map, marker);
	 * 
	 * });
	 */

	// window.location = '#map';
	google.maps.event.addDomListener(window, 'load');
}