from django.contrib import admin
from .models import ToDoList,Notes

# Register your models here.
admin.site.register(ToDoList) #The database is registered on the admin dashboard
admin.site.register(Notes)