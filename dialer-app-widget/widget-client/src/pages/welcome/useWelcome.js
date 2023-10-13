import React from 'react'

const useWelcome = () => {
    const [name, setName] = React.useState("")
    const [blur, setBlur] = React.useState(false)

  return {name, setName,blur, setBlur}
}

export default useWelcome
