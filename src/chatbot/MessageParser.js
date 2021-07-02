class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state
  }
  
  
  validPhone = (phone) => {
    var regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/
    return (phone.match(regex)) ? true : false;
}
  parse(message) {
    const lowerCaseMessage = message.toLowerCase()

    this.actionProvider.handleUserMessage(message, this.state)

    if (lowerCaseMessage === "") {
      return this.actionProvider.help()
    }

    if (lowerCaseMessage.includes("iniciar atendimento") || lowerCaseMessage.includes("iniciar") || lowerCaseMessage === "1") {
      return this.actionProvider.start()
    }

    if (lowerCaseMessage.includes("suporte") || lowerCaseMessage === "2") {
      return this.actionProvider.support()
    }

    if (lowerCaseMessage.includes("comercial") || lowerCaseMessage === "3") {
      return this.actionProvider.commercial()
    }

    if (lowerCaseMessage.includes("receber uma ligação") || lowerCaseMessage === "4") {
      return this.actionProvider.call()
    }

    if (lowerCaseMessage.includes("encerrar atendimento") || lowerCaseMessage.includes("encerrar") || lowerCaseMessage === "9") {
      return this.actionProvider.finish()
    }

    if(this.validPhone(lowerCaseMessage.trim())){
      return this.actionProvider.makecall()
    }

    return this.actionProvider.help()
    
  }
}

export default MessageParser