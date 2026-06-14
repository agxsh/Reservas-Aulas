import { db } from `./firebase`
import { collection, addDoc, getDocs } from `firebase/firestore`
import { useEffect } from `react`
import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

//Ejecutar: npm.cmd run dev

function App() {

  const [reservas, setReservas] = useState([])

  const [mostrarModal, setMostrarModal] = useState(false)

  const [nombre, setNombre] = useState("")

  const [aula, setAula] = useState("Principal")

  const [inicioSeleccionado, setInicioSeleccionado] = useState(null)

  const [finSeleccionado, setFinSeleccionado] = useState(null)

  const manejarSeleccion = (info) => {

    setInicioSeleccionado(info.start)
    setFinSeleccionado(info.end)

    setMostrarModal(true)
  }

  const guardarReserva = () => {

    if (!nombre.trim()) {
      alert("Ingresá un nombre")
      return
    }

    const existeConflicto = reservas.some((reserva) => {
      if(reserva.aula !== aula){
        return false
      }
      return (
        inicioSeleccionado < reserva.end &&
        finSeleccionado > reserva.start
      )
    })

    if(existeConflicto){
      alert(`El aula ${aula} ya está ocupado este horario`)
      return
    }

    const nuevaReserva = {
      title: `${nombre} - ${aula}`,
      aula: aula,
      start: inicioSeleccionado,
      end: finSeleccionado
    }

    setReservas([...reservas, nuevaReserva])

    setNombre("")
    setAula("Principal")
    setMostrarModal(false)
  }

  const eliminarReserva = (info) => {

    const confirmar = window.confirm(
      `Desea eliminar la reserva de ${info.event.title}?`
    )

    if(!confirmar) return

    const nuevaReservas = reservas.filter(
      reserva =>
        !(
          reserva.start.getTime() === info.event.start.getTime() &&
          reserva.title === info.event.title
        )
    )

    setReservas(nuevaReservas)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistema de Reservas</h1>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ]}
        initialView="timeGridWeek"
        selectable={true}
        select={manejarSeleccion}
        eventClick={eliminarReserva}
        events={reservas}
        height="80vh"
      />
      {mostrarModal && (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}
    >

    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '300px'
      }}
    >
      <h2>Nueva Reserva</h2>

      <p>
        Horario:
        {inicioSeleccionado && finSeleccionado &&
          ` ${inicioSeleccionado.toLocaleDateString()}
            ${inicioSeleccionado.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
          })}
          -
          ${finSeleccionado.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}`
        }
      </p>

      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Aula</label>
      <select
        value={aula}
        onChange={(e) => setAula(e.target.value)}
        style={{ width: '100%', marginBottom: '20px' }}
      >
        <option>Principal</option>
        <option>Fondo</option>
        <option>Chica</option>
      </select>

      <button onClick={() => setMostrarModal(false)}>
        Cancelar
      </button>

      <button onClick={guardarReserva}>
      Guardar
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default App