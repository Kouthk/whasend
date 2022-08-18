import express, { Request, Response } from "express"
import Sender from "./sender";

const sender = new Sender()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/status', (req: Request, res: Response) => {
    // ...
    return res.send({
        qr_code: sender.qrCode,
        connected: sender.isConnected,
    })
})

app.post('/sendMessage', async (req: Request, res: Response) => {
    // Falta - Criar o tratamento de tokens
    // Falta - Desenvolver as opções de envio, ex: Button/Text/IMG
    const { token, option, number, message } = req.body;
    try {
        //Validar e transformar o numero
        await sender.sendText(number, message)

        return res.status(200).json({ status: "success", message: "Mensagem enviada" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", message: error })
    }

})

app.listen(8081, () => {
    console.log('Servidor Iniciado')
})