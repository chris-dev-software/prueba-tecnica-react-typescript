import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Users } from './components/Users'
import { SortBy, User } from './types.d'

const USER_NUMBERS = 100

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [searchByCountry, setSearchByCountry] = useState('')
  const initialUsers = useRef<User[]>([])

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${USER_NUMBERS}`)
      .then(response => response.json())
      .then(json => {
        setUsers(json.results)
        initialUsers.current = json.results
      })
  }, [])

  const toggleShowColors = () => {
    setShowColors(prevShowColors => !prevShowColors)
  }

  const toggleSortByCountry = () => {
    const newSorting = sorting === SortBy.NONE
      ? SortBy.COUNTRY
      : SortBy.NONE
    setSorting(newSorting)
  }

  const handleResetUsers = () => {
    setUsers(initialUsers.current)
  }

  const filterdUsersByCountry = useMemo(() => {
    return searchByCountry
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(searchByCountry.toLowerCase())
      })
      : users
  }, [users, searchByCountry])

  const sortedUsersByCountry = useMemo(() => {
    if (sorting === SortBy.NONE) return filterdUsersByCountry

    if (sorting === SortBy.NAME) {
      return [...filterdUsersByCountry].sort((a, b) => a.name.first.localeCompare(b.name.first))
    }

    if (sorting === SortBy.LAST) {
      return [...filterdUsersByCountry].sort((a, b) => a.name.last.localeCompare(b.name.last))
    }

    return [...filterdUsersByCountry].sort((a, b) => a.location.country.localeCompare(b.location.country))
  }, [sorting, filterdUsersByCountry])

  const deleteUser = (uuid : string) => {
    const newUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(newUsers)
  }
  const handleChangeSort = (sort : SortBy) => {
    setSorting(sort)
  }
  return (
    <div>
      <h1>Prueba Técnica</h1>
      <header className='filters'>
        <button onClick={toggleShowColors}>
          {showColors ? 'Ocultar Colores' : 'Mostrar Colores'}
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'Quitar el orden por país': 'Ordenar por país'}
        </button>

        <button onClick={handleResetUsers}>
          Reestablecer Usuarios
        </button>

        <input onChange={(e) => setSearchByCountry(e.target.value)} type="text" placeholder='Buscar' />

      </header>

      <main>
        <Users handleChangeSort={handleChangeSort} showColors={showColors} users={sortedUsersByCountry} deleteUser={deleteUser} />
      </main>

    </div>
  )
}

export default App
