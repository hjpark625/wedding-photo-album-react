import axios from 'axios'

import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

export interface AxiosBaseQueryError {
  status: number
  data: {
    message: string
    statusCode: number
    timestamp: number
  }
}

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
    data?: AxiosRequestConfig['data']
  }> =>
  async ({ url, method, params, headers, data }) => {
    try {
      const result = await instance({
        url,
        method,
        data,
        params,
        headers
      })
      return { data: result.data }
    } catch (axiosError: unknown) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data
        } as AxiosBaseQueryError
      }
    }
  }

export default instance
