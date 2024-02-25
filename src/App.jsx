import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [dolarOficial, setDolarOficial] = useState(0);
  const [dolarBlue, setDolarBlue] = useState(0);
  const [dolarProm, setDolarProm] = useState(0)
  
  useEffect(() => {
    fetch('https://dolarapi.com/v1/dolares/oficial')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setDolarOficial(data.venta)
      })
  }, [])
  
  useEffect(() => {
    fetch('https://dolarapi.com/v1/dolares/blue')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setDolarBlue(data.venta)
      })
  }, [])

  useEffect(() => {
    setDolarProm((dolarOficial + dolarBlue) / 2)
  }, [dolarBlue, dolarOficial])

  const precio = (multiplicador) => {
    const currency = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    })
    return currency.format(dolarProm * multiplicador)
  }

  return (
    <>
      <h3>Valor promedio entre Dólar Oficial y Dólar Blue Hoy: {precio(1)}</h3>

      Desayuno/Meriénda Económico: {precio(1.25)} - {precio(2.5)}<br />
      Desayuno/Meriénda Medio: {precio(2.5)} - {precio(7.5)}<br />
      Desayuno/Meriénda Caro: {precio(7.5)} - {precio(15)}
      <hr />
      Almuerzo/Cena Económico: {precio(3)} - {precio(6)}<br />
      Almuerzo/Cena Medio: {precio(6)} - {precio(12)}<br />
      Almuerzo/Cena Caro: {precio(12)} - {precio(24)}
      <hr />
      Alquiler Monoambiente: {precio(100)} - {precio(175)}<br />
      Alquiler 1 Hab: {precio(130)} - {precio(250)}<br />
      Alquiler 2 Hab: {precio(225)} - {precio(350)}
      <hr />
      Celular gama baja: {precio(180)} - {precio(400)}<br />
      Celular gama media: {precio(400)} - {precio(600)}<br />
      Celular gama alta: {precio(600)} - {precio(1200)}
      <hr />
      Computadora gama baja: {precio(400)} - {precio(800)}<br />
      Computadora gama media: {precio(800)} - {precio(1600)}<br />
      Computadora gama alta: {precio(1600)} - {precio(4800)}
      <hr />
      Transporte Urbano: {precio(0.3)} - {precio(0.6)}<br />
      Coca-Cola de 2.5 lts: {precio(2)} - {precio(2.5)}<br />
      <hr />
    </>
  )
}

export default App
