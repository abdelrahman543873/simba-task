import {
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
  indexes: []
})
export class School extends Model<School> {
}
