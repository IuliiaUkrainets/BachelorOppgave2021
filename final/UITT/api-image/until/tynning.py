import numpy as np
import pylibjpeg
import PIL
import sys
import matplotlib.pyplot as plt
#import pandas as pd
import os
import cv2
from pydicom import dcmread


from scipy.ndimage import maximum_filter, minimum_filter

ds = dcmread('../image/0450.dcm')
print(ds.pixel_array)
pixel = ds.pixel_array
pixel[pixel < 300] = 0
pixel = (pixel  / ds[('0028','0107')].value)
pixel[pixel > 1.0] = 1
pixel = pixel * 255
original = np.uint8(pixel)
cv2.imwrite('original.jpg', original)

# plt.imshow(pixel, cmap='gray')
# plt.show()
cv2.imshow('original', original)
#  påfyling array med null
for i in range(original.shape[0]):      #  todimensjonale array, tynning som regel:
    for j in range(original.shape[1]):
        if i % 2 != 0 and j % 2 == 0: # for odd
            original[i][j] = 0
        if i % 2 == 0 and j % 2 != 0: # for par
            original[i][j] = 0

cv2.imshow('zero', original)

# def l(arr):
#     return [j for j in arr if j != 0]

t = []
for i in range(original.shape[0]):
    temp = []
    for j in range(original.shape[1]):
        if i % 2 == 0 and j % 2 == 0: # for odd
            temp.append(original[i][j])
        if i % 2 != 0 and j % 2 != 0: # for par
            temp.append(original[i][j])
    t.append(temp)


t = np.uint8(t)
cv2.imwrite('del_zero.jpg', t)
cv2.imshow('compression', t)





result = np.zeros((512,512))
for i in range(result.shape[0]):       # restavreting med gjennomsnitt nabo med null
    for j in range(result.shape[1]):
        if  i % 2 != 0 and j % 2 != 0: #par str, ikke par colom
            result[i][j] = t[i][j//2]
        if i % 2 == 0 and j % 2 == 0 and (j+1)//2 != 256:# par srt, par colom
            result[i][j] = t[i][(j+1)//2]



for i in range(original.shape[0]):     # restavrering
    for j in range(original.shape[1]-1):
        if original[i][j] == 0:
            original[i][j] = original[i][j-1]/2 + original[i][j+1]/2

cv2.imshow('aproxymate', original)

def rolling_window(a, size):
    shape = a.shape[:-1] + (a.shape[-1] - size + 1, size)
    strides = a.strides + (a.strides[-1],)
    return np.lib.stride_tricks.as_strided(a, shape=shape, strides=strides)

# def window(arr, shape=(1, 2)):
#     # Find row and column window sizes
#     r_win = np.floor(shape[0] / 2).astype(int)
#     c_win = np.floor(shape[1] / 2).astype(int)
#     x, y = arr.shape
#     for i in range(x):
#         xmin = max(0, i - r_win)
#         xmax = min(x, i + r_win + 1)
#         for j in range(y):
#             ymin = max(0, j - c_win)
#             ymax = min(y, j + c_win + 1)
#             yield arr[xmin:xmax, ymin:ymax]

p = rolling_window(original, 2)

# print(p)

V = []

for i in range(p.shape[0]):
    temp = []
    for j in range(p.shape[1]):
        t = p[i-1][j] / 2 + p[i][j] / 2
        temp.append(t)
    V.append(temp)


V = np.uint8(V)


T = []

for i in range(V.shape[0]):
    temp = []
    for j in range(V.shape[1]):
        temp.append(V[i][j][0] / 2 + V[i][j][1] / 2)
    T.append(temp)


#
#
# open_kern = np.ones((3,3), dtype=np.uint8)
# t = cv2.morphologyEx(t, cv2.MORPH_OPEN, open_kern, iterations=2)


# for i in range(p.shape[0]):
#     for j in range(p.shape[1]):
#         V[i][j] = V[i][j][0] + V[i][j][1]

# print(np.uint8(V))
# d = np.uint8(original)
#d[d < 55] = 0
# cv2.imshow('result', d)
# cv2.imwrite('compression.jpg', d)





# plt.imshow(np.uint8(V), cmap='gray')
# plt.show()


# 
# t = cv2.imread('original.jpg', 0)
#d = cv2.imread("")


# beregning feil
# sum = 0
# for m in range(t.shape[0]):
#     for n in range(t.shape[1]):
#         sum+= abs(np.int64(t[m][n]) - np.int64(d[m][n]))
# print(sum/(t.shape[0]*t.shape[1]))
#

#beregning SLE
# print(np.mean((t-d)**2))

# komprimerings forhold Koefisient 
# o = os.stat('original.jpg').st_size
# c = os.stat('del_zero.jpg').st_size
# print(o/c)


#cv2.waitKey() # metod for a luke bilde ved a trikke noen knapen