import React from 'react';
import {NativeBaseProvider, VStack, extendTheme} from 'native-base';
import Head from './components/Head';
import TodoList from './components/TodoList';

const App = () => {
  const [todoList, setTodoList] = React.useState([]);

  const config = {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  };
  const customTheme = extendTheme({config});
  return (
    <NativeBaseProvider
      theme={customTheme}
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.50'}}>
      <VStack flex={1}>
        <Head todoList={todoList} setTodoList={setTodoList} />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </VStack>
    </NativeBaseProvider>
  );
};
export default App;
