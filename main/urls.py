from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('todo/', views.todo, name='todo'),
    path('delete/<int:task_id>/', views.delete_task, name='delete_task'),
    path('notes/', views.notes, name='notes'),
    path('notes/<int:note_id>/', views.view_note, name='view_note'),
    path('deleteNote/<int:note_id>/', views.delete_note, name='delete_note'),
    path('timer/', views.timer, name='timer'),
    path('update-note/', views.update_note, name='update_note'),
        path('update-note/<int:note_id>/', views.update_note, name='update_note_with_id'),

]