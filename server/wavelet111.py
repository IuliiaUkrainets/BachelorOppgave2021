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


d = dicom.read_file('0012.dcm')
f = open('test.txt', 'a')

f.write(str(d))

Array = np.zeros((int(d.Rows), int(d.Columns)), dtype=d.pixel_array.dtype)

print(Array.shape)

Array[:,:] = d.pixel_array / 128

Array[Array > 256] = 0

Array = Array * 128


gray = Array


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
    # print(arr[45])

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


def waveletR(WLL, WLH, WHL, WHH):
    # print(WLL[45],WLH[45],WHL[45],WHH[45])
    # WLR = []
    # for i in range(len(WLL)):
    #     for j in range(len(WLL[0])):
    #         WLR.append(WLL[i][j] + WLH[i][j])
    # WLR = np.array(WLR).reshape(len(WLL[0]),len(WLL[0]))

    # WL = []
    # for i in range(len(WLL)):
    #     for j in range(len(WLL[0])):
    #         WL.append(WLL[i][j] - WLH[i][j])
    # WL = np.array(WL).reshape(len(WLL[0]),len(WLL[0]))

    # WL = np.concatenate((WLR,WL), axis=0)

    # WHR = []
    # for i in range(len(WHL)):
    #     for j in range(len(WHL[0])):
    #         WHR.append(WHL[i][j] + WHH[i][j])
    # WHR = np.array(WHR).reshape(len(WHL[0]),len(WHL[0]))

    # WH = []
    # for i in range(len(WHL)):
    #     for j in range(len(WHL[0])):
    #         WH.append(WHL[i][j] - WHH[i][j])
    # WH = np.array(WH).reshape(len(WHL[0]),len(WHL[0]))

    # WH = np.concatenate((WHR,WH), axis=0)
    # print(WL[45])
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
        # a = np.array(WLL) + np.array(WLH)
    # b = np.array(WLL) - np.array(WLH)
    # WL = np.concatenate((a,b), axis=0)
    # a = np.array(WHL) + np.array(WHH)
    # b = np.array(WHL) - np.array(WHH)
    # WH = np.concatenate((a,b), axis=0)


    W = []
    for i in range(len(WH)):
        temp = []
        for j in range(len(WH[0])):
            temp.append(WL[i][j] + WH[i][j])
            temp.append(WL[i][j] - WH[i][j])

        # temp.append(WL[j][i]+WH[j][i])
        # temp1.append(WL[j][i]-WH[j][i])

        W.append(temp)

    # a = np.array(WL) + np.array(WH)
    # b = np.array(WL) - np.array(WH)
    # W = np.concatenate((a,b), axis=1)

    # WW = []
    # for i in range(len(W[0])):
    #     temp=[]
    #     for j in range(len(W)):
    #         temp.append(W[j][i])

    #     WW.append(temp)

    # print(WW)
    # W = np.array(W).transpose()
    # W[[1, 2],:] = W[[2, 1],:]
    return np.int16(W)


t = wavelet(gray)

img = waveletR(*t)

# print(img)
# print(gray.shape,img.shape)


#t = pl.imshow(gray, cmap='gray' )

#t = wavelet(np.int16(t[0]))
#t = wavelet(np.int16(t[0]))
#t = wavelet(np.int16(t[0]))



c = pl.imshow(np.int16(t[0]), cmap='gray')

pl.show()

# # # print()
cv2.waitKey()