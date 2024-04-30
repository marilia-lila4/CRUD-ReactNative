import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AppItem from './AppItem';
import Database from './Database'

export default function AppList({route, navigation}) {

  const [items, setItems] = useState([]);

    useEffect(() => {
      Database.getItems().then(items => setItems(items))
    })

  function formatPhoneNumber(phoneNumber) {
      // Remover todos os caracteres não numéricos
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      // Aplicar a máscara "(xx) xxxxx-xxxx"
      const formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      // Limitar o número de dígitos para 11
      return formatted.slice(0, 15);
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
        <Text style={styles.title}>Lista Telefônica</Text>
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.itemsContainer}>
            {items.map(item =>{
              return <AppItem key={item.id} id={item.id} item={item.nome + ' | ' + formatPhoneNumber(item.telefone)} navigation={navigation} />
            })}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20
  },
  scrollContainer: {
    flex: 1,
    width: '90%'
  },
  itemsContainer: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
});