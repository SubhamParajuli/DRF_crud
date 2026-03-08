#!/usr/bin/env bash
set -euo pipefail

# Ensure commands run from the backend directory regardless of caller cwd.
cd "$(dirname "$0")"

pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate

if [ "${CREATE_SUPERUSER:-false}" = "true" ]; then
python manage.py shell <<'PY'
import os
from django.contrib.auth import get_user_model

User = get_user_model()
username = os.getenv("DJANGO_SUPERUSER_USERNAME")
email = os.getenv("DJANGO_SUPERUSER_EMAIL")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

if username and email and password and not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
PY
fi