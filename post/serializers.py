from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User
from rest_framework.exceptions import ParseError
from categorys.models import Categorys

class PostSerializers(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.name')
    users_like = serializers.PrimaryKeyRelatedField(queryset= User.objects.all(), many=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Categorys.objects.all())
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'author', 'category' ,'users_like', 'created_at','updated_at')

    def validate(self, attrs):
        if not attrs.get('title'): raise ParseError({"error_code" : '400_EMPTYD',"message" : "Title khong duoc de trong"})
        if not attrs.get('image'): raise ParseError({"error_code" : '400_EMPTYD',"message" : "Image khong duoc de trong"})
        if not attrs.get('category'): raise ParseError({"error_code" : '400_EMPTYD',"message" : "Category khong duoc de trong"})
        
        return attrs

class UserSerializers(serializers.ModelSerializer):
    # post = serializers.PrimaryKeyRelatedField(many= True, queryset=Post.objects.all())
    author =  PostSerializers(many=True, read_only=True)
    posts_liked = PostSerializers(many=True, read_only=True)
    class Meta:
        model = User
        fields =  ('id', 'username', 'author','posts_liked')