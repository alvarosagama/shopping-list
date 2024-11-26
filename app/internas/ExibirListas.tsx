import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { db } from '../../scripts/firebase-config'; // Caminho ajustado
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

interface Produto {
  nome: string;
  marcado: boolean;
}

interface Lista {
  id: string;
  nome: string;
  produtos: Produto[];
}

export default function ExibirListas() {
  const [listas, setListas] = useState<Lista[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'listas'), (snapshot) => {
      const dados = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Lista));
      setListas(dados);
    });
    return () => unsub();
  }, []);

  const marcarProduto = async (idLista: string, indexProduto: number) => {
    const lista = listas.find((l) => l.id === idLista);
    if (!lista) return;

    const produtosAtualizados = lista.produtos.map((produto, index) =>
      index === indexProduto ? { ...produto, marcado: !produto.marcado } : produto
    );

    try {
      const listaRef = doc(db, 'listas', idLista);
      await updateDoc(listaRef, { produtos: produtosAtualizados });
    } catch (e) {
      console.error('Erro ao atualizar produto:', e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.titulo}>{item.nome}</Text>
            <FlatList
              data={item.produtos}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item: produto, index }) => (
                <View style={styles.produto}>
                  <Text
                    style={[
                      styles.texto,
                      produto.marcado ? styles.marcado : null,
                    ]}
                  >
                    {produto.nome}
                  </Text>
                  <Button
                    title="Marcar"
                    onPress={() => marcarProduto(item.id, index)}
                  />
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  produto: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  texto: { fontSize: 16 },
  marcado: { textDecorationLine: 'line-through', color: 'gray' },
});
