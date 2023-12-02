export interface ResponseInterface<T> {
  response?: BaseResponseInterface & T
  error?: ResponseErrorInterface
}

interface BaseResponseInterface {
  responseCode: number
  responseStatus: string
  responseMessage: string
}

interface ResponseErrorInterface {
  statusCode: number
  error: string
  message: string
}
