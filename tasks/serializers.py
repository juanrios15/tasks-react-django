from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    ordering = serializers.IntegerField(required=False)

    class Meta:
        model = Task
        fields = "__all__"

    def create(self, validated_data):
        return super().create(validated_data)