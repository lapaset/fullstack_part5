import React from 'react'

const InputField = ({ type, name, value, onChange }) => (
  <div>
    {name}:
    <input type={type} name={name} value={value} onChange={onChange} />
  </div>
)

export default InputField