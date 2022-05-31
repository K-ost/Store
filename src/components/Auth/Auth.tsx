import React from 'react'
import Field from '../Field/Field'
import ModalBox from '../ModalBox/ModalBox'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authFields, url } from '../../helpers'
import { useFetch } from '../../hooks/http.hook'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { login, toast } from '../../store/authSlice'

interface IAuth {
  show: boolean
  hide: () => void
}

const Auth: React.FC<IAuth> = ({ show, hide }) => {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const { request } = useFetch()
  const dispatch = useDispatch<AppDispatch>()

  // handleSubmit
  const onSubmit = async data => {
    const response = await request(`${url}/api/login`, 'POST', JSON.stringify(data))
    if (!response.success) {
      dispatch(toast(response.ermsg))
    } else {
      dispatch(toast(response.message))
      dispatch(login(response))
      hide()
    }
  }

  return (
    <ModalBox
      title="Авторизация"
      show={show}
      hide={hide}
      nofooter={true}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {authFields.map(field => (
          <Field
            key={field.id}
            label={field.label}
            type={field.type}
            options={register(field.id, field.options)}
            error={errors[field?.id]?.message}
          />
        ))}
        <div className="input-field">
          <button type="submit" className="btn btn-primary">Войти</button>
        </div>
      </form>
      <div className="input-field last">
        <Link to="/register" onClick={hide}>Регистрация</Link>
      </div>
    </ModalBox>
  )
}

export default Auth