// @flow
import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-fetch';
import { ChakraProvider } from "@chakra-ui/react"

const Root = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(async res => await res.json())
      .then(res => setTodos(res));
  }, []);

  const handleOnKeydown = (e) => {
    if (e.key === 'Enter') {
      setInputText('');
      setTodos([
        ...todos,
        inputText
      ]);
      fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({value: inputText}),
      });
    }
  };

  const handleOnChange = (e) => {
    setInputText(e.currentTarget.value);
  };

  return (
    <React.Fragment>
      <h1>todos</h1>
      <div className="container">
        <input
          onChange={handleOnChange}
          onKeyDown={handleOnKeydown}
          placeholder="What needs to be done?"
          value={inputText}
          type="text"
        />
        {todos.map(todo => (
          <div className="todo">
            <div className="todo-text">{todo}</div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default <Root />;