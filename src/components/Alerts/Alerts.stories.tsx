import React from "react"
import { storiesOf } from "@storybook/react"
import styled, { createGlobalStyle } from "styled-components"
import {
  withKnobs,
  text,
  select,
  boolean,
  number,
} from "@storybook/addon-knobs"
import Alert from "./Alert"
import BannerAlert from "./BannerAlert"
import { AlertProps, placementType } from "./types"
import { Button } from ".."
import Icon from "../Icon"
import Alerts from "./"

const Readme = require("./Alerts.README.md")

const alertOptions = ["neutral", "success", "warning", "danger", "unsaved"]
const sizeType = ["x-small", "small", "medium", "large"]
const alertActions = [
  {
    text: "Action 1",
    callback: (key?: string) => alert("action 1"),
  },
  {
    text: "Action 2",
    callback: (key?: string) => alert("action 2"),
  },
  {
    text: "Action 3",
    callback: (key?: string) => alert("action 3"),
  },
]

const Center = styled.div`
  display: flex;
  width: 90vw;
  height: 90vh;

  justify-content: center;
  align-items: center;
`

// To modify style of alert using classname, you have to define it's rule in GlobalStyle
const GlobalStyle = createGlobalStyle`
  .new_class {
    border: 2px dashed white;
    background: skyblue;
    color: yellow;
    width: 500px;
  }

  // To change icon and closeIcon
  .new_class *[fill]{
    fill: greenyellow    
  }

  // To change closeIcon
  .new_class *[type="oClose"] *[fill]{ //container -> span with type oClose -> svg with fill
    fill: red;
  }

  // To change ActionAlertButton
  .new_class *[class*="StyledAlert__StyledAlertAction"]{
    border-radius: 4px;
    padding: 3px;
    color: black;
    background: skyblue;
  }
  .new_class *[class*="StyledAlert__StyledAlertAction"]:hover{
    background: rgba(255,255,255,0.5);
    color: black;
  }

  // To change AlertContent
  .new_class *[class*="StyledAlert__AlertContent-"]{
    color: red;
  }
`

const AlertButton = (props: any) => {
  const { addAlert, removeAlert } = Alerts.useAlerts()
  const handleClick = event => {
    addAlert({
      type: props.type,
      size: props.size,
      content: props.content,
      placement: props.placement,
      autoDismiss: props.autoDismiss,
      dismissDuration: props.dismissDuration,
      heading: props.heading,
      multiLine: props.multiline,
      icon: props.icon,
      onClose: props.onClose,
    })
    event.preventDefault()
  }

  return <Button label={props.placement} onClick={handleClick} />
}

const AlertsButton = (props: any) => {
  const { addAlert, removeAlert } = Alerts.useAlerts()
  const placements: placementType[] = [
    "bottomLeft",
    "topLeft",
    "topRight",
    "bottomRight",
  ]
  const keys: string[] = []

  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

  const handleClick = event => {
    if (props.hasOwnProperty("isRandom")) {
      const newAlertsArr: AlertProps[] = []
      alertArr.map((alert: AlertProps, index: number) => {
        const tempAlert = alert
        tempAlert.size = tempAlert.size === "large" ? "medium" : tempAlert.size
        tempAlert.placement = placements[getRandomInt(4)]
        newAlertsArr.push(tempAlert)
      })
      alertArr.map((alert: AlertProps, index: number) => {
        const tempAlert = alert
        tempAlert.size = tempAlert.size === "large" ? "medium" : tempAlert.size
        tempAlert.placement = placements[getRandomInt(4)]
        newAlertsArr.push(tempAlert)
      })
    }

    props.alerts.map((alert: AlertProps, index: number) => {
      setTimeout(() => {
        keys.push(
          addAlert({ ...alert, placement: props.placement || alert.placement })
        )
      }, index * 250)
    })
  }

  const handleRemove = () => {
    if (keys.length > 0) {
      removeAlert(keys[0])
      delete keys[0]
    }
  }

  return (
    <>
      <Button label={props.label} onClick={handleClick} />
      {props.hasOwnProperty("apiClose") ? (
        <Button label={"Remove earliest using api"} onClick={handleRemove} />
      ) : (
        <></>
      )}
    </>
  )
}

const alertArr: AlertProps[] = [
  {
    type: "neutral",
    size: "small",
    placement: "topRight",
    content: "Hello There",
    autoDismiss: false,
    dismissDuration: 1500,
    // heading: "Hi there", // only uncomment when multiLine props is true else throw an error, as suppose to
    multiLine: false,
    actions: alertActions,
    onClose: () => {},
  },
  {
    type: "warning",
    size: "medium",
    placement: "topRight",
    content: "Hello There",
    autoDismiss: false,
    dismissDuration: 1500,
    multiLine: false,
  },
  {
    type: "danger",
    size: "x-small",
    placement: "topRight",
    content: "Hello There",
    autoDismiss: true,
    dismissDuration: 1500,
    multiLine: false,
    icon: "",
    onClose: () => {},
  },
  {
    type: "success",
    size: "large",
    placement: "topRight",
    content: "Hello There",
    autoDismiss: false,
    dismissDuration: 250,
    heading: "Hi there",
    multiLine: true,
    icon: "",
    image:
      "https://clarisights-users.s3.eu-central-1.amazonaws.com/production/users/profile_picture_561/1540893983_clarisights.png",
  },
]

const stories = storiesOf("Alerts", module)
stories.addDecorator(withKnobs)
stories.addDecorator(story => (
  <Alerts.AlertsProvider>
    <div
      style={{
        width: "90vw",
        height: "90vh",
        border: "1px solid black",
        fontSize: "10px",
      }}>
      {story()}
    </div>
  </Alerts.AlertsProvider>
))

stories
  .addParameters({
    readme: {
      // Show readme before story
      codeTheme: "shades-of-purple",
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add("Basic", () => (
    <Alert
      type={select("Type", alertOptions, "neutral")}
      content={text("content", "Hey there!")}
      autoDismiss={boolean("Auto Dismiss", true)}
      dismissDuration={number("Dismiss Duration", 4000)}
    />
  ))
  .add("Basic with manual dismiss", () => (
    <Alert
      type={select("Type", alertOptions, "danger")}
      content={text("content", "Hey there!")}
      placement={text("Placement", "bottomRight")}
      onClose={() => {}}
    />
  ))
  .add("Basic with default icon", () => (
    <Alert
      icon={text("Icon", undefined)}
      type={select("Type", alertOptions, "warning")}
      content="Hey there!"
      placement={text("Placement", "topLeft")}
    />
  ))
  .add("Basic with custom icon", () => (
    <Alert
      type={select("Type", alertOptions, "unsaved")}
      icon={text("Custom Image", "oZoomOut")}
      content="Hey there!"
      placement={text("Placement", "topRight")}
    />
  ))
  .add("Basic with multiLine", () => (
    <Alert
      type={select("Type", alertOptions, "success")}
      multiLine={boolean("Multiline Alert", true)}
      icon={text("Icon", undefined)}
      content={text(
        "content",
        "This is an alert without action but has too long text that doesn’t fit in max-width. Or should we have character limit on alert messages?"
      )}
    />
  ))
  .add("Basic with heading and multiLine", () => (
    <Alert
      type={select("Type", alertOptions, "neutral")}
      multiLine={boolean("Multiline Alert", true)}
      icon={text("Icon", undefined)}
      heading={text("Heading", "Heading 1")}
      content={text("content", "Hey there!")}
    />
  ))
  .add("Basic with picture", () => (
    <Alert
      image="https://clarisights-users.s3.eu-central-1.amazonaws.com/production/users/profile_picture_561/1540893983_clarisights.png"
      content="Hey there!"
    />
  ))
  .add("Multiline with picture", () => (
    <Alert
      image="https://clarisights-users.s3.eu-central-1.amazonaws.com/production/users/profile_picture_561/1540893983_clarisights.png"
      type={select("Type", alertOptions, "neutral")}
      multiLine={boolean("Multiline Alert", true)}
      heading={text("Heading", "Heading 1")}
      content={text("content", "Hey there!")}
    />
  ))
  .add("Basic with actions", () => (
    <Alert actions={alertActions} content={text("content", "Hey there!")} />
  ))
  .add("Multiline with action", () => (
    <Alert
      image="https://clarisights-users.s3.eu-central-1.amazonaws.com/production/users/profile_picture_561/1540893983_clarisights.png"
      type={select("Type", alertOptions, "success")}
      multiLine={boolean("Multiline Alert", true)}
      content={text(
        "content",
        "This is an alert without action but has too long text that doesn’t fit in max-width. Or should we have character limit on alert messages?"
      )}
      actions={alertActions}
    />
  ))
  .add("Multiline with picture and actions", () => (
    <Alert
      image="https://clarisights-users.s3.eu-central-1.amazonaws.com/production/users/profile_picture_561/1540893983_clarisights.png"
      actions={alertActions}
      type={select("Type", alertOptions, "danger")}
      multiLine={boolean("Multiline Alert", true)}
      heading={text("Heading", "Heading 1")}
      content={text(
        "content",
        "This is an alert with action but has too long text that doesn’t fit in max-width. "
      )}
      size={select("Type", sizeType, "medium")}
    />
  ))
  .add("Action to dismiss it's alert", () => {
    const AlertDismissComponent = props => {
      const { addAlert, removeAlert } = Alerts.useAlerts()

      const newActions = [...alertActions]
      newActions[1] = {
        text: "Dismiss",
        callback: (key: string) => {
          removeAlert(key)
        },
      }
      const handleClick = () =>
        addAlert({
          type: "warning",
          size: "small",
          placement: "topRight",
          autoDismiss: false,
          dismissDuration: 1500,
          heading: "Hi there", // only uncomment when multiLine props is true else throw an error, as suppose to
          multiLine: true,
          actions: newActions,
          content: "Normal Content",
          icon: "",
          onClose: () => {},
        })

      return (
        <Center>
          <Button onClick={handleClick} label="Show Alert" />
        </Center>
      )
    }
    return <AlertDismissComponent />
  })
  .add("Exit Function when unmount", () => {
    const AlertOnExitComponent = props => {
      const { addAlert, removeAlert } = Alerts.useAlerts()

      const handleClick = () =>
        addAlert({
          type: "warning",
          size: "small",
          placement: "topRight",
          autoDismiss: false,
          dismissDuration: 1500,
          heading: "Hi there", // only uncomment when multiLine props is true else throw an error, as suppose to
          multiLine: true,
          actions: alertActions,
          content: "Normal Content",
          icon: "",
          onClose: () => {},
          onExit: key =>
            alert(`onExit function is called of alert which have key : ${key}`),
        })

      return (
        <Center>
          <Button onClick={handleClick} label="Show Alert" />
        </Center>
      )
    }
    return <AlertOnExitComponent />
  })
  .add("Custom Color Alert", () => (
    <Alert
      image="https://clarisights-users.s3.eu-central-1.amazonaws.com/production/users/profile_picture_561/1540893983_clarisights.png"
      actions={alertActions}
      type={select("Type", alertOptions, "warning")}
      multiLine={boolean("Multiline Alert", true)}
      heading={text("Heading", "Heading 1")}
      content={text(
        "content",
        "This is an alert with action but has too long text that doesn’t fit in max-width. "
      )}
      customColor={text("Custom color", "#D4A867")}
      size={select("Type", sizeType, "medium")}
    />
  ))
  .add("Basic with large size", () => (
    <Alert
      actions={alertActions}
      content={text("content", "Hey there!")}
      size={text("size", "large")}
    />
  ))
  .add("All Test cases just tweak the knobs", () => (
    <Center>
      <AlertButton
        type={select(
          "type",
          {
            neutral: "neutral",
            unsaved: "unsaved",
            danger: "danger",
            warning: "warning",
            success: "success",
          },
          "neutral",
          "groupID1"
        )}
        size={select(
          "size",
          {
            "x-small": "x-small",
            small: "small",
            medium: "medium",
            large: "large",
          },
          "small",
          "groupID1"
        )}
        placement={select(
          "placement",
          {
            topLeft: "topLeft",
            topRight: "topRight",
            bottomLeft: "bottomLeft",
            bottomRight: "bottomRight",
          },
          "bottomLeft",
          "groupID1"
        )}
        content={text("content", "Hey there", "groupID1")}
        autoDismiss={boolean("autoDismiss", false, "groupID1")}
        dismissDuration={number("dismissDuration", undefined, "groupID1")}
        heading={text("heading", undefined, "groupID1")}
        multiline={boolean("multiline", false, "groupID1")}
        icon={text("icon", undefined, "groupID1")}
        onClose={() => {}}
      />
    </Center>
  ))
  .add("According to placement cases", () => {
    return (
      <Center>
        <AlertsButton label={"topLeft"} alerts={alertArr} placement="topLeft" />
        <AlertsButton
          label={"topRight"}
          alerts={alertArr}
          placement="topRight"
        />
        <AlertsButton
          label={"bottomLeft"}
          alerts={alertArr}
          placement="bottomLeft"
        />
        <AlertsButton
          label={"bottomRight"}
          alerts={alertArr}
          placement="bottomRight"
        />
      </Center>
    )
  })
  .add("Any placement position cases", () => {
    return (
      <Center>
        <AlertsButton label={"Random Placement"} alerts={alertArr} isRandom />
      </Center>
    )
  })
  .add("remove alert using api call", () => {
    return (
      <Center>
        <AlertsButton
          label={"Random Placement"}
          alerts={[alertArr[0], alertArr[1]]}
          apiClose
        />
      </Center>
    )
  })
  .add("custom style using class", () => (
    <>
      <GlobalStyle />
      <Center>
        <AlertsButton
          label={"Custom Style Alert"}
          alerts={[
            {
              type: "warning",
              size: "small",
              placement: "topRight",
              autoDismiss: false,
              dismissDuration: 1500,
              heading: "Hi there", // only uncomment when multiLine props is true else throw an error, as suppose to
              multiLine: true,
              actions: alertActions,
              className: "new_class",
              prefixClassName: "myclass",
              content: "This is the content",
              icon: "",
              onClose: () => {},
            },
          ]}
        />
      </Center>
    </>
  ))
  .add("React Component passed as content", () => {
    return (
      <>
        <Center>
          <AlertsButton
            label={"Content as Component Alert"}
            alerts={[
              {
                type: "warning",
                size: "small",
                placement: "topRight",
                autoDismiss: false,
                dismissDuration: 1500,
                heading: "Hi there", // only uncomment when multiLine props is true else throw an error, as suppose to
                multiLine: true,
                actions: alertActions,
                content: <MyComponent />,
                icon: "",
                onClose: () => {},
              },
            ]}
          />
        </Center>
      </>
    )
  })
  .add("BannerAlert", () => {
    return (
      <BannerAlert type="danger">
        <Icon type="oWarning" size="18px" fill="white" />
        <p style={{ marginLeft: 7 }}>
          You don't seem to be connected to Internet.
        </p>
      </BannerAlert>
    )
  })

const MyStyledComponent = styled.div`
  border: 1px solid red;
  color: black;
`

const MyComponent = () => {
  return <MyStyledComponent>Component Passed in Content</MyStyledComponent>
}
