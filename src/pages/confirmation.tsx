import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Button from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Confirmation() {
  const navigation = useNavigation();

  function handleMoveOn() {
    navigation.navigate('PlantSelect');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subTitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado
        </Text>
        <View style={styles.footer}>
          <Button title="Comecar" onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    color: colors.heading,
    textAlign: 'center',
    lineHeight: 38,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 78,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
