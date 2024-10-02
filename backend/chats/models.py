from django.db import models

class Chat(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
     
    def __str__(self):
        return self.user.username
     
class ModelMessage(models.Model):
    role = models.CharField(max_length=100)
    parts = models.JSONField()
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE,blank=True,null=True)
     
    def __str__(self):
        return self.role