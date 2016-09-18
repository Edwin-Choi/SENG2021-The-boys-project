from django.db import models
from geoposition.fields import GeopositionField

# Create your models here.
class Position(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    zipcode = models.CharField(max_length=10)
    position = GeopositionField(blank=True)

