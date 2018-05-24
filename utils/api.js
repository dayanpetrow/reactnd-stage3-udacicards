import { AsyncStorage } from 'react-native'
import { example_data } from './data'

const UDACICARDS_STORAGE_KEY = 'UdaciCards:dayanpe'

export function fetchDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(results => {
      if(results === null) {
        AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(example_data))
        return example_data
      } else {
        return JSON.parse(results)
      }
    })
}

export function createDeck(title) {
 return AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function createCard(title, card) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[title].questions.push(card)
      AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(results))
      return results
    })
}
