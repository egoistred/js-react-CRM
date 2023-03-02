import React from 'react'

function AddContact() {
  return (
    <input
    {...register("phone", { required: true })}
    className="form__input form__input--phone"
    placeholder="Телефон"
    type="text"/> 
  )
}

export default AddContact