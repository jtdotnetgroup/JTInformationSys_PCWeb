import JITInput from './JITInput'
import JITInputNumber from './JITInputNumber'

export const JITInputComponent = {
  install: Vue => {
    Vue.component('JITInput', JITInput)
  }
}

export const JITInputNumberComponent = {
  install: Vue => {
    Vue.component('JITInputNumber', JITInputNumber)
  }
}
