import React, { useState } from 'react'
import Area from '../../components/Field/Area'

interface mess {
  id: number,
  message: string
}

const Messages: React.FC = () => {
  const [mess, setMess] = useState<mess[]>([])
  const [val, setVal] = useState<string>('')

  // useEffect(() => {
  //   subscribe()
  // }, [])

  // const subscribe = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/get-messages')
  //     const data = await response.json()
  //     setMess(prev => [...prev, data])
  //     await subscribe()
  //   } catch(e) {
  //     setTimeout(() => {
  //       subscribe()
  //     }, 500)
  //   }
  // }

  const submitForm = async e => {
    e.preventDefault()
    // fetch('http://localhost:5000/new-message', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id: Date.now(), message: val })
    // }).then(res => res.json())
    //   .then(data => console.log(data))
  }

  return (
    <div>
      <h4>Личные сообщения</h4>

      {mess.map(el => <div style={{border: '1px solid #e3e3e3', borderRadius: '8px', padding: '10px 16px', margin: '0 0 10px'}} key={el.id}>{el.message}</div>)}

      <form onSubmit={submitForm}>
        <div className="input-field">
          <div className="form-floating">
            <textarea
              className="form-control"
              onChange={e => setVal(e.target.value)}
              placeholder="Ваш текст"
              style={{ height: '80px' }}
            ></textarea>
            <label>Ваш текст</label>
          </div>
        </div>
        <button className="btn btn-primary">Отправить</button>
      </form>
    </div>
  )
}

export default Messages