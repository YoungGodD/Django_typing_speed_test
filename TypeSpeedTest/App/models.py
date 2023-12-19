from django.db import models

# Create your models here.
class userScore(models.Model):
    name =  models.CharField(max_length=25)
    type_speed = models.IntegerField(default=0)