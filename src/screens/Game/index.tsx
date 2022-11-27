// * React Imports
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

// * Dev Imports
import { Background } from '../../components/Background';
import logo from '../../assets/logo-nlw-esports.png';
import { Header } from '../../components/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';

// * StyleSheet Imports
import { styles } from './styles';
import { DuoMatch } from '../../components/DuoMatch';


// * The App itself
export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState<boolean>(false);
  const [discordUserName, setDiscordUserName] = useState<string>('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUsername = async (adsId: string) => {
    fetch('http://127.0.0.1:3000/ads/${adsId}/discord')
      .then((response) => response.json())
      .then((data) => {
        setDiscordUserName(data.ad.discord);
        setIsDiscordModalOpen(true);
      });
  };

  useEffect(() => {
    fetch('http://127.0.0.1:3000/games/${game.id}/ads')
      .then((response) => response.json())
      .then((data) => {
        setDuos(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            ></Entypo>
            <Image source={logo} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Header title={game.titles} subtitle={'Conecta-te e começa a jogar!'} />
        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                getDiscordUsername(item.id);
              }}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyContent
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyContent}>
              Ainda não há Duos para este jogo
            </Text>
          )}
        ></FlatList>

        <DuoMatch
          visible={true}
          discord={discordUserName} 
          onClose={()=> setIsDiscordModalOpen(false)} />
        
      </SafeAreaView>
    </Background>
  );
}
