package huang.edward.ui.server.domain;

import java.io.Serializable;

/**
 * Top level JSON envelope which takes an Object as payload
 */
public class SessionMessage extends SessionTarget implements Serializable
{	
	private static final long serialVersionUID = 6399063557797390167L;
	
	final public Object payload;
	
	private SessionMessage(final Object payload)
	{
		this.payload = payload;
	}
	
	final static public SessionMessage set(Object payload)
	{
		return new SessionMessage(payload);
	}
}
