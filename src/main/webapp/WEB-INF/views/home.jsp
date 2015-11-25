<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Display events Nearby</title>

    <!-- Bootstrap Core CSS -->
<link href="<c:url value="resources/css/bootstrap.min.css" />" rel="stylesheet">
    <!-- Custom CSS -->
<link href="<c:url value="resources/css/3-col-portfolio.css" />" rel="stylesheet">
    
    
    	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="<c:url value="resources/js/home.js" />"></script>
	
	

    <!-- Bootstrap Core JavaScript -->
    	<script src="<c:url value="resources/js/bootstrap.min.js" />"></script>

</head>

<body>


    <!-- Page Content -->
    <div class="container">

        <!-- Page Header -->
        <div class="row">
        <div class="form-group">
  <button id="getEventsNearby">Get Events Nearby</button>
</div>
        </div>
        <div class="row">
<!--         <div class="form-group"> -->
<!--   <label for="zipcode">ZipCode:</label> -->
<!--   <input type="text" class="form-control" id="usr"> -->
<!--   <button id="getEventsByZip">Get Events Near Zip Code</button> -->
<!-- </div> -->
        </div>
        <div id="events"></div>
<!--         <div class="row"> -->
<!--             <div class="col-lg-12"> -->
<!--                 <h1 class="page-header">Page Heading -->
<!--                     <small>Secondary Text</small> -->
<!--                 </h1> -->
<!--             </div> -->
<!--         </div> -->
        <!-- /.row -->

        <!-- Projects Row -->
<!--         <div class="row"> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--         </div> -->
<!--         /.row -->

<!--         Projects Row -->
<!--         <div class="row"> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--         </div> -->

<!--         Projects Row -->
<!--         <div class="row"> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--             <div class="col-md-4 portfolio-item"> -->
<!--                 <a href="#"> -->
<!--                     <img class="img-responsive" src="http://placehold.it/700x400" alt=""> -->
<!--                 </a> -->
<!--                 <h3> -->
<!--                     <a href="#">Project Name</a> -->
<!--                 </h3> -->
<!--                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p> -->
<!--             </div> -->
<!--         </div> -->
<!--         /.row -->

<!--         <hr> -->

<!--         Pagination -->
<!--         <div class="row text-center"> -->
<!--             <div class="col-lg-12"> -->
<!--                 <ul class="pagination"> -->
<!--                     <li> -->
<!--                         <a href="#">&laquo;</a> -->
<!--                     </li> -->
<!--                     <li class="active"> -->
<!--                         <a href="#">1</a> -->
<!--                     </li> -->
<!--                     <li> -->
<!--                         <a href="#">2</a> -->
<!--                     </li> -->
<!--                     <li> -->
<!--                         <a href="#">3</a> -->
<!--                     </li> -->
<!--                     <li> -->
<!--                         <a href="#">4</a> -->
<!--                     </li> -->
<!--                     <li> -->
<!--                         <a href="#">5</a> -->
<!--                     </li> -->
<!--                     <li> -->
<!--                         <a href="#">&raquo;</a> -->
<!--                     </li> -->
<!--                 </ul> -->
<!--             </div> -->
<!--         </div> -->
<!--         /.row -->

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; TechKnights 2015</p>
                </div>
            </div>
            <!-- /.row -->
        </footer>

    </div>
    <!-- /.container -->

   

</body>

</html>
