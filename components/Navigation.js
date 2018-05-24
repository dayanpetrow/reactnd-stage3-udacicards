import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import DeckView from './DeckView'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { Ionicons } from '@expo/vector-icons'

const Tabs = TabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={36} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={36} color={tintColor} />
    }
  }
})

export const MainNavigation = StackNavigator({
  DeckList: {
    screen: Tabs,
    navigationOptions: {
      title: 'UdaciCards'
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'black',
      title: navigation.state.params.name
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'black',
      title: navigation.state.params.name
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: 'black',
      title: 'Quiz',
    })
  }
})
