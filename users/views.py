from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserRegistrationSerializer, UserLoginSerializer, TokenSerializer

from drf_yasg import openapi
from drf_yasg.app_settings import swagger_settings
from drf_yasg.inspectors import CoreAPICompatInspector, FieldInspector, NotHandled, SwaggerAutoSchema
from drf_yasg.utils import no_body, swagger_auto_schema
from rest_framework.exceptions import ParseError

class Logout(APIView):
    def get(self, request, fromat=None):
        request.user.auth_token.delete()
        data = {
            "error_code":0,
            "messages": "logout success",
        }
        return Response(data, status=status.HTTP_200_OK)
    
class UserRegistrationAPIView(CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = serializer.instance
      
        token, created = Token.objects.get_or_create(user=user)
        data = serializer.data
        data["auth_token"] = token.key

        headers = self.get_success_headers(serializer.data)

        data_all = {
            "error_code":0,
            "messages": "register success",
            "data": data
        }
        
        return Response(data_all, status=status.HTTP_201_CREATED, headers=headers)

class UserLoginAPIView(GenericAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        if not request.data.get('password') or not request.data.get('username'):
            raise ParseError({"error_code":"400_PASSWORD_USER","message":"username va password khong duoc de trong"})

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.user
            token, _ = Token.objects.get_or_create(user=user)

            data= TokenSerializer(token).data

            # data_user = {'username' : user.username,'email' : user.email}
            data_user = {'username' : user.username,}
            data_user.update(data)
            
            data_all = {
                "error_code":0,
                "messages": "login success",
                "data": data_user
            }
            return Response(
                data=data_all,
                status=status.HTTP_200_OK,
            )

class GetToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            # 'email': user.email
        })