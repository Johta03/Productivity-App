from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'), # Default landing page is to login the user
    path('todo/', views.todo, name='todo'),
    path('delete/<int:task_id>/', views.delete_task, name='delete_task'), # Page route for deleting todo tasks
    path('notes/', views.notes, name='notes'),
    path('notes/<int:note_id>/', views.view_note, name='view_note'), # Page route for viewing notes page
    path('deleteNote/<int:note_id>/', views.delete_note, name='delete_note'), # Page route for deleting notes page
    path('timer/', views.timer, name='timer'),
    path('update-note/<int:note_id>/', views.update_note, name='update_note_with_id'), # Page route for updating notes page (title or content)
]