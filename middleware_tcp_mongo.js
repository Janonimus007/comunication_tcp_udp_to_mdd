//instalar mongose: npm i -S mongoose
var mongoose = require('mongoose');
var net = require('net');
var dgram = require('dgram')
var enchufe_udp = dgram.createSocket('udp4')
var xmlrpc=require('xmlrpc')
//conexion a la base de datos mongo
mongoose.connect('mongodb://localhost/prueba1',function(err){
    if(!err){
        console.log('conectado a mongo')
    }else{
        throw err;
    }
});
//crear shema
Sensor = new mongoose.Schema({
    medida: Number,
},{collection: 'sensor1'});
Sensor1 = new mongoose.Schema({
    medida: Number,
},{collection: 'sensor2'});

//crear modelos
Sensor = mongoose.model('prueba1',Sensor);
Sensor1 = mongoose.model('prueba2',Sensor1);

//recibir tcp
var enchufe_tcp = new net.Socket();
enchufe_tcp.connect(3000, '192.168.182.208')

enchufe_tcp.on('data', function(data){
    data=data.toString();
    //conexion con servidor rpc
    setTimeout(function() {
        var data1 = parseFloat(data)
        var client = xmlrpc.createClient({host:'192.168.182.208',port:5000,path:'/'})
        client.methodCall('add',[data1],function(error,value){
            console.log('respuesta: '+value)
        })
    }, 100);
    console.log('sensor1:'+data);
     Sensor.collection.insert({medida:data}, function(err,response){
      if(err) throw err;
});
Sensor.find(function(err,data){
    if(err){return console.error(err);}
    if(data===null){
        console.log('no hay datos');
    }
    var paquete = new Array();
    data.forEach(function(element){
        paquete.push(element.medida);
    });
    // console.log('La coleccion de datos es: ' + paquete);
    var total=paquete.length;
    // console.log('El total de datos de la coleccion es : ' + total);
});

});

//recibir udp de python
enchufe_udp.on('message',function(msg,info){
    data_udp = msg.toString('utf8')
    console.log('sensor2: '+data_udp)
    Sensor1.collection.insert({medida:data_udp},function(err,response){
        if(err) throw err
    })
    Sensor1.find(function(err,data){
        if(err){return console.error(err);}
        if(data===null){
            console.log('no hay datos');
        }
        var paquete = new Array();
        data.forEach(function(element){
            paquete.push(element.medida);
        });
        // console.log('La coleccion de datos es: ' + paquete);
        var total=paquete.length;
        // console.log('El total de datos del sensor 2 es : ' + total);
    });
})
enchufe_udp.bind(2000,'192.168.182.208')