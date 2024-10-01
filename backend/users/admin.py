from django.contrib import admin
from .models import User

admin.site.site_header = "Jua Legal Adminstration"
admin.site.site_title = "Jualegal"
admin.site.index_title = "WELCOME TO Jua Legal ADMINSTRATION"
# admin.site

class UserAdmin(admin.ModelAdmin):
    list_display= ["username","email","firstname","lastname"]
    
admin.site.register(User ,UserAdmin)
