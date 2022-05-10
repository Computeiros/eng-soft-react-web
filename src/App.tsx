import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useForm } from "react-hook-form";

type FormProps = {
  name: string,
  password: string,
  plan: string,
  email: string
}
type User = {
  name: string,
  email: string,
  id: string,
  plan: string
}


function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [users, setUsers] = useState([] as {id: string}[])
  const [detailedUsers, setDetailedUsers] = useState([{
    name: 'oi',
    plan: 'Free',
    email: 'teste@teste.com',
    id:'123'
  }] as User[])

  const onSubmit = async (data: FormProps) => {
    const { data: responseData } = await axios.post('https://eng-soft-clean-node-api.herokuapp.com/api/signup', data)
    console.log(responseData)
    setUsers([{id: responseData.id}, ...users])
  }

  const handleGetUser = async(id: string): Promise<User> => {
    const { data } = await axios.get(`https://eng-soft-clean-node-api.herokuapp.com/api/info/${id}`)
    return {
      name: data.name,
      email: data.email,
      id: data.id,
      plan: data.plan
    }
  }

  useEffect(() => {
    users.forEach(async (user) => {
      const detailedUser = await handleGetUser(user.id)
      setDetailedUsers([...detailedUsers, detailedUser])
    })
  },[users])

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div>
        <h2>Cadastre-se já!</h2>
        <div className="form">
          <form onSubmit={handleSubmit((data) => onSubmit(data as any))}>
            <label htmlFor="name">
              <input type="text" {...register('name')} placeholder="name"/>
            </label>
            <label htmlFor="email">
              <input type="email" {...register('email')} placeholder="email"/>
            </label>
            <label htmlFor="password">
              <input type="password" {...register('password')} placeholder="password" />
            </label>
            <select {...register('plan')}>
              <option value="" disabled>Plan</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>

            <button type="submit">Cadastrar</button>
          </form>
        </div>

      </div>

      <div>
        <>
        <h2>Users</h2>
        {detailedUsers.map((user) => {
          return (
            <div>
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
            </div>
          )
        })}
        </>
      </div>
    </div>
  );
}

export default App;
