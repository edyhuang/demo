package huang.edward.ui.server.config;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@EnableScheduling
@EnableWebSocketMessageBroker
public class WebSocketMessageBrokerConfig extends AbstractWebSocketMessageBrokerConfigurer 
{
	@Override
	public void configureMessageBroker(MessageBrokerRegistry config)
	{
		config.enableSimpleBroker($.PATH_TOPIC, $.PATH_QUEUE);
		config.setApplicationDestinationPrefixes($.PATH_APP);
		config.setUserDestinationPrefix($.PATH_USER);
	}
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry)
	{
		registry.addEndpoint($.ENDPOINT_DEMO).withSockJS();
	}
	
	@Bean
	public ServletServerContainerFactoryBean createWebSocketContainer()
	{
		ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
		container.setAsyncSendTimeout($.TIMEOUT_ASYNC_SEND);
		container.setMaxSessionIdleTimeout($.TIMEOUT_MAX_SESSION_IDLE);		
		return container;
	}

}
