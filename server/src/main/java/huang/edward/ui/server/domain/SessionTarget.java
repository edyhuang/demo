package huang.edward.ui.server.domain;

import java.io.Serializable;

import huang.edward.ui.server.util.Logger;

abstract public class SessionTarget extends Logger implements Serializable
{
	private static final long serialVersionUID = -5350405100040973630L;
	
	public String sessionId;
	public String user;
	public String hash;
}
