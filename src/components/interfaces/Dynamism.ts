export default interface Dynamism {
  event: string
  variables: { key: string; value: string }[]
  targets?: string[]
}
