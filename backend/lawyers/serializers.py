from rest_framework import serializers

from .models import Lawyer
from datetime import date

class LawyerSerializer(serializers.ModelSerializer):
    years_of_experience = serializers.SerializerMethodField()

    class Meta:
        model = Lawyer
        fields = ['id', 'name', 'email', 'phone', 'address', 'specialty', 'years_of_experience']

    def get_years_of_experience(self, obj):
        return date.today().year - obj.start_date.year