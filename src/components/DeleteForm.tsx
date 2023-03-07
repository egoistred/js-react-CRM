import ky from "ky";
import React from "react";
import { Client } from "./CRMTable";

function DeleteForm({
  id,
  getClients,
  clients,
  onClose,
}: {
  id: string;
  getClients: Function;
  clients: Client[];
  onClose: () => void;
}) {
  async function handleDelete(e: any) {
    ky.delete(`http://localhost:3000/api/clients/${id}`);
    clients = await ky("http://localhost:3000/api/clients").json();
    getClients(clients);
  }

  return (
    <>
      <h2>Удвлить клиента</h2>
      <p>Вы действительно хотите удалить данного клиента?</p>
      <button onClick={handleDelete}>Удалить</button>
      <button onClick={onClose}>Отмена</button>
    </>
  );
}

export default DeleteForm;
