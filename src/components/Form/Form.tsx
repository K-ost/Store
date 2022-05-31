import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fields, url } from '../../helpers'
import { newOrder, productType } from '../../interfaces'
import { resetOrders } from '../../store/cartSlice'
import { AppDispatch } from '../../store/store'
import { useFetch } from '../../hooks/http.hook'
import Field from '../Field/Field'
import './form.scss'

interface IForm {
  orders: productType[]
  total: number
}

const Form: React.FC<IForm> = ({ orders, total }) => {
  const [success, setSuccess] = useState<string>('')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState<boolean>(false)
  const { request } = useFetch()

  // onSubmit
  const onSubmit = async data => {
    setLoading(true)
    const newOrder = {
      id: Date.now().toString(),
      orders: [...orders],
      ...data,
      total,
      status: 'process'
    } as newOrder

    const responseData = await request(`${url}/api/order`, 'POST', JSON.stringify(newOrder))
    if (responseData) {
      setLoading(false)
      setSuccess(responseData.message)
      dispatch(resetOrders())
      localStorage.removeItem('orders')
    }
  }

  return (
    <>
      {(orders.length > 0) && <div className="formWrapper">
        <h3>Оформить заявку</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            fields.map(el => <Field
              key={el.id}
              type={el.type}
              label={el.label}
              options={register(el.id, el.options)}
              error={errors[el?.id]?.message}
            />)
          }
          <button className="btn btn-lg btn-primary" type="submit">
            Оформить заявку
            {loading && <Spinner animation="border" variant="light" size="sm" />}
          </button>
        </form>
      </div>}
      {success && 
        <div className="alert alert-success">{success}</div>
      }
    </>
  )
}

export default Form