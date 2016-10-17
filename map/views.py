from django.shortcuts import render
from django.http import HttpResponse
from .models import Position
import urllib.request
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response


class AppURLopener(urllib.request.FancyURLopener):
    version = "Mozilla/5.0"

# Create your views here.

def index(request):
    return render(request,'index.html')

@csrf_exempt 
def map(request):
    if request.method == 'POST':
        name = request.POST.get('pac-input')
        keyword = request.POST.get('keyword')
        page = 1;
        page = request.POST.get('page');
        if name is not None:
            controlStr = '&place_name='+ name; 
        else:
            controlStr = '&south_west='+ request.POST.get('south_west') + '&north_east=' + request.POST.get('north_east') ;
        
        if page is None:
            page = 1;

        url = 'http://api.nestoria.co.uk/api?encoding=json&action=search_listings&number_of_results=50&country=uk&pretty=1&listing_type=buy' + controlStr + '&page=' + str(page);
        
        print(controlStr + " " + str(page))
        
        opener = AppURLopener()
        response = opener.open(url)
        return HttpResponse(response)
    else:
        loc = "Retford"
        if request.GET.get('loc',''):  
            loc = request.GET.get('loc','')
        print(request.GET.get('loc',''))
        position = Position.objects.all();
    showHelp = None;
    if request.COOKIES.get("show_help") is None:
        showHelp = 1;
    print(showHelp)
    response = render(request,'map.html', {'pois': position, 'loc' : loc,'showHelp' : showHelp})
    response.set_cookie("show_help","1")
    return response

