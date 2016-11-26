package controller;

import greencode.kernel.CoreFileJS;
import greencode.kernel.GreenContext;
import greencode.kernel.implementation.BootActionImplementation;

import java.lang.reflect.Method;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BootAction implements BootActionImplementation {

	public void destroy() {}

	public void init(String arg0, ClassLoader arg1, ServletContext arg2, CoreFileJS arg3) {}

	public void afterAction(GreenContext arg0, Method arg1) {}

	public boolean beforeAction(GreenContext arg0, Method arg1) {
		return true;
	}
	
	public void initUserContext(GreenContext arg0) {}

	public void onRequest(HttpServletRequest arg0, HttpServletResponse arg1) {
		arg1.setHeader("Cache-Control","no-cache");
		arg1.setHeader("Pragma","no-cache");
		arg1.setDateHeader("Expires", -1);
	}

}
