from django.shortcuts import render
from django.http import HttpResponse
from .models import Position

# Create your views here.
def index(request):
    position = Position.objects.all();
    return render(request, 'map.html', {'pois': position})
