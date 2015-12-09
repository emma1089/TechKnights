<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Welcome to WHAM!</title>
<link href="<c:url value="resources/css/preferences.css" />"
	rel="stylesheet">


<!-- jQuery library -->

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>



<!-- Google map API -->
<!-- Latest compiled JavaScript -->
	
	<script>
   
    $('.input_class_checkbox').each(function(){
        $(this).hide().after('<div class="class_checkbox" />');

    });

    $('.class_checkbox').on('click',function(){
        $(this).toggleClass('checked').prev().prop('checked',$(this).is('.checked'))
    });
</script>
</head>

<body>
	<input type='checkbox' name='thing' value='valuable' id="thing"/><label for="thing">something</label>
			


</body>
</html>