# Setup Guide

## Prerequisites

Make sure you have the following installed:

- Python 3.x
- pip (Python's package installer)

## Installation

### Clone the repository

git clone
cd panda-api

python -m venv venv

# For Windows:

.\venv\Scripts\activate

# For Mac/Linux:

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
