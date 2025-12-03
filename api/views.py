from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Donation, Volunteer, ContactMessage
from .serializers import DonationSerializer, VolunteerSerializer, ContactSerializer

# ViewSets handle GET, POST, PUT, DELETE automatically
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all().order_by('-created_at')
    serializer_class = DonationSerializer

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all().order_by('-registered_at')
    serializer_class = VolunteerSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-sent_at')
    serializer_class = ContactSerializer

# Custom API for your Dashboard Page stats
class DashboardStats(APIView):
    def get(self, request):
        donation_count = Donation.objects.count()
        volunteer_count = Volunteer.objects.count()
        
        # Simple logic to sum amounts (assuming user entered numbers)
        # In a real app, you'd sanitize this better.
        total_raised = 0
        donations = Donation.objects.all()
        for d in donations:
            if d.amount_or_item.replace(',', '').isdigit():
                total_raised += int(d.amount_or_item.replace(',', ''))

        return Response({
            "donations_count": donation_count,
            "volunteers_count": volunteer_count,
            "total_raised": total_raised,
            "cities_covered": 3 # Hardcoded or dynamic based on volunteer cities
        })