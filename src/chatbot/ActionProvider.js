class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  
  handleSupportParser = () => {
    const messages = this.createChatBotMessage(
      "Support",
      { widget: "support", withAvatar: false }
    );

    this.updateChatbotState(messages);
  };

  help = () => {
    const greetingMessage = this.createChatBotMessage("Por favor, escolha uma das opções acima.")
    this.updateChatbotState(greetingMessage)
  }

  call = (msg) => {
    this.handleUserMessage(msg)

    const message = this.createChatBotMessage("Insira por favor o seu número de telefone com DDD para que possamos entrar em contato.")
    this.updateChatbotState(message)
  }

  makecall = () => {
    const message = this.createChatBotMessage("Aguarde alguns minutos. Já iremos ligar para você.")
    this.updateChatbotState(message)
  }

  support = (msg, id) => {
    this.handleUserMessage(msg, id)
    const message = this.createChatBotMessage("Por favor, escolha para qual produto você deseja suporte.", {widget: "products"})
    this.updateChatbotState(message)
  }

  startSupport = (message, id) => {
    this.handleUserMessage(message, id)

    const startMessage = this.createChatBotMessage(`Você será atendido pela equipe do ${message}`,{
      withAvatar: false,
    });
    const greetingMessage = this.createChatBotMessage("Boa tarde, em que posso ajudar?", {delay: 4000});
    this.updateChatbotState(startMessage)
    this.updateChatbotState(greetingMessage)
  }

  commercial = (message) => {
    this.handleUserMessage(message)

    const startMessage = this.createChatBotMessage(`Você será atendido pela equipe comercial da Fortics`,{
      withAvatar: false,
    });
    const greetingMessage = this.createChatBotMessage("Boa tarde, em que posso ajudar?", {delay: 4000});
    this.updateChatbotState(startMessage)
    this.updateChatbotState(greetingMessage)
  }

  start = (message, id) => {
    this.handleUserMessage(message, id)

    const startMessage = this.createChatBotMessage("Aguarde que em breve você será atendido....",{
      withAvatar: false,
    });
    const startedMessage = this.createChatBotMessage("Atendimento iniciado pela Fortics Tecnologia", {delay: 2000});
    const greetingMessage = this.createChatBotMessage("Boa tarde, em que posso ajudar?", {delay: 4000});
    this.updateChatbotState(startMessage)
    this.updateChatbotState(startedMessage)
    this.updateChatbotState(greetingMessage)
  }

  finish = (message) => {
    this.handleUserMessage(message)

    const finishMessage = this.createChatBotMessage("Agradecemos seu contato. Boa tarde!")
    this.updateChatbotState(finishMessage)
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
          ...prevState, messages: [...prevState.messages, message]
      }))
  }

  handleUserMessage = (message, id) => {
    if(message !== undefined && typeof(id) !== "object" && isNaN(Number(id))){
        const msg = this.createClientMessage(message)
        this.updateChatbotState(msg)
    }
   }
}

export default ActionProvider