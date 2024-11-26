import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../../scripts/firebase-config'; // Caminho ajustado
import { collection, addDoc } from 'firebase/firestore';

interface Produto {
  nome: string;
  marcado: boolean;
}

export default function CriarLista() {
  const [nomeLista, setNomeLista] = useState<string>('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<string>('');

  const adicionarProduto = () => {
    if (novoProduto.trim() !== '') {
      setProdutos([...produtos, { nome: novoProduto, marcado: false }]);
      setNovoProduto('');
    }
  };

  const salvarLista = async () => {
    if (nomeLista.trim() !== '') {
      try {
        await addDoc(collection(db, 'listas'), {
          nome: nomeLista,
          produtos,
        });
        setNomeLista('');
        setProdutos([]);
        alert('Lista criada com sucesso!');
      } catch (e) {
        console.error('Erro ao criar lista:', e);
      }
    } else {
      alert('O nome da lista não pode estar vazio.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome da Lista"
        value={nomeLista}
        onChangeText={setNomeLista}
      />
      <TextInput
        style={styles.input}
        placeholder="Adicionar Produto"
        value={novoProduto}
        onChangeText={setNovoProduto}
      />
      <Button title="Adicionar Produto" onPress={adicionarProduto} />
      <FlatList
        data={produtos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.produto}>{item.nome}</Text>}
      />
      <Button title="Salvar Lista" onPress={salvarLista} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
  produto: { fontSize: 16, marginVertical: 4 },
});
