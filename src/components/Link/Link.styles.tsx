import styled from "styled-components"
import { getThemeColor } from "../../common/_utils"
import { ILinkProps } from "./types"

export const StyledLink = styled.a<ILinkProps>`
  text-decoration: none;
  padding: 0.4rem 0.2rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${props => getThemeColor(props, "Blue100")};
  text-decoration-line: ${props => (props.underline ? "underline" : "none")};
  border-radius: 0.4rem;
  border: 0.1rem solid transparent;
  text-underline-position: under;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    &:active {
      pointer-events: none;
    }
  }
  &:focus {
    box-sizing: border-box;
    border: 0.1rem solid ${props => getThemeColor(props, "Azure80")};
    box-shadow: 0rem 0rem 0.2rem #0066ff;
  }
  &:hover {
    color: #003D99;
  }
`
