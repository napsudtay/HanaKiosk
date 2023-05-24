# อ่าน Text ธรรมดา
# from unittest import result
# import pytesseract
# from PIL import Image, ImageGrab

# img = Image.open('testcv/idcard.JPG')
# result = pytesseract.image_to_string(img, lang = 'tha+eng')
# print(result)



# https://packagegalaxy.com/python/thai-personal-card-extract
# https://pypi.org/project/thai-personal-card-extract/

from ThaiPersonalCardExtract import PersonalCard

reader = PersonalCard(lang="mix", tesseract_cmd="C:/Program Files/Tesseract-OCR/tesseract") # for windows need to pass tesseract_cmd parameter to setup your tesseract command path.
result = reader.extract_front_info('testcv/idcard.JPG')
print(result.NameTH)
