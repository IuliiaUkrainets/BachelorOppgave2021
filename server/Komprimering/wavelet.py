import numpy as np
import cv2
from skimage import exposure
import pydicom as dicom
import pylab as pl
from PIL.Image import fromarray
from PIL import Image
import pylibjpeg
import scipy.signal as scs
import sys
import matplotlib.path as mplPath
import scipy.misc




d = dicom.read_file('0004.dcm')

Array = np.zeros((int(d.Rows), int(d.Columns)), dtype=d.pixel_array.dtype)

Array[:,:] = d.pixel_array / 128

Array[Array > 256] = 0

Array = Array * 128


arr = Array


temp1 = []
temp2 = []

for i in range(arr.shape[0]):
    temp11 = []
    for j in range(0,arr.shape[1], 2):
        temp11.append((arr[i][j]+arr[i][j+1])/2)
    temp1.append(temp11)


for i in range(arr.shape[0]):
    temp22 = []
    for j in range(0,arr.shape[1], 2):
        temp22.append((arr[i][j]-arr[i][j+1])/2)
    temp2.append(temp22)


temp11 = []
temp22 = []

for i in range(0, len(temp1), 2):
    temp111 = []
    for j in range(len(temp1[0])):
        temp111.append((temp1[i][j]+temp1[i+1][j])/2)
    temp11.append(temp111)

for i in range(0, len(temp1), 2):
    temp222 = []
    for j in range(len(temp1[0])):
        temp222.append((temp1[i][j]-temp1[i+1][j])/2)
    temp22.append(temp222)



temp33 = []
temp44 = []

for i in range(0, len(temp2), 2):
    temp333 = []
    for j in range(len(temp2[0])):
        temp333.append((temp2[i][j]+temp2[i+1][j])/2)
    temp33.append(temp333)

for i in range(0, len(temp2), 2):
    temp444 = []
    for j in range(len(temp2[0])):
        temp444 .append((temp2[i][j]-temp2[i+1][j])/2)
    temp44.append(temp444)

print(len(temp33))
print(len(temp44))



pl.imshow(temp33, cmap='gray')
pl.imshow(temp44, cmap='gray')

pl.show()


#
# img = cv2.imread('0004.jpg')
# gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#
#
# gray = np.array(gray.gray_array) #  bruker bibliotek numpy for a oversette det til array med gray
#
# cv2.imwrite('file-out.jpeg', exposure.equalize_adapthist(gray))
#
# arrLeft = []
# arrRight = []
# for i in range(gray.shape[0]):
#     leftTemp = []
#     rightTemp = []
#     for j in range(gray.shape[1]-1):
#         leftTemp.append((gray[i][j] - gray[i][j+1])/ 2.0)
#         rightTemp.append((gray[i][j] + gray[i][j+1])/ 2.0)
#     arrLeft.append(leftTemp)
#     arrRight.append(rightTemp)
#
# cv2.imshow('r', arrRight)
# cv2.imshow('l', arrLeft)
#
cv2.waitKey(0)