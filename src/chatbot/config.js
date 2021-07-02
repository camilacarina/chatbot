import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

import Options from "../components/Options/Options";

const config = {
  initialMessages: [createChatBotMessage("Olá! Seja bem-vindo (a). Escolha uma das opções abaixo:", {withAvatar: false, delay: 500, widget: "options"}),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#197FBC",
    },
    chatButton: {
      backgroundColor: "transparent",
    },
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      mapStateToProps: ["teste"],
    },
  ],
  state: {
    teste: "camila"
  }
}

export default config