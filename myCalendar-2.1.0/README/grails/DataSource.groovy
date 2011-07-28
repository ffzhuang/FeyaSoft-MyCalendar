
dataSource {
	pooled = true
	driverClassName = "com.mysql.jdbc.Driver"
	username = "feyasoft"
	password = "myCalendar"
}
hibernate {
    cache.use_second_level_cache=true
    cache.use_query_cache=true
    cache.provider_class='com.opensymphony.oscache.hibernate.OSCacheProvider'
}
// environment specific settings
environments {
	development {
		dataSource {
			dbCreate = "update" // one of 'create', 'create-drop', 'update'
			url = "jdbc:mysql://localhost:3306/myCalendar?tcpKeepAlive=true&amp;useUnicode=true&amp;characterEncoding=UTF8"
            maxActive="8"
            maxIdle="3"
            maxWait="-1"
            removeAbandoned="true"
            removeAbandonedTimeout="90"
            logAbandoned="true"
        }
	}
	test {
		dataSource {
			dbCreate = "update"
			url = "jdbc:mysql://localhost:3306/myCalendar?tcpKeepAlive=true&amp;useUnicode=true&amp;characterEncoding=UTF8"
		}
	}
	production {
		dataSource {
			dbCreate = "update"
			url = "jdbc:mysql://localhost:3306/myCalendar?tcpKeepAlive=true&amp;useUnicode=true&amp;characterEncoding=UTF8"
            maxActive="8"
            maxIdle="3"
            maxWait="-1"
            removeAbandoned="true"
            removeAbandonedTimeout="90"
            logAbandoned="true"
        }
	}
}