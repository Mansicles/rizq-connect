# --- STAGE 1: BUILDER ---
# This stage installs all tools and collects static files
FROM python:3.11-slim as builder

# Install system dependencies needed for PostgreSQL and compiling some Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the requirements file early to leverage Docker caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code, including the new build_settings.py
COPY . /app/

# CRITICAL FIX (1): Run collectstatic using the minimal build_settings.py
# This is where the static files are generated.
RUN DJANGO_SETTINGS_MODULE=build_settings python manage.py collectstatic --noinput


# --- STAGE 2: FINAL IMAGE ---
# Use a much smaller runtime image
FROM python:3.11-slim

WORKDIR /app

# Install only the system dependencies required at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the installed Python dependencies from the builder cache
COPY --from=builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/

# Copy the application code
COPY . /app/

# CRITICAL FIX (2): REMOVED redundant collectstatic command from here.

# CRITICAL STEP: Copy the collected static files from the builder stage
COPY --from=builder /app/staticfiles /app/staticfiles

# Define the production settings module for runtime
ENV DJANGO_SETTINGS_MODULE=rizq_backend.settings

# The default Django port for the backend service
EXPOSE 8000

# Use the Django runserver command for this simple testing deployment
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]