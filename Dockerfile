# --- STAGE 1: BUILDER ---
# This stage installs all tools and collects static files
FROM python:3.11-slim as builder

# Install system dependencies needed for PostgreSQL and compiling some Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    # Clean up to keep the layer small
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the requirements file early to leverage Docker caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code for collectstatic
COPY . .

# CRITICAL STEP: Run collectstatic in the builder stage. 
# This command is now guaranteed to run after all dependencies are installed.
# We also temporarily set a required environment variable (like DEBUG) if your settings.py needs it, 
# although often, simply ensuring STATIC_ROOT is defined is enough.
RUN python manage.py collectstatic --noinput


# --- STAGE 2: FINAL IMAGE ---
# Use a much smaller runtime image
FROM python:3.11-slim

WORKDIR /app

# Install only the system dependencies required at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    # Clean up
    && rm -rf /var/lib/apt/lists/*

# Copy the installed Python dependencies from the builder cache
COPY --from=builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/

# Copy the application code (without requirements.txt/manage.py)
COPY . /app/

# CRITICAL STEP: Copy the collected static files from the builder stage
COPY --from=builder /app/staticfiles /app/staticfiles

# The default Django port for the backend service
EXPOSE 8000

# Use gunicorn or uWSGI for production, not runserver, but keeping runserver for simple testing deployment
# CMD ["gunicorn", "your_project_name.wsgi:application", "--bind", "0.0.0.0:8000"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]