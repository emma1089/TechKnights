
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    
    
     <link href="<c:url value="resources/css/normalize.css" />" rel="stylesheet">

    <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>

       <link href="<c:url value="resources/css/style.css" />" rel="stylesheet">




    
    
    
  </head>

  <body>

    <div class="logmod">
  <div class="logmod__wrapper">
    <span class="logmod__close">Close</span>
    <div class="logmod__container">
      <ul class="logmod__tabs">
        
        <li data-tabtar="lgm-1"><a href="#signup"></a></li>
      </ul>
      <div class="logmod__tab-wrapper">
      <div class="logmod__tab lgm-1">
        <div class="logmod__heading">
          <span class="logmod__heading-subtitle">Enter your personal details <strong>to create an acount</strong></span>
        </div>
        <div class="logmod__form">
          <form accept-charset="utf-8" action="createUser" class="simform">
            <div class="sminputs">
              <div class="input full">
                <label class="string optional" for="user-name">Email*</label>
                <input class="string optional" required maxlength="255" id="user-email" name="user-email" placeholder="Email" type="email" size="50" />
              </div>
            </div>
            <div class="sminputs">
              <div class="input string optional">
                <label class="string optional" for="user-pw">Password *</label>
                <input class="string optional" required maxlength="255" id="user-pw" name="user-pw" placeholder="Password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}" title="Password should include atleast one digit, one uppercase letter, one lowercase letter. Min Size:8 MaxSize:12" size="50" />
              </div>
              <div class="input string optional">
                <label class="string optional" for="user-pw-repeat">Repeat password *</label>
                <input class="string optional" required maxlength="255" id="user-pw-repeat" name="user-pw-repeat" placeholder="Repeat password" type="password"   size="50" />
              </div>
            </div>
             <div class="logmod__heading">
          <span class="logmod__heading-subtitle" style="color:red"><strong>${createError}</strong></span>
        </div> 
        <div class="logmod__heading">
          <span class="logmod__heading-subtitle" style="color:green">Have an account? <a href="gotologin" >Sign In Here!</a></span>
        </div> 
            <div class="simform__actions">
              <input class="sumbit" name="commit" type="submit" value="Create Account" />
              <span class="simform__actions-sidetext">By creating an account you agree to our <a class="special" href="#" target="_blank" role="link">Terms & Privacy</a></span>
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
<!--                 <span>Create an account with <strong>Facebook</strong></span> -->
<!--               </div> -->
<!--             </a> -->
              
<!--             <a href="#" class="connect googleplus"> -->
<!--               <div class="connect__icon"> -->
<!--                 <i class="fa fa-google-plus"></i> -->
<!--               </div> -->
<!--               <div class="connect__context"> -->
<!--                 <span>Create an account with <strong>Google+</strong></span> -->
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
            <script src="<c:url value="resources/js/password.js" />"></script>

    
    
    
  </body>
</html>
