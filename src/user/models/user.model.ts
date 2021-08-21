import {
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  indexes: []
})
@ObjectType()
export class School extends Model<School> {
}
