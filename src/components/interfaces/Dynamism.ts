import BasicComponent from './BasicComponent'

export default interface Dynamism {
  source: BasicComponent
  event: string
  variables: { key: string; value: string }[]
  targets?: string[]
}
