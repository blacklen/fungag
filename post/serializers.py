from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User
from rest_framework.exceptions import ParseError
from sections.models import Sections

class PostSerializers(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.name')
    users_like = serializers.PrimaryKeyRelatedField(queryset= User.objects.all(), many=True)
    section = serializers.PrimaryKeyRelatedField(queryset=Sections.objects.all())
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'author', 'section' ,'users_like', 'created_at','updated_at')

    def validate(self, attrs):
        if not attrs.get('title') and not attrs.get('image'):
            raise ParseError({
                "error_code" : 4000,
                "message" : "Khong duoc de trong ca 2 truong image va title"

            })
        return attrs

class UserSerializers(serializers.ModelSerializer):
    # post = serializers.PrimaryKeyRelatedField(many= True, queryset=Post.objects.all())
    author =  PostSerializers(many=True, read_only=True)
    posts_liked = PostSerializers(many=True, read_only=True)
    class Meta:
        model = User
        fields =  ('id', 'username', 'author','posts_liked')