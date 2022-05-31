export interface IFeats {
  sims?: number
  simFormat?: string
  screen?: number
  screenSize?: string
  cpu?: number
  hard?: number
  memory?: number
  camera?: number
  battery?: number
}

export interface productType {
  id: string
  title: string
  slug: string
  price: number
  category: string
  img: string[]
  description?: string
  feats?: IFeats
  count?: number
}

export interface authType {
  msg: string
  token: string
  id: string
  email: string
  username: string
}

export interface authInputProps {
  label: string
  type: string
  place?: string
  handler: (value: string) => void
  err?: string
}

export interface userType {
  id: string
  firstname: string
  lastname: string
  email: string
  role: string
}

export interface pattern {
  value: RegExp
  message: string
}

export interface fieldOptions {
  required?: boolean | string
  maxLength?: number
  pattern?: RegExp | pattern
  min?: number
}

export interface field {
  id: string
  type: string
  label: string
  options: fieldOptions
}

export interface newOrder {
  id: string
  orders: productType[]
  total: number
  email: string
  firstname: string
  city: string
  tel: string
  lastname?: string
  status: 'process' | 'cancel' | 'complete' | 'onway' | 'delivered' | 'done'
}

export interface IBrand {
  id: string
  title: string
  type?: string
}

export interface IFiltersType {
  category?: string
  price?: string
}
export interface IFilters {
  sort?: string
  filter?: IFiltersType
}

export interface IReview {
  id: string
  author: string
  body: string
  productID: string
}
