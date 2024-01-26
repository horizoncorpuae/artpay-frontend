import {Alert, AlertTitle, Snackbar, SnackbarOrigin} from '@mui/material'
import axios, {AxiosError} from 'axios'
import React, {createContext, ReactElement, useContext, useState} from 'react'

export interface SnackbarOptions {
  autoHideDuration?: number
  anchorOrigin?: SnackbarOrigin
}

export interface SnackbarProvider {
  snackbar(content: ReactElement, options?: SnackbarOptions): Promise<boolean>

  success(message: string, options?: SnackbarOptions): Promise<boolean>
  error(message: any, options?: SnackbarOptions): Promise<boolean>
}

interface SnackbarState<T> {
  content: ReactElement
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  autoHideDuration: number
  anchorOrigin: SnackbarOrigin
}

export interface SnackbarProviderProps extends React.PropsWithChildren {
}

const defaultContext: SnackbarProvider = {
  snackbar: () => Promise.reject('Snackbar not loaded'),
  success: () => Promise.reject('Snackbar not loaded'),
  error: () => Promise.reject('Snackbar not loaded'),
}

const Context = createContext<SnackbarProvider>({...defaultContext})

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({children}) => {
  const [open, setOpen] = useState(false)
  const [snackbar, setSnackbar] = useState<SnackbarState<any>>()

  const handleClose = (value?: any) => {
    setOpen(false)
    snackbar?.resolve(value)
    setSnackbar(undefined)
  }
  /*const resolveSnackbar = (fn: (value?: any) => void, value: boolean) => {
    setOpen(false)
    fn(value)
    setSnackbar(undefined)
  }*/
  const showSnackbar: SnackbarProvider['snackbar'] = (content, options = {}) => {
    const {autoHideDuration = 6000, anchorOrigin = {vertical: 'top', horizontal: 'right'}} = options
    return new Promise((resolve, reject) => {
      setSnackbar({content, resolve, reject, autoHideDuration, anchorOrigin})
      setOpen(true)
    })
  }


  const snackbarProvider: SnackbarProvider = {
    snackbar: showSnackbar,
    success: (message: string, options = {}) => {
      const content = <Alert severity="success">{message}</Alert>
      return showSnackbar(content, options)
    },
    error: (message: any, options = {}) => {
      let content: ReactElement
      console.log('show axios error: ', axios.isAxiosError(message))
      if (axios.isAxiosError(message)) {
        console.log('show axios error')
        const axiosError = message as AxiosError
        let txtMessage = ''
        if (typeof axiosError.response?.data === 'object') {
          txtMessage = Object.values(axiosError.response.data||{}).join(', ')
        }
        content = <Alert severity="error">
          <AlertTitle>Errore {axiosError.response?.status}</AlertTitle>
          {txtMessage}
        </Alert>
      } else {
        content = <Alert severity="error">{message}</Alert>
      }

      return showSnackbar(content, options)
    }
  }
  //
  return (
    <>
      <Context.Provider value={snackbarProvider}>{children}</Context.Provider>
      <Snackbar
        open={open}
        onClose={() => handleClose(true)}
        autoHideDuration={snackbar?.autoHideDuration}
        anchorOrigin={snackbar?.anchorOrigin}
      >{snackbar?.content || <span></span>}</Snackbar>
    </>
  )
}

export const useSnackbars = () => useContext(Context)

export default SnackbarProvider
