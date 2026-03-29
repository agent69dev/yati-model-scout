STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    ".onrender.com",
]

CSRF_TRUSTED_ORIGINS = [
    "https://*.onrender.com"
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

ALLOWED_HOSTS = ["*"]

DEBUG = False