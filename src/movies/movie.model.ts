import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'movies',
  freezeTableName: true,
  paranoid: true,
  timestamps: true,
  underscored: true,
})
export class Movie extends Model<Movie> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
}
