import React from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  Box,
  Pressable,
  CloseIcon,
  IconButton,
  Center,
  VStack,
  HStack,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoList = ({todoList, setTodoList}) => {
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {}
  };

  const handleDelete = id => {
    setTodoList(todoList.filter(todo => todo.id !== id));
    storeData(todoList);
  };
  const handleRemoveAll = () => {
    setTodoList([]);
    storeData([]);
  };
  const handleRemoveDone = () => {
    setTodoList(todoList.filter(todo => !todo.isDone));
    storeData(todoList);
  };
  const handlePress = item => {
    setTodoList(
      todoList.map(todo => {
        if (todo.id === item.id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      }),
    );
    storeData(todoList);
  };
  const [unDoneCount, setUnDoneCount] = React.useState(0);

  React.useEffect(() => {
    setUnDoneCount(todoList.filter(todo => !todo.isDone).length);
  }, [todoList]);
  return (
    <View
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.100'}}
      minH="100%">
      {todoList.length === 0 ? (
        <Center height={200}>
          <Text fontSize={25}>Is there really nothing to do?</Text>
        </Center>
      ) : (
        <Box justifyContent="flex-end" flexDirection="row" paddingRight={3}>
          <Text fontSize={20}>
            {unDoneCount === 0
              ? 'Congratulations All Done!'
              : `${unDoneCount} todo${unDoneCount > 1 ? 's' : ''} left`}
          </Text>
        </Box>
      )}

      <VStack>
        <FlatList
          maxH={500}
          paddingTop={2}
          data={todoList}
          scrollToOverflowEnabled
          renderItem={({item}) => (
            <HStack>
              <Pressable
                margin={2}
                _dark={{bg: 'blueGray.900'}}
                _light={{bg: 'blueGray.50'}}
                onPress={() => handlePress(item)}
                rounded="8"
                borderWidth="1"
                borderColor="coolGray.300"
                maxW="96"
                shadow="3"
                bg="coolGray.100"
                p="5"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Text
                  w="90%"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                  fontSize={25}>
                  {item.isDone ? (
                    <>
                      <Text
                        color="coolGray.500"
                        textDecorationLine={(item.isDone = 'line-through')}>
                        {item.title}
                      </Text>
                    </>
                  ) : (
                    item.title
                  )}
                </Text>
                <IconButton
                  w="5%"
                  colorScheme="red"
                  icon={<CloseIcon />}
                  onPress={() => handleDelete(item.id)}>
                  REMOVE
                </IconButton>
              </Pressable>
            </HStack>
          )}
          keyExtractor={(item, index) => `${item.key}${index}${item.title}`}
        />
      </VStack>
      <HStack justifyContent={'space-between'}>
        <Box
          flexDirection="row"
          justifyContent="flex-start"
          margin={2}
          paddingLeft={3}>
          {unDoneCount < todoList.length && (
            <Button onPress={handleRemoveDone} bgColor={'red.400'}>
              REMOVE COMPLETED
            </Button>
          )}
        </Box>
        <Box
          flexDirection="row"
          justifyContent="flex-end"
          margin={2}
          paddingRight={5}>
          {todoList.length > 1 && (
            <Button onPress={handleRemoveAll} bgColor={'red.400'}>
              REMOVE ALL
            </Button>
          )}
        </Box>
      </HStack>
    </View>
  );
};

export default TodoList;
