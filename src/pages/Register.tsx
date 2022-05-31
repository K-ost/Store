import React from 'react'
import { useForm } from 'react-hook-form'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useFetch } from '../hooks/http.hook'
import { login, toast } from '../store/authSlice'
import { registerFields, url } from '../helpers'
import Field from '../components/Field/Field'

const Register: React.FC = () => {
  const { request } = useFetch()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  // onSubmit
  const onSubmit = async data => {
    if (data.password !== data.repass) {
      dispatch(toast('Пароли не равны'))
    } else {
      const response = await request(`${url}/api/register`, 'POST', JSON.stringify(data))
      dispatch(toast(response.message))
      console.log(response)
      
      // Login
      const loginData = {
        email: data.email,
        password: data.password
      }
      const loginResponse = await request(`${url}/api/login`, 'POST', JSON.stringify(loginData))
      dispatch(login(loginResponse))

      // Redirect to home
      navigate('/profile')
    }
  }

  return (
    <>
      <Container>
        <h1>Регистрация</h1>
        <div className="w-50">
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerFields.map(el => (
              <Field
                key={el.id}
                label={el.label}
                type={el.type}
                options={register(el.id, el.options)}
                error={errors[el?.id]?.message}
              />
            ))}
            <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
          </form>
        </div>
      </Container>
    </>
  )
}

export default Register