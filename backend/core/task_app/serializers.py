from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "name", "completed", "created_at"]
        read_only_fields = ["id", "created_at"]
