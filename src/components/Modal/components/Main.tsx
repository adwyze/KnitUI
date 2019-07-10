import styled from "styled-components"

const Main = styled.div`
  padding: ${({ theme: { knitui } }) =>
    `${knitui.modalPadding.vertical} ${knitui.modalPadding.horizontal} 0rem`};
  overflow-y: auto;
  flex: 1 1 auto;
`

export default Main
