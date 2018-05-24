import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'

import { addDeck } from '../actions'
import { createDeck } from '../utils/api'
import { connect } from 'react-redux'
import { submit_btn_color } from '../utils/colors'

class AddDeck extends Component {
  state = {
    text: '',
    error: false,
  }

  submitDeck = () => {
    const { text } = this.state
    if(text != '') {
      this.props.addDeck(text)
      createDeck(text)
      this.setState({ error: false })
      this.props.navigation.navigate('DeckView', { name: text })
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    const { text, error } = this.state

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

        <View>
          <Text style={styles.header}>Create Deck</Text>
        </View>

        {error &&
          <Text style={styles.error}>Name cannot be empty</Text>
        }

        <View>
          <TextInput
            placeholder='Deck Title'
            onChangeText={(text) => this.setState({text})}
            style={styles.textField}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={this.submitDeck}
            style={styles.submitBtn}>
              <Text style={styles.submitTxt}>Create Deck</Text>
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
    fontSize: 42
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

const mapDispatchToProps = (dispatch) => {
  return {
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(null, mapDispatchToProps)(AddDeck)
