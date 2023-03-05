import React from "react";
import ReactDOM from "react-dom/client";

export function Search({ clients, setSearchResults }) {
  function handleChange(e) {
    if (!e.target.value) return setSearchResults(clients);

    const results = clients.filter(
      (client) =>
        client.name.includes(e.target.value) ||
        client.surname.includes(e.target.value) ||
        client.lastName.includes(e.target.value)
    );
    setSearchResults(results);
  }

  return (
    <input
      type="search"
      className="search"
      placeholder="Введите запрос"
      onChange={handleChange}
    ></input>
  );
}
