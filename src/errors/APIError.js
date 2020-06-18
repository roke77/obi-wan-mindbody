export default class APIError extends Error {
  constructor (code, message) {
    super(message)

    this._code = code
  }

  get code () {
    return this._code
  }
}
