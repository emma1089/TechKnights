package com.techknights.wham;

import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
@RunWith(Suite.class)
@Suite.SuiteClasses({
   loginTest.class,
   passwordChange.class
})
public class TestSuite {
	 @Test public void run() {
	        JUnitCore.runClasses(loginTest.class,
	        		   passwordChange.class);
	    }
}
