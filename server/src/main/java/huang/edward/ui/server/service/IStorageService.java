package huang.edward.ui.server.service;

import java.util.List;
import java.util.Set;

import huang.edward.ui.server.domain.SessionFilter;

/**
 * Storage Service Interface
 */
public interface IStorageService
{
	SessionFilter getFilter(String sessionId);

	List<Object> getFilters();

	void saveFilter(SessionFilter filter);

	void removeFilter(String sessionId);

	void removeSet(String key);

	void addToSet(String key, String member);

	boolean isMember(String key, Object name);

	Object getObject(String domain, String generateSecurityPrimaryKey);
}