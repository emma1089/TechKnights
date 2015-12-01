
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
          <span class="logmod__heading-subtitle">Update your password</span>
         
        </div>
        <div class="logmod__form">
          <form accept-charset="utf-8" action="changePassword" class="simform">
       <input type="hidden" class="string optional"  id="user-name" name="user-name" value="${userName}">
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
      
            <div class="simform__actions">
              <input class="sumbit" name="commit" type="submit" value="Change Password" />
              
            </div> 
          </form>
        </div> 

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
