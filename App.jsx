import React, { useState, useRef } from 'react';
import { Keyboard, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [cepData, setCepData] = useState(null)

  async function buscarCep() {
    if (cep == '') {
      alert('Digite um CEP válido.')
      setCep('')
      return
    }

    try{
      const response = await api.get(`${cep}/json/`)
      setCepData(response.data)
      Keyboard.dismiss()
    }
    catch (e) {
      console.log('ERROR: ' + e)
      setCepData(null)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle='dark-content' />

      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o CEP desejado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 23094150"
          value={cep}
          onChangeText={currentText => setCep(currentText)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, {backgroundColor: '#1d75cb'}]}
          onPress={buscarCep}
        >
          <Text style={styles.botaoText }>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, {backgroundColor: '#cd3e1d'}]}
          onPress={() => {
            setCep('')
            inputRef.current.focus()
            setCepData(null)
          }}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepData &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepData.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepData.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepData.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepData.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepData.uf}</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 22,
    color: 'white',
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
  },
});
