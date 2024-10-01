from django.contrib import admin

from .models import Lawyer

class LawyerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'address', 'specialty', 'start_date']
    
    
admin.site.register(Lawyer, LawyerAdmin)
