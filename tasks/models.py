from django.db import models

# Create your models here.
class Task(models.Model):
    """Model definition for Task."""

    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)

    class Meta:
        """Meta definition for Task."""

        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'

    def __str__(self):
        """Unicode representation of Task."""
        return self.title
