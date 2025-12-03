from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DonationViewSet, VolunteerViewSet, ContactViewSet, DashboardStats

router = DefaultRouter()
router.register(r'donations', DonationViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'contact', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', DashboardStats.as_view(), name='dashboard-stats'),
]