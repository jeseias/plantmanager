import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EnvironmentButton from '../components/environment-button';
import Header from '../components/header';
import Load from '../components/load';
import PlantCardPrimary from '../components/plant-card-primary';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_trips: string;
  photo: string;
  environments: string;
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export default function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);

  function handleEnvironmentSelected(environment: string) {
    console.log(environment)
    setSelectedEnvironment(environment);

    if (selectedEnvironment === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    return setFilteredPlants(filtered);
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        `plants_environments?_sort=title&order=asc`
      );

      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    }

    fetchEnvironment();
  }, []);

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setIsLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    return setLoadMore(false);
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadMore(true);
    setPage(page + 1);
    fetchPlants();
  }

  if (isLoading) return <Load />;

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>você quer colocar sua planta</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === selectedEnvironment}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.stylesPlant}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  stylesPlant: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  contentContainerStyle: {},
});
