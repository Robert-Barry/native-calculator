import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  Text, 
  View,
  TextInput,
  Pressable
} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Calculator</Text>
      <TextInput
        style={styles.output}
        editable={false}
      />
      <View>
        <View style={styles.row}>
          <Button  data='<' />
          <Button  data='AC' />
          <Button  data='%' />
          <Button  data='/' />
        </View>
        <View style={styles.row}>
          <Button  data='7' />
          <Button  data='8' />
          <Button  data='9' />
          <Button  data='x' />
        </View>
        <View style={styles.row}>
          <Button  data='4' />
          <Button  data='5' />
          <Button  data='6' />
          <Button  data='-' />
        </View>
        <View style={styles.row}>
          <Button  data='1' />
          <Button  data='2' />
          <Button  data='3' />
          <Button  data='+' />
        </View>
        <View style={styles.row}>
          <Button  data='+/-' />
          <Button  data='0' />
          <Button  data='.' />
          <Button  data='=' />
        </View>
      </View>
    </View>
  );
}

const Button = (props) => {
  return (
    <Pressable style={styles.button}>
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
