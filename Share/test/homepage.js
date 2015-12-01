/**
 * 
 */
var locations = [];
var user_location="";
var latitude="";
var longitude="";

$(function(){
	//$("#map").hide();
	get_event_ids(1) ;
	
	$("#search_events").click(function(e) {
		get_event_ids(1);
		e.preventDefault();
	});
	
	$('#events').on("click", '.div_event_name', function () {
		var ID=$(this).find('.each_event_id').val(); 
		
        sessionStorage.setItem("event_ID", ID);
        window.open("event_details.jsp", "_blank");
    });
	
	 $('ul.pagination').on("click", "a", function () {
	        var clicked = $(this).html();
	        if (clicked == 'Prev') {
	            if ($(this).parents().hasClass("disabled")) {
	                alert("Cannot move to previous page")
	            }
	            else {
	                var current = $('ul.pagination li.active a').html();
	                var new_page = parseInt(current) - 1;

	                get_event_ids(new_page);
	            }

	        }
	        else if (clicked == 'Next') {
	            if ($(this).parents().hasClass("disabled")) {
	                alert("Cannot move to previous page")
	            }
	            else {
	                var current = $('ul.pagination li.active a').html();
	                var new_page = parseInt(current) + 1;

	                get_event_ids(new_page);
	            }

	        }
	        else {

	            get_event_ids(clicked);
	        }
	    });

});



function get_event_ids(page) {
	$("#waitingclass").show();
	$("#events").empty();
	var location = $("#location").val().toLowerCase();
	var category = $("#category").val().toLowerCase();
	var query="http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&page_size=50&location=";
	
	//console.log(user_location);
	
	$('#location').val('');
	$('#category').val('');
	

	//console.log(searchurl);
	$(".events").empty();
	
	
$.get("http://ipinfo.io", function(response) {
		
		//console.log(response.ip + "  " + response.city + "  "+ response.region);
		user_location = response.city;
		if (location == "") {
			query = query + user_location;
		} else {
		//location.replace(/\s+/g,"+");
		//console.log(location);
			query = query + location;
		}
		//var searchurl = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&location="+user_location+"&page_size=50";
		query= query+ "&page_number=" + page;
		
			$.ajax({
				url : query,
				dataType : "jsonp",
				success : populate_events,
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
				}
			});
	}, "jsonp");
//	$.ajax({
//		url : searchurl,
//		dataType : "jsonp",
//		success : populate_events,
//		error : function(XMLHttpRequest, textStatus, errorThrown) {
//			alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
//		}
//	});

}

function imgError(image) {
    image.onerror = "";
    image.src = "http://placehold.it/750x450";
    return true;
}


function populate_events(result) {
	$("#waitingclass").hide();
	
	var htmleventstag = $("#events");
	
	//
	var listofevents = result.events.event;
	var disp="<div class='row'>";
	var i=1;
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
				image="http://placehold.it/150x150";
			}
			
		}else{
			image="http://placehold.it/150x150";
		}
		
		if(i%4==0){
			disp=disp+ "</div><div class='row'>";
		}
		disp=disp + "<div class='col-md-3 portfolio-item div_event_name'><div class='center-block column'><img class='img-responsive' src='"+image+"'  > <h4>" + event.title +
                    "</h4> <p>" + formatteddate +
                    "<br/>" + event.venue_address +", "+ event.city_name+ "<input type='hidden' class='each_event_id' value='" + event.id + "' /></p></div></div>";
		
		//disp=disp + "<div class='col-md-4 portfolio-item'><img src="+image+" class='img-responsive'><h3>" + event.title + "</h3><p> " + formatteddate
		//		+ "<br/>" + event.venue_address +", "+ event.city_name+ "</p</div>" ;
		
		var venue = event.venue_address;
		var latitude = event.latitude;
		var longitude = event.longitude;

		locations.push({
			name : event.title,
			latlng : new google.maps.LatLng(event.latitude, event.longitude)
		});
		i++;

	});
	disp=disp+ "</div>";
	//console.log(disp);
	htmleventstag.append(disp);
	googlemap();
	var total_pages= result.page_count;
	var current_page= result.page_number;
	show(current_page,total_pages);
	
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