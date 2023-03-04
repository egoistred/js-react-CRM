import React from "react";

export function CRMHeading() {
  return (
    <thead className="thead">
      <tr>
        <td className="id">ID</td>
        <td>Фамилия Имя Отчество</td>
        <td>Дата и время создания</td>
        <td>Последние изменения</td>
        <td>Контакты</td>
        <td>Действия</td>
      </tr>
    </thead>
  );
}
