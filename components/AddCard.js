import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
 } from 'react-native'
 import { addCard } from '../actions'
 import { createCard } from '../utils/api'
 import { connect } from 'react-redux'
 import { submit_btn_color } from '../utils/colors'

class AddCard extends Component {

  state = {
    question: '',
    answer: '',
    error: false
  }

  submitNewCard = () => {
    const { question, answer } = this.state
    const deck = this.props.navigation.state.params.name
    if(question != '' && answer != '') {
      this.props.addCard({ question, answer, deck })
      createCard(deck, { question, answer })
      this.setState({ question: '', answer: '', error: false })
      this.props.navigation.goBack()
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    const { text, error } = this.state

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

        <View>
          <Text style={styles.header}>Create Card</Text>
        </View>

        {error &&
          <Text style={styles.error}>Fields cannot be empty</Text>
        }

        <View>
          <TextInput
            placeholder='Question?'
            onChangeText={(question) => this.setState({question})}
            style={styles.textField}/>
          <TextInput
            placeholder='Answer'
            onChangeText={(answer) => this.setState({answer})}
            style={styles.textField}/>
        </View>

        <View>
          <TouchableOpacity
            onPress={this.submitNewCard}
            style={styles.submitBtn}>
            <Text style={styles.submitTxt}>Add Card</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 42,
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    textAlign: 'center'
  },
  textField: {
    width: 250,
    height: 50,
    fontSize: 26,
    borderBottomWidth: 2,
    borderColor: '#333',
    margin: 20,
    padding: 10,
  },
  submitBtn: {
    padding: 10,
    borderRadius: 7,
    width: 250,
    height: 50,
    backgroundColor: submit_btn_color
  },
  submitTxt: {
    marginTop: 1,
    fontWeight: '600',
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  error: {
    color: 'red',
    margin: 10,
    fontSize: 16
  }
})

export default connect(null, { addCard })(AddCard)
