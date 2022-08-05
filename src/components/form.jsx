import helpIcon from "../assets/icons/about-faq-help-question-svgrepo-com.svg"
import { createSignal, onMount } from "solid-js"
import "./form.styl"
import { Icon } from "./tools"
import { interact } from "interact-element"
import { ael, err } from "js-tools"
import { onM } from "../tools"
import { bots, setBots } from "./botProgress"

export function Input(props) {
  let div, inp, label, tip
  onM(() => {
    ael(inp, "blur", () => {
      if (inp.value === "") {
        inp.style.height = "1px"
        label.classList.remove("value")
      } else {
        inp.style.height = "2em"
        label.classList.add("value")
      }
    })
    if (inp.value === "") {
      inp.style.height = "1px"
      label.classList.remove("value")
    } else {
      inp.style.height = "2em"
      label.classList.add("value")
    }
  })
  const id = genId()
  const [error, setError] = createSignal("")
  return (
    <div
      class="input-text"
      ref={div}
      onClick={() => {
        inp.style.height = "2em"
        label.classList.add("value")
        inp.focus()
      }}
    >
      <label class="label " for={id} ref={label}>
        {props.label}:
        <Show when={props.tip}>
          <Icon src={helpIcon} onClick={e => showTip(e, tip)} />
        </Show>
        <div class="tip" ref={tip}>
          {props.tip}
        </div>
        <div
          class="tip"
          classList={{ show: error() !== "", error: error() !== "" }}
        >
          {error()}
        </div>
      </label>
      <input
        ref={inp}
        value={props.value || ""}
        type="text"
        onchange={e => {
          try {
            setError("")
            props.onChange(inp.value)
          } catch (e) {
            setError(e.message)
          }
        }}
      />
    </div>
  )
}
export function Text(props) {
  let tip
  ael(document, "click", e => {
    if (tip?.classList.contains("show")) tip.classList.remove("show")
  })
  const id = genId()
  return (
    <div class="text">
      <div class="label">
        <label for={id}>{props.label}:</label>
        <Show when={props.tip}>
          <Icon src={helpIcon} onClick={e => showTip(e, tip)} />
          <div class="tip" ref={tip}>
            {props.tip}
          </div>
        </Show>
      </div>
      <textarea id={id}></textarea>
    </div>
  )
}
export function Slider(props) {
  let rangeBullet, line, tip
  const [value, setValue] = createSignal(props.max)
  ael(document, "click", e => {
    if (tip?.classList.contains("show")) tip.classList.remove("show")
  })
  onM(() => {
    interact(rangeBullet, {
      resize: false,
      onMove: x => {
        const bWidth = rangeBullet.clientWidth
        const offset = bWidth * (x / (line.clientWidth - bWidth))
        setValue(
          Math.round(
            (1 + (x + offset) / line.clientWidth) * (props.max - props.min) +
              props.min
          )
        )
      },
    })
  })
  return (
    <div class="slider">
      <div class="label">
        {props.label}
        <Show when={props.tip}>
          <Icon src={helpIcon} onClick={e => showTip(e, tip)} />
          <div class="tip" ref={tip}>
            {props.tip}
          </div>
        </Show>
      </div>
      <div class="container">
        <div class="rs-min">{props.min}</div>
        <div class="rs">
          <div class="rs-line" ref={line}>
            <div id="rs-bullet" ref={rangeBullet} class="rs-bullet">
              <div>{value()}</div>
            </div>
          </div>
        </div>

        <div class="rs-max">{props.max}</div>
      </div>
    </div>
  )
}
export function Button(props) {
  return (
    <div>
      <button class="button" onClick={() => props.onClick}>
        {props.children}
      </button>
    </div>
  )
}
export function CheckBox(props) {
  const id = genId()
  return (
    <div class="checkbox">
      <label for={id} class="label">
        {props.label}
      </label>
      <input type="checkbox" id={id} />
      <div class="container">
        <div class="bullet"></div>
      </div>
    </div>
  )
}
const parseNumber = str => {
  if (str === "") return 0
  let num = parseInt(str)
  if (isNaN(num)) err("فرمت اشتباه است ، مثال:  100 , 20k یا 1M")
  const short = str.slice(num.toString().length).toLowerCase()
  if (short === "k") return num * 1000
  if (short === "m") return num * 1000000
  if (short.length > 0) err("فرمت اشتباه است ، مثال:  100 , 20k یا 1M")
  return num
}
export function DualSlider(props) {
  let tip
  ael(document, "click", e => {
    if (tip.classList.contains("show")) tip.classList.remove("show")
  })
  const id = genId()
  const [error, setError] = createSignal("")
  return (
    <div class="dualSlider">
      <div class="label">
        {props.label}
        <Icon src={helpIcon} onClick={e => showTip(e, tip)} />
        <div class="tip" ref={tip}>
          {props.tip} {props.subject} از چند تا چند باشد که برای انجام{" "}
          {props.name} انتخاب شود
        </div>
        <div
          class="tip"
          classList={{ show: error() !== "", error: error() !== "" }}
        >
          {error()}
        </div>
      </div>
      <div class="container">
        <Input
          label="از"
          onChange={v => {
            try {
              setError("")
              setBots(
                bot => bot.id === props.data.id,
                props.branch,
                props.key,
                ar => [parseNumber(v), ar?.[1]]
              )
            } catch (e) {
              setError(e.message)
            }
          }}
        />
        <Input
          label="تا"
          onChange={v => {
            try {
              setError("")
              setBots(
                bot => bot.id === props.data.id,
                props.branch,
                props.key,
                ar => [ar?.[0], parseNumber(v)]
              )
            } catch (e) {
              setError(e.message)
            }
          }}
        />
      </div>
    </div>
  )
}
export function DateRange(props) {
  let tip
  ael(document, "click", e => {
    if (tip?.classList.contains("show")) tip.classList.remove("show")
  })
  return (
    <div class="date">
      <div class="label">
        تاریخ {props.subject}:
        <Icon src={helpIcon} onClick={e => showTip(e, tip)} />
        <div class="tip" ref={tip}>
          {props.subject} از چه تاریخی تا جه تاریخی برای انجام {props.name} باشد
        </div>
      </div>
      <label>از:</label>
      <input
        type="date"
        onchange={e =>
          setBots(
            bot => props.data.id === bot.id,
            props.branch,
            b => ({ ...b, [props.key]: [e.target.value, b[props.key][1]] })
          )
        }
      />
      <span>,</span>
      <label>تا:</label>
      <input
        type="date"
        onchange={e =>
          setBots(
            bot => props.data.id === bot.id,
            props.branch,
            b => ({ ...b, [props.key]: [b[props.key][0], e.target.value] })
          )
        }
      />
    </div>
  )
}
let id = 0
function genId() {
  return "id" + id++
}
export function genInput(input) {
  return props => {
    const id = genId()
    const [help, showHelp] = createSignal(false)
    return (
      <div class="input">
        <label for={id}>
          {props.label}:
          <Show when={props.tip}>
            <Icon src={helpIcon} onClick={() => showHelp(true)} />
          </Show>
        </label>
        {/* <Dynamic component={input} value={props.value} id={id} /> */}
        {input(id)}
        <Show when={help}>
          <div class="help">{props.tip}</div>
        </Show>
      </div>
    )
  }
}
function showTip(e, tip) {
  if (!tip.classList.contains("show")) {
    e.stopImmediatePropagation()
    e.stopPropagation()
    tip.classList.add("show")
  }
}
export function AddBtn(props) {
  return (
    <div class="add-btn" onClick={props.onClick}>
      <div>+</div>
    </div>
  )
}
