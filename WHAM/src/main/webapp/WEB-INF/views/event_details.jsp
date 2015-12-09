
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Details to Event</title>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- custom made stylesheet -->
<link href='<c:url value="resources/css/event_details.css" />' rel='stylesheet'>
<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Google map API -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhTAgod-mzwEWcaX_R2K7BRQYEVXlZcXI&signed_in=true" async defer></script>
<script src="<c:url value="resources/js/event_details.js" />"></script>


<!-- Latest compiled JavaScript -->
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	
	<script>
    $(document).ready(function () {
    	
        $('.dropdown-toggle').dropdown();
        
    });
    function getEvents(){
    	//alert("called");
    	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${not empty events}">
  //  c = ${total_calls_p};
    var events=${events};
	return events;
</c:if>
    	
    	
    }
    function getLogin(){
    	//alert("called");
    	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${not empty loggedInUser}">
  //  c = ${total_calls_p};
    return true;
</c:if>
<c:if test="${empty loggedInUser}">
//  c = ${total_calls_p};
  return false;
</c:if>	
    	
    }
</script>
</head>
<body>
	<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<div class=container>
			<div class="navbar-header">
				<a class="navbar-brand">What's Happening Around Me!</a>
			</div>
			<div id="drops">
				<ul class="nav navbar-nav navbar-right ">
					<c:if test="${not empty loggedInUser}">
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown" role="button" aria-haspopup="true"
							aria-expanded="false">User <span class="glyphicon glyphicon-user"></span></a>
							<ul class="dropdown-menu">
								<li><a href='gotoSetPreferences'>Set Preferences</a></li>
								<li><a href="logout">LogOut</a></li>
							</ul></li>
					</c:if>
					<c:if test="${empty loggedInUser}">
						<li><a href="gotosignup"><span
								class="glyphicon glyphicon-user"></span> Sign Up</a></li>

						<li><a href="gotologin"><span
								class="glyphicon glyphicon-log-in"></span> Login</a></li>
					</c:if>

				</ul>
			</div>
		</div>
	</div>

	</nav>
		<div class="row centerspacing">
			<div class="col-md-6">
				<h2 class="bg-success">Welcome to new API call</h2>
				<ul id="events"></ul>
			</div>
			<div class="col-md-6">
				<h4>Directions:</h4>
				<select id="mode" class="form-control">
					<option value="DRIVING">Driving</option>
					<option value="WALKING">Walking</option>
					<option value="BICYCLING">Bicycling</option>
					<option value="TRANSIT">Transit</option>
				</select>

				<div id="map"></div>

			</div>
		</div>
		<h3 class="centerspacing">Ticketing Details:</h3>
		<div id="tickets" class="row centerspacing"></div>
		
		<hr>
		
		<h3 class="centerspacing">Categories:</h3>
		<div id="categories" class="row centerspacing"></div>
		
		<hr>
		
		<h3 class="centerspacing">Associated tags:</h3>
		<div id="tags" class="row centerspacing"></div>
		
		<hr>
		
		<h3 class="centerspacing"><div id="venue_name"></div></h3>
		<!-- <div id="venue_desc" class="row centerspacing"></div> -->
		<div id="venues" class="row centerspacing"></div>
		
</body>
</html>