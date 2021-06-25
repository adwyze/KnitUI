import styled from "styled-components"
import { AlertProps } from "./types"
import { Icon, Button } from ".."

import { IStyled } from "../../common/types"
import { parseColorPreset, parseCustomColor } from "../../common/_utils"

type IStyledAlert = IStyled<AlertProps>

const width = {
  "x-small": 28,
  small: 35,
  medium: 49,
  large: 77,
}

const getWidth = props => {
  const {
    customProps: { size },
  } = props
  return width[size]
}

const getFontSize = (props: IStyledAlert) => {
  const {
    theme: {
      knitui: { typography },
    },
  } = props

  return typography[14].fontSize
}

const getLineHeight = (props: IStyledAlert) => {
  const {
    theme: {
      knitui: { typography },
    },
  } = props

  return typography[14].lineHeight
}

const getHeadingFontSize = (props: IStyledAlert) => {
  const {
    theme: {
      knitui: { typography },
    },
  } = props

  return typography[18].fontSize
}

const getHeadingLineHeight = (props: IStyledAlert) => {
  const {
    theme: {
      knitui: { typography },
    },
  } = props

  return typography[18].lineHeight
}

const parseColorTheme = (props: IStyledAlert) => {
  const {
    customProps: { customColor, type },
    theme: { knitui: theme },
  } = props
  return customColor
    ? parseCustomColor(theme, customColor)
    : parseColorPreset(theme, type!)
}

const getBackgroundColor = (props: IStyledAlert) =>
  parseColorTheme(props).background.hex()

const getBorderRadius = (props: IStyledAlert) => {
  const {
    theme: {
      knitui: { borderRadius },
    },
  } = props
  return borderRadius
}

const getFontColor = (props: IStyledAlert) => parseColorTheme(props).font

const getContentWrapperDirection = (props: IStyledAlert) => {
  const {
    customProps: { multiLine, heading, actions },
  } = props
  const isAction = actions && actions.length > 0
  return (heading || isAction) && multiLine ? "column" : "row"
}

const getIconVerticalAlign = (props: IStyledAlert) => {
  const {
    customProps: { multiLine, actions, heading },
  } = props
  const isAction = actions && actions.length > 0
  return (multiLine && !(heading || isAction)) || !multiLine ? "center" : ""
}

const getIconMargin = (props: IStyledAlert) => {
  const {
    customProps: { multiLine, heading },
  } = props
  return multiLine && heading ? "0.2rem 1.4rem 0.2rem 0" : "0 1.4rem 0 0"
}

const getCloseIconMargin = (props: IStyledAlert) => {
  const {
    customProps: { multiLine },
  } = props
  return `${multiLine ? `-0.4rem -0.4rem` : `0 0`} 0 1.4rem`
}

const getActionWrapperMargin = (props: IStyledAlert) => {
  const {
    customProps: { multiLine },
  } = props
  return `${multiLine ? "1.4rem" : `0`} 0 0 0}`
}

export const AlertContainer = styled("div")<IStyledAlert>`
  display: flex;
  box-sizing: border-box;
  overflow: hidden;

  width: ${props => getWidth(props)}rem;
  border-radius: ${props => getBorderRadius(props)};
  padding: 1.4rem;

  color: ${props => getFontColor(props)};
  background: ${props => getBackgroundColor(props)};

  opacity: 1;
  transition: all 0.25s;

  &.hide {
    opacity: 0;
  }
`

export const AlertContentWrapper = styled.div<IStyledAlert>`
  display: flex;
  width: 100%;
  flex-direction: ${props => getContentWrapperDirection(props)};
  justify-content: space-between;
  ${({ customProps: { multiLine } }) =>
    !multiLine ? "align-items: center;" : ""};
`

export const AlertContent = styled.div<IStyledAlert>`
  font-size: ${props => `${getFontSize(props)}rem`};
  line-height: ${props => `${getLineHeight(props)}rem`};
  color: ${props => `${getFontColor(props)}`};
`

export const StyledAlertIcon = styled(Icon).attrs(props => ({
  fill: getFontColor(props),
  width: "2rem",
  height: "2rem",
}))<IStyledAlert>`
  align-self: ${props => getIconVerticalAlign(props)};
  margin: ${props => getIconMargin(props)};
`

export const CloseIcon = styled(Button).attrs(props => {
  return {
    customColor: getBackgroundColor(props as IStyledAlert),
    style: {
      padding: "0rem",
    },
  }
})<IStyledAlert>`
  flex-basis: 0;
  margin: ${props => getCloseIconMargin(props)};
  align-self: ${({ customProps: { multiLine } }) =>
    !multiLine ? "center" : "flex-start"};
`

export const AlertHeading = styled.div<IStyledAlert>`
  font-size: ${props => `${getHeadingFontSize(props)}rem`};
  line-height: ${props => `${getHeadingLineHeight(props)}rem`};
  margin-bottom: 0.7rem;
`

export const StyledAlertPicture = styled.img<IStyledAlert>`
  min-width: 2rem;
  height: 2rem;
  border-radius: 1.2rem;
  align-self: ${props => getIconVerticalAlign(props)};
  margin: ${props => getIconMargin(props)};
`

export const StyledAlertAction = styled(Button).attrs(
  (props: IStyledAlert) => ({
    customColor: getBackgroundColor(props),
  })
)<IStyledAlert>`
  flex-shrink: 0;
  text-transform: uppercase;
  font-size: ${props => `${getFontSize(props)}rem`};
  line-height: ${props => `${getLineHeight(props)}rem`};
  cursor: pointer;
`

export const AlertActionsWrapper = styled.span<IStyledAlert>`
  margin: ${props => getActionWrapperMargin(props)};
  display: flex;
  ${StyledAlertAction}:not(:last-child) {
    margin-right: 0.7rem;
  }
`

export const BannerAlertWrapper = styled.div<IStyledAlert>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4.8rem;
  padding: 0 2.8rem;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.4rem;
  line-height: 2rem;
  background-color: ${props => getBackgroundColor(props)};
`
