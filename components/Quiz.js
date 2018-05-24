import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification } from '../utils/notification'
import {
  progress_bar_color,
  correct_btn_color,
  incorrect_btn_color,
  submit_btn_color
} from '../utils/colors'
import { Entypo } from '@expo/vector-icons'


class Quiz extends Component {
  state = {
    count: 0,
    showAnswer: false,
    quizCompleted: false,
    correct: 0
  }

  knewAnswer = (value, length) => {
    const { count, showAnswer } = this.state
    if(value) {
      this.setState({ correct: this.state.correct + 1 })
    }

    if (count >= length - 1) {
      this.setState({ quizCompleted: true })
      clearLocalNotification().then(setLocalNotification())
    } else {
      this.setState({ count: this.state.count + 1 })
    }

    if(showAnswer) {
      this.setState({ showAnswer: !showAnswer })
    }
  }

  onRestart = () => {
    // const { name } = this.props.navigation.state.params
    this.setState({ count: 0, showAnswer: false, quizCompleted: false, correct: 0 })
    // this.props.navigation.navigate('Quiz', { name })
  }

  onBackToDeck = () => {
    this.props.navigation.goBack()
  }

  onBackToHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { count, showAnswer, quizCompleted, correct } = this.state
    const { decks } = this.props
    const { name } = this.props.navigation.state.params
    const length = decks[name].questions.length
    const percent = ((100/length)*correct).toFixed(0)

    if(quizCompleted) {
      return(
        <View style={styles.container}>
          <Text style={styles.finalScore}>You scored {percent}%!</Text>

          {percent < 50 &&
            <Entypo style={styles.finalEmoji} name='emoji-sad'
              size={60} color={incorrect_btn_color} />
          }

          {percent >= 50 && percent < 70 &&
            <Entypo style={styles.finalEmoji} name='emoji-neutral'
              size={60} color={progress_bar_color} />
          }

          {percent >= 70 &&
            <Entypo style={styles.finalEmoji} name='emoji-happy'
              size={60} color={correct_btn_color} />
          }

          <View>
            <TouchableOpacity
              onPress={this.onRestart}
              style={[styles.submitBtn, {backgroundColor: submit_btn_color}]}>
                <Text style={styles.submitTxt}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onBackToDeck}
              style={[styles.submitBtn, {backgroundColor: submit_btn_color}]}>
                <Text style={styles.submitTxt}>Back to Deck</Text>
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

    return (
      <ScrollView style={{flex: 1}}>

        <View style={styles.progressBar}>
          <Text style={styles.progressBarTxt}>{count + 1}/{length}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.question}>
            {decks[name].questions[count].question}
          </Text>

          {showAnswer && (
            <Text
              style={styles.answer}>
              {decks[name].questions[count].answer}
            </Text>
          )}

          <TouchableOpacity style={styles.toggleAnswerBtn}
            onPress={() => this.setState({ showAnswer: !this.state.showAnswer })}>
              <Text style={styles.toggleAnswerTxt}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => this.knewAnswer(true, length)}
            style={[styles.submitBtn, {backgroundColor: correct_btn_color}]}>
              <Text style={styles.submitTxt}>I know this!</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.knewAnswer(false, length)}
            style={[styles.submitBtn, {backgroundColor: incorrect_btn_color}]}>
              <Text style={styles.submitTxt}>I do not know this!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: progress_bar_color,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressBarTxt: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    fontSize: 38,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  answer: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  toggleAnswerBtn: {
    margin: 20,
    borderWidth: 1,
  },
  toggleAnswerTxt: {
    padding: 15
  },
  actionsContainer: {
    flex: 1,
    marginTop: 40,
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
  finalScore: {
    fontSize: 30,
    margin: 30
  },
  finalEmoji: {
    margin: 30
  }
})


function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(Quiz)
