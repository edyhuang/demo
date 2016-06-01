package huang.edward.ui.server.security;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import huang.edward.ui.server.util.Logger;

@Aspect
@Component
public class EventLogger extends Logger
{
	//monitor controllers
	@Before("execution(* huang.edward.ui.server.service..*Service.*(..))")
	public void logServiceEntry(JoinPoint joinPoint)
	{
		log.debug("before entering {}", joinPoint.getSignature().toString());
	}
	
	@AfterReturning("execution(* huang.edward.ui.server.service..*Service.*(..))")
	public void logServiceReturns(JoinPoint joinPoint)
	{
		log.debug("after returning {}", joinPoint.getSignature().toString());
	}
	
	//monitor services
	@Before("execution(* huang.edward.ui.server.controller..*Controller.*(..))")
	public void logControllerEntry(JoinPoint joinPoint)
	{
		log.debug("before entering {}", joinPoint.getSignature().toString());
	}
	
	@AfterReturning("execution(* huang.edward.ui.server.controller..*Controller.*(..))")
	public void logControllerReturns(JoinPoint joinPoint)
	{
		log.debug("after returning {}", joinPoint.getSignature().toString());
	}
}