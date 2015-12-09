<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Welcome to WHAM!</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!-- Latest compiled and minified CSS -->


<!-- custom made stylesheet -->
<link href="<c:url value="resources/css/homepage.css" />"
	rel="stylesheet">

<link
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
	rel="stylesheet">
<!-- jQuery library -->

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>


<!-- Google map API -->
<script src="https://maps.googleapis.com/maps/api/js?"></script>
<script src="<c:url value="resources/js/homepage.js" />"></script>
<script src="<c:url value="resources/js/pagination.js" />"></script>

<!-- Latest compiled JavaScript -->
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	
	<script>
    $(document).ready(function () {
    	
        $('.dropdown-toggle').dropdown();
        
    });
    function getCategory(){
    	//alert("called");
    	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${not empty categories}">
  //  c = ${total_calls_p};
    var cats=${categories};
	getCategories(cats);
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
				<ul class="nav navbar-nav navbar-left ">
					<c:if test="${not empty loggedInUser}">
						<li><a href="displayEvents">my events</a>
							
					</c:if>

				</ul>
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

	<div class="row text-center">
		<div class="col-lg-12">
			<ul class="userDisplayName">
			</ul>
		</div>
	</div>
	<div class="centerspacing">

		<div align="center">
		<a href="displayEvents">my events</a>
<%-- 		<c:if test="${not empty categories}"> --%>

<!-- 		<ul> -->
<%-- 			<c:forEach var="listValue" items="${categories}"> --%>
<%-- 				<li>${listValue}</li> --%>
<%-- 			</c:forEach> --%>
<!-- 		</ul> -->

<%-- 	</c:if> --%>
			
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
						<option id="options">None</option>
						
					</select>
				</div>
			
				<button type="submit" class="btn btn-success" id="search_events">
					<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					Search
				</button>


			</form>
			
			<c:if test="${not empty loggedInUser}">
						<button type="submit" class="btn btn-success" id="search_events" onclick="setPreferences()">
					<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					SetPreferences
				</button>
					<button type="submit" class="btn btn-success" id="search_events" onclick="getPreferences()">
					<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					GetPreferences
				</button>
					</c:if>

			<h2 id="waitingclass">Please wait for events....</h2>
			<div id="map"></div>
			

		</div>

		<div class="centerspacing">
			<div id="events"></div>
			<div class="row text-center">
				<div class="col-lg-12">
					<ul class="pagination">
					</ul>
				</div>
			</div>
		</div>



	</div>
</body>
</html>