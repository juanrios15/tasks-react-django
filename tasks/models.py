from django.db import models

# Create your models here.
class Task(models.Model):
    """Model definition for Task."""

    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    ordering = models.IntegerField(unique=True, null=False, blank=False)

    def save(self, *args, **kwargs):
        if not self.ordering:
            highest_order = Task.objects.all().aggregate(models.Max('ordering'))['ordering__max'] or 0
            self.ordering = highest_order + 1
        super(Task, self).save(*args, **kwargs)

    class Meta:
        """Meta definition for Task."""

        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'

    def __str__(self):
        """Unicode representation of Task."""
        return self.title
