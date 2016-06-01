package huang.edward.ui.server.controller;

import javax.inject.Inject;

import javax.servlet.ServletContext;

import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.util.Assert;

import huang.edward.ui.server.util.Logger;

public abstract class MessagingController extends Logger implements IController
{
	@Inject
	protected ServletContext context;
	
	private final SimpMessagingTemplate messaging;

	public MessagingController(SimpMessagingTemplate messaging)
	{
		Assert.notNull(messaging, "unable to send messages due to missing SimpMessagingTemplate");
		
		this.messaging = messaging;
	}

	//broadcast to all
	protected void broadcast(Object payload)
	{
		if (payload == null) return; //no op
		
		messaging.convertAndSend(payload);
		
		log.debug("broadcast \npayload:{}", payload);
	}
	
	//broadcast to all subscribed to a specific destination
	protected void broadcastToDestination(String destination, Object payload)
	{
		if (payload == null) return; //no op
		
		Assert.hasText(destination);
		
		messaging.convertAndSend(destination, payload);
		
		log.debug("broadcast to destination {} \npayload:{}", destination, payload);
	}
	
	//broadcast to all sessions belongs to the same user
	protected void sendToUser(String user, String destination, Object payload)
	{
		if (payload == null) return; //no op

		Assert.hasText(user);
		Assert.hasText(destination);
		
		messaging.convertAndSendToUser(user, destination, payload);
		
		log.debug("broadcast to {} on destination {} \npayload:{}", user, destination, payload);
	}
	
	//send only to individual user session
	protected void sendToSession(String user, String sessionId, String destination, Object payload)
	{
		if (payload == null) return; //no op
		
		Assert.hasText(user);
		Assert.hasText(sessionId);
		Assert.hasText(destination);

		SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create();
		headerAccessor.setSessionId(sessionId);
		headerAccessor.setLeaveMutable(true);
		
		MessageHeaders messageHeaders = headerAccessor.getMessageHeaders();
		
		messaging.convertAndSendToUser(user, destination, payload, messageHeaders);

		log.debug("sent to {}-{} on destination {} \npayload:{}", user, sessionId, destination, payload);		
	}
}
