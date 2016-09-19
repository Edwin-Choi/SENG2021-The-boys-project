from django.shortcuts import render
from django.http import HttpResponse
from .models import Position
import urllib.request



class AppURLopener(urllib.request.FancyURLopener):
    version = "Mozilla/5.0"

# Create your views here.
def index(request):
    if request.method == 'POST':
        name = request.POST.get('pac-input')
        print(name);
        opener = AppURLopener()
        response = opener.open('http://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&pretty=1&listing_type=buy&place_name='+ name)
        print(response);
        return HttpResponse(response)
    else:
        position = Position.objects.all();
    return render(request, 'map.html', {'pois': position})

