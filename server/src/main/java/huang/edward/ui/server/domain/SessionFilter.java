package huang.edward.ui.server.domain;

import java.io.Serializable;

public class SessionFilter extends SessionTarget implements Serializable
{
	private static final long serialVersionUID = -496609656990541535L;
	
	//this is where POJO properties lives which mirrors Javascript Object values stored in the client cookie storage
	public boolean heartbeat;
	public boolean activate;
	public String msg;
	public boolean emit;
	public int pieCount;
	public int sliceCount;
}
