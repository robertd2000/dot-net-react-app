import React, { useEffect, useState } from 'react'
import { variables } from '../Variables'
export const Employee = () => {
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [modalTitle, setModalTitle] = useState('')
  const [EmployeeId, setEmployeeId] = useState(0)
  const [EmployeeName, setEmployeeName] = useState('')
  const [DateOfJoining, setDateOfJoining] = useState('')
  const [Department, setDepartment] = useState('')
  const [PhotoFileName, setPhotoFileName] = useState('anonymous.png')
  const [PhotoPath, setPhotoPath] = useState(variables.PHOTO_URL)

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  useEffect(() => {
    refreshList()
  }, [])

  const refreshList = async () => {
    const responseEmp = await fetch(variables.API_URL + 'employee')
    const resultEmp = await responseEmp.json()
    setEmployees(resultEmp)

    const response = await fetch(variables.API_URL + 'department')
    const result = await response.json()
    setDepartments(result)
  }

  const changeEmployeeName = (e) => {
    setEmployeeName(e.target.value)
  }

  const changeDepartment = (e) => {
    setDepartment(e.target.value)
  }

  const changeDateOfJoining = (e) => {
    setDateOfJoining(e.target.value)
  }

  const addClick = () => {
    setModalTitle('Add Employee')
    setEmployeeId(0)
    setEmployeeName('')
    setDepartment('')
    setDateOfJoining('')
    setPhotoFileName('anonymous.png')
  }

  const editClick = (emp) => {
    setModalTitle('Edit Department')
    setEmployeeId(emp.EmployeeId)
    setEmployeeName(emp.EmployeeName)
    setDepartment(emp.Department)
    setDateOfJoining(emp.DateOfJoining)
    setPhotoFileName(emp.PhotoFileName)
  }

  const createClick = async () => {
    try {
      const response = await fetch(variables.API_URL + 'employee', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          EmployeeName,
          Department,
          DateOfJoining,
          PhotoFileName,
        }),
      })
      const result = await response.json()
      alert(result)
      refreshList()
    } catch (error) {
      alert('Failed')
    }
  }

  const updateClick = async () => {
    try {
      const response = await fetch(variables.API_URL + 'employee', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          EmployeeId,
          EmployeeName,
          Department,
          DateOfJoining,
          PhotoFileName,
        }),
      })
      const result = await response.json()
      alert(result)
      refreshList()
    } catch (error) {
      alert('Failed')
    }
  }

  const deleteClick = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await fetch(variables.API_URL + 'employee/' + id, {
          method: 'DELETE',
          headers,
        })
        const result = await response.json()
        alert(result)
        refreshList()
      } catch (error) {
        alert('Failed')
      }
    }
  }

  const imageUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', e.target.files[0], e.target.files[0].name)

    try {
      const response = await fetch(variables.API_URL + 'employee/savefile', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      setPhotoFileName(result)
      console.log(PhotoFileName)
    } catch (error) {
      alert('Error')
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
      >
        Add Employee
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>EmployeeName</th>
            <th>Department</th>
            <th>DOJ</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            return (
              <tr key={emp.EmployeeId}>
                <td>{emp.EmployeeId}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.DateOfJoining}</td>

                <td>
                  <button
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    className="btn btn-light mr-1"
                    onClick={() => deleteClick(emp.EmployeeId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-50 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Employee Name</span>
                    <input
                      type="text"
                      className="form-control"
                      value={EmployeeName}
                      onChange={changeEmployeeName}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Department</span>
                    <select
                      className="form-select"
                      onChange={changeDepartment}
                      value={Department}
                    >
                      {departments.map((dep) => (
                        <option key={dep.DepartmentId}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">DOJ</span>
                    <input
                      type="text"
                      className="form-control"
                      value={DateOfJoining}
                      onChange={changeDateOfJoining}
                    />
                  </div>
                </div>

                <div className="p-2 w-50 bd-highlight">
                  <img
                    width="250px"
                    height="250px"
                    src={PhotoPath + PhotoFileName}
                  />
                  <input type="file" className="m-2" onChange={imageUpload} />
                </div>
              </div>
              {EmployeeId == 0 ? (
                <button
                  className="btn btn-primary float-start"
                  onClick={createClick}
                >
                  Create
                </button>
              ) : null}

              {EmployeeId != 0 ? (
                <button
                  className="btn btn-primary float-start"
                  onClick={updateClick}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
