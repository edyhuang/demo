package huang.edward.ui.server.domain;

import java.util.ArrayList;
import java.util.List;

public class SamplePie
{
	public List<SampleSlice> payload = new ArrayList<SampleSlice>();
	
	public SamplePie(int slices)
	{
		for (int i=0; i<slices; i++)
			this.payload.add(new SampleSlice(i));
	}
}
