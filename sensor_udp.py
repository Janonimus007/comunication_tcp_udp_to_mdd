#sensor udp maestro
import socket
from tkinter import *
import time
import random

enchufe_udp=socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

def sensor():
  dato = (random.randrange(0,100))
  dato1 = str(dato)
  dato2 = dato1.encode() #transforma string a bite
  enchufe_udp.sendto(dato2,('192.168.182.208',2000))
  print(dato1)
  time.sleep(0.5)
  v.after(250,sensor())
v = Tk()
v.geometry("100x300")
L=Label(v,text="sensor 1")

b = Button(v,text="activar",command=sensor)
b.place(x=30,y=150)
v.mainloop()

