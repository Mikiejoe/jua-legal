from django.db import models

class Lawyer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    specialty = models.CharField(max_length=100)
    start_date = models.DateField()

    def __str__(self):
        return self.name