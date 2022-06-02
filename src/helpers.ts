import { gql } from "@apollo/client"
import { field } from "./interfaces"

// Links
export const url: string = 'https://shop-kost.herokuapp.com'
export const oldurl: string = 'http://localhost:5000'

export const REMOVE_PRODUCT = gql`
  mutation remove($id: ID) {
    removeProduct(id: $id) { message }
  }
`
export const ALL_USERS = gql`
  query allUsers {
    getAllUsers { id, firstname, lastname, email, role }
  }
`
export const ALL_EDIT_PRODUCTS = gql`
  query allEditProducts {
    allEditProducts { id, title, slug }
  }
`
export const REMOVE_USER = gql`
  mutation removeUser($email: String) {
    removeUser(email: $email) { message }
  }
`
export const GET_CATS = gql`
  query GetALlCats {
    getCategories { id, title }
  }
`
export const REMOVE_REVIEW = gql`
  mutation RemoveReview($id: String) {
    removeReview(id: $id) { message }
  }
`
export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    getAllReviews { id, author, productID, body }
  }
`
export const GET_CPU = gql`
  query Get_CPU {
    getFilterCPU { id, title }
  }
`

export const scoreFunc = rate => String(rate && Math.round(rate.value / rate.count))



// Fields of auth form
export const authFields = [
  {
    type: "text",
    id: "email",
    label: "E-mail",
    options: {
      required: 'Required field',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Incorrect e-mail'
      }
    }
  },
  { type: "password", id: "password", label: "Password", options: {required: 'Required field'} }
] as field[]


// Add Review Fields
export const reviewFields = [
  { type: "text", id: "author", label: "Username", options: {required: 'Required field'} },
  {
    type: "email",
    id: "email",
    label: "E-mail",
    options: {
      required: 'Required field',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Incorrect e-mail'
      }
    }
  }
] as field[]


// Fields of basket form
export const fields = [
  { type: "text", id: "firstname", label: "First name", options: {required: 'Required field'} },
  { type: "text", id: "lastname", label: "Last name", options: {maxLength: 80} },
  {
    type: "email",
    id: "email",
    label: "E-mail",
    options: {
      required: 'Required field',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Incorrect e-mail'
      }
    }
  },
  { type: "tel", id: "tel", label: "Phone", options: {required: 'Required field'} },
  { type: "select", id: "city", label: "City" }
] as field[]


// Fields of register form
export const registerFields = [
  { type: "text", id: "firstname", label: "First name", options: {required: 'Required field', min: 3} },
  { type: "text", id: "lastname", label: "Last name", options: {min: 3} },
  {
    type: "email",
    id: "email",
    label: "E-mail",
    options: {
      required: 'Required field',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Incorrect e-mail'
      }
    }
  },
  { type: "password", id: "password", label: "Password", options: {required: 'Required field', min: 6} },
  { type: "password", id: "repass", label: "Re-password", options: {required: 'Required field', min: 6} }
] as field[]


// add product fields
export const addProductFields = [
  { type: "text", id: "title", label: "Заголовок товара", options: {required: 'Обязательное поле', min: 6, maxLength: 80} },
  { type: "number", id: "price", label: "Цена", options: {required: 'Обязательное поле'} },
  { type: "text", id: "category", label: "Категория", options: {required: 'Обязательное поле'} },
  { type: "text", id: "img", label: "Изображение" },
  { type: "text", id: "sims", label: "Кол-во сим-карт" },
  { type: "text", id: "simFormat", label: "Формат сим-карты" },
  { type: "text", id: "screen", label: "Экран" },
  { type: "text", id: "screenSize", label: "Разрешение экрана" },
  { type: "text", id: "cpu", label: "Процессор" },
  { type: "text", id: "hard", label: "Память" },
  { type: "text", id: "memory", label: "ОЗУ" },
  { type: "text", id: "camera", label: "Камера" },
  { type: "text", id: "battery", label: "Батарея" },
] as field[]


