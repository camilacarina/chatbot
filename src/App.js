import React, { Component } from 'react';
import {Chatbot, createChatBotMessage, createClientMessage} from 'react-chatbot-kit';

import ActionProvider from './chatbot/ActionProvider';
import MessageParser from './chatbot/MessageParser';
import Options from "./components/Options/Options";
import Products from "./components/Products/Products";

import './App.css';

import logo from './images/logo.png';
import avatar from './images/avatar.png';
import button from './images/float-button.png';
class App extends Component {
  state = {
    viewForm: false,
    viewChat: false,
    viewButton: true,
    fields: {},
    errors: {}
  }

  getConfig = ()  =>{
    return {
      initialMessages: [createChatBotMessage(`Olá! Seja bem-vindo (a) ${this.state.fields.name}. Escolha uma das opções abaixo:`, {withAvatar: false, delay: 500, widget: "options"}),
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
        mapStateToProps: ["fields"],
      },
      {
        widgetName: "products",
        widgetFunc: (props) => <Products {...props} />,
        mapStateToProps: ["fields"],
        props: {}
      },
    ],
    state: {
      fields: this.state
    }
  }
  }

  handleChat = (e, status = true)=> {
    e.preventDefault();

    if(!status){
      this.setState({ viewChat: status, errors: {}, fields: {} })
      this.handleForm(!status)
      return this.handleButton(!status)
    }

    if(this.handleValidation()){
      this.setState({ viewChat: status, errors: {} })
      this.handleForm(!status)
      this.handleButton(!status)
    }

    return
  }

  handleForm = (status = false) => {
    this.setState({ viewForm: status })
    this.handleButton(!status)
  }

  handleButton = (status = false) => {
    this.setState({ viewButton: status })
  }

  handleChange = (e, field) => {
    let fields = this.state.fields;
    fields[field] = e.target.value;      
    this.setState({fields});
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["name"]){
       formIsValid = false;
       errors["name"] = "Campo inválido";
    }

    if(!fields["email"]){
       formIsValid = false;
       errors["email"] = "Campo inválido";
    } 
   this.setState({errors: errors});
   return formIsValid;
}
  render() {
    const { viewForm, viewChat, viewButton, errors } = this.state;

    return (
      <div className="App">
        <div className="logo"><img src={logo} alt="Logotipo Fortics" /></div>
        <header className="App-header">
          {viewChat && <Chatbot config={this.getConfig(this.props)}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            placeholderText={"Digite sua mensagem"}
            headerText={
              <div className="headerText">
                <span className="close" onClick={(e) => this.handleChat(e, false)}>x</span>
                <div><img src={avatar} alt="Avatar Fortics" /><div className='status-circle'></div></div>
                <div className="title"><span>Fortics</span>Como posso ajudar?</div>
              </div>}
          />}
          {viewForm && <div className="form" id="form">
            <span className="close" onClick={() => this.handleForm(false)}>x</span>
            <div><img src={avatar} alt="Avatar Fortics" /></div>
            <p>Precisamos de algumas informações antes de iniciar o atendimento</p>
            <form onSubmit={(e) => this.handleChat(e)}>
              <fieldset>
                <label>
                  <input className={(errors["name"]) ? "error" : ""} name="name" placeholder="Nome" onChange={(e) => this.handleChange(e, 'name')}/>
                </label>
                <label>
                  <input className={(errors["email"]) ? "error" : ""}  name="email" placeholder="E-mail" onChange={(e) => this.handleChange(e, 'email')}/>
                </label>
                <label>
                  <button >Iniciar</button>
                </label>
              </fieldset>
            </form>
          </div>}
        </header>
        {viewButton && 
          <div className="footer-chat">
            <a className="button-help" onClick={() => this.handleForm(true)}><img src={button} alt="Posso ajudar" /></a>
            <div className="box-help"><span onClick={() => this.handleForm(true)}>Posso ajudar?</span></div>
          </div>
        }
      </div>
    );
  }
}

export default App;
