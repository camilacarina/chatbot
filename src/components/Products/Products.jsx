import React, { useState, useEffect } from 'react';

function Products(props) {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch('./data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson)
      });
  }
  useEffect(() => {
    getData()
  }, [])

  const optionsMarkup = data.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={() => props.actionProvider.startSupport(option.name, option.id)}
    >
      <span>{option.id}</span>{option.name}
    </button>
  ));

  return (
    <div className="Products">
      {
        data && data.length > 0 && <div className="learning-options-container">{optionsMarkup}</div>
      }
    </div>
  );
}

export default Products;
