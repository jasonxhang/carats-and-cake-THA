import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  }

  static defaultProps = {
    suggestions: []
  }

  constructor(props) {
    super(props)

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ''
    }
  }

  // Event fired when the input value is changed
  onChange = e => {
    const {suggestions} = this.props
    const userInput = e.currentTarget.value

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.symbol.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    })
    this.props.handleSearch(e)
  }

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
    const ticker = e.currentTarget.innerText.split(' - ')[0]
    this.props.setSearchVal(ticker)
    this.props.history.push(`/stock/${ticker}`)
    this.props.resetInputField()
  }

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const {activeSuggestion, filteredSuggestions} = this.state

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      })
    } else if (e.keyCode === 38) {
      // User pressed the up arrow, decrement the index
      if (activeSuggestion === 0) {
        return
      }

      this.setState({activeSuggestion: activeSuggestion - 1})
    } else if (e.keyCode === 40) {
      // User pressed the down arrow, increment the index
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }

      this.setState({activeSuggestion: activeSuggestion + 1})
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
    this.props.handleSubmit(e)
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {activeSuggestion, filteredSuggestions, showSuggestions, userInput}
    } = this

    let suggestionsListComponent

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = 'suggestion-active'
              }

              return (
                <li
                  className={className}
                  key={suggestion.iexId}
                  onClick={onClick}
                >
                  {suggestion.symbol} - {suggestion.name}
                </li>
              )
            })}
          </ul>
        )
      } else {
        suggestionsListComponent = (
          <div className="suggestions no-suggestions">
            <em> No suggestions, you're on your own!</em>
          </div>
        )
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          className="mr-sm-2"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={this.props.value}
          placeholder="Enter a ticker symbol"
        />
        {suggestionsListComponent}
        <Button
          type="submit"
          variant="outline-success"
          disabled={this.props.value === ''}
          onClick={e => this.handleSubmit(e)}
        >
          Search
        </Button>
      </Fragment>
    )
  }
}

export default withRouter(Autocomplete)
