from django.shortcuts import render
from .models import userScore


def homepage(request):
    userName = str()
    userSpeed = int()
    if request.method == "POST":
        userName = request.POST.get('name')
        userSpeed = request.POST.get('type_speed')
        try:
            userScore.objects.create(name = userName, type_speed = userSpeed)
        except:
            pass
    with open("App/text.txt", "r") as file:
        text = file.read().replace("\n", "")
    return render(request, "App/home.html", {"text": text})