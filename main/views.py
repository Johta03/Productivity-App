from django.shortcuts import render, redirect,get_object_or_404
from .models import ToDoList, Notes
from django.http import JsonResponse
import json

def todo(request):
    if request.method == 'POST':
        if request.POST.get("newItem1"):
            txt = request.POST.get('task1')  # Get the initial value of txt
            # Check if the task is not empty and has changed

            if txt:
                new_task = ToDoList(task_type="today",task=txt, user=request.user)
                new_task.save()  # Save the new task to the database

        elif request.POST.get("newItem2"):
            txt = request.POST.get('task2')

            if txt:
                new_task = ToDoList(task_type="upcoming",task=txt,user=request.user)
                new_task.save()  # Save the new task to the database

        return redirect("/todo")

    # Logic for fetching and displaying existing tasks
    # Get all 'today' tasks
    today_tasks = ToDoList.objects.filter(task_type='today',user = request.user)

    # Get all 'upcoming' tasks
    upcoming_tasks = ToDoList.objects.filter(task_type='upcoming',user = request.user)
    
    context = {'today': today_tasks, 'upcoming':upcoming_tasks}
    return render(request, 'main/todo.html',context)

def delete_task(request, task_id):
    task_to_delete = ToDoList.objects.get(id=task_id)
    task_to_delete.delete()
    return redirect("/todo")


def notes(request):
    # Retrieve all user's notes
    if request.method == 'POST':
        if request.POST.get('newItem'):
            newTitle = request.POST.get('task')
            newNote = Notes.objects.create(title=newTitle, user=request.user)
            newNote.save()
    
    user_notes = Notes.objects.filter(user=request.user)

    return render(request, 'main/notes.html', {'user_notes': user_notes})
    

def view_note(request, note_id):
    # Retrieve the specific note or return a 404 error if not found
    note = get_object_or_404(Notes, id=note_id, user=request.user)
    return render(request, 'main/view_note.html', {'notes': note})

def delete_note(request, note_id):
    note_to_delete = Notes.objects.get(id=note_id, user=request.user)
    note_to_delete.delete()
    return redirect("/notes")

def update_note(request, note_id=None):
    if request.method == 'POST':
        data = json.loads(request.body)
        updated_title = data.get('title')
        updated_content = data.get('content')
        
        try:
            if note_id is not None:
                note = Notes.objects.get(id=note_id, user=request.user)
                
                # Set the title to a default value if it's empty or null
                if not updated_title:
                    updated_title = note.title
                
                note.title = updated_title
                note.content = updated_content
                note.save()
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

