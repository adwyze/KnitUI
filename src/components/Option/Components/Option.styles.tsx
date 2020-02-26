import { FC } from "react"
import styled, { css } from "styled-components"
import { getThemeColor } from "../../../common/_utils"
import Icon from "../../Icon"

export const OptionWrapper = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => getThemeColor(props, "Neutral90")};
  padding: 0.7rem 1.4rem;
  border: 0.1rem solid ${props => getThemeColor(props, "Neutral0")};
  &:hover {
    background-color: ${props => getThemeColor(props, "Neutral10")};
  }
  &:active {
    border: 0.1rem solid ${props => getThemeColor(props, "Azure80")};
    box-shadow: 0 0 0.2rem #0066ff;
  }
`

export const OptionDescription = styled.span`
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${props => getThemeColor(props, "Neutral50")};
`

export const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

export const AvatarWrapper = styled(IconWrapper)`
  align-items: start;
`

export const StyledIcon = styled(Icon)`
  margin-right: ${props => (props.align === "right" ? 0 : "1.5rem")};
  margin-left: ${props => (props.align === "right" ? "1.5rem" : 0)};
`

// Generic component wrapper which styles a component and adds appropriate styles based on the position
export const OptionItemWrapper = (component): FC => {
  return styled(component)`
    margin-right: ${props => (props.align === "right" ? 0 : "1.5rem")};
    margin-left: ${props => (props.align === "right" ? "1.5rem" : 0)};
    align-self: ${props => (props.alignStart ? "flex-start" : "center")};
  `
}

// export const StyledTag = styled(Label)`
//   display: flex;
//   align-items: center;
//   font-size: 1.2rem;
//   line-height: 1.8rem;
//   color: ${props => getThemeColor(props, "Neutral50")};
//   background-color: ${props => getThemeColor(props, "Neutral10")};
//   border-radius: 0.3rem;
// `
