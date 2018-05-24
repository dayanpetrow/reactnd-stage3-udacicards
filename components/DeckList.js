import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { striped_decks } from '../utils/colors'

function DeckListItem ({ onPress, name, count, bgcolor }) {
  return(
    <View style={[styles.deck, {backgroundColor: bgcolor}]}>
      <TouchableOpacity onPress={() => onPress({ name })}>
        <Text style={styles.deck_name}>{name}</Text>
        <Text style={styles.questions_count}>{count} cards</Text>
      </TouchableOpacity>
    </View>
  )
}

class DeckList extends React.Component {

  componentDidMount() {
    fetchDecks().then(decks => this.props.receiveDecks(decks))
  }

  openDeck = ({ name }) => {
    this.props.navigation.navigate('DeckView', { name })
  }

  render() {
    const { decks } = this.props

    return (
      <ScrollView style={{flex: 1}}>
        {Object.keys(decks).map((deck,index) =>
          <DeckListItem
            key={decks[deck].title}
            name={decks[deck].title}
            count={decks[deck].questions.length}
            onPress={this.openDeck}
            bgcolor={striped_decks[index%2]}
          />
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    height: 100,
    borderWidth: 1,
    borderColor: 'white'
  },
  deck_name: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 20,
    textAlign: 'center',
    color: 'white'
  },
  questions_count: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white'
  }
})

function mapStateToProps(decks) {
  return ({ decks })
}

function mapDispatchToProps(dispatch) {
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
