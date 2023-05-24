# ลง dlib >>>> https://www.youtube.com/watch?v=AUJKdehF2ZA
# ไปที่ https://github.com/datamagic2020/Install-dlib แล้วโหลดลงมา ใช้คำสั่ง   pip install "[path ตัว dlib ของที่ตรงกับ version python เรา]"
# แล้วก็ลง pip install cmake (หรือต้องลงอันนี้ก่อนหว่า)
# ลง pip install face_recognition
# https://www.youtube.com/watch?v=sz25xxF_AVE
# https://github.com/ageitgey/face_recognition/blob/master/examples/facerec_from_webcam_faster.py
# ตัว open CV ให้ ลงเป็น opencv-python-headless สำหรับใช้บน heroku

import base64
from sre_constants import SUCCESS
from unittest import result
import cv2
import numpy as np
import face_recognition



def compareFace(picRaw , picCompare):
    picRaw = str.encode(picRaw)
    imageRaw_64_encode = picRaw.split(b',')
    imageRaw_64_decode = base64.decodebytes(imageRaw_64_encode[1])# แปลง Base64 เป็น numpy array
    imageRaw_arr = np.frombuffer(imageRaw_64_decode, dtype=np.uint8)
    imageRaw = cv2.imdecode(imageRaw_arr, flags=cv2.IMREAD_COLOR)

    try:
        # faceLocRaw = face_recognition.face_locations(imageRaw)[0]
        encodeRaw = face_recognition.face_encodings(imageRaw)[0]
        # cv2.rectangle(imageRaw, (faceLocRaw[3], faceLocRaw[0]),(faceLocRaw[1], faceLocRaw[2]), (255, 255, 0), 2)
    except:
        return False , 0



    picCompare = str.encode(picCompare)
    imageCompare_64_encode = picCompare.split(b',')
    imageCompare_64_decode = base64.decodebytes(imageCompare_64_encode[1])
    imageCompare_arr = np.frombuffer(imageCompare_64_decode, dtype=np.uint8)  # แปลง Base64 เป็น numpy array
    imageCompare = cv2.imdecode(imageCompare_arr, flags=cv2.IMREAD_COLOR)

    try:
        # faceLocCompare = face_recognition.face_locations(imageCompare)[0]
        encodeCompare = face_recognition.face_encodings(imageCompare)[0]
        # cv2.rectangle(imageCompare,(faceLocCompare[3],faceLocCompare[0]), (faceLocCompare[1],faceLocCompare[2]), (255,255,0), 2)
    except:
        return False , 0

    # cv2.imshow('Raw', imageRaw)
    # cv2.imshow('Compare', imageCompare)
    # cv2.waitKey(3000)



    results = face_recognition.compare_faces([encodeRaw],encodeCompare)
    faceDis = face_recognition.face_distance([encodeRaw],encodeCompare)
    faceDis = int((1-faceDis)*100)
    



    if faceDis >= 50:
        results = True
    else:
        results = False


    # print(results, str(faceDis) + " %")

    return results, faceDis


# compareFace(variable.image_64_encode)
