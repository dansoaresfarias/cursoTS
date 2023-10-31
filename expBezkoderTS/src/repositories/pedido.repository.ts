import { Op } from "sequelize";
import Pedido from "../models/pedido.model";

interface IPedidoRepository {
  save(pedido: Pedido): Promise<Pedido>;
  retrieveAll(searchParams: {cliente: string, published: boolean}): Promise<Pedido[]>;
  retrieveById(pedidoId: number): Promise<Pedido | null>;
  update(pedido: Pedido): Promise<number>;
  delete(pedidoId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class PedidoRepository implements IPedidoRepository {
  async save(pedido: Pedido): Promise<Pedido> {
    try {
      return await Pedido.create({
        data: pedido.data,
        descricao: pedido.descricao,
        cliente: pedido.cliente,
        preco: pedido.preco,
        published: pedido.published
      });
    } catch (err) {
      throw new Error("Failed to create Pedido!");
    }
  }

  async retrieveAll(searchParams: {cliente?: string, published?: boolean}): Promise<Pedido[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.published) condition.published = true;

      if (searchParams?.cliente)
        condition.cliente = { [Op.like]: `%${searchParams.cliente}%` };

      return await Pedido.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Pedidos!");
    }
  }

  async retrieveById(pedidoId: number): Promise<Pedido | null> {
    try {
      return await Pedido.findByPk(pedidoId);
    } catch (error) {
      throw new Error("Failed to retrieve Pedidos!");
    }
  }

  async update(pedido: Pedido): Promise<number> {
    const { id , data, descricao, cliente, preco, published } = pedido;

    try {
      const affectedRows = await Pedido.update(
        { data, descricao, cliente, preco, published },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Pedido!");
    }
  }

  async delete(pedidoId: number): Promise<number> {
    try {
      const affectedRows = await Pedido.destroy({ where: { id: pedidoId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Pedido!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Pedido.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Pedidos!");
    }
  }
}

export default new PedidoRepository();