package huang.edward.ui.server.controller.sample;

import java.security.Principal;
import java.security.acl.Permission;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RestController;

import huang.edward.ui.server.config.$;
import huang.edward.ui.server.controller.MessagingController;
import huang.edward.ui.server.domain.SamplePie;
import huang.edward.ui.server.domain.SessionFilter;
import huang.edward.ui.server.domain.SessionMessage;
import huang.edward.ui.server.service.IStorageService;

@RestController
public class SampleController extends MessagingController
{
	final static public LinkedList<SamplePie> samplesQueue = new LinkedList<SamplePie>();
	final static public Map<String, SessionFilter> filters = new HashMap<String, SessionFilter>();
	static private boolean emit = true;
	static private int pieCount = 4;
	static private int sliceCount = 14;
	
	private long count = 0;
	private AtomicBoolean busy = new AtomicBoolean(false);
	private StringBuilder headerBuilder = new StringBuilder();
	private StringBuilder valueBuilder = new StringBuilder();
	private StringBuilder fieldDelimiter = new StringBuilder();
	private StringBuilder recordDelimiter = new StringBuilder();

	@Inject
	public SampleController(SimpMessagingTemplate template)
	{
		super(template);
	}

//	@SendToUser
//	@PreAuthorize("hasRole('USER')")
	@SampleRequestTopic
	@SendToUser(broadcast=false)  //broadcast flag indicates msg is session specific or not
	public void modifyFilter(SessionFilter filter, StompHeaderAccessor accessor, Principal principal)
	{
		if (filter.heartbeat)
		{
			log.info("heartbeat from: {}-{}", principal.getName(), accessor.getSessionId());
			
			return;
		}
		
		log.debug("updateFilter(...)");
		
		Assert.notNull(principal);
		
		String user = principal.getName();
		String sessionId = accessor.getSessionId();
		
		Assert.notNull(user);
		Assert.notNull(sessionId);
		
		filter.user = user;
		filter.sessionId = sessionId;

		if (filter.activate)
			filters.put(filter.user+filter.sessionId, filter);
		else
		{
			emit = filter.emit;
			
			pieCount = filter.pieCount;
			
			sliceCount = filter.sliceCount;
		}
		
		mockDataGeneration();
	}

	@Scheduled(fixedRate=100)
	public void mockDataGeneration()
	{
		if (!emit) return;
		
		if (filters.isEmpty()) return;
		
		for (int i=0; i<pieCount; i++)
			samplesQueue.push(new SamplePie(sliceCount));
		
		delivery();
	}
		
//	@Scheduled(fixedRate=500)
	public void delivery()
	{
		if (busy.get()) return;
		
		busy.set(true);
		
		ArrayList<SamplePie> buffer = new ArrayList<SamplePie>();
		
		SamplePie data;

		do
		{
			if (samplesQueue == null || samplesQueue.isEmpty()) break;
			
			data = samplesQueue.pop();
			
			if (data!=null)
			{
				buffer.add(data);

				count++;
			}	
			
			if (count>=$.FLUSH_TRIGGER_ITEMS_COUNT)
				sendToClients(buffer);
		}
		while (data != null);
		
		sendToClients(buffer);

		buffer = null;
		
		busy.set(false);
	}

	private void sendToClients(final ArrayList<SamplePie> buffer)
	{
		count = 0; 
		
		if (buffer.isEmpty()) return;
		
		for (Object obj : filters.values())
		{
			SessionFilter filter = (SessionFilter) obj;
			
			send(filter, buffer);
		}
		
		buffer.clear();
	}

	private void send(SessionFilter filter, final ArrayList<SamplePie> buffer)
	{
		sendToSession(filter.user, filter.sessionId, $.TOPIC_DEMO_RESPONSE, SessionMessage.set(buffer));
	}

	@Override
	public void onDistribute(SamplePie data) {
		// TODO Auto-generated method stub
	}
}
