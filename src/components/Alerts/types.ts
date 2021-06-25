import { ReactNode, Component } from "react"

// Size types of the alert components
export type sizeType = "x-small" | "small" | "medium" | "large"

// Type of alert in particular which define it's other property like color, icon,...
export type alertType = "neutral" | "warning" | "success" | "danger" | "unsaved"

// define where will be the placement in the container
export type placementType =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"

// Type of buttons given to have action
export type actionType = {
  // Text To be displayed on action button
  text: string
  // Callback function when action button is Clicked
  callback: Function
}

// Alert Props are attributes which are used to define alert
export interface AlertProps {
  // type of the alert
  type?: alertType
  // Size of the alert, default is small
  size?: sizeType
  // Main content of the alert
  content: ReactNode
  // whether alert is to be auto dismissed
  autoDismiss?: boolean
  // time after which we need to dismiss, effective when auto dismiss is set
  dismissDuration?: number
  // heading of the alert
  heading?: string
  // custom icon, effective when mention in React Component or as Prop in object passed to API,
  // for use of default icon just pass it empty or undefined
  icon?: string
  // image url to be shown, overrides icon when both are specified
  image?: string
  // whether alert is multiline, defaults to false
  multiLine?: boolean
  // actions of alert, max 2, pass an array of objects with keys as text and callback
  actions?: Array<actionType>
  // Function to call once the alert is closed
  onClose?: (event) => void
  // Function to call while alert is unmounted
  onExit?: (key: string) => void
  // position on window where it will be displayed
  placement?: placementType
  // key to reference Element from Alerts Container (help in remove function)
  alertKey?: string
  // custom className to be passed
  className?: string
  // prefix classname for custom style
  prefixClassName?: string
  // custom Color is we don't want to use type presetColor
  customColor?: string
}

export type addAlertType = (props: AlertProps) => string

export type removeAlertType = (key: string) => boolean

export interface AlertContextInterface {
  // This function will add alert to your provider and return a unique key to reference the alert
  addAlert: addAlertType
  // This function will remove alert when passed unique key related to each alert
  removeAlert: removeAlertType
}

export interface AlertsProviderState {
  alerts: AlertProps[]
  contextAPI: AlertContextInterface
}

export type AlertProviderType = Component<{}, AlertsProviderState>

export type useAlertType = () => {
  addAlert: addAlertType
  removeAlert: removeAlertType
}

export interface BannerAlertProps {
  children: ReactNode
  type: string
}
