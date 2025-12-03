# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies needed for system/db connection (if using postgres later)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file (containing Django, DRF, etc.)
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /app/

# Expose the port your application runs on
EXPOSE 8000

# Run collectstatic (important for production environments)
RUN python manage.py collectstatic --noinput

# Define the command to run the server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]