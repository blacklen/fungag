- pip install -r  requirements.txt

- instal postgres

run docker
    - docker-compose -f docker-compose.yml up -d

edit your settings.py file to connect to the new database.

- python manage.py migrate

- python manage.py createsuperuser

- python manage.py runserver