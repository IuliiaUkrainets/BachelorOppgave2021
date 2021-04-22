import numpy as np
import cv2
from skimage import exposure
import pydicom as dicom
import pylab as pl
import PIL
import pylibjpeg
import collections
import sys
import matplotlib.path as mplPath

def count(s):
    dict = collections.OrderedDict.fromkeys(s, 0)
    for ch in s:
        dict[ch] += 1

    strs = ''

    for key, value in dict.items():
        strs += key +' '+ str(value)

    print(strs)

img = dicom.read_file('0302.dcm')
i = img.pixel_array #  bruker bibliotek numpy for a oversette det til array med pixel

res = ''
for j in range(i.shape[0]):
    for k in range(i.shape[1]):
        res+=str(i[j][k])+' '
print(res)


count(res)