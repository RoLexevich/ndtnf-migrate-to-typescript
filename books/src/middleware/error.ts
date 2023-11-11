import { Response } from 'express'

export default (_req: unknown, res: Response) => {
  res.render('error/404', { title: '404 | страница не найдена' })
}
