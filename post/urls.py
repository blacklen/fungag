from django.conf.urls import url, include
from django.urls import path
from post import views

urlpatterns = [
    path('list-post/', views.List_Publish_Posts.as_view(), name='get-posts'), # list k can login
    path('list-post-user/', views.List_Posts_User.as_view(), name='get-posts-user'), # list cua user can login vao user do
    path('creat/',views.Create_Posts.as_view(), name='posts'), # login user nao thi author cua post 
    path('get-post-detail/<int:pk>/', views.Get_Deatail_Post.as_view(), name="get-detail-post"), # get detail
    path('post-detail/<int:pk>/', views.Update_Delete_Post.as_view(), name='post-detail'), # 
    path('like-post/', views.Users_Like.as_view(), name='post-detail'),
    
   
]