from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ToDoList(models.Model):
    TASK_TYPES = (
        ('today', 'Today'),
        ('upcoming', 'Upcoming'),
    )

    task = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todolist", null=True)
    task_type = models.CharField(max_length=10, choices=TASK_TYPES, default='today')

    def __str__(self):
        return self.task
    
class Notes(models.Model):
    title = models.CharField(max_length=100, default='Untitled')
    content = models.TextField(max_length=1000, null=True, blank=True, default='')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes", null = True) #Each user has a different notes list

    def __str__(self):
        return self.title
    
class Timer(models.Model):
    BREAK_CHOICES = (
        (5, '5 minutes'),
        (10, '10 minutes'),
        (15, '15 minutes'),
    )

    break_length = models.IntegerField(null=True, blank=True, choices=BREAK_CHOICES, default=5)
    session_length = models.IntegerField(null=True, blank=True) #In minutes
    duration = models.DurationField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=(
        ('running', 'Running'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
    ), default='paused')
