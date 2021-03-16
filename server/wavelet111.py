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

def get_random_string():
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(12))
    return result_str


def get_compression_image(name):

    d = dicom.read_file(name)
    f = open('test.txt', 'a')

    f.write(str(d))

    gray = d.pixel_array
    gray[gray < 300] = 0
    gray = (gray/1024)
    gray[gray > 1.0] = 1

    gray = gray * 255
    path = 'SavedFiles/' + get_random_string() + '.jpg'
    cv2.imwrite(path, np.uint8(wavelet(gray)[0]))

    return path

def get_original_image(name):

    d = dicom.read_file(name)
    f = open('test.txt', 'a')

    f.write(str(d))

    gray = d.pixel_array
    gray[gray < 300] = 0
    gray = (gray/1024)
    gray[gray > 1.0] = 1

    gray = gray * 255
    path = 'SavedFiles/' + get_random_string() + '.jpg'
    cv2.imwrite(path, np.uint8(gray))

    return path

def get_wavelet(name):

    d = dicom.read_file(name)
    f = open('test.txt', 'a')

    f.write(str(d))

    gray = d.pixel_array
    gray[gray < 300] = 0
    gray = (gray/1024)
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



#image = cv2.imread('0004.jpg')
#gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)#
#print(np.max(gray))
# t = ycbcr(image)

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


    return np.int8(W)


# t = wavelet(gray)
#
# img = waveletR(*t)
# cv2.imwrite('SavedFiles/wavelet.jpg', np.int16(t[0])) # lagre bilde på server
# print(img)
# print(gray.shape,img.shape)


# t = pl.imshow(gray, cmap='gray' )

# t = wavelet(np.int16(t[1]))
# t = wavelet(np.int16(t[0]))
#t = wavelet(np.int16(t[0]))

# pl.imshow(gray, cmap='gray') # original, for å få dekomprimerte bilde endrer jeg til img i steden for gray
# img = np.int16(t[0])
# img = img[20:145, 20:145]
# i = cv2.imread('SavedFiles/wavelet.jpg', 0)
# wav = cv2.calcHist([i],[0],None,[256],[0,256]) # regne  entropi gistagram
# j = cv2.imread('SavedFiles/original.jpg', 0)
# original = cv2.calcHist([j],[0],None,[256],[0,256])
# c = pl.imshow(cv2.bitwise_not(j), cmap='gray') #negativ transformation
# pl.plot(wav, color='red', label='wavelet') # tegne plot
# pl.plot(original, color='blue', label='original')
# pl.legend()
# pl.show()


# cv2.waitKey()