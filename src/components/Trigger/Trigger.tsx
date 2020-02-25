import React, {
  Component,
  useState,
  useRef,
  useEffect,
  HTMLAttributes,
  RefObject,
} from "react"
import ReactDOM from "react-dom"
import { usePortal, useOutsideClick } from "../../common/hooks"
import { addRootElement, removeElem } from "../../common/hooks/usePortal"
import { ITriggerProps } from "./types"

/**
 *
 * @param root element
 * @param child node element
 * check if child is present in parent
 */
export function contains(root: any, node: any) {
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }
  return false
}

const getPosition = target => {
  if (target && target.top) {
    return target
  }
  if (target.getBoundingClientRect) {
    const rect = target.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      height: rect.height,
    }
  }
}

function createRoot(id: string) {
  const zIndex = "8000"
  const elem = document.createElement("div")
  elem.setAttribute("id", id)
  elem.setAttribute(
    "style",
    `position: fixed;z-index: ${zIndex}; top: 0; left: 0; right: 0; bottom: 0`
  )
  return elem
}

/**
 *
 * @param overlayElem overlay to render/ elem to align
 * @param target the elem which is clicked to render overlay
 * @param getPopUpContainer returns target's parent
 * @param portalElem portal's main div
 * align parent elemenet below the target
 */
const alignTarget = (
  overlayElem,
  target,
  getPopUpContainer,
  portalElem,
  position
) => {
  const container = getPopUpContainer(target)
  if (overlayElem && container) {
    const rect = overlayElem.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const right = position.left + rect.width
    if (right > containerRect.right) {
      portalElem.style.left = `${position.left -
        (right - containerRect.right)}px`
    } else {
      portalElem.style.left = `${position.left}px`
    }
    portalElem.style.top = `${position.top + position.height + 7}px`
  }
}

export default function Trigger(props: ITriggerProps) {
  const { children, overlay, defaultVisible, position } = props
  const target = usePortal("trigger")
  const scrollBlocker = useRef(createRoot("scroll-block"))
  const internalState = useState(defaultVisible)
  const {
    visible = internalState[0],
    onVisibleChange = internalState[1],
  } = props
  function onOutsideClick(elem: HTMLElement, visible: boolean) {
    if (!contains(ref.current, elem) && visible) {
      onVisibleChange(false)
    }
  }
  useOutsideClick(onOutsideClick, [visible])
  const ref = useRef(null)
  const triggerRef: RefObject<HTMLElement> = useRef(null)
  const handleClick = () => {
    onVisibleChange(!visible)
  }
  // getpopupcontainer -> if passed use it
  // if not use target.prent
  // if no target use document.body
  // const getPopUpContainer = () =>
  //   triggerRef.current && triggerRef.current.parentElement
  const getPopUpContainer = () => document.body
  useEffect(() => {
    const targetPosition = position || getPosition(triggerRef.current)
    console.log("e", position, targetPosition, triggerRef, ref)
    alignTarget(
      ref.current,
      triggerRef.current,
      getPopUpContainer,
      target,
      targetPosition
    )
  }, [])
  useEffect(() => {
    if (visible) {
      const targetPosition = position || getPosition(triggerRef.current)
      alignTarget(
        ref.current,
        triggerRef.current,
        getPopUpContainer,
        target,
        targetPosition
      )
      addRootElement(scrollBlocker.current)
    } else {
      removeElem(scrollBlocker.current)
    }
  }, [visible])
  let triggerElem: any = null
  if (!position) {
    const newChildProps: HTMLAttributes<HTMLElement> & { key: string } = {
      key: "trigger",
    }
    newChildProps.onClick = handleClick
    const childElement = React.Children.only(children) as React.ReactElement
    triggerElem = React.cloneElement(childElement, {
      ref: triggerRef,
      ...newChildProps,
    })
  }
  const popup = <div ref={ref}>{visible ? overlay : null}</div>
  const portal = ReactDOM.createPortal(popup, target)
  return (
    <>
      {triggerElem}
      {portal}
    </>
  )
}