package huang.edward.ui.server.controller;

import java.security.Principal;

import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

import huang.edward.ui.server.domain.SamplePie;
import huang.edward.ui.server.domain.SessionFilter;

public interface IController
{
	void modifyFilter(SessionFilter filter, StompHeaderAccessor accessor, Principal principal);
	void onDistribute(SamplePie data);
}
