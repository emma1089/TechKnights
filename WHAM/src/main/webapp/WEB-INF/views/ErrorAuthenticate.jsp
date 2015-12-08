
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Login/Sign-In</title>
    
    
     <link href="<c:url value="resources/css/normalize.css" />" rel="stylesheet">

    <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>

       <link href="<c:url value="resources/css/style.css" />" rel="stylesheet">




    
    
    
  </head>

  <body>
  <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1673069162908355',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

    <div class="logmod">
  <div class="logmod__wrapper">
    <span class="logmod__close">Close</span>
    <div class="logmod__container">
      <ul class="logmod__tabs">
       <ul class="logmod__tabs">
        <li data-tabtar="lgm-2"><a href="#loggingin"></a></li>
      </ul>
      </ul>
      <div class="logmod__tab-wrapper">
 
      <div class="logmod__tab lgm-2">
      	 
        <div class="logmod__heading">
          <span class="logmod__heading-subtitle">Enter your email and password <strong>to sign in</strong></span>
        </div> 
        
        <div class="logmod__form">
            
           
            <div class="logmod__heading">
          <span class="logmod__heading-subtitle" style="color:red"><strong>Wrong Authentication Link. Request for change password once more.</strong></span>
        </div> 
         <div class="logmod__heading">
          <span class="logmod__heading-subtitle" style="color:green">Don't have an account? <a href="gotosignup" >Sign Up Here!</a></span>
        </div> 
            <div class="simform__actions">
            
            </div> 
      
        </div> 
          </div>
      </div>
    </div>
  </div>
</div>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

            <script src="<c:url value="resources/js/index.js" />"></script>

    
    
    
  </body>
</html>
