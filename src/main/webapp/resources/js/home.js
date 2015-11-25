$(document).ready(init)
var x = document.getElementById("events");
var start_url = 'http://api.eventful.com/json/events/search?app_key=wM6zMhpCSHnj9pvC';
function init() {
	
    $('#getEventsNearby').click(function () {
    	
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.Please enter zip code";
        }
       
    });
}

function showPosition(position) {
	
	 var lat=position.coords.latitude;
     var long=position.coords.longitude;
     lat=lat.toFixed(6);
     long=long.toFixed(6);
    // alert(lat);	
  //   alert("here");
     var query1 = "http://api.eventful.com/json/events/search?app_key=wM6zMhpCSHnj9pvC&where=32.746682,-117.162741&within=25";
     var query = start_url + '&where=' + lat + ","+long + '&within=25';
     
     //console.log(lat);
     ajax_helper(query);
}

function ajax_helper(query) {
    //event.preventDefault();
    $.ajax({
        url: query,
        crossDomain: true,
        dataType: 'jsonp',
        success: function (results) {
        	//console.log(results);
        	handleResponse(results);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function handleResponse(response) {
	
	var x = document.getElementById("events");
    x.innerHTML = "";
    var data = "";
    
    //console.log(response.events.event[0]);
    for (i = 0; i < response.page_size;i++) {
       var event=response.events.event[i];
        
      //  for (i = 0; i < response.page_size;i++) {
      //  var performers=response.event[i];
        data = data + "<h3>" + event.title + "</h3>";
       // data=data + "<h3>" + event.id + "</h3>";
        data = data + "<h4>Latitude: " + event.latitude + "Longitude"+ event.longitude + "(to be replaced by map or link to map)</h4>";
        data = data + "<b>City: </b>" + event.city_name+ "<br><br><br>";
    }
    

    x.innerHTML = data;
}
