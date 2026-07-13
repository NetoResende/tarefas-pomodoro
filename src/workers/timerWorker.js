self.onmessage = function (event) {
    console.log("WORKER recebeu: ", event.data);

    switch(event.data){
        case "OLA_WORKER": {
            self.postMessage("olá pra você também Principal!")
            break;
        }
        case "FALA_OI": {
            self.postMessage("Oi!")
            break;
        }
        case "FECHA_WORKER": {
            self.postMessage("Ta bom vou fechar!")
            self.close()
            break;
        }
        default: {
            self.postMessage("Não entendi, pode repetir novamente!")
        }
    }
}