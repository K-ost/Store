import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Field from '../../components/Field/Field'
import { addProductFields, url } from '../../helpers'
import { useFetch } from '../../hooks/http.hook'
import { productType } from '../../interfaces'
import { toast } from '../../store/authSlice'
import { AppDispatch } from '../../store/store'


const AddProduct: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { request } = useFetch()
  const dispatch = useDispatch<AppDispatch>()

  // onSubmit
  const onSubmit = async data => {
    const imagesList = data.img.split(', ')
    const slug = data.title.toLowerCase().split(' ').join('-')

    const { title, price, category, description, sims, simFormat, screen, screenSize, cpu, hard, memory, camera, battery } = data
    const newProduct = {
      id: Date.now().toString(),
      title, slug, price, category, description,
      img: imagesList,
      feats: { sims, simFormat, screen, screenSize, cpu, hard, memory, camera, battery }
    } as productType
    const response = await request(`${url}/api/addproduct`, 'POST', JSON.stringify(newProduct))
    dispatch(toast(response.message))
    reset()
  }

  return (
    <div>
      <h3>Добавить товар</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        {addProductFields.map(el => (
          <Field
            key={el.id}
            type={el.type}
            label={el.label}
            options={register(el.id, el.options)}
            error={errors[el?.id]?.message}
          />
        )).slice(0,5)}
        <Row>
          {addProductFields.map(el => (
            <Col xs="12" lg="4" key={el.id}>
              <Field
                type={el.type}
                label={el.label}
                options={register(el.id, el.options)}
                error={errors[el?.id]?.message}
              />
            </Col>
          )).slice(5)}
        </Row>
        <div className="input-field">
          <textarea className="form-control" {...register("description", {})} />
        </div>
        <div className="input-field">
          <button type="submit" className="btn btn-primary">Добавить товар</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct