from django.db import models
from django.conf import settings
from django.utils.text import slugify
from categorys.models import Categorys


# Create your models here.

class Post(models.Model):
    slug = models.SlugField(max_length=150, blank=True, null=True)
    title = models.CharField(max_length=250, blank=True, null=True, )
    image = models.ImageField(upload_to='images/%Y/%m/%d', max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    users_like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='posts_liked', blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='author', on_delete=models.CASCADE)
    category = models.ForeignKey(Categorys, related_name="category", on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.title:
            stri = self.title[0:50]
            self.slug = slugify(stri)
        super(Post, self).save(*args, **kwargs)
