from django.contrib import admin
from .models import Donation, Volunteer, ContactMessage

# Register your models here.
admin.site.register(Donation)
admin.site.register(Volunteer)
admin.site.register(ContactMessage)