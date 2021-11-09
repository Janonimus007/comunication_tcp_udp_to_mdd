#import simpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCServer

def add(data):
  return data*10

def main():
  print('Este es un servidor de procedimientos remotos')
  server= SimpleXMLRPCServer(('192.168.182.208',5000))
  server.register_function(add)
  server.serve_forever()

if __name__ == '__main__':
  main()