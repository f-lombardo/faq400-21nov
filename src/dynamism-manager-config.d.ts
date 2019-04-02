import Vue from 'vue'
import DynamismManager from './classes/DynamismManager'

declare module 'vue/types/vue' {
  interface Vue {
    $dynamismManager: DynamismManager
  }
}
