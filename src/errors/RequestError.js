export default class RequestError extends Error {
  constructor (request, message) {
    super(message)

    this._request = request
  }

  get request () {
    return this._request
  }
}
