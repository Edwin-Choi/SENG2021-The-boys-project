from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'', include('map.urls')),
    url(r'^test/', include('tests.urls')),
    url(r'^map/', include('map.urls')),
    url(r'^admin/', admin.site.urls),
]
