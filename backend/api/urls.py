from django.urls import path

from task_app.views import *

urlpatterns = [
    path("get_task/", get_task),
    path("tasks/", TaskListCreateApi.as_view(), name="task-list-create"),
    path("tasks/<int:pk>/", TaskRetrieveUpdateDeleteApi.as_view(), name="task-detail"),
]
