from django.urls import path, include
from rest_framework import routers

from .views import TasksViewSet

app_name = "Tasks"

router = routers.DefaultRouter()

router.register(r"tasks", TasksViewSet, basename="tasks")

urlpatterns = [
    path("", include(router.urls)),
]