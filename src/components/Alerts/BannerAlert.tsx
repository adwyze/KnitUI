import React from "react"
import ReactDOM from "react-dom"
import { BannerAlertProps } from "./types"
import { BannerAlertWrapper } from "./StyledAlert"

const BannerAlert = (props: BannerAlertProps) => {
  const alertMountNode = document.createElement("div")
  alertMountNode.classList.add("knitui-alerts-root")

  document.body.appendChild(alertMountNode)

  return (
    <div>
      {ReactDOM.createPortal(
        <BannerAlertWrapper customProps={{ type: props.type || "warning" }}>
          {props.children}
        </BannerAlertWrapper>,
        alertMountNode
      )}
    </div>
  )
}

export default BannerAlert
