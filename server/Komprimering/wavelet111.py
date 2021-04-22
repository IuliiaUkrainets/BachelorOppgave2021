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
import random
import string
import os
def get_random_string():
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(12))
    return result_str


def get_compression_image(name):

    d = dicom.dcmread(name)
    f = open(get_random_string() + '.txt', 'w')

    print(str(d))
    f.write(str(d))

    gray = d.pixel_array
    gray[gray < 300] = 0
    gray = (gray/3377)
    gray[gray > 1.0] = 1

    gray = gray * 255
    cv2.imshow('ttttt1', np.uint8(gray))
    path = 'SavedFiles/' + get_random_string() + '.jpg'
    cv2.imwrite(path, np.uint8(wavelet(gray)[0]))

    return path

def get_original_image(name):

    d = dicom.dcmread(name)
    f = open('test1.txt', 'a')

    f.write(str(d))

    gray = d.pixel_array
    gray[gray < 300] = 0
    gray = (gray/3377)
    gray[gray > 1.0] = 1

    gray = gray * 255
    path = 'SavedFiles/' + get_random_string() + '.jpg'
    cv2.imwrite(path, np.uint8(gray))

    return path

def get_wavelet(name):

    d = dicom.dcmread(name)
    f = open('test1.txt', 'a')

    f.write(str(d))

    gray = d.pixel_array
    gray[gray < 300] = 0
    gray = (gray/3377)
    gray[gray > 1.0] = 1

    gray = gray * 255


    return wavelet(gray)

# Array = np.zeros((int(d.Rows), int(d.Columns)), dtype=d.pixel_array.dtype)
# cv2.imwrite("SavedFiles/original.jpg", d.pixel_array)
# print(Array.shape)
#
# Array[:,:] = d.pixel_array / 128
#
# Array[Array > 256] = 0
#
# Array = Array * 128
#
#
# gray = Array



# image = cv2.imread('0004.jpg')
# gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)#
# print(np.max(gray))
#t = ycbcr(image)

# print(t[0])


# arr = np.array([[13,12,16,15], [15,14,11,19],[12,13,18,15], [11,14,17,16]])



def wavelet(arr):
    WL = []
    WH = []
    arr = np.int16(arr)

    for i in range(arr.shape[0]):
        temp = []
        for j in range(0, arr.shape[1], 2):
            temp.append((arr[i][j] + arr[i][j + 1]) / 2.)
        WL.append(temp)


    for i in range(arr.shape[0]):
        temp = []
        for j in range(0, arr.shape[1], 2):
            temp.append((arr[i][j] - arr[i][j + 1]) / 2.)
        WH.append(temp)

    WLL = []
    WLH = []

    for i in range(0, len(WL), 2):
        temp = []
        for j in range(len(WL[0])):
            temp.append((WL[i][j] + WL[i + 1][j]) / 2.)
        WLL.append(temp)
    # print(len(WLL))

    for i in range(0, len(WL), 2):
        temp = []
        for j in range(len(WL[0])):
            temp.append((WL[i][j] - WL[i + 1][j]) / 2.)
        WLH.append(temp)

    WHL = []
    WHH = []

    for i in range(0, len(WH), 2):
        temp = []
        for j in range(len(WH[0])):
            temp.append((WH[i][j] + WH[i + 1][j]) / 2.)
        WHL.append(temp)

    for i in range(0, len(WH), 2):
        temp = []
        for j in range(len(WH[0])):
            temp.append((WH[i][j] - WH[i + 1][j]) / 2.)
        WHH.append(temp)
    return WLL, WLH, WHL, WHH

# function dekomprimering(WLL, WLH, WHL, WHH){
#     let WL = [];
#     for(let i=0; i<WLL[0].length; i++){
#     let temp = [];
#     let temp1 = [];
#     for(let j=0; j<WLL.length; j++){
#        temp.push(WLL[i][j] + WLH[i][j]);
#         temp1.push(WLL[i][j] - WLH[i][j]);
#     }
#     WL.push(temp);
#     WL.push(temp1);
# }
#
# let WH = [];
#     for(let i=0; i<WHL[0].length; i++){
#     let temp = [];
#     let temp1 = [];
#     for(let j=0; j<WHL.length; j++){
#        temp.push(WHL[i][j] + WHH[i][j]);
#         temp1.push(WHL[i][j] - WHH[i][j]);
#     }
#     WH.push(temp);
#     WH.push(temp1);
# }
#
# let W = [];
#     for(let i=0; i<WH[0].length; i++){
#     let temp = [];
#     let temp1 = [];
#     for(let j=0; j<WH.length; j++){
#        temp.push(WL[i][j] + WH[i][j]);
#         temp1.push(WL[i][j] - WH[i][j]);
#     }
#     W.push(temp);
#     W.push(temp1);
# }
#     return W;
# }

def waveletR(WLL, WLH, WHL, WHH): # dekomprimering
    WL = []
    for i in range(len(WLL[0])):
        temp = []
        temp1 = []
        for j in range(len(WLL)):
            temp.append(WLL[i][j] + WLH[i][j])
        for j in range(len(WLL)):
            temp1.append(WLL[i][j] - WLH[i][j])
        WL.append(temp)
        WL.append(temp1)

    WH = []

    for i in range(len(WHL[0])):
        temp = []
        temp1 = []
        for j in range(len(WHL)):
            temp.append(WHL[i][j] + WHH[i][j])

        for j in range(len(WHL)):
            temp1.append(WHL[i][j] - WHH[i][j])
        WH.append(temp)
        WH.append(temp1)

    W = [] # resultat matrise
    for i in range(len(WH)):
        temp = []
        for j in range(len(WH[0])):
            temp.append(WL[i][j] + WH[i][j])
            temp.append(WL[i][j] - WH[i][j])

        W.append(temp)


    return W

#
#get_compression_image('0135.dcm')
t1 = get_wavelet('0004.dcm')
#cv2.imwrite('SavedFiles/c.jpg', np.uint8(t[0]))

#img = waveletR(*t)

#cv2.imwrite('SavedFiles/d.jpg', img)


#cv2.imwrite('SavedFiles/wavelet.jpg', np.int16(t[0])) # lagre bilde på server
#print(img)
# print(gray.shape,img.shape)
#
#
# t = pl.imshow(gray, cmap='gray' )
#
t2 = wavelet(np.uint8(t1[0]))
cv2.imwrite('t2.jpg',  np.uint8(t2[0]))

t3 = wavelet(np.uint8(t2[0]))
cv2.imwrite('t3.jpg',  np.uint8(t3[0]))

t4 = wavelet(np.uint8(t3[0]))
cv2.imwrite('t4.jpg',  np.uint8(t4[0]))

t5 = wavelet(np.uint8(t4[0]))
cv2.imwrite('t5.jpg',  np.uint8(t5[0]))

t6 = wavelet(np.uint8(t5[0]))
cv2.imwrite('t6.jpg',  np.uint8(t6[0]))

t7 = wavelet(np.uint8(t6[0]))
cv2.imwrite('t7.jpg',  np.uint8(t7[0]))
#
t8 = wavelet(np.uint8(t7[0]))
cv2.imwrite('t8.jpg',  np.uint8(t8[0]))



r = waveletR(*t1)

#r1 = waveletR(r, t7[1],t7[2],t7[3] )

#r2 = waveletR(r1, t6[1],t6[2],t6[3])
#r3 = waveletR(r2, t5[1],t5[2],t5[3])
#r4 = waveletR(r3, t4[1],t4[2],t4[3])
#r5 = waveletR(r4, t3[1],t3[2],t3[3])
#r6 = waveletR(r5, t2[1],t2[2],t2[3])
#r7 = waveletR(r6, t1[1],t1[2],t1[3])


#cv2.imwrite("SavedFiles/c8.jpg", np.float32(r7))






cv2.imwrite('SavedFiles/c1.jpg', np.float32(r))
# pl.imshow(gray, cmap='gray') # original, for å få dekomprimerte bilde endrer jeg til img i steden for gray
#img = np.int16(t[0])
#img = img[20:145, 20:145]

i = cv2.imread('SavedFiles/c8.jpg', 0)

#cv2.imshow('c', np.uint8(t[0]))
#pl.imshow(r7, cmap='gray')
#pl.show()

wav = cv2.calcHist([i],[0],None,[256],[0,256]) # regne  entropi gistagram
j = cv2.imread('SavedFiles/d.jpg', 0)
#cv2.imshow('c', j)
original = cv2.calcHist([j],[0],None,[256],[0,256])
c = cv2.bitwise_not(j)
cv2.imwrite('SavedFiles/negative.jpg', c)

#pl.plot(wav, color='red', label='wavelet') # tegne plot
#pl.plot(original, color='blue', label='original')
#pl.legend()
#pl.show()


sum = 0

for m in range(i.shape[0]):
    for n in range(i.shape[1]):
        sum+= abs(np.int32(j[m][n]) - np.int32(i[m][n]))

print(sum/(i.shape[0]*i.shape[1]))

c = os.stat('SavedFiles/c7.jpg').st_size
o = os.stat('SavedFiles/d.jpg').st_size
print(o/c) # koefisient komprimering
cv2.waitKey()