import "./Options.css";

const Options = (props) => {
  const options = [
    { text: "Iniciar atendimento", handler: props.actionProvider.start, id: 1 },
    { text: "Suporte", handler: props.actionProvider.support, id: 2 },
    { text: "Comercial", handler: props.actionProvider.commercial, id: 3 },
    { text: "Receber uma ligação", handler: props.actionProvider.call, id: 4 },
    { text: "Encerrar atendimento", handler: props.actionProvider.finish, id: 9 }
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={() => option.handler(option.text, option.id)}
    >
      <span>{option.id}</span>{option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default Options;
