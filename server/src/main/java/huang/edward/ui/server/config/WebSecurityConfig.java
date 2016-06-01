package huang.edward.ui.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true, proxyTargetClass=true)  //needed only if method level annotated secrity is used.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter
{
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception
	{
		//Standard security
        httpSecurity
        .headers()  
        	.cacheControl()  //ensure cache is on
        	.disable()
    		.and()
        .formLogin()
            .loginPage("/login")
            .permitAll()
            .and()
        .logout()
            .permitAll()
            .and()
        .authorizeRequests()
        	.antMatchers("/_/**").permitAll()
        	.antMatchers("/", "/home").permitAll()
        	.anyRequest().authenticated();		
    	      
	}
	
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
                .withUser("edward").password("p").roles("USER")
                .and()
                .withUser("zekey").password("p").roles("USER");
    }
}
