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
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<!-- Selector jquery -->
 <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  

<style>
  #feedback { font-size: 1.4em; }
  #selectable .ui-selecting { background: #008000; }
  #selectable .ui-selected { background: #4CAF50; color: white; }
  #selectable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
  #selectable li { margin: 3px; padding: 0.4em; font-size: 1.4em;width: 300px; height: 40px; background:#cccccc ; }
  .ui-selectee {
    margin: 3px;
    padding: 0.4em;
    font-size: medium;
    width: 300px;
    float: left;
    
    }
    
  .glyphicon {
  width:50px;
  }
  .jumbotron{
  height:350px;
  margin:0px;
  }
  .selectable{
  text-align: "center";
  }
 
  </style>
 
 
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
					<input type="text" class="form-control" id="keyword"
						placeholder="Search for events or category">
				</div>
				<div class="form-group">
					<select id="category" class="form-control">
						<option>None</option>
						<option>Music</option>
						<option>Sports</option>
						<option>Food</option>
						
					</select>
				</div>
				<button type="submit" class="btn btn-success" id="search_events">
					<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					Search
				</button>
				
				<button type="button" class="btn btn-success" data-toggle="collapse" data-target="#demo">
				  <span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>Preferences
				</button>
				<div id="demo" class="collapse">
    		<ol id="selectable" align='justify' >
 							 <li class="ui-widget-content"  >Concert<input type="hidden" class="cat" value="Concerts &amp; Tour Dates">
 							 	<span class="glyphicon glyphicon-music" aria-hidden="true"></span>
 							 </li>
  							<li class="ui-widget-content">Movies<input type="hidden" class="cat" value="Film">
  								<span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span>
  							</li>
  							<li class="ui-widget-content">Education<input type="hidden" class="cat" value="Education">
  								<span class="glyphicon glyphicon-education" aria-hidden="true"></span>
  							</li>
  							<li class="ui-widget-content">Festivals<input type="hidden" class="cat" value="Festivals">
  								<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span>
  							</li>
  							<li class="ui-widget-content">Night Life<input type="hidden" class="cat" value="Nightlife &amp; Singles">
  								<span class="glyphicon glyphicon-glass" aria-hidden="true"></span>
  							</li>
 							 <li class="ui-widget-content">Conferences<input type="hidden" class="cat" value="Conferences &amp; Tradeshows">
 							 	<span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
 							 </li>
 							 <li class="ui-widget-content">Restaurants<input type="hidden" class="cat" value="Food &amp; Wine">
 							 	<span class="glyphicon glyphicon-cutlery" aria-hidden="true"></span>
 							 </li>
 							  <li class="ui-widget-content">Health<input type="hidden" class="cat" value="Health &amp; Wellness">
 							 	<span class="glyphicon glyphicon-apple" aria-hidden="true"></span>
 							 </li> 	
					 			
					</ol>
					 <button  type="button" class="btn btn-primary" onclick="getSelected()">
				  				<span class="glyphicon glyphicon-hand-up" aria-hidden="true"></span>Submit Preference
							</button>
				  </div>
				
						
				
			</form>

			<h2 id="waitingclass">Please wait for events....</h2>
			<div id="map"></div>
			
		</div>
		
		<div class="centerspacing">
		<ul id="events"></ul>
		<div class="row"><div>

		
		</div>
		
	</div>
</body>
</html>