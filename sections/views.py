from django.shortcuts import render
from .models import Sections
from django.contrib.auth.models import User
from .serializers import SectionsSerializers
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, GenericAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from apps.core.pagination import StandardResultsSetPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ParseError
from drf_yasg import openapi
from drf_yasg.app_settings import swagger_settings
from drf_yasg.inspectors import CoreAPICompatInspector, FieldInspector, NotHandled, SwaggerAutoSchema
from drf_yasg.utils import no_body, swagger_auto_schema
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

class List(ListAPIView):
    serializer_class = SectionsSerializers
    pagination_class = StandardResultsSetPagination
    permission_classes = (AllowAny,)

    def get(self, request):
        sections = Sections.objects.all().order_by('-name')
        paginate_queryset = self.paginate_queryset(sections)   
        serializer = self.serializer_class(paginate_queryset, many= True)
        paginate_data = self.get_paginated_response(serializer.data)
        data = {
            "error_code":0,
            "massage" : "success",
            "data" : paginate_data.data
        }
        return Response(data, status=status.HTTP_200_OK)

class Detail(APIView):
    serializer_class = SectionsSerializers
    permission_classes = (AllowAny,)

    def get_queryset(self, pk):
        try:
            section = Sections.objects.get(pk = pk)
        except ObjectDoesNotExist:
            section = None
        return section
    
    
    def get(self, request, pk):
        section = self.get_queryset(pk)

        if not section:
            raise ParseError({"error_code" : 400, "message" : "Not Found", "data":[]})
        else:
            serializer = SectionsSerializers(section)
            
            data = {
                "error_code" : 0,
                "message" : "get section success",
                "data" : serializer.data
            }
            return Response(data, status= status.HTTP_200_OK)

class Create(CreateAPIView):
    serializer_class = SectionsSerializers
    pagination_class = StandardResultsSetPagination
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, request):
        try:
            name = Sections.objects.get(name=request.data.get('name'))
        except ObjectDoesNotExist:
            name = None
        return name

    @swagger_auto_schema(
        operation_description="them moi section", 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['name','logo'],
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'logo': openapi.Schema(type=openapi.TYPE_FILE),
            },
        ),
        security=[],
        manual_parameters=[
            openapi.Parameter('name', openapi.IN_QUERY, "name", type=openapi.TYPE_STRING),
            openapi.Parameter('title', openapi.IN_QUERY, "title", type=openapi.TYPE_STRING),
            openapi.Parameter('logo', openapi.IN_QUERY, "logo", type=openapi.TYPE_FILE),
        ],
    )
    def post(self, request):
        name = self.get_queryset(request)
        if not name:
            if request.user and request.user.is_superuser == True:
                serializer = SectionsSerializers(data = request.data)
                if serializer.is_valid():
                    serializer.save()
                    data_all = {
                        "error_code" : 0,
                        "message" : "create sections success",
                        "data" : serializer.data
                    }
                    return Response(data_all, status=status.HTTP_201_CREATED)
            else:
                raise ParseError({"error_code" : '401_SUPERUSER', "message" : "UNAUTHORIZED",})
        else:
            raise ParseError({"error_code":"400_NAME_EXIST","message":"section da ton tai"})
       
class Update_Delete(GenericAPIView):
    serializer_class = SectionsSerializers
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, pk):
        try:
            section = Sections.objects.get(pk = pk)
        except section.DoesNotExist:
            raise ParseError({"error_code" : 400, "message" : "Not Found", "data":[]})
        return section

    @swagger_auto_schema(
        operation_description="chinh sua section", 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['id','name','logo'],
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'title': openapi.Schema(type=openapi.TYPE_STRING),
                'logo': openapi.Schema(type=openapi.TYPE_FILE),
            },
        ),
        security=[],
        manual_parameters=[
            openapi.Parameter('name', openapi.IN_QUERY, "name", type=openapi.TYPE_STRING),
            openapi.Parameter('title', openapi.IN_QUERY, "title", type=openapi.TYPE_STRING),
            openapi.Parameter('logo', openapi.IN_QUERY, "logo", type=openapi.TYPE_FILE),
        ],
    )
    def put(self, request, pk):
        section = self.get_queryset(pk)
        if request.user and request.user.is_superuser == True:
            try:
                name = Sections.objects.get(name=request.data.get('name'))
            except ObjectDoesNotExist:
                name = None
            
            if not name: 
                serializer = SectionsSerializers(section, data=request.data)

                if serializer.is_valid():
                    serializer.save()
                    data_all = {
                        "error_code" : 0,
                        "message" : "update section success",
                        "data" : serializer.data

                    }
                    return Response(data_all, status=status.HTTP_201_CREATED)
            else:
                raise ParseError({"error_code":"400_NAME_EXIST","message":"section da ton tai"})
        else:
            raise ParseError({"error_code" : '401_SUPERUSER', "message" : "UNAUTHORIZED",})
    
    def delete(self, request, pk):
        section = self.get_queryset(pk)
        
        if request.user and request.user.is_superuser == True:

            section.delete()
            data = {
                "error_code": 0,
                "message" : "delete success",
                "data" : []
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)
        else:
            raise ParseError({"error_code" : 401, "message" : "UNAUTHORIZED", "data":[]})