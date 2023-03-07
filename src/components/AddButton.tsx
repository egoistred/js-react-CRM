import React from "react";

export function AddButton(props:{onClick: () => void}) {

  return (
    <button onClick={props.onClick} className="btn">  
      Добавить клиента
    </button>
  );
}
