import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  indexes: [],
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
      if (val) (this as any).setDataValue('email', val.toLocaleLowerCase());
    },
  })
  email: string;
}
