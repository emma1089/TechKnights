<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Welcome to WHAM!</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- custom made stylesheet -->
<link rel="stylesheet" href="../css/homepage.css">

<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Google map API -->
<script src="https://maps.googleapis.com/maps/api/js?"></script>

<script src="../js/homepage.js"></script> 

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
	<div class="centerspacing">
		<div align="center">
			<form class="form-inline">
				<div class="form-group">
					<input type="text" class="form-control" id="location"
						placeholder="Location">
				</div>
				<div class="form-group">
					<input type="text" class="form-control" id="category"
						placeholder="Search for events or category">
				</div>
				<div class="form-group">
					<select class="form-control">
						<option>Today</option>
						<option>This Week</option>
						<option>Next week</option>
						<option>Future</option>
						<option>All</option>
					</select>
				</div>
				<button type="submit" class="btn btn-success" id="search_events">
					<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					Search
				</button>
				
				
			</form>

			<h2 id="waitingclass">Please wait for events....</h2>
			<div id="map"></div>
			
		</div>
		
		<div class="centerspacing">
		<ul id="events"></ul>
		

		
		</div>
		
		
		
	</div>
</body>
</html>