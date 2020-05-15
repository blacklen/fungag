from django.urls import path
from users import views

urlpatterns = [
    path('login/', views.UserLoginAPIView.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('create/', views.UserRegistrationAPIView.as_view(), name='create'),
]
