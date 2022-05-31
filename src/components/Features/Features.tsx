import React from 'react'
import { IFeats } from '../../interfaces'
import './features.scss'

interface IFeatures {
  details: IFeats
}

const Features: React.FC<IFeatures> = ({ details }) => {
  return (
    <>
      <h4>Характеристики</h4>
      <table className="table table-striped features">
        <tbody>
          {details?.sims && <tr>
            <th>Кол-во сим карт</th>
            <td>{details?.sims}</td>
          </tr>}
          {details?.simFormat && <tr>
            <th>Формат сим карты</th>
            <td>{details?.simFormat}</td>
          </tr>}
          {details?.screen && <tr>
            <th>Размер экрана</th>
            <td>{details?.screen}</td>
          </tr>}
          {details?.screenSize && <tr>
            <th>Разрешение экрана</th>
            <td>{details?.screenSize}</td>
          </tr>}
          {details?.cpu && <tr>
            <th>Процессор</th>
            <td>{details?.cpu}</td>
          </tr>}
          {details?.hard && <tr>
            <th>Память</th>
            <td>{details?.hard}</td>
          </tr>}
          {details?.memory && <tr>
            <th>ОЗУ</th>
            <td>{details?.memory}</td>
          </tr>}
          {details?.camera && <tr>
            <th>Камера</th>
            <td>{details?.camera}</td>
          </tr>}
          {details?.battery && <tr>
            <th>Батарея</th>
            <td>{details?.battery}</td>
          </tr>}
        </tbody>
      </table>
    </>
  )
}

export default Features