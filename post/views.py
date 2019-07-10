from django.shortcuts import render
from .models import Post
from django.contrib.auth.models import User
from .serializers import PostSerializers, UserSerializers
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from apps.core.pagination import StandardResultsSetPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ParseError

from drf_yasg import openapi
from drf_yasg.app_settings import swagger_settings
from drf_yasg.inspectors import CoreAPICompatInspector, FieldInspector, NotHandled, SwaggerAutoSchema
from drf_yasg.utils import no_body, swagger_auto_schema
# Create your views here.

class Users_Like(APIView):
    serializer_class = PostSerializers
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, pk):
        try:
            post = Post.objects.get(pk = pk)
        except Post.DoesNotExist:
            raise ParseError({"error_code" : 400, "message" : "Not Found", "data":[]})
        return post

    @swagger_auto_schema(
        operation_description="unlike/like bai viet", 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['post_id','action'],
            properties={
                'post_id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'action': openapi.Schema(type=openapi.TYPE_STRING),
            },
        ),
        security=[],
    )
    def post(self, request):
        post_id = request.data.get('post_id')
        action = request.data.get('action')

        if post_id:
            post = self.get_queryset(post_id)
            if request.user:
                if action == "like" or int(action) == 1:
                    post.users_like.add(request.user)
                elif action == "unlike" or int(action) == 0:
                    post.users_like.remove(request.user)
            else:
                {"error_code" : 401, "message" : "Vui long dang nhap"}
        else:
            {"error_code" : 400, "message" : "Bai viet khong ton tai",}

        data = {
            "error_code":0,
            "massage" : "success",
        }
        return Response(data,status=status.HTTP_200_OK)

class List_Posts_Category(ListAPIView):
    serializer_class = PostSerializers
    permission_classes = (AllowAny,)
    pagination_class = StandardResultsSetPagination

    def get(self, request, pk):
        category_posts = Post.objects.filter(category= pk).order_by('-created_at')
        paginate_queryset = self.paginate_queryset(category_posts)
        serializer = self.serializer_class(paginate_queryset, many=True)

        paginate_data = self.get_paginated_response(serializer.data)
        data = {
            "error_code":0,
            "massage" : "success",
            "data" : paginate_data.data
        }

        return Response(data, status=status.HTTP_200_OK)
class List_Posts_User(ListAPIView):
    serializer_class = PostSerializers
    permission_classes = (IsAuthenticated,)
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        author_posts = Post.objects.filter(author=request.user).order_by('-created_at')
        paginate_queryset = self.paginate_queryset(author_posts)
        serializer = self.serializer_class(paginate_queryset, many=True)

        paginate_data = self.get_paginated_response(serializer.data)
        data = {
            "error_code":0,
            "massage" : "success",
            "data" : paginate_data.data
        }

        return Response(data, status=status.HTTP_200_OK)

class List_Publish_Posts(ListAPIView):
    serializer_class = PostSerializers
    pagination_class = StandardResultsSetPagination
    permission_classes = (AllowAny,)

    def get(self, request):
        posts = Post.objects.all().order_by('-created_at')
        paginate_queryset = self.paginate_queryset(posts)   
        serializer = self.serializer_class(paginate_queryset, many= True)
        paginate_data = self.get_paginated_response(serializer.data)
        data = {
            "error_code":0,
            "massage" : "success",
            "data" : paginate_data.data
        }
        return Response(data, status=status.HTTP_200_OK)

class Create_Posts(APIView):
    serializer_class = PostSerializers
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        posts = Post.objects.all()
        return posts

    @swagger_auto_schema(
        operation_description="them moi bai viet", 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['title','image','category'],
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'image': openapi.Schema(type=openapi.TYPE_FILE),
                'category': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
        security=[],
        manual_parameters=[
            openapi.Parameter('title', openapi.IN_QUERY, "test query title", type=openapi.TYPE_STRING),
            openapi.Parameter('image', openapi.IN_QUERY, "test query image", type=openapi.TYPE_FILE),
            openapi.Parameter('category', openapi.IN_QUERY, "test query category", type=openapi.TYPE_INTEGER),
        ],
    )
    def post(self, request):
        serializer = PostSerializers(data = request.data)

        if serializer.is_valid():
            serializer.save(author = request.user)
            data_all = {
                "error_code" : 0,
                "message" : "create post success",
                "data" : serializer.data

            }
            return Response(data_all, status=status.HTTP_201_CREATED)

class Update_Delete_Post(GenericAPIView):
    serializer_class = PostSerializers
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, pk):
        try:
            post = Post.objects.get(pk = pk)
        except Post.DoesNotExist:
            raise ParseError({"error_code" : 400, "message" : "Not Found", "data":[]})
        return post

    @swagger_auto_schema(
        operation_description="chinh sua bai viet", 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['title','image','category'],
            properties={
                'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'image': openapi.Schema(type=openapi.TYPE_FILE),
                'category': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
        security=[],
        manual_parameters=[
            openapi.Parameter('title', openapi.IN_QUERY, "test query title", type=openapi.TYPE_STRING),
            openapi.Parameter('image', openapi.IN_QUERY, "test query image", type=openapi.TYPE_FILE),
            openapi.Parameter('category', openapi.IN_QUERY, "test query category", type=openapi.TYPE_INTEGER),
        ],
    )
    def put(self, request, pk):
        post = self.get_queryset(pk)
        if request.user == post.author:
            serializer = PostSerializers(post, data=request.data)

            if serializer.is_valid():
                serializer.save()
                data_all = {
                    "error_code" : 0,
                    "message" : "update post success",
                    "data" : serializer.data

                }
                return Response(data_all, status=status.HTTP_201_CREATED)
        else:
            raise ParseError({"error_code" : 401, "message" : "UNAUTHORIZED", "data":[]})

    def delete(self, request, pk):
        post = self.get_queryset(pk)
        
        if request.user == post.author:

            post.delete()
            data = {
                "error_code": 0,
                "message" : "delete success",
                "data" : []
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)
        else:
            raise ParseError({"error_code" : 401, "message" : "UNAUTHORIZED", "data":[]})

class Get_Deatail_Post(APIView):
    serializer_class = PostSerializers
    permission_classes = (AllowAny,)

    def get_queryset(self, pk):
        try:
            post = Post.objects.get(pk = pk)
        except Post.DoesNotExist:
            raise ParseError({"error_code" : 400, "message" : "Not Found", "data":[]})
        return post
    
    def get(self, request, pk):
        post = self.get_queryset(pk)

        serializer = PostSerializers(post)
        
        data = {
            "error_code" : 0,
            "message" : "get post success",
            "data" : serializer.data
        }
        return Response(data, status= status.HTTP_200_OK)