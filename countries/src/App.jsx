import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name)=>{
  console.log(name);
  const [country, setCountry] = useState(null)
  useEffect(() =>{
    if(!name) return
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const result = response.data.find(c => c.name.common.toLowerCase() === name.toLowerCase())
        console.log(result);
        setCountry(result)
      })
    },[name])

  return country
}

const Country = ({country}) => {
  console.log(country);
  if(!country) return null
  if(!country.found){
    return(
      <div>
        not found...
      </div>
    )
  }

  return(
    <div>
      <h3>{country.data.name.common}</h3>
      <div>Capital: {country.data.capital[0]}</div>
      <div>Population: {country.data.population}</div>
      <img src={country.data.flags.svg} style={{height:'100px', minWidth:'100px'}} alt={`flag of ${country.data.name.common}`} />
    </div>
  )
}

function App() {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>
      <Country country={country ? {data: country, found: true} : {data: null, found: false}} />
    </div>
  )
}

export default App
