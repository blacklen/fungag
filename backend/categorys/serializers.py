from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.exceptions import ParseError
from .models import Categorys
from post.models import Post
from post.serializers import PostSerializers


class CategorysSerializers(serializers.ModelSerializer):
    category = PostSerializers(many=True, read_only=True)

    class Meta:
        model = Categorys
        fields = ('id', 'name', 'title', 'logo', 'created_at', 'updated_at', 'category')
