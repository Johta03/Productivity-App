from django.shortcuts import render, redirect,get_object_or_404
from .models import ToDoList, Notes
from django.http import JsonResponse
import json

def todo(request):
    if request.method == 'POST':
        if request.POST.get("newItem1"): # if the request was for newItem1 which is for the "Today" task container
            txt = request.POST.get('task1')  # Get the initial value of txt

            # Check if the task is not empty and has changed
            if txt:
                new_task = ToDoList(task_type="today",task=txt, user=request.user) # Create new task in database for the user's todo list
                new_task.save()  # Save the new task to the database

        elif request.POST.get("newItem2"): # if the request was for newItem1 which is for the "Upcoming" task container
            txt = request.POST.get('task2') # Get the initial value of txt

            if txt:
                new_task = ToDoList(task_type="upcoming",task=txt,user=request.user) # Create new task in database for the user's todo list
                new_task.save()  # Save the new task to the database

        return redirect("/todo") #redirect to the todo page to update displayed tasks

    # Logic for fetching and displaying existing tasks:
    # Get all 'today' tasks
    today_tasks = ToDoList.objects.filter(task_type='today',user = request.user)

    # Get all 'upcoming' tasks
    upcoming_tasks = ToDoList.objects.filter(task_type='upcoming',user = request.user)
    
    context = {'today': today_tasks, 'upcoming':upcoming_tasks}

    return render(request, 'main/todo.html',context)

def delete_task(request, task_id):
    task_to_delete = ToDoList.objects.get(id=task_id) # get the task to delete
    task_to_delete.delete() # delete
    return redirect("/todo") # Redirect to todo page to update changes


def notes(request):

    if request.method == 'POST':
        if request.POST.get('newItem'): # if a new page is to be created from the POST request
            newTitle = request.POST.get('task') # get the title text
            newNote = Notes.objects.create(title=newTitle, user=request.user) # create new database notes item
            newNote.save() # save item
    
    # Retrieve all user's notes and gives it to the html display
    user_notes = Notes.objects.filter(user=request.user)

    return render(request, 'main/notes.html', {'user_notes': user_notes})
    

def view_note(request, note_id):
    # Retrieve the specific note to render or return a 404 error if not found
    note = get_object_or_404(Notes, id=note_id, user=request.user)
    return render(request, 'main/view_note.html', {'notes': note})

def delete_note(request, note_id):
    note_to_delete = Notes.objects.get(id=note_id, user=request.user) # get note page to delete
    note_to_delete.delete() # delete
    return redirect("/notes") # Redirect to notes page to update changes

def update_note(request, note_id=None):
    if request.method == 'POST':
        data = json.loads(request.body) # loads json data
        updated_title = data.get('title')
        updated_content = data.get('content')
        
        try:
            # if a note_id is passed through
            if note_id is not None:
                note = Notes.objects.get(id=note_id, user=request.user) # get the note
                
                # Set the title to a default value if it's empty or null
                if not updated_title:
                    updated_title = note.title
                
                # update with new details
                note.title = updated_title
                note.content = updated_content
                note.save() # save
            else:
                return JsonResponse({'status': 'error', 'message': 'Note ID not provided'})
            
            return JsonResponse({'status': 'success'})
        except Notes.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Note not found'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'})

def timer(request):
    return render(request, 'main/timer.html',{})

def login(request):
    return redirect("/login")

