import React, { useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import logo from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Header } from '../../components/Header';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

export function Home() {

  useEffect(() => {
    fetch('http://127.0.0.1');
  }, [])

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Header
        title="Encontre o seu DUO aqui!"
        subtitle="Selecione o jogo que quer JOGAR."
      />

      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
