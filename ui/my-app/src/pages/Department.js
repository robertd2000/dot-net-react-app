import React, { useEffect, useState } from 'react'
import { variables } from '../Variables'
export const Department = () => {
  const [departments, setDepartments] = useState([])
  const [modalTitle, setModalTitle] = useState('')
  const [DepartmentId, setDepartmentId] = useState(0)
  const [DepartmentName, setDepartmentName] = useState('')

  let [DepartmentIdFilter, setDepartmentIdFilter] = useState('')
  let [DepartmentNameFilter, setDepartmentNameFilter] = useState('')
  const [departmentsWithoutFilter, setDepartmentsWithoutFilter] = useState([])

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  useEffect(() => {
    refreshList()
  }, [])

  const FilterFn = () => {
    let filteredData = departmentsWithoutFilter.filter(
      (i) =>
        i.DepartmentId.toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        i.DepartmentName.toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
    )
    setDepartments([...filteredData])
  }

  const sortResult = (prop, asc) => {
    let sortedData = departmentsWithoutFilter.sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
      }
    })
    setDepartments([...sortedData])
  }

  const changeDepartmentIdFilter = (e) => {
    // setDepartmentIdFilter(e.target.value)
    DepartmentIdFilter = e.target.value
    FilterFn()
  }

  const changeDepartmentNameFilter = (e) => {
    // setDepartmentNameFilter(e.target.value)
    DepartmentNameFilter = e.target.value
    FilterFn()
  }

  const refreshList = async () => {
    const response = await fetch(variables.API_URL + 'department')
    const result = await response.json()
    setDepartments(result)
    setDepartmentsWithoutFilter(result)
  }

  const changeDepartmentName = (e) => {
    setDepartmentName(e.target.value)
  }

  const addClick = () => {
    setModalTitle('Add Department')
    setDepartmentId(0)
    setDepartmentName('')
  }

  const editClick = (dep) => {
    setModalTitle('Edit Department')
    setDepartmentId(dep.DepartmentId)
    setDepartmentName(dep.DepartmentName)
  }

  const createClick = async () => {
    try {
      const response = await fetch(variables.API_URL + 'department', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          DepartmentName,
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
      const response = await fetch(variables.API_URL + 'department', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          DepartmentName,
          DepartmentId,
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
        const response = await fetch(variables.API_URL + 'department/' + id, {
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

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
      >
        Add Department
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <div className="d-flex flex-row">
                <input
                  className="form-control m-2"
                  onChange={changeDepartmentIdFilter}
                  placeholder="Filter"
                />
                <button
                  className="btn btn-light"
                  onClick={() => sortResult('DepartmentId', true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortResult('DepartmentId', false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </button>
              </div>
              DepartmentId
            </th>
            <th>
              <div className="d-flex flex-row">
                <input
                  className="form-control m-2"
                  onChange={changeDepartmentNameFilter}
                  placeholder="Filter"
                />
                <button
                  className="btn btn-light"
                  onClick={() => sortResult('DepartmentName', true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortResult('DepartmentName', false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-up-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </button>
              </div>
              DepartmentName
            </th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {departments &&
            departments.map((dep) => {
              return (
                <tr key={dep.DepartmentId}>
                  <td>{dep.DepartmentId}</td>
                  <td>{dep.DepartmentName}</td>
                  <td>
                    <button
                      className="btn btn-light mr-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => editClick(dep)}
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
                      onClick={() => deleteClick(dep.DepartmentId)}
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
              <div className="input-group mb-3">
                <span className="input-group-text">DepartmentName</span>
                <input
                  type="text"
                  className="form-control"
                  value={DepartmentName}
                  onChange={changeDepartmentName}
                />
              </div>
              {DepartmentId == 0 ? (
                <button
                  className="btn btn-primary float-start"
                  onClick={createClick}
                >
                  Create
                </button>
              ) : null}

              {DepartmentId != 0 ? (
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
