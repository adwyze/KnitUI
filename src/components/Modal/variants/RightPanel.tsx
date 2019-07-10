import React from "react"
import styled from "styled-components"

import { BaseLayout } from "./Base"
import { PanelModalProps } from "./interfaces"

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1 1 auto;
`

const LeftSection = styled.div`
  width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`

const RightSection = styled.div`
  width: 210px;
  border-left: ${({ theme: { knitui } }) => knitui.modalBorder};
`

const RightPanelModal: React.FC<PanelModalProps> = ({
  header,
  footer,
  body,
  panelContent,
}) => {
  return (
    <BaseLayout>
      {header}
      <Layout>
        <LeftSection>
          {body}
          {footer}
        </LeftSection>
        <RightSection>{panelContent}</RightSection>
      </Layout>
    </BaseLayout>
  )
}

export default RightPanelModal
