'use client'

import { useLocalStorage } from '@tetherite/use-localstorage'

export default function UseLocalstorageDemo() {
  const [firstName, setFirstName] = useLocalStorage('firstName', 'John')
  const [lastName, setLastName] = useLocalStorage('lastName', 'Smith')

  return (
    <div>
      <div className="text-xl font-bold text-center">Welcome back {firstName} {lastName}.</div>
    </div>
  )
}