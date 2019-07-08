from django.db import models
from django.conf import settings
from django.utils.text import slugify
# Create your models here.

class Sections(models.Model):
    name = models.CharField(max_length=100, unique= True)
    title = models.CharField(max_length=100, blank= True, null=True)
    slug = models.CharField(max_length=100, blank= True, null=True)
    logo = models.ImageField(upload_to='images/sections/logo', max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-name',)
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.name:
            self.slug = slugify(self.name)
        super(Sections, self).save( *args, **kwargs)