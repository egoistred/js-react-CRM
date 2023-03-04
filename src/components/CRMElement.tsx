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
  getClient,
}: {
  client: Client;
  setDeleteModal: Function;
  setChangeModal: Function;
  getId: Function;
  getClient: Function;
}) {
  function deleteHandler() {
    setDeleteModal(true);
    let id = document.getElementById(`${client.id}`);
    getId(id?.id);
    getClient(client);
  }
  function changeHandler() {
    setChangeModal(true);
    let id = document.getElementById(`${client.id}`);
    getId(id?.id);
    getClient(client);
    console.log(client);
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
    <tr id={client.id} className="table_row">
      <td className="id">{client.id.slice(0, 6)}</td>
      <td className="fullname">{`${client.surname} ${client.name} ${client.lastName}`}</td>
      <td className="time_created">
        <span className="date">{getDate(client.createdAt)}</span>
        <span className="hours">{getHours(client.createdAt)}</span>
      </td>
      <td className="time_changed">
        <span className="date">{getDate(client.updatedAt)}</span>
        <span className="hours">{getHours(client.updatedAt)}</span>
      </td>
      <td className="contacts">
        <div className="contacts-wrapper">
        {client?.contacts?.length > 0 &&
          client?.contacts.map((contact, i) =>
            contact.type === ("Телефон" || "ДопТелефон") ? (
              <ContactTelIcon
                key={i}
                content={`${contact.value}`}
                type={`tel:${contact.value}`}
                id={client.id}
              />
            ) : contact.type === "Email" ? (
              <ContactEmailIcon
                key={i}
                content={`${contact.value}`}
                type={`mailto:${contact.value}`}
                id={client.id}
              />
            ) : contact.type === "VK" ? (
              <ContactVkIcon
                key={i}
                content={`${contact.value}`}
                type={`${contact.value}`}
                id={client.id}
              />
            ) : contact.type === "Facebook" ? (
              <ContactFbIcon
                key={i}
                content={`${contact.value}`}
                type={`${contact.value}`}
                id={client.id}
              />
            ) : (
              ""
            )
          )}
          </div>
      </td>
      <td className="btn_wrapper">
        <button className="change_btn" onClick={changeHandler}>Изменить</button>
        <button className="delete_btn" onClick={deleteHandler}>Удалить</button>
      </td>
    </tr>
  );
}
