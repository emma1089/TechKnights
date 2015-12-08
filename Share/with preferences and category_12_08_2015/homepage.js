/**
 * 
 */
var locations = [];
var user_location="";
var user_preferences = [];

$(function(){
	//$("#map").hide();
	
	$( "#selectable" ).selectable();
	
	$('#selectable li').on('click', function() {
		  $(this).toggleClass('ui-selected'); 
	});
	
	$('#getVals').click(function() {
	    getSelected();
	});
	
	
	get_event_ids();
	
	
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

function getSelected() {
    
    $('.ui-selected').each(function(k,v) {
    	user_preferences.push($(v).find(".cat").val());
    });
    console.log(user_preferences);
    //return selectedVals;
}



function get_event_ids() {
	$("#waitingclass").show();
	
	var mainsearchurl="http://api.eventful.com/json/events/search?app_key=Z8NPhGBg9CxVF58W&oauth_fields=8adc404a77d54837a56a&page_size=50&";
	var location = $("#location").val().toLowerCase();
	var keyword = $("#keyword").val().toLowerCase();
	var category =$("#category").val();
	var partofsearchurl="";
	var searchurl="";
	var strpreferences="";
	
	
	console.log(location+" "+keyword+" "+category);
	$.get("http://ipinfo.io", function(response) {
		
		if(location != ""){
			partofsearchurl="location="+ location;
		}else{
		//console.log(response.ip + "  " + response.city + "  "+ response.region);
		user_location = response.city+" "+response.region;
		partofsearchurl="location="+user_location;
		}
		
		//user_preferences=["music","sports","food"];
		
		if(user_preferences.length>0){
			console.log("inside if of pref "+user_preferences.length);		
			
			for (var i = 0; i < user_preferences.length; i++) {
				if(strpreferences ==""){
					strpreferences=user_preferences[i];
				}else{
				strpreferences=strpreferences+","+user_preferences[i];
				}
			}
			
			
			if(keyword !=""){
				partofsearchurl=partofsearchurl+"&keywords="+keyword;
			}
			if(category != "None"){
				partofsearchurl=partofsearchurl+"&c="+category;
			}else{
				partofsearchurl=partofsearchurl+"&c="+strpreferences;
			}
			
		}else{
			//strpreferences="";
			console.log("inside else of pref");
			if(keyword !=""){
				partofsearchurl=partofsearchurl+"&keywords="+keyword;
			}
			if(category != "None"){
				partofsearchurl=partofsearchurl+"&c="+category;
			}
		}
		
		
		searchurl=mainsearchurl+partofsearchurl;
		
		console.log("Before AJAX Call : "+searchurl);
			$.ajax({
				url : searchurl,
				dataType : "jsonp",
				success : populate_events,
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert("Status: " + XMLHttpRequest + "Error: " + errorThrown);
				}
			});
	}, "jsonp");
	

}


function populate_events(result) {
	$("#waitingclass").hide();
	
	var htmleventstag = $("#events");
	htmleventstag.empty();
	var listofevents="";
	
	if(result.events != null){
		listofevents = result.events.event;
		
		console.log(result);
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

	}else{
		$("#map").html("<b>No Such Events near your location. Please try another search.  <b>")
	}
		
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

