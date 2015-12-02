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
	
	var ID = sessionStorage.getItem("event_ID");
	console.log(ID);
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
	console.log(eventdetails.title);
	var formatteddate=new Date(eventdetails.start_time);
	var htmleventstag = $("#events");
	
	dest_latitude=eventdetails.latitude;
	dest_longitude=eventdetails.longitude;
	title=eventdetails.title;
	htmleventstag.append("<li><strong>" + eventdetails.title + "</strong><br/> " + formatteddate
		+ "<br/>" + eventdetails.description +"<input type='hidden' class='each_event_id' value='" + eventdetails.postal_code + "' /></div></li>");

	googlemap();
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
			  zoom: 12,
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