FROM python:3.11-slim

WORKDIR /app

COPY ./requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

CMD ["gunicorn", "panda_api.wsgi:application", "--bind", "0.0.0.0:8000"]