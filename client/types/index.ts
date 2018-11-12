export * from './ad'
export * from './page'
export * from './fec'
 
// there's a bug in the current version of
// the styled-components types; the below
// is a balm for that.
declare global {
  interface StyleSheet {}
  interface Node {}
}
