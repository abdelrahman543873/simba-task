import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  AllowNull,
  Unique,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table({
  timestamps: true,
  paranoid: true,
  indexes: [],
})
export class Transaction extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  from: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  to: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  amount: number;

  @Unique
  @AllowNull(false)
  @Column
  currency: string;
}
