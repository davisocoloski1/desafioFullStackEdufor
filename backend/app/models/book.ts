import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Book extends BaseModel {
  public static table = 'books'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare autor: string

  @column()
  declare ano_lancamento: number

  @column()
  declare genero: string

  @column()
  declare isbn: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true})
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null
}