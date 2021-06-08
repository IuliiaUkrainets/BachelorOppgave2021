import numpy as np
import cv2
import pydicom as dicom
#import pylab as pl
from PIL.Image import fromarray
from PIL import Image
import pylibjpeg
#import scipy.signal as scs
#import sys
#import matplotlib.path as mplPath
#import scipy.misc
import random
import string
import os
import base64

def get_random_string(): # generer rando numerisk simbol
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(12))
    return result_str


def get_compression_image(name): # fungerer som en iterasjon (test)
    d = dicom.dcmread(name)
    f = open('text.txt', 'a')

    f.write(str(d))

    ds = dicom.dcmread(name)
    pixel = ds.pixel_array
    pixel[pixel < 300] = 0
    pixel = (pixel / ds[('0028', '0107')].value)
    pixel[pixel > 1.0] = 1
    pixel = pixel * 255

    path = './image/' + get_random_string() + '.jpg'
    cv2.imwrite(path, np.uint8(wavelet(pixel)[0]))

    return path


def get_original_image(name): # funksjon konverterer til jpg, negative bilder

    ds = dicom.dcmread(name)
    pixel = ds.pixel_array
    pixel[pixel < 300] = 0
    pixel = (pixel / ds[('0028', '0107')].value)
    pixel[pixel > 1.0] = 1
    pixel = pixel * 255
    c = cv2.bitwise_not(np.uint8(pixel))
    cv2.imshow('test', c)
    name = get_random_string() + '.jpg'
    path = './image/' + name
    cv2.imwrite(path, c)

    return name


def get_image(name): # function leverer piksel bilder
    d = dicom.dcmread(name)

    ds = dicom.dcmread(name)
    pixel = ds.pixel_array
    pixel[pixel < 300] = 0
    pixel = (pixel / ds[('0028', '0107')].value)
    pixel[pixel > 1.0] = 1
    pixel = pixel * 255

    return pixel

def get_image_jpg(name): # leverer bilder i jpg
    ds = dicom.dcmread('./image/'+ name+'.dcm')
    pixel = ds.pixel_array
    pixel[pixel < 300] = 0
    pixel = (pixel / ds[('0028', '0107')].value)
    pixel[pixel > 1.0] = 1
    pixel = pixel * 255
    name_original = name + '.jpg'
    path = './image/'+ name_original
    cv2.imwrite(path, np.uint8(wavelet(pixel)[0]))
    return name_original
    # return 'data:image/jpg;base64,' + b64_string

def get_wavelet(name): # funk. leverer wavelet
    d = dicom.dcmread(name)
    f = open('test.txt', 'a')

    f.write(str(d))

    ds = dicom.dcmread(name)
    pixel = ds.pixel_array
    pixel[pixel < 300] = 0
    pixel = (pixel / ds[('0028', '0107')].value)
    pixel[pixel > 1.0] = 1
    pixel = pixel * 255

    return wavelet(pixel)

def get_wavelet2(name): # to iterasjon
    d = dicom.dcmread(name)
    f = open('test.txt', 'a')

    f.write(str(d))

    ds = dicom.dcmread(name)
    pixel = ds.pixel_array
    pixel[pixel < 300] = 0
    pixel = (pixel / ds[('0028', '0107')].value)
    pixel[pixel > 1.0] = 1
    pixel = pixel * 255
    arr = wavelet(pixel)
    temp = []
    temp.append(wavelet(arr[0]))
    temp.append(arr[1])
    temp.append(arr[2])
    temp.append(arr[3])

    return temp

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
# t = ycbcr(image)

# print(t[0])


# arr = np.array([[13,12,16,15], [15,14,11,19],[12,13,18,15], [11,14,17,16]])


def wavelet(arr): # spalting
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
    return WLL, WLH, WHL, WHH # returnere 4 matriser


def waveletR(WLL, WLH, WHL, WHH):  # dekomprimering
    WL = []
    for i in range(len(WLL)):
        temp = []
        temp1 = []
        for j in range(len(WLL[0])):
            temp.append(WLL[i][j] + WLH[i][j])
        for j in range(len(WLL[0])):
            temp1.append(WLL[i][j] - WLH[i][j])
        WL.append(temp)
        WL.append(temp1)

    WH = []

    for i in range(len(WHL)):
        temp = []
        temp1 = []
        for j in range(len(WHL[0])):
            temp.append(WHL[i][j] + WHH[i][j])

        for j in range(len(WHL[0])):
            temp1.append(WHL[i][j] - WHH[i][j])
        WH.append(temp)
        WH.append(temp1)

    W = []  # resultat  en matrise som samles av grov versjon og  gorisontal, vertikal og diagonal avviker
    for i in range(len(WH)):
        temp = []
        for j in range(len(WH[0])):
            temp.append(WL[i][j] + WH[i][j])
            temp.append(WL[i][j] - WH[i][j])

        W.append(temp)

    return np.uint8(W)


def waveletT(image, count, matrix=[]): # øker iterasjon
    p = wavelet(image)
    if count > 0:
        count -= 1
        matrix.append(p[3])
        matrix.append(p[2])
        matrix.append(p[1])
        return waveletT(np.uint8(p[0]), count, matrix)
    else:
        matrix.append(p[3])
        matrix.append(p[2])
        matrix.append(p[1])
        matrix.append(p[0])

    return matrix

#
# def concate(matrix): # samling iterasjon i en stor matrise for å visiolisere bildet
#     global t
#     a = matrix.pop()
#     b = matrix.pop()
#     c = matrix.pop()
#     d = matrix.pop()
#
#     t1 = np.concatenate([np.uint8(a), np.uint8(b)], axis=1)
#     t2 = np.concatenate([np.uint8(c), np.uint8(d)], axis=1)
#     t3 = np.concatenate([t1, t2], axis=0)
#     t = np.uint8(t3)
#     if np.array(matrix).shape[0] > 0:
#         matrix.append(t3)
#         concate(matrix)


# def RunLength(r): #
#     count = 0
#     p = []
#     for i in range(r.shape[0]):
#         for j in range(r.shape[0]):
#             if r[i][j] != 0:
#                 p.append((count, r[i][j]))
#             else:
#                 count += 1
#     return np.array(p)

#
# get_original_image('0004.dcm')
# name = '0450'
# t = get_wavelet('../image/'+name+'.dcm')
# cv2.imwrite('../image/'+name+'.jpg', waveletR(*t))

# concate(waveletT(image, 5))

# print(RunLength(np.array(t)))
# print(m[0])
# p = wavelet(np.uint8(t[0]))
# t1 = np.concatenate([np.uint8(p[0]), np.uint8(p[1])], axis = 1)
# t2 = np.concatenate([np.uint8(p[2]), np.uint8(p[3])], axis = 1)
# t3 = np.concatenate([t1, t2], axis = 0)
# p1 = np.concatenate([t3, np.uint8(t[1])], axis = 1)
# p2 = np.concatenate([np.uint8(t[1]), np.uint8(t[2])], axis = 1)
# p3 = np.concatenate([p1, p2], axis = 0)

# r = np.uint8(p3)


# print(len(p))


# # cv2.imwrite('t.jpg', p3)

# cv2.waitKey()

# cv2.imwrite('../image/c.jpg', np.uint8(t[0]))
#
# img = waveletR(*t)
#
# cv2.imwrite('../image/d.jpg', img)


# cv2.imwrite('SavedFiles/wavelet.jpg', np.int16(t[0])) # lagre bilde på server
# print(img)
# print(gray.shape,img.shape)
#
#
# t = pl.imshow(gray, cmap='gray' )
#
# t = wavelet(np.int16(t[0]))
# t = wavelet(np.int16(t[0]))
# t = wavelet(np.int16(t[0]))

# pl.imshow(gray, cmap='gray') # original, for å få dekomprimerte bilde endrer jeg til img i steden for gray
# img = np.int16(t[0])
# img = img[20:145, 20:145]
# i = cv2.imread('../image/'+name+'.jpg', 0)
# cv2.imshow('c', i)
# wav = cv2.calcHist([i],[0],None,[256],[0,256]) # regne  entropi gistagram
# j = cv2.imread('../image/d.jpg', 0)
# cv2.imshow('c', j)
# original = cv2.calcHist([j],[0],None,[256],[0,256])
# #c = pl.imshow(cv2.bitwise_not(j), cmap='gray') #negativ transformation
# pl.plot(wav, color='red', label='wavelet') # tegne plot
# pl.plot(original, color='blue', label='original')
# pl.legend()
# pl.show()

# beregner feil
#sum=0
#for m in range(i.shape[0]):
#     for n in range(i.shape[1]):
#         sum+= abs(np.int64(i[m][n]) - np.int64(j[m][n]))
#
# print(sum/(i.shape[0]*i.shape[1]))


# SLE standartavvik
# print(np.mean(i**2-j**2)) 


# koefisient komprimering
# c = os.stat('../image/c.jpg').st_size
# o = os.stat('../image/d.jpg').st_size
# print(o/c) 
# cv2.waitKey()



