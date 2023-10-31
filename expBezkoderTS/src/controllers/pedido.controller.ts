import { Request, Response } from "express";
import Pedido from "../models/pedido.model";
import PedidoRepository from "../repositories/pedido.repository";

export default class pedidoController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const pedido: pedido = req.body;
      if (!pedido.published) pedido.published = false;

      const savedpedido = await pedidoRepository.save(pedido);

      res.status(201).send(savedpedido);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving pedidos."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const pedidos = await pedidoRepository.retrieveAll({ title });

      res.status(200).send(pedidos);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving pedidos."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const pedido = await pedidoRepository.retrieveById(id);

      if (pedido) res.status(200).send(pedido);
      else
        res.status(404).send({
          message: `Cannot find pedido with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving pedido with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let pedido: pedido = req.body;
    pedido.id = parseInt(req.params.id);

    try {
      const num = await pedidoRepository.update(pedido);

      if (num == 1) {
        res.send({
          message: "pedido was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update pedido with id=${pedido.id}. Maybe pedido was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating pedido with id=${pedido.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await pedidoRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "pedido was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete pedido with id=${id}. Maybe pedido was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete pedido with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await pedidoRepository.deleteAll();

      res.send({ message: `${num} pedidos were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all pedidos."
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const pedidos = await pedidoRepository.retrieveAll({ published: true });

      res.status(200).send(pedidos);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving pedidos."
      });
    }
  }
}