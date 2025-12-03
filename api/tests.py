from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Donation, Volunteer, ContactMessage

# --- API Endpoint URLs ---
# These names are defined by the DefaultRouter setup in api/urls.py
DONATIONS_URL = reverse('donation-list')
VOLUNTEERS_URL = reverse('volunteer-list')
CONTACTS_URL = reverse('contactmessage-list')
STATS_URL = reverse('dashboard-stats') # Defined in api/urls.py as path('stats/')

class DonationAPITests(APITestCase):
    """
    Tests for the Donation ViewSet (CRUD operations from Donate.js)
    """

    def test_create_donation_successful(self):
        """
        Ensure we can create a new Donation object via POST request.
        Simulates data sent from the React Donate form.
        """
        payload = {
            'donor_name': 'Test Donor Ali',
            'email': 'ali@example.com',
            'amount_or_item': '1500',  # Test with a cash amount
            'description': 'Zakat donation for project fund',
        }
        
        # Send POST request to the donations endpoint
        response = self.client.post(DONATIONS_URL, payload, format='json')
        
        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Donation.objects.count(), 1)
        self.assertEqual(Donation.objects.get().donor_name, 'Test Donor Ali')
        self.assertEqual(Donation.objects.get().amount_or_item, '1500')

    def test_create_donation_with_food_item(self):
        """
        Ensure the model handles food item donations as well.
        """
        payload = {
            'donor_name': 'Restaurant XYZ',
            'email': 'xyz@food.com',
            'amount_or_item': '50 Meals (Surplus Food)',
            'description': 'Daily bread and curry surplus, ready for pickup.',
        }
        response = self.client.post(DONATIONS_URL, payload, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Donation.objects.count(), 1)
        self.assertIn('Surplus Food', Donation.objects.get().amount_or_item)


class VolunteerAPITests(APITestCase):
    """
    Tests for the Volunteer ViewSet (from Volunteer.js)
    """

    def test_create_volunteer_successful(self):
        """
        Ensure a new Volunteer can be created via POST request.
        """
        payload = {
            'full_name': 'Subhan Hussain',
            'email': 'subhan@example.com',
            'city': 'Karachi',
            'reason': 'I want to help with food distribution in my area.',
        }
        response = self.client.post(VOLUNTEERS_URL, payload, format='json')
        
        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Volunteer.objects.count(), 1)
        self.assertEqual(Volunteer.objects.get().city, 'Karachi')

    def test_create_volunteer_invalid_data(self):
        """
        Ensure request fails if a required field like 'full_name' is missing.
        """
        payload = {
            'email': 'test@test.com',
            'city': 'Lahore',
            'reason': 'Test Reason',
        }
        response = self.client.post(VOLUNTEERS_URL, payload, format='json')
        
        # Assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Volunteer.objects.count(), 0)
        self.assertIn('full_name', response.data) # Check if the error is about the missing field


class ContactAPITests(APITestCase):
    """
    Tests for the Contact ViewSet (from Contact.js)
    """

    def test_create_contact_successful(self):
        """
        Ensure a new ContactMessage can be created via POST request.
        """
        payload = {
            'name': 'Owais Saquib',
            'email': 'owais@example.com',
            'message': 'I have a question about bulk donation.',
        }
        response = self.client.post(CONTACTS_URL, payload, format='json')
        
        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertIn('bulk donation', ContactMessage.objects.get().message)


class DashboardStatsTests(APITestCase):
    """
    Tests for the custom DashboardStats API endpoint.
    This ensures the data returned to the React Dashboard is accurate.
    """

    def setUp(self):
        # Create test data for calculations
        Donation.objects.create(donor_name="Usman 1", email="u1@test.com", amount_or_item="2000", description="Test")
        Donation.objects.create(donor_name="Usman 2", email="u2@test.com", amount_or_item="3500", description="Test")
        Donation.objects.create(donor_name="Usman 3", email="u3@test.com", amount_or_item="Food Item", description="Test") # Not counted in total_raised
        Volunteer.objects.create(full_name="Volunteer 1", email="v1@test.com", city="Karachi", reason="Test")
        Volunteer.objects.create(full_name="Volunteer 2", email="v2@test.com", city="Lahore", reason="Test")
    
    def test_stats_endpoint_returns_correct_data(self):
        """
        Ensure the /api/stats/ endpoint correctly calculates total donations and volunteers.
        """
        response = self.client.get(STATS_URL, format='json')
        data = response.data

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Total raised calculation should be (2000 + 3500) = 5500
        self.assertEqual(data['total_raised'], 5500)
        
        # Total donations (3, including the food item)
        self.assertEqual(data['donations_count'], 3)
        
        # Total volunteers (2)
        self.assertEqual(data['volunteers_count'], 2)
        
        # Cities covered (currently hardcoded to 3 in api/views.py)
        self.assertEqual(data['cities_covered'], 3)