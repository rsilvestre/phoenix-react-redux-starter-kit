import React from 'react'
import fetch from 'isomorphic-fetch'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const buildHeaders = () => {
  const authToken = localStorage.getItem('phoenixAuthToken')

  return { ...defaultHeaders, Authorization: authToken }
}

export function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export const parseJSON = (response) => {
  return response.json()
}

export const httpGet = (url) => {
  return fetch(url, {
    headers: buildHeaders()
  })
  .then(checkStatus)
  .then(parseJSON)
}

export const httpPost = (url, data) => {
  const body = JSON.stringify(data)

  return fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body
  })
  .then(checkStatus)
  .then(parseJSON)
}

export const httpDelete = (url) => {
  return fetch(url, {
    method: 'delete',
    headers: buildHeaders()
  })
  .then(checkStatus)
  .then(parseJSON)
}

export const setDocumentTitle = (title) => {
  document.title = `${title} | Phoenix React Redux Starter Kit`
}

export const renderErrorsFor = (errors, ref) => {
  if (!errors) {
    return false
  }

  return errors.map((error, index) => {
    if (error[ref]) {
      return (
        <div key={index} className='error'>
          {error[ref]}
        </div>
      )
    }
  })
}
