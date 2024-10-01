from django.db import models

class Chat(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
     
    def __str__(self):
        return self.user.username
     
class ModelMessage(models.Model):
    role = models.CharField(max_length=100)
    parts = models.TextField()
     
    def __str__(self):
        return self.message