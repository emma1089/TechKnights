
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
          <form accept-charset="utf-8" action="checkLogin" class="simform">
            <div class="sminputs">
              <div class="input full">
                <label class="string optional" for="user-name">Email*</label>
                <input class="string optional" maxlength="255" id="user-email" name= "user-email" placeholder="Email" type="email" size="50" required />
              </div>
            </div>
            <div class="sminputs">
              <div class="input full">
                <label class="string optional" for="user-pw">Password *</label>
                <input class="string optional" name="user-pw" maxlength="255" id="user-pw" placeholder="Password" type="password" size="50" required />
                						<span class="hide-password">Show</span>
              </div>
            </div>
            <div class="logmod__heading">
          <span class="logmod__heading-subtitle" style="color:red"><strong>${loginerror}</strong></span>
        </div> 
         <div class="logmod__heading">
          <span class="logmod__heading-subtitle" style="color:green">Don't have an account? <a href="gotosignup" >Sign Up Here!</a></span>
        </div> 
            <div class="simform__actions">
              <input class="sumbit" name="commit" type="submit" value="Log In" />
              <span class="simform__actions-sidetext"><a class="special" role="link" href="gotoForgotPassword">Forgot your password?<br>Click here</a></span>
            </div> 
          </form>
        </div> 
<!--         <div class="logmod__alter"> -->
<!--           <div class="logmod__alter-container"> -->
<!--             <a href="#" class="connect facebook"> -->
<!--               <div class="connect__icon"> -->
<!--                 <i class="fa fa-facebook"></i> -->
<!--               </div> -->
<!--               <div class="connect__context"> -->
<!--                 <span>Sign in with <strong>Facebook</strong></span> -->
<!--               </div> -->
<!--             </a> -->
<!--             <a href="#" class="connect googleplus"> -->
<!--               <div class="connect__icon"> -->
<!--                 <i class="fa fa-google-plus"></i> -->
<!--               </div> -->
<!--               <div class="connect__context"> -->
<!--                 <span>Sign in with <strong>Google+</strong></span> -->
<!--               </div> -->
<!--             </a> -->
<!--           </div> -->
<!--         </div> -->
          </div>
      </div>
    </div>
  </div>
</div>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

            <script src="<c:url value="resources/js/index.js" />"></script>

    
    
    
  </body>
</html>
