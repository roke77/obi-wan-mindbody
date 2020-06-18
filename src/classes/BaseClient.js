import { defaults } from 'lodash'
import axios from 'axios'
import util from 'util'

import Pagination from './Pagination'
import NetworkError from '../errors/NetworkError'
import RequestError from '../errors/RequestError'
import APIError from '../errors/APIError'

const DEFAULT_PARAMS = {
  baseURL: 'https://api.mindbodyonline.com/public/v6',
  contentType: 'application/json',
  requestTimeout: 0,
  enableTestMode: false,
  enableRequestsDebug: false,
  paginationLimit: 100,
  maxContentLength: 4000000 // 4 MB
}

export default class BaseClient {
  constructor (params) {
    params = defaults(params, DEFAULT_PARAMS)
    this.httpClient = axios.create({
      baseURL: params.baseURL,
      headers: {
        'Api-Key': params.apiKey,
        SiteId: params.siteId,
        'Content-Type': params.contentType,
        Test: params.enableTestMode
      },
      params: {
        Limit: params.paginationLimit
      },
      timeout: params.requestTimeout,
      maxContentLength: params.maxContentLength
    })

    if (params.enableRequestsDebug) {
      this.httpClient.interceptors.request.use(function (config) {
        console.log('MINDBODY_CLIENT_DEBUG:REQUEST:', util.inspect(config, { compact: true, breakLength: Infinity, depth: 2 }))
        return config
      })

      this.httpClient.interceptors.response.use(function (response) {
        console.log('MINDBODY_CLIENT_DEBUG:RESPONSE:', util.inspect(response, { compact: true, breakLength: Infinity, depth: 2 }))
        return response
      })
    }
  }

  // TODO: Handle errors

  /**
   * @typedef RequestConfig
   * @property {Object} params "The URL query params."
   * @property {String} url "The URL of the endpoint, relative to the base URL."
   */

  /**
   * Makes a request to the API.
   *
   * @param {RequestConfig} config
   */
  async doRequest (config) {
    try {
      const response = await this.httpClient(config)

      return new Pagination(this, config, response.data)
    } catch (err) {
      this._handleAxiosError(err)
    }
  }

  _handleAxiosError (err) {
    if (err.response) this._handleAPIError(err)
    else if (err.request) this._handleRequestError(err)
    else this._handleNetworkError(err)
  }

  _handleAPIError (err) {
    const { Error } = err.response.data

    throw new APIError(Error.Code, Error.Message)
  }

  _handleRequestError (err) {
    throw new RequestError(err.request, err.message)
  }

  _handleNetworkError (err) {
    throw new NetworkError(err.message)
  }

  get (url, config) {
    return this.doRequest({ url, method: 'GET', ...config })
  }

  post (url, data, config) {
    return this.doRequest({ url, data, method: 'POST', ...config })
  }
}
