import { FC, ComponentClass } from "react"
import Alert from "./Alert"
import BannerAlert from "./BannerAlert"
import AlertsProvider from "./AlertsProvider"
import useAlerts from "./useAlerts"
import withAlerts from "./withAlerts"

import { AlertProps, useAlertType, BannerAlertProps } from "./types"

interface IAlertWrapper {
  Alert: FC<AlertProps>
  BannerAlert: FC<BannerAlertProps>
  AlertsProvider: ComponentClass
  useAlerts: useAlertType
  withAlerts: (component: any) => any
}

const AlertWrapper: IAlertWrapper = {
  Alert,
  BannerAlert,
  AlertsProvider,
  useAlerts,
  withAlerts,
}

export default AlertWrapper
