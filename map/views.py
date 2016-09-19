from django.shortcuts import render
from django.http import HttpResponse
from .models import Position
import urllib.request
import json


class AppURLopener(urllib.request.FancyURLopener):
    version = "Mozilla/5.0"

# Create your views here.
def index(request):
    if request.method == 'POST':
        name = request.POST.get('pac-input')
        keyword = request.POST.get('keyword')
        page = 1;
        page = request.POST.get('page');
        if page is None:
            page = 1;
        url = 'http://api.nestoria.co.uk/api?encoding=json&action=search_listings&number_of_results=50&country=uk&pretty=1&listing_type=buy&place_name='+ name + '&page=' + str(page);
        print(name + " " + str(page));
        opener = AppURLopener()
        response = opener.open(url)
        return HttpResponse(response)
    else:
        position = Position.objects.all();
    return render(request, 'map.html', {'pois': position})

