from django.shortcuts import render

from prj.settings import DEBUG


def index(request):
    return render(request, 'index.html', context={'debug': DEBUG})
