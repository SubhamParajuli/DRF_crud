from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer



@api_view(["GET"])
def get_task(request):
    # Backward-compatible list endpoint.
    queryset = Task.objects.all().order_by("-pk")
    serializer = TaskSerializer(queryset, many=True)

    return Response({
        "data": serializer.data,
    })


class TaskListCreateApi(ListCreateAPIView):
    queryset = Task.objects.all().order_by("-pk")
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]


class TaskRetrieveUpdateDeleteApi(RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]
