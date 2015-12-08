/**
 * 
 */

$(function() {
$(".container").on("click",".eName",function(){
	
	var ID = $(this).parent().find('.eID').val();
	sessionStorage.setItem("event_ID", ID);
	window.open("http://localhost:8080/wham/event_details", "_blank");
	});

$(".container").on("click",".delEvent",function(){
	
	var eventID = $(this).parent().find('.eID').val();
	$.ajax({
	    type : "POST",
	    url : "removeEvent",
	    data : {            
        	id: eventID
        },success:reload
        	,
	    error : function(e) {
	       console.log('Error: ' + e);
	    }
	}); 
	
	});

});
function reload(){
	window.open("http://localhost:8080/wham/displayEvents", "_self");
}
	