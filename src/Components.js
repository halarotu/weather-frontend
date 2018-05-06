import React from 'react'
import {maxTempOfDay, minTempOfDay, latestObservation} from './Util'
import './App.css';

const Header = () => {
    return (
    <div className='Header' >Weather Observations</div>
    )
}
  
const CityList = (props) => {
    return (
    <div className='CityList'>
      <div className='CityTitle'>Select city:</div>
      {props.citylist.map(city => <City name={city.name} id={city.id} key={city.id} 
            handleSelectCity={props.handleSelectCity} />)}
    </div>
    )
}
  
const City = (props) => {
    return (
      <div className='City' onClick={() => props.handleSelectCity(props.id)}>{props.name}</div>
    )
}

const Observations = (props) => {
    const city = props.citylist.find(c => c.id === props.citySelected)
    const observationsOfThisCity = props.observations.filter(o => o.location === props.citySelected)
    const maxTempObservation = maxTempOfDay(observationsOfThisCity)
    const minTempObservation = minTempOfDay(observationsOfThisCity)
    const latestTemperature = latestObservation(observationsOfThisCity)

    return (
      <div className='Observations'>  
        <button className='ShowOtherPage' onClick={props.toggleShowObservations} >Input new observation!</button>
        <h3>{city.name}</h3>
        <div className='LatestTemperature'> 
            <h5>Latest temperature:</h5> 
                {latestTemperature ? Number(latestTemperature.temperature).toFixed(1) : '--'} &deg;C
        </div>
        <div className='LastHours'> 
            <h5>Last 24 hours:</h5>
            <div>Max temperature: {maxTempObservation ?
                Number(maxTempObservation.temperature).toFixed(1) : '--'} &deg;C</div>
            <div>Min temperature: {minTempObservation ? 
                Number(minTempObservation.temperature).toFixed(1) : '--'} &deg;C</div>
        </div>
        <div className='AllObservations'>
            <h5>All observations:</h5>
            <table>
                <tbody>
                    {observationsOfThisCity.map(o => <Observation observation={o} key={o.id} />) }
                </tbody>
            </table>
        </div>
      </div>
    )
}

const Observation = (props) => {
    return (
        <tr><td>{Number(props.observation.temperature).toFixed(1)}</td><td>&deg;C</td><td>{props.observation.dateTime}</td></tr>
    )
}
  
const InputForm = (props) => {
    const city = props.citylist.find(c => c.id === props.citySelected)
    
    return (
        <div className='InputForm' >
            <button className='ShowOtherPage' onClick={props.toggleShowObservations} >Show observations!</button>
            <h3>{city.name}</h3>
            <form onSubmit={props.handleSend} > 
                <h5>Send new weather observation from {city.name}</h5>
                <div className='FormLabelInput'>Temperature:</div>
                <div className='FormLabelInput'><input name='temperature' type='number' onChange={props.handleFormDataChange} 
                            value={props.temperature}/> &deg;C
                </div>
                <div className='FormLabelInput'>Date:</div> 
                <div className='FormLabelInput'>
                    <input name='date' type='date' onChange={props.handleFormDataChange} value={props.date}/>
                </div>
                <div className='FormLabelInput'>Time:</div> 
                <div className='FormLabelInput'>
                    <input name='time' type='time' onChange={props.handleFormDataChange} value={props.time}/> (UTC)
                </div>
                <div>
                    <button className='SendButton'>Send!</button>
                </div>
            </form>
            {props.infoText ? <InfoBox message={props.infoText}/> : ''}
        </div>
    )
}

const InfoBox = (props) => {
    return (
        <div className='InfoBox'>
            <h4>{props.message}</h4>
        </div>
    )
}


export {Header, CityList, Observations, InputForm, InfoBox}