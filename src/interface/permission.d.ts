export interface Menus {
  path: string
  name?: string,
  componentPath?: string
  redirect?: string
  meta?: {
    title?: string
    icon?: string
  },
  children?: Array<Menus>
}
