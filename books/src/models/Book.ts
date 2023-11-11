import { model, Schema } from 'mongoose'
import { IBook } from '../types'

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  authors: {
    type: String,
    default: ''
  },
  favorite: {
    type: String,
    default: ''
  },
  fileCover: {
    type: String,
    default: ''
  },
  fileName: {
    type: String,
    default: ''
  },
  fileBook: {
    type: String,
    default: ''
  }
})

export const BookModel = model('Book', bookSchema)
