import React from 'react'

const InputField = ({ id, type, name, value, onChange }) => (
  <div>
    {name}:
    <input id ={id} type={type} name={name} value={value} onChange={onChange} />
  </div>
)

export default InputField