import { useState } from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  TextInput,
  Pressable
} from 'react-native';
import { 
  numberForEquation,
  operandForEquation,
  parseEquation,
  isOperand 
} from './scripts/calculator';

const App = () => {
  const [output, setOutput] = useState('0');
  const [equation, setEquation] = useState([]);

  const handleButtonPressed = (value) => {
    if (value === 'AC') {
      setEquation([]);
      setOutput('0');
      return;
    }

    if (value === '=') {
      // Use the current equation to calculate the result
      const result = parseEquation(equation);
      setOutput(String(result));
      setEquation([String(result)]);
      return;
    }

    // Calculate the next state in a local variable
    let nextEquation = [...equation];

    // if the value is a number
    if (!isNaN(value) && value !== ' ') {
      nextEquation = numberForEquation(equation, value);
    // if the value is an operand
    } else if (isOperand(value)) {
      nextEquation = operandForEquation(equation, value);
    }

    // Update the state for the next render
    setEquation(nextEquation);

    // Update the output using the local variable, not the stale state
    setOutput(nextEquation.join(' '));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Calculator</Text>
      <TextInput
        style={styles.output}
        editable={false}
        value={output}
      />
      <View>
        <View style={styles.row}>
          <Button  data='<' isDisabled={true} />
          <Button  data='AC' onPress={() => handleButtonPressed('AC')} />
          <Button  data='%' isDisabled={true} />
          <Button  data='/' onPress={() => handleButtonPressed('/')} />
        </View>
        <View style={styles.row}>
          <Button  data='7' onPress={() => handleButtonPressed('7')} />
          <Button  data='8' onPress={() => handleButtonPressed('8')} />
          <Button  data='9' onPress={() => handleButtonPressed('9')} />
          <Button  data='x' onPress={() => handleButtonPressed('*')} />
        </View>
        <View style={styles.row}>
          <Button  data='4' onPress={() => handleButtonPressed('4')} />
          <Button  data='5' onPress={() => handleButtonPressed('5')} />
          <Button  data='6' onPress={() => handleButtonPressed('6')} />
          <Button  data='-' onPress={() => handleButtonPressed('-')} />
        </View>
        <View style={styles.row}>
          <Button  data='1' onPress={() => handleButtonPressed('1')} />
          <Button  data='2' onPress={() => handleButtonPressed('2')} />
          <Button  data='3' onPress={() => handleButtonPressed('3')} />
          <Button  data='+' onPress={() => handleButtonPressed('+')} />
        </View>
        <View style={styles.row}>
          <Button  data='+/-' isDisabled={true} />
          <Button  data='0' onPress={() => handleButtonPressed('0')} />
          <Button  data='.' onPress={() => handleButtonPressed('.')} />
          <Button  data='=' onPress={() => handleButtonPressed('=')} />
        </View>
      </View>
    </View>
  );
}

const Button = (props) => {
  return (
    <Pressable 
      style={styles.button} 
      disabled={props.isDisabled}
      onPress={props.onPress}
    >
      <Text>{props.data}</Text>
    </Pressable>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  heading: {
    fontWeight: "bold"  ,
    fontSize: 24
  },
  output: {
    backgroundColor: '#eee',
    height: 28,
  },
  button: {
    margin: 2,
    backgroundColor: '#ddd',
    width: 30
  },
  row: {
    flexDirection: 'row'
  }
});
