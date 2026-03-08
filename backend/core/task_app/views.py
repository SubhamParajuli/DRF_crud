from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Task
from .serializers import TaskSerializer



@api_view()
def get_task(request):
    queryset=Task.objects.all()
    serializer=TaskSerializer(queryset,many=True)

    return Response({
        "data":serializer.data,
    })



class TaskApi(APIView):
    def get(self,request):
        queryset=Task.objects.all().order_by("-pk")
        serializer=TaskSerializer(queryset,many=True)

        return Response({
            "data": serializer.data
        })

    def post(self,request):
        data= request.data
        serializer=TaskSerializer(data=data)

        if not serializer.is_valid():
            return Response({
                "message": "data not saved.",
                "errors": serializer.errors,
            })
        serializer.save()
        return Response({
            "message": "Data saved successfully."
        })

    def patch(self,request):
        data=request.data

        if not data.get('id'):
            return Response({
                "message": "data not updated",
                "errors": "id not found"
            })
        
        task= Task.objects.get(id=data.get('id'))
        serializer=TaskSerializer(task, data=data, partial=True)
        if not serializer.is_valid():
            return Response({
                "message": "data not updated",
                "errors": serializer.errors,
            })
        serializer.save()
        return Response({
            "message": "Data updated successfully."
        })


    def delete(self,request):
        data=request.data
        if not data.get('id'):
            return Response({
                "message": "data not updated",
                "errors": "id not found"
            })
        
        task= Task.objects.get(id=data.get('id')).delete()
        return Response({
            "message": "Data deleted successfully."
        })
