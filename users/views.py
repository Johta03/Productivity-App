from django.shortcuts import render, redirect
from .forms import RegisterForm

# Create your views here.
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST) # Create register form object with user input
        if form.is_valid(): # Data validation
            form.save() # save if data is valid
            return redirect("/login") # redirect to login page
    else:
        form = RegisterForm() # Otherwise register form is not validated
    return render(request, "register/register.html", {"form": form})