import numpy as np
import pydicom as dicom
import PIL
import pylibjpeg
import sys
import matplotlib.pyplot as plt
import pandas as pd
import os
import cv2
from scipy.ndimage import maximum_filter, minimum_filter


ds = dicom.dcmread('0321.dcm')
pixel = ds.pixel_array
pixel[pixel < 300] = 0
pixel = (pixel / ds[('0028','0107')].value)
pixel[pixel > 1.0] = 1
pixel = pixel * 255
original = np.uint8(pixel)
cv2.imwrite('originalVIS2.jpg', original)

cv2.imshow('original', original)
cv2.waitKey()