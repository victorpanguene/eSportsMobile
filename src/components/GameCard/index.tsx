import {
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
  Text,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameProps {
  id: string;
  titles: string;
  _count: { ads: number };
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground source={{uri: data.bannerUrl}} style={styles.cover}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={{ padding: 12 }}>
          <Text style={styles.name}>{data.titles}</Text>
          <Text style={styles.ads}>{data._count.ads} Anúncios</Text>
        </LinearGradient> 
      </ImageBackground>
    </TouchableOpacity>
  );
}
