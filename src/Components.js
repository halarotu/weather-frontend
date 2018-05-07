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
        .sort( (obs1, obs2) => new Date(obs1.dateTime) - new Date(obs2.dateTime) < 0)
    const maxTempObservation = maxTempOfDay(observationsOfThisCity)
    const minTempObservation = minTempOfDay(observationsOfThisCity)
    const latestTemperature = latestObservation(observationsOfThisCity)

    return (
      <div className='Observations Section'>  
        <button className='ShowOtherPage' onClick={props.toggleShowObservations} >Input new observation!</button>
        <CityName city={city} />
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
        {observationsOfThisCity.length > 0 ? <AllObservations observations={observationsOfThisCity}/> : ''}
      </div>
    )
}

const AllObservations = (props) => {
    return (
        <div className='AllObservations'>
            <h5>All observations:</h5>
            <table>
                <tbody>
                    <tr><th>Temp (&deg;C)</th><th>Date</th><th>Time</th></tr>
                    {props.observations.map(o => <Observation observation={o} key={o.id} />) }
                </tbody>
            </table>
        </div>
    )
}

const Observation = (props) => {
    const dateTime = new Date(props.observation.dateTime)
    return (
        <tr><td>{Number(props.observation.temperature).toFixed(1)}</td>
            <td>{dateTime.toLocaleDateString()}</td><td>{dateTime.toLocaleTimeString()}</td></tr>
    )
}

const CityName = (props) => {
    const mapSource = 'https://google.com/maps/?q=' + props.city.lat + ',' + props.city.lon
    return (
        <div className='CityName'>
            <h3>{props.city.name}</h3> <a target="_blank" href={mapSource}>({props.city.lat}, {props.city.lon})</a>
        </div>
    )
}
  
const InputForm = (props) => {
    const city = props.citylist.find(c => c.id === props.citySelected)
    
    return (
        <div className='InputForm Section' >
            <button className='ShowOtherPage' onClick={props.toggleShowObservations} >Show observations!</button>
            <CityName city={city} />
            <div className="InputFormWrapper" >
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
        </div>
    )
}

const InfoBox = (props) => {
    return (
        <div className='InfoBox'>
            <h4 className='InfoText' >{props.message}</h4>
        </div>
    )
}


export {Header, CityList, Observations, InputForm, InfoBox}