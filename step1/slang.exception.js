function SlangException(message) {
  this.name = 'SlangException'
  this.message = message
  this.toString = function() {
    return this.name + this.message
  }
}