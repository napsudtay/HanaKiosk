from pickle import FALSE
from tokenize import single_quoted
from tracemalloc import stop
from turtle import pd
import requests
import json
import subprocess

import variable


from time import sleep, time

import clipboard  # pip install clipboard==0.0.4

import readIdCard
import faceCompare

# import variable
picIdCard = None


def fReadDataIdCard():
    readDataIdCard, readPictureIdCard = readIdCard.readCard()
    # print(readDataIdCard , readPictureIdCard)

    # อ่านการ์ดไม่ได้
    if readDataIdCard == False:
        # changeValueSystem = {
        #                         "method" : "changeValueSystem",
        #                         "header": "trigger_read_card",
        #                         "value": "false"
        #                     }
        # print( postData(changeValueSystem) )
        # print(sendError("Error#1#not found a card"))
        return False

    else:
        THFULLNAME = readDataIdCard[1].replace("##", "#")
        ENFULLNAME = readDataIdCard[2].replace("##", "#")
        BIRTH = readDataIdCard[3][-2:] + "#" + readDataIdCard[3][4:6] + \
            "#" + str(int(readDataIdCard[3][:4])-543)
        ISSUER = readDataIdCard[5]
        ISSUE = readDataIdCard[6][-2:] + "#" + readDataIdCard[7][4:6] + \
            "#" + str(int(readDataIdCard[7][:4])-543)
        EXPIRE = readDataIdCard[7][-2:] + "#" + readDataIdCard[6][4:6] + \
            "#" + str(int(readDataIdCard[6][:4])-543)
        ADDRESS = readDataIdCard[8].replace("####", "#")

        data_idCard = {
            'CID': readDataIdCard[0],
            'THFULLNAME': THFULLNAME,
            'ENFULLNAME': ENFULLNAME,
            'BIRTH': BIRTH,
            'GENDER': readDataIdCard[4],
            'ISSUER': ISSUER,
            'ISSUE': ISSUE,
            'EXPIRE': EXPIRE,
            'ADDRESS': ADDRESS,
            'picRaw': "data:image/jpeg;base64," + readPictureIdCard
        }

        return data_idCard

        # print(THFULLNAME , ENFULLNAME , BIRTH , ISSUER , ISSUE , EXPIRE , ADDRESS)
        # print(data_idCard)


def postData(dataPust):
    url = variable.urlAPI
    myobj = dataPust

    x = requests.post(url, json=myobj)
    # print(x.text)
    return x.text


def getIdCusFromStatus(header, cStatus, tragetHeader):
    val = {
        "method": "getValuefromOtherHeder",
        "header": header,
        "keyWord": cStatus,
        "tragetHeader": tragetHeader
    }
    pData = postData(val)
    pData = json.loads(pData)[0]["data"]["value"]

    return (pData)


def checkingStartSystem():
    checkSystem = {"method": "getCheckSystem"}
    pData = postData(checkSystem)
    pData = json.loads(pData)[0]["data"][0]
    return pData["trigger_read_card"], pData["trigger_compare_face"]


def sendError(errorData):
    errorDataSend = {"method": "sendError",  "topic": errorData}
    print(postData(errorDataSend))


def fCompareFace(picIdCard, picWebCam):
    print("in fCompareFace")
    
    if len(picIdCard) < 3000 and len(picWebCam) < 5000:
        print("Error#5#ไม่พบรูปบัตรประชาชน และไม่พบรูปจาก WebCam")
        sendError("Error#5#ไม่พบรูปบัตรประชาชน และไม่พบรูปจาก WebCam")
        return False, -1
    elif len(picIdCard) < 3000:
        print("Error#3#ไม่พบรูปบัตรประชาชน")
        sendError("Error#3#ไม่พบรูปบัตรประชาชน")
        return False, -1
    elif len(picWebCam) < 3000:
        print("Error#4#ไม่พบรูปจาก WebCam")
        sendError("Error#4#ไม่พบรูปจาก WebCam")
        return False, -1
    else:
        result, faceDis = faceCompare.compareFace(picIdCard, picWebCam)
        return result, faceDis


def readClipboard():
    textRead = clipboard.paste()  # text will have the content of clipboard
    # print("......... What in clipboard = ", textRead, end="\r")
    try:
        textParse = json.loads(textRead)
        # print(">>> " , textParse)
        return textParse
    except:
        return json.loads(json.dumps({'method': 'no'}))


def wirteClipboard(textWrite):
    clipboard.copy(json.dumps(textWrite))

checkSound = False
def mainLoop():
    global picIdCard,checkSound
    readClipboardValue = readClipboard()
    # print(readClipboardValue)
    # print(readClipboardValue['method'])

    match readClipboardValue['method']:

        case "no":
            print("......... can not parse json", end="\r")

        case "readCard":
        # {"method": "readCard","id_customer": "1"}

            # print("case readCard")

            # เช็คว่า Row ไหนเป็นสถานะ checkining แล้วให้ไป get ค่า id_customer ของ Row นั้นมา
            id_customer = readClipboardValue['id_customer']
            try:
                dataReadFromIdCardReader = fReadDataIdCard()
                # print(dataReadFromIdCardReader)
                if (dataReadFromIdCardReader != False):  # ถ้าอ่านการ์ดได้
                    print("reading ok")
                    checkSound = False
                    picIdCard = dataReadFromIdCardReader['picRaw']
                    
                    copyToJava = {
                        "method": "reading_idCard_ok"
                    }
                    wirteClipboard(copyToJava)

                    reformDataReadFromIdCardReader = {
                            "method": "pushIdCardReaderToSheet",
                            "id_customer": id_customer,
                            "data": dataReadFromIdCardReader
                        }
                    # print(postData(reformDataReadFromIdCardReader))
                    subprocess.call([r'C:\Users\Shiba_Kiosk\Documents\miniprogram\sound\sound_lookCam.bat'])

                elif(dataReadFromIdCardReader == False):  # ถ้าไม่สามารถอ่านการ์ดได้
                    print("......... Waiting for a Card", end="\r")
                    if(checkSound == False):
                        subprocess.call([r'C:\Users\Shiba_Kiosk\Documents\miniprogram\sound\sound_waitCard.bat'])
                        checkSound = True
        
            except:
                print("Error 0-184 Not Found Reader")
                copyToJava = {
                    "method": "reader_Error",
                    "data": "Not Found Reader"
                }
                wirteClipboard(copyToJava)

        case "uploadWebcamPhoto":
         # {"method": "uploadWebcamPhoto","data": "1"}
            picWebcam = readClipboardValue['data']
            result, faceDis = fCompareFace(picIdCard, picWebcam)
            print(result, faceDis)

            copyToJava = {
                    "method": "compared",
                    "data":{ "result":result,
                             "faceDis":faceDis
                            }
                    }
            wirteClipboard(copyToJava)

           

# {"method": "readCard", "id_customer": "1"}


waitText = True
timeToSendUpdate = 0
# urlUpdate = variable.urlUpdateNotDown



while (True):
    sleep(1)
    mainLoop()
    waitText = not waitText
    if waitText == True:
        print(" (O ͜ O) " , end="\r")
    else:    
        print(" (─ ͜ ─) " , end="\r")
        # timeToSendUpdate = timeToSendUpdate + 1
        # if(timeToSendUpdate >= 30):
        #     timeToSendUpdate = 0
            # r = requests.get(urlUpdate)



# dataReadFromIdCardReader = fReadDataIdCard()
# print(dataReadFromIdCardReader)




