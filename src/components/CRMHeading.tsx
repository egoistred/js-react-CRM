import React, { useState } from "react";
import { Client } from "./CRMTable";

export function CRMHeading({
  searchResults,
  setSearchResults,
}: {
  searchResults: Client[];
  setSearchResults: Function;
}) {
  const [direction, setDirection] = useState("asc");
  function sortIDHandler() {
    setDirection(direction === "asc" ? "desc" : "asc");
    let sorted = searchResults.slice().sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    if (direction === "desc") {
      sorted.reverse();
    }
    setSearchResults(sorted);
  }

  function sortNameHandler() {
    setDirection(direction === "asc" ? "desc" : "asc");
    let sorted = searchResults.slice().sort((a, b) => {
      const surnameA = a.surname.toUpperCase();
      const surnameB = b.surname.toUpperCase();
      if (surnameA < surnameB) {
        return -1;
      }
      if (surnameA > surnameB) {
        return 1;
      }
      return 0;
    });
    if (direction === "desc") {
      sorted.reverse();
    }
    setSearchResults(sorted);
  }

  function sortCreatedDateHandler() {
    setDirection(direction === "asc" ? "desc" : "asc");
    let sorted = searchResults.slice().sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
    if (direction === "desc") {
      sorted.reverse();
    }
    setSearchResults(sorted);
  }

  function sortUpdatedDateHandler() {
    setDirection(direction === "asc" ? "desc" : "asc");
    let sorted = searchResults.slice().sort((a, b) => {
      if (a.updatedAt < b.updatedAt) {
        return -1;
      }
      if (a.updatedAt > b.updatedAt) {
        return 1;
      }
      return 0;
    });
    if (direction === "desc") {
      sorted.reverse();
    }
    setSearchResults(sorted);
  }

  

  return (
    <thead className="thead">
      <tr>
        <td className="head__id" onClick={sortIDHandler}>
          ID
        </td>
        <td className="head__fullname" onClick={sortNameHandler}>Фамилия Имя Отчество</td>
        <td className="head__created" onClick={sortCreatedDateHandler}>Дата и время создания</td>
        <td className="head__changed" onClick={sortUpdatedDateHandler}>Последние изменения</td>
        <td className="head__contacts">Контакты</td>
        <td className="head__actions">Действия</td>
      </tr>
    </thead>
  );
}
