// * React Imports
import { View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// * Dev Imports
import logo from '../../assets/logo-nlw-esports.png';
import { GameCard, GameProps } from '../../components/GameCard';
import { Header } from '../../components/Header';

// * StyleSheet Imports
import { styles } from './styles';
import { DuoMatch } from '../../components/DuoMatch';
import { DuoCard } from '../../components/DuoCard';
import { Background } from '../../components/Background';

// The App itself
export function Home() {
  const navigation = useNavigation();

  const [games, setGames] = useState<GameProps[]>();

  function handleOpenGaming({ id, titles, bannerUrl }: GameProps) {
    navigation.navigate('game', { id, titles, bannerUrl });
  }

  useEffect(() => {
    fetch('http://127.0.0.1:3000/games')
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo} />

        <Header
          title="Encontre o seu DUO aqui!"
          subtitle="Selecione o jogo que quer JOGAR."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => {
                handleOpenGaming(item);
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
  
}
