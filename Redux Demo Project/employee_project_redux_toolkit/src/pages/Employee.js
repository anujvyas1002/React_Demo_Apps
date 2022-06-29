import React from 'react'
import { AddEmployee } from '../components/Employee/AddEmployee'
import { EmployeeTable } from '../components/Employee/EmployeeTable'
import { RemoveEmployee } from '../components/Employee/RemoveEmployee'
import { UpdateEmployee } from '../components/Employee/UpdateEmployee'

export const Employee = () => {
  return (
    <div>
        <AddEmployee/>
        <UpdateEmployee/>
        <RemoveEmployee/>
        <EmployeeTable/>
    </div>
  )
}
