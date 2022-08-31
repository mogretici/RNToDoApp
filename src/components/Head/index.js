import {View, Text, Input, Button, CheckIcon, useColorMode} from 'native-base';
import React from 'react';
import ToggleDarkMode from '../colorMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const Head = ({todoList, setTodoList}) => {
  const [text, setText] = React.useState('');
  const handleChange = todo => setText(todo);

  const {colorMode, toggleColorMode} = useColorMode('Dark');

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {}
  };

  const handleSubmit = () => {
    if (text.length > 0) {
      setTodoList([
        ...todoList,
        {
          id: uuid.v4(),
          title: text[0].toUpperCase() + text.substring(1),
          isDone: false,
        },
      ]);
      storeData(todoList);
      setText('');
      console.log(todoList);
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  React.useEffect(() => {
    getData()
      .then(data => {
        setTodoList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    storeData(todoList);
    console.log(todoList);
  }, [todoList.length]);

  return (
    <View _dark={{bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}}>
      <View
        justifyContent="space-between"
        flexDirection="row"
        paddingBottom={3}
        paddingTop={3}
        margin={3}>
        <Text fontSize="2xl" letterSpacing={4} fontWeight="bold" paddingTop={2}>
          <CheckIcon
            size="5"
            mt="0.5"
            _dark={{color: 'blueGray.50'}}
            _light={{color: 'blueGray.900'}}
          />{' '}
          TODO APP
        </Text>
        <ToggleDarkMode
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      </View>
      <View flexDirection="row" margin={3}>
        <Input
          value={text}
          w={'80%'}
          onChangeText={handleChange}
          fontSize="lg"
          placeholder="What are you going to do?"
        />
        <Button w={'20%'} fontSize="lg" onPress={handleSubmit}>
          ADD
        </Button>
      </View>
    </View>
  );
};

export default Head;
