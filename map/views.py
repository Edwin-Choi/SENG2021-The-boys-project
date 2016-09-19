from django.shortcuts import render
from django.http import HttpResponse
from .models import Position

# Create your views here.
def index(request):
    if request.method == 'POST':
        return HttpResponse("something interesting?")
    else:
        position = Position.objects.all();
        name = request.GET.get('pac-input');
        print(name);
    return render(request, 'map.html', {'pois': position})

