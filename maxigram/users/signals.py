from allauth.account.signals import user_signed_up
from django.contrib.auth.signals import user_logged_in
from django.core.signals import request_started,request_finished
from django.dispatch import receiver
from io import BytesIO
from urllib.request import urlopen
from django.core.files import File

@receiver(request_started) #fine
def my_callback_rs(sender, **kwargs):
    print("Request started!")

@receiver(request_finished) #fine
def my_callback_rf(sender, **kwargs):
    print("Request finished!")

@receiver(user_logged_in) #fine
def user_logged_in(sender, user, request, **kwargs):
    print("Logged in OK!")

@receiver(user_signed_up) #fine(simple signed up)
def user_signed_up(request, user, **kwargs):
    print("user_signed_up")
    if len(user.socialaccount_set.all()) > 0:
        social_account = user.socialaccount_set.all()[0]
        uid = social_account.uid
        gender = social_account.extra_data.get('gender', None)
        user.gender = gender
        avatar = social_account.get_avatar_url()
        avatar_image = urlopen(avatar)
        io = BytesIO(avatar_image.read())
        user.profile_image.save('{}.jpg'.format(uid), File(io))
        user.name = user.get_full_name()
    user.save()
