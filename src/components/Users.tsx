import { SortBy, User } from '../types.d'

interface Props{
  users: User[],
  showColors: boolean,
  deleteUser: (uuid : string) => void,
  handleChangeSort : (sort : SortBy) => void
}

export function Users ({ users, showColors, deleteUser, handleChangeSort }:Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => handleChangeSort(SortBy.NAME)}>Nombre</th>
          <th className='pointer' onClick={() => handleChangeSort(SortBy.LAST)}>Apellido</th>
          <th className='pointer' onClick={() => handleChangeSort(SortBy.COUNTRY)}>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody className={showColors ? 'show-colors' : ''}>
        {
          users.map((user) => {
            return (
              <tr key={user.login.uuid}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>
                  {user.name.first}
                </td>
                <td>
                  {user.name.last}
                </td>
                <td>
                  {user.location.country}
                </td>
                <td>
                  <button onClick={() => deleteUser(user.login.uuid)}>Eliminar</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
