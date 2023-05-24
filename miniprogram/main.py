import json
from time import sleep, time
import clipboard  # pip install clipboard==0.0.4
import readIdCard
import faceCompare
import playsound #pip install playsound==1.2.2
import pyautogui #pyautogui




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








def fCompareFace(picIdCard, picWebCam):
    print("in fCompareFace")
    
    if len(picIdCard) < 3000 and len(picWebCam) < 5000:
        print("Error#5#ไม่พบรูปบัตรประชาชน และไม่พบรูปจาก WebCam")
        return False, -1
    elif len(picIdCard) < 3000:
        print("Error#3#ไม่พบรูปบัตรประชาชน")
        return False, -1
    elif len(picWebCam) < 3000:
        print("Error#4#ไม่พบรูปจาก WebCam")
        return False, -1
    else:
        result, faceDis = faceCompare.compareFace(picIdCard, picWebCam)
        return result, faceDis








def fReadDataIdCard():
    readDataIdCard, readPictureIdCard = readIdCard.readCard()
    # print(readDataIdCard , readPictureIdCard)

    # หาเครื่องอ่านไม่เจอ
    if readDataIdCard == False :
        return False , readPictureIdCard
    # อ่านการ์ดไม่ได้
    elif readDataIdCard == True :
        # print(readPictureIdCard)
        return True , readPictureIdCard

    else:
        THFULLNAME = readDataIdCard[1].replace("##", "#")
        THFULLNAME = THFULLNAME.replace("#", " ")
        ENFULLNAME = readDataIdCard[2].replace("##", "#")
        ENFULLNAME = ENFULLNAME.replace("#", " ")

        BIRTH = str(int(readDataIdCard[3][:4])-543) + "-" + readDataIdCard[3][4:6] + "-" + readDataIdCard[3][-2:] 
        
        ISSUER = readDataIdCard[5]

        ISSUE = str(int(readDataIdCard[7][:4])-543) + "-" + readDataIdCard[7][4:6] + "-" + readDataIdCard[6][-2:]
        
        EXPIRE = str(int(readDataIdCard[6][:4])-543) + "-" + readDataIdCard[6][4:6] + "-" + readDataIdCard[7][-2:]
        
        ADDRESS = readDataIdCard[8].replace("####", ",")
        ADDRESS = ADDRESS.replace("#", ",")

        data_idCard = {
            'tax_id': readDataIdCard[0],
            'thfullname': (THFULLNAME.split()[1]) + ' ' + (THFULLNAME.split()[2]) ,
            'fullname': (ENFULLNAME.split()[1]) + ' ' + (ENFULLNAME.split()[2]) ,
            'birth': BIRTH,
            'gender': readDataIdCard[4],
            'issuer': ISSUER,
            'issue': ISSUE,
            'expire': EXPIRE,
            'address': ADDRESS,
            'picRaw': "data:image/jpeg;base64," + readPictureIdCard,
            'method':'reading_idCard_ok'
        }

        return 'ok', data_idCard

        # print(THFULLNAME , ENFULLNAME , BIRTH , ISSUER , ISSUE , EXPIRE , ADDRESS)
        # print(data_idCard)



def pressKey():
    sleep(2)
    print('press')
    pyautogui.press('tab')
    sleep(0.1)
    pyautogui.press('tab')
    pyautogui.press('enter')
    print('pressed')



def mainLoop():
    readClipboardValue = readClipboard()
    data = False
    # print(readClipboardValue)
    try:
        readText = readClipboardValue['method'] 
    # print(readText)
    except:
        readText = 'no'

    match readText:

        case "check":
            print("......... checking python", end="\r")
            wirteClipboard( {'method': True} )
            # playsound.playsound("sound/sound_waitCard.mp3")
            
        
        case "no":
            print("......... can not parse json", end="\r")
            
        case "readCard":
            print("...........reading Card", end="\r")

            try:
                status, data = fReadDataIdCard()
            except:
                print('error')
                return

            # print(status, data)
            if status == False: #ถ้าไม่เจอเครื่องอ่านบัตร
                print ('Error : ' + data)
                wirteClipboard( {'method': 'error'} )
                return 
            
            elif status == True: #ถ้าไม่เจอการ์ด
                print ('                           ', end="\r")
                print ('          Waiting for Card...', end="\r")

            else:    #ถ้าเจอการ์ด
                print(data)
                data.update({'method': 'reading_idCard_ok'})
                wirteClipboard(  data )   
                print ('card Read ok')
                # playsound.playsound("sound/sound_lookCam.mp3")
                # sleep(3)
                return 
            
        case "ComparePhoto":
            print ('ComparePhoto')
            picIdCard = readClipboardValue['data1']
            picWebcam = readClipboardValue['data2']
            result, faceDis = fCompareFace(picIdCard, picWebcam)
            print(result, faceDis)

            copyToJava = {
                    "method": "compared",
                    "data":{ "result":result,
                             "faceDis":faceDis
                            }
                    }
            wirteClipboard(copyToJava)
            

            

# --------- {"method": "readCard"}





waitText = True


while (True):
    sleep(1)
    mainLoop()

    waitText = not waitText
    if waitText == True:
        print(" (O ͜ O) " , end="\r")
    else:    
        print(" (─ ͜ ─) " , end="\r")

