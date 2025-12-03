# build_settings.py
# A minimal settings file used ONLY during the Docker build process for collectstatic.

# Import everything from your main settings file. 
# We assume your main settings is at: rizq_backend/settings.py
from rizq_backend.settings import *

# --- 1. OVERRIDES FOR BUILD SAFETY ---

# Ensures collectstatic has a destination path
STATIC_ROOT = BASE_DIR / "staticfiles"

# Always turn off debug mode during the build process
DEBUG = False

# Provide a dummy secret key to avoid any validation errors during build
SECRET_KEY = 'dummy-secret-key-for-build'

# Replace the database configuration with an in-memory SQLite one.
# This ensures Django does not try to connect to a PostgreSQL database 
# or a production SQLite file during the build, which causes the exit code 1 error.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}