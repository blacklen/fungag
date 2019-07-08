"""ninegag URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from users.views import UserRegistrationAPIView, UserLoginAPIView, GetToken, Logout
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here

# Simple JWT TOKEN
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

# Django Rest Swagger cua drf-yasg
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
schema_view = get_schema_view(
   openapi.Info(
      title="Django API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', UserRegistrationAPIView.as_view(), name="register"),
    path('login/', UserLoginAPIView.as_view(), name="login"),
    path('logout/', Logout.as_view(), name='logout'),
    path('get-token/', GetToken.as_view()),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    path('post/', include('post.urls')),
    path('sections/', include('sections.urls')),
    # url Simple JWT TOKEN
    # url(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # url(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),

    # Django Rest Swagger cua drf-yasg
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]


# Theo cách này, Django sẽ chịu trách nhiệm phục vụ các tệp phương tiện trong quá trình phát triển (DEBUG = True).
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)