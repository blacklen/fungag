from django.conf.urls import url, include
from django.urls import path
from categorys import views

urlpatterns = [
    path('list/', views.List.as_view(), name='get-categorys'),
    path('create/', views.Create.as_view(), name='create-categorys'),
    # path('detail/<int:pk>/', views.Detail.as_view(), name='get-detail-categorys'),
    path('update-delete/<int:pk>/', views.Update_Delete.as_view(), name='update-delete-categorys'),

    
    
    
   
]