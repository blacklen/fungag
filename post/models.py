from django.db import models
from django.conf import settings
from django.utils.text import slugify
from sections.models import Sections

# Create your models here.

class Post(models.Model):
    slug = models.SlugField(max_length=150, blank= True, null=True)
    title = models.CharField(max_length=250, blank= True, null=True)
    image = models.ImageField(upload_to='images/%Y/%m/%d', max_length=254, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    users_like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='posts_liked', blank= True)
    author =  models.ForeignKey(settings.AUTH_USER_MODEL, related_name='author', on_delete=models.CASCADE)
    section = models.ForeignKey(Sections, related_name="section", on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.title:
            stri = self.title[0:50]
            self.slug = slugify(stri)
        super(Post, self).save( *args, **kwargs)