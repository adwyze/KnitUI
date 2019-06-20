import React from "react"
import styled from "styled-components"

import { BaseLayout } from "./Base"
import { border } from "../common/styles"

import { PanelModalProps } from "./interfaces"

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1 1 auto;
`

const LeftSection = styled.div`
  width: 210px;
  border-right: ${border};
`

const RightSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const LeftPanelModal: React.FC<PanelModalProps> = ({
  header,
  footer,
  body,
  panelContent,
}) => {
  return (
    <BaseLayout>
      {header}
      <Layout>
        <LeftSection>{panelContent}</LeftSection>
        <RightSection>
          {body}
          {footer}
        </RightSection>
      </Layout>
    </BaseLayout>
  )
}

export default LeftPanelModal
