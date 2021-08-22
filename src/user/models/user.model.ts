import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column({
    set(val: string) {
      if (val) this.setDataValue('email', val.toLowerCase());
    },
  })
  email: string;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.FLOAT })
  balance: number;

  @AllowNull(false)
  @Default('USD')
  @Column
  currency: string;

  token: string;
}
