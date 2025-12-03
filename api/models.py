from django.db import models

class Donation(models.Model):
    # Aligns with Donate.js input fields
    donor_name = models.CharField(max_length=100)
    email = models.EmailField()
    amount_or_item = models.CharField(max_length=200) # Can be money or food item
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor_name} - {self.amount_or_item}"

class Volunteer(models.Model):
    # Aligns with Volunteer.js input fields
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    city = models.CharField(max_length=100)
    reason = models.TextField(blank=True) # "Why do you want to volunteer?"
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

class ContactMessage(models.Model):
    # Aligns with Contact.js
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"