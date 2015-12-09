/**
 * 
 */
var locations = [];
var user_location = "";
var latitude = "";
var longitude = "";

$(function() {
	
//	var clients = '${categories}';
//	var arrayLength = clients.length;
//	for (var i = 0; i < arrayLength; i++) {
//	    alert(clients[i]);
//	    //Do something
//	}
	get_event_ids(1);
	select_category();
	$("#search_events").click(function(e) {
		get_event_ids(1);
		e.preventDefault();
	});
	
	getCategory();
	$('ul.pagination').on("click", "a", function() {
		var clicked = $(this).html();
		if (clicked == 'Prev') {
			if ($(this).parents().hasClass("disabled")) {
				alert("Cannot move to previous page")
			} else {
				var current = $('ul.pagination li.active a').html();
				var new_page = parseInt(current) - 1;

				get_event_ids(new_page);
			}

		} else if (clicked == 'Next') {
			if ($(this).parents().hasClass("disabled")) {
				alert("Cannot move to previous page")
			} else {
				var current = $('ul.pagination li.active a').html();
				var new_page = parseInt(current) + 1;

				get_event_ids(new_page);
			}

		} else {

			get_event_ids(clicked);
		}
	});
	
	$('#events').on("click", '.div_event_name', function() {
		var ID = $(this).find('.each_event_id').val();
		sessionStorage.setItem("event_ID", ID);
		window.open("http://localhost:8080/wham/event_details", "_blank");
	});

	$('#map').on("click", '.div_event_name', function() {
		var ID = $(this).find('.each_event_id').val();
		sessionStorage.setItem("event_ID", ID);
		window.open("http://localhost:8080/wham/event_details", "_blank");
	});

});
function getCategories(categories){
	var arrayLength = categories.length;
	for (var i = 0; i < arrayLength; i++) {
	    alert(categories[i]);
	    //Do something
	}
}
function select_category(){
	category_url="http://api.eventful.com/json/categories/list?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a";
	$.ajax({
	url : category_url,
	dataType : "jsonp",
	success : populate_select_category,
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
	}
	});
}
function populate_select_category(results){
	 var category=results.category;
	 //console.log(category);
	 $.each(category, function(i,cat) {
		 //console.log("hi "+cat.name);
		 $(".form-control")
        .append($("<option></option>")
        .attr("value",cat.name)
        .text(cat.name));
	 });
}

function geocoder(){
	var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': '#city'}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
            var latitude_longitude = results[0].geometry.location.lat() + "," + results[0].geometry.location.lng();
			console.log(latitude_longitude);
            query="&within=25&where="+latitude_longitude;
           return query;
           alert("latlong");
          } else {
            alert("Something got wrong " + status);
            //query = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&page_size=50&location=";
           
            return query;
            alert("ip");
          }
        });
}

function setPreferences(){
	var categories= [];
	categories[categories.length]="music";
	categories[categories.length]="movies";
	$.ajax({
	    type : "POST",
	    url : "saveCategory",
	    data : {
	        CategoryList: categories 
	    },
	    error : function(e) {
	       console.log('Error: ' + e);
	    },
	    success: function(){
	    //	alert("done");
	    	window.open("http://localhost:8080/wham/resetCategory","_self");
	    }
	}); 
}

function get_event_ids(page) {
	$("#waitingclass").show();
	$("#events").empty();

	var entered_location = $("#location").val().toLowerCase();
	var category = $("#category").val().toLowerCase();
	var query = "http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&page_size=50";

	$(".events").empty();
	
	$.get("http://ipinfo.io", function(response) {

		user_location = response.city+" "+response.region;
		if (entered_location == "") {
			 query =query + "&location="+ user_location;
		} else {
			query = query + "&location="+entered_location;
		}		
		query = query + "&page_number=" + page;
		$.ajax({
			url : query,
			dataType : "jsonp",
			success : populate_events,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
			}
		});
	}, "jsonp");
}



function imgError(image) {
	image.onerror = "";
	image.src = "http://placehold.it/750x450";
	return true;
}

function populate_events(result) {
	$("#waitingclass").hide();
	var htmleventstag = $("#events");
	var listofevents = result.events.event;
	var disp = "<div class='row'>";
	var i = 1;
	// console.log(listofevents);
	locations = [];

	$
			.each(
					listofevents,
					function(i, event) {

						var formatteddate = new Date(event.start_time);
						var image = "";
						if (event.image != null) {
							if (event.image.medium != null) {
								image = event.image.medium.url;

							} else {
								image = "http://placehold.it/150x150";
							}

						} else {
							image = "http://placehold.it/150x150";
						}

						if (i % 4 == 0) {
							disp = disp + "</div><div class='row'>";
						}
						disp = disp
								+ "<div class='col-md-3 portfolio-item div_event_name'><div class='center-block column'><img class='img-responsive' src='"
								+ image
								+ "'  > <h4>"
								+ event.title
								+ "</h4> <p>"
								+ formatteddate
								+ "<br/>"
								+ event.venue_address
								+ ", "
								+ event.city_name
								+ "<input type='hidden' class='each_event_id' value='"
								+ event.id + "' /></p></div></div>";

						// disp=disp + "<div class='col-md-4
						// portfolio-item'><img src="+image+"
						// class='img-responsive'><h3>" + event.title +
						// "</h3><p> " + formatteddate
						// + "<br/>" + event.venue_address +", "+
						// event.city_name+ "</p</div>" ;

						// var venue = event.venue_address;
						// var latitude = event.latitude;
						// var longitude = event.longitude;

						var custom_eventaddress = "";
						if (event.venue_address == null) {
							custom_eventaddress = event.city_name;
						} else {
							custom_eventaddress = event.venue_address + ", "
									+ event.city_name;
						}

						locations.push({
							name : event.title,
							latlng : new google.maps.LatLng(event.latitude,
									event.longitude),
							imagelink : image,
							venue_name : event.venue_name,
							id : event.id,
							address : custom_eventaddress
						});
						i++;

					});
	disp = disp + "</div>";
	// console.log(disp);
	htmleventstag.append(disp);
	googlemap();
	var total_pages = result.page_count;
	var current_page = result.page_number;
	show(current_page, total_pages);

}

function googlemap() {
	// $("#map").fadeToggle("slow");

	var mycenter = locations[0].latlng;
	var mapoptions = {
		center : mycenter,
		zoom : 9,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), mapoptions);

	for (var i = 0; i < locations.length; i++) {
		var contentstr = "<div class='div_event_name'><strong>"
				+ locations[i].name
				+ "</strong><img class='infowindowimage' width='80' src="
				+ locations[i].imagelink + "><br>" + locations[i].venue_name
				+ "<br>" + locations[i].address
				+ "<input type='hidden' class='each_event_id' value='"
				+ locations[i].id + "' /></div>";

		var myinfowindow = new google.maps.InfoWindow({
			content : contentstr
		});

		var marker = new google.maps.Marker({
			record_id : i,
			position : locations[i].latlng,
			map : map,
			title : locations[i].name,
			infowindow : myinfowindow
		});

		google.maps.event.addListener(marker, 'click', function() {
			this.infowindow.open(map, this);

		});

	}

	google.maps.event.addDomListener(window, 'load');

}