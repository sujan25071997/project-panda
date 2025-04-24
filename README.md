# 🐼 Project Panda

A full-stack eCommerce web app featuring panda-themed products — built with **Next.js + Redux** frontend and **Django REST API + JWT** backend. Supports Google login and profile management.

---

## 🧱 Tech Stack

### Frontend – [`panda-ui/`](./panda-ui)

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Google One Tap Login](https://developers.google.com/identity/one-tap/web)
- Tailwind CSS for styling

### Backend – [`panda_api/`](./panda_api)

- [Django 4+](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- JWT Authentication using `rest_framework_simplejwt`
- Custom `User` model

---

## 🚀 Getting Started

### Backend (Django)

#### 📦 Install dependencies

```bash
cd panda_api
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# ⚙️ Create .env
--------------------
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000

GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret
--------------------

# run command
python manage.py migrate
python manage.py runserver

### Frontend (Next.js)

cd panda-ui
npm install

# ⚙️ Create .env.local
--------------------
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_API_URL=http://localhost:8000/api
--------------------

# 🧪 Run dev server
npm run dev


$ Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
```
