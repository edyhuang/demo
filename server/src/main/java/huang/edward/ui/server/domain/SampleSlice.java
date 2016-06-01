package huang.edward.ui.server.domain;

public class SampleSlice
{
	public String id, label, order, score, weight, color;
	
	private final String[] colors = new String[]{"#9E0041","#C32F48", "#E1514B", "#F47245", "#FB9F59", "#FEC574", "#FAE38C", "#EAF195", "#C7E89E", "#9CD6A4", "#6CC4A4", "#4D9DB4", "#4776B4", "#5E4EA1"};
	private final String[] ids = new String[]{"AAPL","BCS", "C", "DPZ", "ETFC", "FB", "GOOG", "HD", "IBM", "JNJ", "KRFT", "LMT", "MSFT", "NKE"};
	private final String[] labels = new String[]{"Apple","Barclays Capital", "Citibank", "Domino's Pizza", "ETrade", "Facebook", "Google", "Homedepot", "Internal Business Machines", "Johnsons and Johnsons", "Krafts", "Lockheed Martins", "Microsoft", "Nike"};
	
	public SampleSlice(int id)
	{
		this.id = ids[id];
		this.color = colors[id];
		this.label = labels[id];
		this.order = Double.valueOf((Math.random()*100)).toString();
		this.score = Double.valueOf((Math.random()*100)).toString();
		this.weight = Double.valueOf((Math.random()*1)).toString();
	}
}
