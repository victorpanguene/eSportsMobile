import React from 'react';
import { View } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hoursStart: string;
  hoursEnd: string;
  useVoiceMailChannel: boolean;
}
interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({data , onConnect} : Props) {
  return <View style={styles.container}>
    
  </View>;
}
