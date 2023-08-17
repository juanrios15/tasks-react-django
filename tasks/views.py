from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by("ordering")
    serializer_class = TaskSerializer

    @action(detail=True, methods=['post'])
    def change_order(self, request, pk=None):
        task = self.get_object()
        new_order = request.data.get('ordering')
        old_order = int(task.ordering)
        try:
            new_order = int(new_order)
        except ValueError:
            return Response({'detail': 'Invalid ordering value.'}, status=status.HTTP_400_BAD_REQUEST)
        task.ordering = -1
        task.save(update_fields=['ordering'])
        if new_order < old_order:
            tasks_to_update = Task.objects.filter(ordering__lt=old_order, ordering__gte=new_order).order_by('-ordering')
            for task_to_update in tasks_to_update:
                task_to_update.ordering += 1
                task_to_update.save(update_fields=['ordering'])
        elif new_order > old_order:
            tasks_to_update = Task.objects.filter(ordering__lte=new_order, ordering__gt=old_order)
            for task_to_update in tasks_to_update:
                task_to_update.ordering -= 1
                task_to_update.save(update_fields=['ordering'])
        task.ordering = new_order
        task.save()

        return Response(self.get_serializer(task).data)