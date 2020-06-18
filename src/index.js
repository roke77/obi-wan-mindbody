import { flow } from 'lodash'
import BaseClient from './classes/BaseClient'
import AuthenticationMixin from './mixins/AuthenticationMixin'
import ClientsMixin from './mixins/ClientsMixin'
import APIError from './errors/APIError'
import NetworkError from './errors/NetworkError'
import RequestError from './errors/RequestError'

const applyMixins = flow(
  AuthenticationMixin,
  ClientsMixin
)
const MindbodyClient = applyMixins(BaseClient)

export {
  MindbodyClient as default,
  APIError,
  NetworkError,
  RequestError
}
