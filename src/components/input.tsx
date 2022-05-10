import { useFormContext } from "react-hook-form"

type TextInputProps = {
  name: string,
  type?: 'password' | 'text' | 'email'
}
export const TextInput = ({name, type = 'text'}: TextInputProps) => {
  const { register } = useFormContext()

  return (
    <label className="my-1 w-full " htmlFor={name}>
      <input className="p-2 rounded border-solid border-2 w-full focus:outline-none focus:border-green-200 transitions-colors" type={type} {...register(name)} placeholder={name} />
    </label>
  )
}
