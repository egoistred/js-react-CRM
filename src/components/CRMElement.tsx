import React from "react";
import { ReactSVG } from "react-svg";
import { Client } from "./CRMTable";
import ContactDefaultIcon from "../ui/ContactDefaultIcon";
import ContactTelIcon from "../ui/ContactTelIcon";
import ContactEmailIcon from "../ui/ContactEmailIcon";
import ContactVkIcon from "../ui/ContactVkIcon";
import ContactFbIcon from "../ui/ContactFbIcon";

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
      day = date.getDate().toString();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}.${month}.${year}`;
  }

  function getHours(fullTime: string) {
    let date = new Date(fullTime),
      hours = date.getHours().toString(),
      minutes = date.getMinutes().toString();
    if (minutes.length < 2) minutes = "0" + minutes;
    if (hours.length < 2) hours = "0" + hours;
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
      <td>
        {client?.contacts?.length > 0 &&
          client?.contacts.map((contact) =>
            contact.type === ("Телефон" || "ДопТелефон") ? (
              <ContactTelIcon
                content={`${contact.value}`}
                type={`tel:${contact.value}`}
                id={client.id}
              />
            ) : contact.type === "Email" ? (
              <ContactEmailIcon
                content={`${contact.value}`}
                type={`mailto:${contact.value}`}
                id={client.id}
              />
            ) : contact.type === "VK" ? (
              <ContactVkIcon
                content={`${contact.value}`}
                type={`${contact.value}`}
                id={client.id}
              />
            ) : contact.type === "Facebook" ? (
              <ContactFbIcon
                content={`${contact.value}`}
                type={`${contact.value}`}
                id={client.id}
              />
            ) : (
              ""
            )
          )}
      </td>
      <td>
        <button onClick={() => setChangeModal(true)}>Изменить</button>
        <button onClick={deleteHandler}>Удалить</button>
      </td>
    </tr>
  );
}
