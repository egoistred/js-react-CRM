import React from "react";
import { Client } from "./CRMTable";

export function CRMElement({
  client,
  setDeleteModal,
  setChangeModal,
  getId,
}: {
  client: Client;
  setDeleteModal: Function;
  setChangeModal: Function;
  getId: Function;
}) {



  function deleteHandler() {
    setDeleteModal(true);
    let id = document.getElementById(`${client.id}`);
    getId(id?.id);
  }

  function getDate(fullTime: string) {
    let date = new Date(fullTime),
      year = date.getFullYear(),
      month = (date.getMonth() + 1).toString(),
      day = date.getDate();
      if (month.length < 2) month = "0" + month;

    return `${day}.${month}.${year}`;
  }

  function getHours(fullTime: string) {
    let date = new Date(fullTime),
      hours = date.getHours(),
      minutes = date.getMinutes().toString();
      if (minutes.length < 10) {
        minutes = "0" + minutes;
      }
    return `${hours}:${minutes}`;
  }

  return (
    <tr id={client.id}>
      <td>{client.id}</td>
      <td>{`${client.surname} ${client.name} ${client.lastName}`}</td>
      <td>
        <span>{getDate(client.createdAt)}</span>
        <span>{getHours(client.createdAt)}</span>
      </td>
      <td>
        <span>{getDate(client.updatedAt)}</span>
        <span>{getHours(client.updatedAt)}</span>
      </td>
      <td></td>
      <td>
        <button onClick={() => setChangeModal(true)}>Изменить</button>
        <button onClick={deleteHandler}>Удалить</button>
      </td>
    </tr>
  );
}
