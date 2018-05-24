import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { start_quiz_color, submit_btn_color } from '../utils/colors'

class DeckView extends Component {

  addCard = () => {
    const { name } = this.props.navigation.state.params
    this.props.navigation.navigate('AddCard', { name })
  }

  onBackToHome = () => {
    this.props.navigation.navigate('Home')
  }

  startQuiz = () => {
    const { name } = this.props.navigation.state.params
    this.props.navigation.navigate('Quiz', { name })
  }

  render() {
    const { name } = this.props.navigation.state.params
    const { decks } = this.props
    const count = decks[name].questions.length

    return(
      <View style={styles.container}>
        <View style={styles.deckData}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.card}>{count} Cards</Text>
        </View>

        <View style={styles.deckActions}>

          { count > 0 && (
            <TouchableOpacity
              onPress={this.startQuiz}
              style={[styles.submitBtn, {backgroundColor: start_quiz_color}]}>
              <Text style={styles.submitTxt}>Start Quiz</Text>
            </TouchableOpacity>
          )}

          { count == 0 && (
            <Text style={styles.noQuestions}>Add cards to start a quiz!</Text>
          )}

          <TouchableOpacity
            onPress={this.addCard}
            style={[styles.submitBtn, {backgroundColor: submit_btn_color}]}>
            <Text style={styles.submitTxt}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onBackToHome}
            style={[styles.submitBtn, {backgroundColor: submit_btn_color}]}>
              <Text style={styles.submitTxt}>Home</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deckData: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 42,
    fontWeight: '600'
  },
  card: {
    fontSize: 24,
    marginTop: 5,
    fontWeight: '600',
  },
  deckActions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    padding: 10,
    borderRadius: 7,
    width: 250,
    height: 50,
    marginBottom: 20
  },
  submitTxt: {
    marginTop: 1,
    fontWeight: '600',
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  noQuestions: {
    marginBottom: 15,
    color: 'black',
    fontSize: 22,
    textAlign: 'center'
  },
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckView)
