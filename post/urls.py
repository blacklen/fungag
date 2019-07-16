from django.conf.urls import url, include
from django.urls import path
from post import views

urlpatterns = [
    path('get/', views.List_Publish_Posts.as_view(), name='get-posts'), 
    path('category/get/<int:pk>/', views.List_Posts_Category.as_view(), name='get-posts-category'),
    # path('list-post-user/', views.List_Posts_User.as_view(), name='get-posts-user'),
    path('post/',views.Create_Posts.as_view(), name='posts'),  
    path('get/<int:pk>/', views.Get_Deatail_Post.as_view(), name="get-detail-post"), 
    path('update-delete/<int:pk>/', views.Update_Delete_Post.as_view(), name='post-detail'), 
    path('like/post/', views.Users_Like.as_view(), name='post-detail'),
    
   
]