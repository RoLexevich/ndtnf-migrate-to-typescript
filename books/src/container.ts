import { Container, decorate, injectable } from 'inversify'
import 'reflect-metadata'
import { BooksRepository } from './BooksRepository'

const container = new Container()

decorate(injectable(), BooksRepository)
container.bind(BooksRepository).toSelf().inSingletonScope()

export { container }
