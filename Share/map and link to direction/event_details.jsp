<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Details to Event</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- custom made stylesheet -->
<link rel="stylesheet" href="../css/event_details.css">

<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Google map API -->
<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhTAgod-mzwEWcaX_R2K7BRQYEVXlZcXI&signed_in=true"
	async defer></script>
<script src="../js/event_details.js"></script>

<!-- Latest compiled JavaScript -->
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>
<body>
	<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand">What's Happening Around Me!</a>
			</div>
			<div>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#"><span class="glyphicon glyphicon-user"></span>
							Sign Up</a></li>
					<li><a href="#"><span class="glyphicon glyphicon-log-in"></span>
							Login</a></li>
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