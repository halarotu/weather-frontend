const getObservationsOfDay = (observations) => {
    if (observations.length > 0) {
        return observations.filter(o => (new Date().getTime() - new Date(o.dateTime).getTime()) < 24 * 60 * 60 * 1000)
    }
    return []
}

const maxTempOfDay = (observations) => {
    const observationsOfDay = getObservationsOfDay(observations)
    if (observationsOfDay.length > 0) {
        return observationsOfDay.reduce((max, current) => max.temperature - current.temperature < 0 ? current : max)
    }
    return null
}

const minTempOfDay = (observations) => {
    const observationsOfDay = getObservationsOfDay(observations)
    if (observationsOfDay.length > 0) {
        return observationsOfDay.reduce((min, current) => min.temperature - current.temperature > 0 ? current : min)
    }
    return null
}

const latestObservation = (observations) => {
    if (observations.length > 0) {
        return observations.reduce((latest, current) => new Date(latest.dateTime) - new Date(current.dateTime) > 0 ? latest : current)
    }
    return null
}

export {maxTempOfDay, minTempOfDay, latestObservation}