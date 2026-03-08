from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


@api_view()
def get_task(request):
    queryset=Task.objects.all()
    serializer=TaskSerializer(queryset,many=True)

    return Response({
        "data":serializer.data
    })

