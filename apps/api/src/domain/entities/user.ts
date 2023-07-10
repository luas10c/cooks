

interface Props {
  id: string
  name: string
  email: string
  password: string
  username: string
  avatarURL?: string | null
  birthday: Date
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class User {
  public id: string
  public name: string
  public email: string
  public password: string
  public username: string
  public avatarURL?: string | null
  public birthday: Date
  public createdAt: Date
  public updatedAt?: Date | null
  public deletedAt?: Date | null
  
  constructor(props: Props) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.username = props.username
    this.avatarURL = props.avatarURL
    this.birthday = props.birthday
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt

  }

  toJSON() {
    return {
      name: this.id,
      email: this.email,
      birthday: this.birthday,
      avatarURL: this.avatarURL,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}