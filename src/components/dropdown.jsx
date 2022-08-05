import "./dropdown.styl"
import triangle from "../assets/icons/triangle.svg"
import { Icon } from "./tools"
import { createSignal } from "solid-js"
import { onM } from "../tools"
import { ael, ObserveElm, ox } from "js-tools"

const defToggle = { click: ox }
export function DropDown(props) {
  let toggle = defToggle

  return (
    <ul class="dropdown">
      <For each={props.items}>
        {item => (
          <DropDownItem
            {...item}
            onToggole={item => {
              if (toggle === item) {
                toggle = defToggle
              } else {
                toggle.click()
                toggle = item
              }
            }}
          />
        )}
      </For>
    </ul>
  )
}
function DropDownItem(props) {
  let bodyDiv, bodyHeight, root, headDiv
  onM(() => {
    bodyHeight = bodyDiv.offsetHeight
    ObserveElm(() => {
      bodyDiv.style.height = "initial"
      let newHeight = bodyDiv.offsetHeight
      bodyHeight = newHeight
      bodyDiv.style.height = `${newHeight}px`
    }, bodyDiv)
    if (bodyHeight > 0) bodyDiv.style.height = "0px"
    else {
      let observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && bodyHeight === 0) {
              bodyHeight = bodyDiv.offsetHeight
              bodyDiv.style.height = "0px"
            }
          })
        },
        {
          root: root,
          threshold: 1,
        }
      )
      observer.observe(bodyDiv)
    }
  })
  const [open, setOpen] = createSignal(false)
  return (
    <li ref={root}>
      <div
        class="head"
        onClick={() => {
          bodyDiv.style.height = open() ? 0 : bodyHeight + "px"
          setTimeout(() => {
            bodyDiv.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }, 200)

          props.onToggole(headDiv)
          setOpen(!open())
        }}
        ref={headDiv}
      >
        {props.head}
        <Icon src={triangle} classList={{ open: open() === false }} />
      </div>
      <div class="body" ref={bodyDiv}>
        {props.body}
      </div>
    </li>
  )
}
