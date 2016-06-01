package huang.edward.ui.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class WebSocketMessageBrokerSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer
{
	@Override
	protected void configureInbound(MessageSecurityMetadataSourceRegistry registry)
	{
		registry
		.nullDestMatcher().authenticated()
		.simpDestMatchers($.PATH_MATCH_ALL_APP).authenticated()
		.simpSubscribeDestMatchers($.PATH_MATCH_ALL_USER).authenticated()
		.anyMessage().denyAll();
	}
	
	//avoid processing outbound channel
	public void configureClientOutboundChannel(ChannelRegistration registration){}
	
	//disable CSRF for websockets
	@Override
	protected boolean sameOriginDisabled()
	{	
		return true;
	}	
}
