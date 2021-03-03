import numpy as np
import cv2
from skimage import exposure
import pydicom as dicom
import pylab as pl
import PIL
import pylibjpeg
import scipy.signal as scs
import sys
import matplotlib.path as mplPath


img = dicom.read_file('0004.dcm')
i = np.array(img.pixel_array) #  bruker bibliotek numpy for a oversette det til array med pixel


# print(i[0][0])

pixel = exposure.equalize_adapthist(i) # metod equalize_adapthist for forbedre kontrast i bilde og oversette taller til mindre tall fra 1 til 0


cv2.imshow('original', pixel)
#  påfyling array med null
for i in range(pixel.shape[0]):      #  todimensjonale array, tynning som regel:
    for j in range(pixel.shape[1]):
        if i % 2 != 0 and j % 2 == 0: # for odd
            pixel[i][j] = 0
        if i % 2 == 0 and j % 2 != 0: # for par
            pixel[i][j] = 0
cv2.imshow('rgba', pixel)   # visiolisering bilde med null



result = np.zeros((512,256))
for i in range(result.shape[0]):
    for j in range(result.shape[1]):
        if i % 2 != 0 and j % 2 != 0: # for odd
            result[i][j] = pixel[i][j//2]
        if i % 2 == 0 and j % 2 == 0: # for par
            result[i][j] = pixel[i][(j+1)//2]



#
#
cv2.imshow('rgb', result)


t = np.zeros((512,512))
for i in range(t.shape[0]):       # restavreting med gjennomsnitt nabo med null
    for j in range(t.shape[1]):
        if i % 2 != 0 and j % 2 != 0: #par str, ikke par colom
            t[i][j] = result[i][j//2]
        if i % 2 == 0 and j % 2 == 0 and (j+1)//2 != 256:# par srt, par colom
            t[i][j] = result[i][(j+1)//2]



for i in range(t.shape[0]-1):     # restavrering
    for j in range(t.shape[1]-1):
        if t[i][j] == 0:
            t[i][j] = t[i][j-1]/2 + t[i][j+1]/2




#for i in range(t.shape[0]-1):     # restavrering
 #   for j in range(t.shape[1]-1):
  #      t[i][j] = t[i-1][j]/2 + t[i][j]/2


#
#
# open_kern = np.ones((3,3), dtype=np.uint8)
# t = cv2.morphologyEx(t, cv2.MORPH_OPEN, open_kern, iterations=2)
print((np.square(pixel-t)**2).mean(axis=None)*100) # standard deviation coefficient
cv2.imshow('result', t)

cv2.waitKey() # metod for a luke bilde ved a trikke noen knapen
