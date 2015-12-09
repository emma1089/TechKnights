# TechKnights
Managing software development
<h3>Installation and Setup Guidelines</h3>
<ul>
<li><h4>Git Installation and setup:</h4></li>
      <ol>
        <li>Install Git Desktop from https://desktop.github.com/ </li>
        <li>Open Git desktop. Clone emma1089/techKnights and give the path you want to locate the code.</li>
      </ol>
      <p><h5>Possible Errors:</h5>
    You can’t see the repository in Git desktop.
        <h5>Solution:</h5>
    Check if you are a collaborator of this repository.
    
      </p>
<hr>
<li><h4>Eclipse Installation and setup:</h4></li>
       <ol>
        <li>Install Eclipse IDE for Java EE Developers from https://eclipse.org/downloads/ </li>
        <li>Open the Eclipse IDE</li>
        <li>Go to help ->marketplace ->
            <ul>
                  <li>nstall Spring IDE</li>
                  <li>Maven Integration for Eclipse</li>
            </ul>
        </li>
        <li>Open Git desktop. Clone emma1089/techKnights and give the path you want to locate the code.</li>
      </ol>
      <p><h5>Possible Errors:</h5>
    This installation is straight forward. If you get any installation error.
        <h5>Solution:</h5>
    Follow https://wiki.eclipse.org/Eclipse/Installation for any errors.
    
      </p>
<hr>
    
    <li><h4>Tomcat Server Installation and setup:</h4></li>
       <ol>
        <li>Install Tomcat from https://tomcat.apache.org/download-70.cgi</li>
       </ol>

      <p><h5>Possible Errors:</h5>
    This installation is straight forward. If you get any installation error.
        <h5>Solution:</h5>
    Make sure the main instant of tomcat is stopped.
Add instance of Tomcat to Eclipse
Follow https://tomcat.apache.org/tomcat-9.0-doc/index.html for any errors.
      </p>
<hr>      

<li><h4>MySQL Installation and setup:</h4></li>
      <ol>
        <li>Install MySQL from https://www.mysql.com/downloads/  </li>
        <li>In MySQL Workbench add connections.</li>
      </ol>

      <p><h5>Possible Errors:</h5>
    This installation is straight forward. If you get any installation error.
        <h5>Solution:</h5>
    Follow http://dev.mysql.com/doc/ for any errors.
      </p>
<hr>     

</ul>
<h3>Running WHAM</h3>
<h4>Running WHAM on localhost:</h4>
<ol>
      <li>Import the WHAM project in Eclipse IDE. </li>
      <li>To test the project: Open project, either build using maven or run test by WHAM->src/test/java->Run TestSuite.java</li>
      <li>To run the project: Right click on the project folder -> ‘Run as -> Run on server’ to run the project.</li>
      <li>You can run the project on the browser of your choice.</li>
      <li>Go to localhost http://localhost:8080/</li>
</ol>

<p><h5>Possible Errors:</h5>
    You may get errors related to Tomcat server.
You may get errors related to MySQL database.
If you come across errors related to Spring/ Hibernate

        <h5>Solution:</h5>
    Check if your Tomcat server is installed properly.
Follow https://tomcat.apache.org/tomcat-9.0-doc/index.html for any errors.

Check if your MySQL is installed and connected properly. 
Follow http://dev.mysql.com/doc/ for any errors.

Check the installation of Spring/Hibernate
Check the pom.xml file for username, password and connection details.
Check the hibernate.cfg.xml file

      </p>
<hr>    
<h3>Hosting Website</h3>
<ul>
      <li>Click on File  Export  WAR file. Give the location of WAR file.</li>
      <li>Clone the repository of the hosted project on to local machine in a folder, lets say “wham-proj” using:
      <code>git clone ssh://565e1c047628e17f38000024@techknights-whamapp.rhcloud.com/~/git/techknights.git/</code>
      </li>
      <li>Remove the src folder and only let readme and webapps folder remain</li>
      <li>(step 2 and 3 only needs to be done once)</li>
      <li>Add the WAR file from step one in webapps folder</li>
      <li>In terminal, navigate to folder where cloned repo is(eg wham-proj) after</li>
            <code>git add</code>
      <li>Commit the changes using command </li>
            <code>git commit –m “Add description of commit”</code>
      <li>Push the code into the server.</li>
            <code>git push</code>
</ul>
