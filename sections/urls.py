from django.conf.urls import url, include
from django.urls import path
from sections import views

urlpatterns = [
    path('list/', views.List.as_view(), name='get-sections'),
    path('create/', views.Create.as_view(), name='create-sections'),
    path('detail/<int:pk>/', views.Detail.as_view(), name='get-detail-sections'),
    path('update-delete/<int:pk>/', views.Update_Delete.as_view(), name='update-delete-sections'),

    
    
    
   
]