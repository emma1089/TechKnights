
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Details to Event</title>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- custom made stylesheet -->
<link href='<c:url value="resources/css/event_details.css" />'
	rel='stylesheet'>
<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Google map API -->

<script src="<c:url value="resources/js/displayEvents.js" />"></script>
<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhTAgod-mzwEWcaX_R2K7BRQYEVXlZcXI&signed_in=true"
	async defer></script>
<%-- <script src="<c:url value="resources/js/event_details.js" />"></script> --%>


<!-- Latest compiled JavaScript -->
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
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
							aria-expanded="false">User <span
								class="glyphicon glyphicon-user"></span></a>
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



	
	




	<div class="container">
	<c:if test="${not empty events}">
		<table class="table">
			<tbody>
				<thead>
      <tr>
        <th>Event Name</th>
        <th>Event Location</th>
        <th>Action</th>
     </tr>
    </thead>
 <tbody>
      
      <c:forEach var="event" items="${events}">

			<tr>
        <td><a href="#" class="eName"> ${event.name}</a><input type="hidden" class="eID" value=${event.id} ></td>
        <td>${event.venue}</td>
        <td><a href="#" class="delEvent" ><input type="hidden" class="eID" value=${event.id} >Delete</a></td>
      </tr>
      </c:forEach>
      
 </tbody>
      
   </table>    
   	</c:if> 
   	<c:if test="${empty events}">

					<span>No Events added yet.</span>

				</c:if>  
</div>
				
			</body>
</html>