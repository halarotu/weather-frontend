import React, { Component } from 'react';
import {Header, CityList, Observations, InputForm} from './Components'
import ObservationService from './services/ObservationService'
import './App.css';

const cities = [{name: 'Tokyo', id: 0, lat: 35.6584421, lon: 139.7328635}, 
                {name: 'Helsinki', id: 1, lat: 60.1697530, lon: 24.9490830}, 
                {name: 'New York', id: 2, lat: 40.7406905, lon:-73.9938438}, 
                {name: 'Amsterdam', id: 3, lat: 52.3650691, lon: 4.9040238},
                {name: 'Dubai', id: 4, lat: 25.092535, lon: 55.1562243}]


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showObservations: true,
      citySelected: 1,
      temperature: '',
      observations: [],
      infoText: ''
    }
  }

  componentWillMount() {
    this.setCurrentDateAndTime()
    this.getAllObservations()
  }

  setCurrentDateAndTime = () => {
    const dateTime = new Date()
    const date = dateTime.toISOString().split('T')[0]
    const time = dateTime.toISOString().slice(11,16)
    this.setState({date: date, time: time})
  }

  getAllObservations = () => {
    const obs = ObservationService.getAll()
    obs.then(observations => {this.setState({observations})})
  }

  toggleShowObservations = () => {
    this.setCurrentDateAndTime()
    const show = this.state.showObservations ? false : true
    this.setState({showObservations: show})
  }

  handleSelectCity = (id) => {
    this.setState({citySelected: id})
  }

  handleFormDataChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSend = (event) => {
    event.preventDefault()
    const dateTime = new Date()
    dateTime.setUTCFullYear(this.state.date.slice(0, 4),
        this.state.date.slice(5, 7)-1,
        this.state.date.slice(8, 10))
    dateTime.setUTCHours(this.state.time.slice(0, 2), this.state.time.slice(3, 5), 0, 0)

    if (this.state.date !== '' && this.state.time !== '' && this.state.temperature !== '') {
      const observation = {temperature: this.state.temperature, location: this.state.citySelected, dateTime: dateTime}
      const sendPromise = ObservationService.send(observation)
      sendPromise.then(() => this.getAllObservations())
      this.setState({temperature: '', infoText: 'Observation sent!'})
    }
    else {
      this.setState({infoText: 'Fill data correctly!'})
    }
    setTimeout(() => {
      this.setState({infoText: ''})
    }, 5000)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <CityList citylist={cities} 
              handleSelectCity={this.handleSelectCity} />
        {this.state.showObservations ? 
          <Observations toggleShowObservations={this.toggleShowObservations}
              citylist={cities}
              citySelected={this.state.citySelected} 
              observations={this.state.observations} /> :
          <InputForm toggleShowObservations={this.toggleShowObservations}
              citylist={cities}
              citySelected={this.state.citySelected}
              temperature={this.state.temperature}
              date={this.state.date} time={this.state.time}
              handleSend={this.handleSend}
              handleFormDataChange={this.handleFormDataChange}
              infoText={this.state.infoText}/>}
      </div>
    )
  }
}

export default App;
