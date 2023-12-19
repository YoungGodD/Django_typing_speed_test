from django import forms
from .models import userScore

class userNameForm(forms.ModelForm):
    class Meta:
        model = userScore
        fields = [
            'name',
            'type_speed'
        ]