const express = require("express");
const app = express();
const PORT = 4000;

app.get('/', function (req, res) {
  res.json({ a: String.fromCodePoint(0x1F354) });
});


// Ruta que recibe un parametro n y retorna un emoji de chango si es un numero primo y o no usando la criba de Erastótenes
app.get('/api/openberry/prime/:n', (req, res) => {
  var number = req.params.n;
  // Expresion regular que valida que el campo recibido sea un numero entero
  var regExp = new RegExp("^\\d+$");
  var isValid = regExp.test(number);

  if ( isValid ) {
    var prime = parseInt(number, 10);
    // El número es 2 por lo tanto es el primer número primo
    if ( prime == 2 ){
      res.status(200).send({
        success: true,
        message: randomEmoji()
      });  
    }

    // Si el residuo de dividir el número entre 2 es igual a 0, el número es par, por lo tanto no es primo
    if( prime % 2 == 0){
      res.status(400).send({
        success: false,
        message: 'El número no es primo'
      });

    }else{
      // Dado la criba de Erastótenes para comprobar si un numero es primo basta con comprobar los numeros que comprendan desde 2 hasta la raíz cuadrada de el numero a evaluar, despues se evalua que se el residuo de dividir este numero es igual a 0 el numero no es primo
      var erasthotenes = Math.ceil(Math.sqrt(prime));
      var isPrime = true;
      for (var i = erasthotenes; i >= 2; i--){
        if( prime % i == 0){
          isPrime = false;
          break;
        }
      }

      if(isPrime == true){
        res.status(200).send({
          success: true,
          message: randomEmoji()
        });
      }

      else{
        res.status(400).send({
          success: false,
          message: 'El número no es primo'
        });
      }

    }

  }else{
    res.status(400).send({
      success: false,
      message: 'El parámetro enviado no es un número entero'
    }); 
  }

});

// Funcion que retorna un emoji de mono al azar, basandose en los carácteres unicode que pertenecen a cada emoji
function randomEmoji(){
  let emojiArray = ['0x1F648','0x1F649','0x1F64A','0x1F435','0x1F412'];
  var random = Math.floor(Math.random() * emojiArray.length);
  return String.fromCodePoint(emojiArray[random]);
}

app.listen(PORT, () => {
  console.log ('Servidor a la escucha en el puerto: ' + PORT);
});