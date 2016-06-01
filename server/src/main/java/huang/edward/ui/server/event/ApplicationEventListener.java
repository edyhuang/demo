package huang.edward.ui.server.event;

import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import huang.edward.ui.server.controller.sample.SampleController;
import huang.edward.ui.server.util.Logger;

@Component
public class ApplicationEventListener extends Logger implements ApplicationListener<SessionDisconnectEvent> 
{
	@Override
	public void onApplicationEvent(SessionDisconnectEvent sessionDisconnectEvent)
	{
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(sessionDisconnectEvent.getMessage());
		
		Assert.notNull(accessor, "StompHeaderAccessor cannot be null");
		
		SampleController.filters.remove(accessor.getSessionId());
		
		log.debug("stomp session disconnected on id = {}", accessor.getSessionId());
	}	
}
