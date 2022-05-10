import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from './components/input';

type PostFormProps = {
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

type GetFormProps = {
  id: string,
}

function App() {
  const postMethods = useForm<PostFormProps>();
  const { register, handleSubmit } = postMethods

  const getMethods = useForm<GetFormProps>();
  const { handleSubmit: getHandleSubmit } = getMethods


  const [users, setUsers] = useState([] as {id: string}[])
  const [detailedUsers, setDetailedUsers] = useState([] as User[])

  const onPostSubmit = async (data: PostFormProps) => {
    const { data: responseData } = await axios.post('https://eng-soft-clean-node-api.herokuapp.com/api/signup', data)
    setUsers([{id: responseData.id}, ...users])
  }

  const onGetSubmit = async (data: GetFormProps) => {
    const user = await handleGetUser(data.id)

    setDetailedUsers([...detailedUsers, user])
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

  return (
    <div className="App flex justify-center flex-col w-full items-center h-screen">
      <header className="App-header">
      </header>

      <div className='w-[1024px] flex justify-center flex-col items-center'>
        <h2 className="text-3xl font-bold mb-3">Cadastre-se já!</h2>
        <div className="form flex items-center w-full">
          <FormProvider {...postMethods}>
            <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onPostSubmit)}>
              <TextInput name='name'/>
              <TextInput name='email' type='email'/>
              <TextInput name='password' type='password'/>
              
              <select className="p-1 rounded w-full my-1 bg-white border-solid border-2" {...register('plan')}>
                <option value="" disabled>Plan</option>
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>

              <button className='p-2 border-solid rounded hover:text-green-200 hover:border-green-200 border-2 transition-colors my-1 w-full' type="submit">Cadastrar</button>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="w-[1024px] flex justify-center items-center flex-col">
        <h2 className="text-2xl font-bold my-7">Users List</h2>
        {users.map((user) => {
          return (
            <div>
              <span>{user.id}</span>
            </div>
          )
        })}
      </div>

      <div className="w-[1024px] flex justify-center items-center flex-col">
        <h2 className="text-2xl font-bold my-7">Get User Info</h2>
        <FormProvider {...getMethods}>
            <form className="flex flex-col justify-center w-full" onSubmit={getHandleSubmit(onGetSubmit)}>
              <TextInput name='id'/>
              <button className='p-2 border-solid rounded hover:text-green-200 hover:border-green-200 border-2 transition-colors my-1 w-full' type="submit">Buscar</button>
            </form>
        </FormProvider>
        <div className="m-1 w-full flex flex-col justify-center border-dashed border-2 rounded">
          {detailedUsers.map((user) => {
            return (
              <div className="m-1 p-2">
                <p className='font-bold'>ID:<span className='ml-1 font-normal'>{user.id}</span></p>
                <span>{user.name}</span>
                <span>{user.email}</span>
                <span>{user.plan}</span>
              </div>
            )
          })}
        </div>
        
      </div>
    </div>
  );
}


export default App;
