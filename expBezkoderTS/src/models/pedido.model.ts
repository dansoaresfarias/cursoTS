import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "pedidos",
})
export default class Pedido extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.DATE,
    field: "data"
  })
  data?: Date;

  @Column({
    type: DataType.STRING(255),
    field: "descricao"
  })
  descricao?: string;

  @Column({
    type: DataType.STRING(45),
    field: "cliente"
  })
  cliente?: string;

  @Column({
    type: DataType.DECIMAL(6,2),
    field: "preco"
  })
  preco?: number;

  @Column({
    type: DataType.BOOLEAN,
    field: "published"
  })
  published?: boolean;
}