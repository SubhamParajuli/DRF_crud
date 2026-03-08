from django.urls import path

from task_app.views import *

urlpatterns = [
path('get_task/',get_task)
]
