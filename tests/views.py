from django.shortcuts import render

# Create your views here.

def test(request):
  if(request.GET.get('mybtn')):
     request.GET.get('mytextbox')
  return render(request,'test.html')
