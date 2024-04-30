import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Database from './Database'

export default function AppForm({route, navigation}) {

  const id = route.params ? route.params.id : undefined;
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    if(!route.params) return;
    setNome(route.params.nome);
    setTelefone(route.params.telefone.toString());
  }, [route])

  function handleNameChange(nome){setNome(nome); }
  function handlePhoneChange(telefone){setTelefone(telefone); }
  async function handleButtonPress(){
    const listItem = {nome, telefone: parseInt(telefone)};
    Database.saveItem(listItem, id)
    .then(response => navigation.navigate("AppList", listItem));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Contato</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
            style={styles.input}
            onChangeText={handleNameChange}
            placeholder='Nome'
            clearButtonMode='always' 
            value={nome}/>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
            style={styles.input}
            onChangeText={handlePhoneChange}
            placeholder='Telefone'
            keyboardType={'numeric'}
            clearButtonMode='always' 
            value={telefone.toString()} />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});