from django.urls import path

from task_app.views import task_detail, task_list_create

urlpatterns = [
    path("tasks/", task_list_create, name="task-list-create"),
    path("tasks/<int:pk>/", task_detail, name="task-detail"),
]
