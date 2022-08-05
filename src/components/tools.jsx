import { Signal } from "../tools"
import menuIcon from "../assets/icons/menu-svgrepo-com.svg"
import notificationIcon from "../assets/icons/notification-svgrepo-com.svg"
import backIcon from "../assets/icons/back-svgrepo-com.svg"
import filterIcon from "../assets/icons/filter-svgrepo-com.svg"
import { children, createEffect, createSignal, For, Show } from "solid-js"
import { onM } from "../tools"
import { createStore } from "solid-js/store"
import { qs, ael } from "js-tools"
import "./tools.styl"
import "swiped-events"

export const header = Signal()
header.title = "undefined"
header.menu = []
header.navsBar = []
header.extra = null
header.notificationPage = null
const [history, setHistory] = createStore([])

export const pageBody = Signal()
pageBody.main = null
pageBody.popup = null

export function addHistory() {
  setHistory([
    ...history,
    {
      body: pageBody.main,
      title: header.title,
      navsBar: header.navsBar,
      extra: header.extra,
    },
  ])
}
export function changePage(v) {
  addHistory()
  pageBody.main = v
}
export function backPage() {
  if (pageBody.popup) {
    pageBody.popup = null
    resetSubHeader()
  } else {
    const last = history.at(-1)
    setHistory(history.slice(0, -1))
    pageBody.main = last.body
    header.title = last.title
    header.extra = last.extra
    header.navsBar = last.navsBar
  }
}
export function closePopup() {
  pageBody.popup = null
}

function resetSubHeader() {
  header.extra = null
  header.navsBar = []
}
function Header(props) {
  let [activeNavBar, setActiveNavBar] = createSignal(null)
  let [sub, setSub] = createSignal(null)
  function changeNav(data) {
    const elm = data.elm
    activeNavBar().classList.remove("active")
    sub().active = false
    setActiveNavBar(elm)
    data.active = true
    setSub(data)
    elm.classList.add("active")
    pageBody.main = data.page
  }
  document.addEventListener("swiped", function (e) {
    if (header.navsBar.length > 0) {
      const dir = e.detail.dir
      if (dir === "left") {
        const i = header.navsBar.findIndex(nav => nav.active)
        if (i > 0) {
          changeNav(header.navsBar[i - 1])
        }
      } else if (dir === "right") {
        const i = header.navsBar.findIndex(nav => nav.active)
        if (i < header.navsBar.length - 1) {
          changeNav(header.navsBar[i + 1])
        }
      }
    }
  })
  const menu = (
    <ul class="menu">
      {header.menu.map(({ content, page, navsBar }) => {
        const click = () => {
          if (navsBar) {
            const nav = navsBar.find(nav => nav.active)
            setActiveNavBar(nav)
            changePage(nav.page)
            header.navsBar = navsBar
          } else {
            changePage(page)
            resetSubHeader()
          }
          header.title = content
          pageBody.popup = null
        }
        return (
          <li class="Nav" onClick={click}>
            {content}
          </li>
        )
      })}
    </ul>
  )
  return (
    <header ref={props.ref}>
      <h1>
        <Icon
          src={menuIcon}
          onClick={() =>
            (pageBody.popup = pageBody.popup === menu ? null : menu)
          }
        />
        <div class="title">{header.title}</div>
        <Show
          when={header.extra}
          fallback={
            <Icon
              src={notificationIcon}
              onClick={() => {
                changePage(header.notificationPage)
                resetSubHeader()
                header.title = "پیام ها"
              }}
            />
          }
        >
          <Icon src={header.extra.icon} onClick={header.extra.onClick} />
        </Show>
        <Show when={history.length > 0 || pageBody.popup}>
          <Icon src={backIcon} onClick={backPage} />
        </Show>
      </h1>
      <Show when={header.navsBar.length > 0}>
        <div class="sub">
          <For each={header.navsBar}>
            {data => {
              const { content, page, active } = data
              let elm = (
                <div
                  classList={{ active: active === true }}
                  onClick={() => changeNav(data)}
                >
                  {content}
                </div>
              )
              data.elm = elm
              if (active) {
                setActiveNavBar(elm)
                setSub(data)
              }
              return elm
            }}
          </For>
        </div>
      </Show>
    </header>
  )
}

export function Page() {
  let headerElm, body, popup
  onM(() => {
    body.style.transform = `translateY(${headerElm.clientHeight + "px"})`
    body.style.height = window.innerHeight - headerElm.clientHeight + "px"
    createEffect(() => {
      header.title
      header.navsBar
      body.style.transform = `translateY(${headerElm.clientHeight + "px"})`
      body.style.height = window.innerHeight - headerElm.clientHeight + "px"
    })
  })
  return (
    <div class="page">
      <Header ref={headerElm}></Header>
      <div class="body" ref={body}>
        <main>{pageBody.main}</main>
        <Show when={pageBody.popup}>
          <div ref={popup} class="popupPage">
            {pageBody.popup}
          </div>
        </Show>
      </div>
    </div>
  )
}
export function Paper(props) {
  const c = children(() => props.children)
  return (
    <div class={"paper " + props.class || ""}>
      <Show when={props.title}>
        <h2>
          {props.title}
          <Show when={props.icon}>
            <Icon src={props.icon} />
          </Show>
          <Show when={props.sub}>
            <div style={`color: ${props.color}`}>{props.sub}</div>
          </Show>
        </h2>
      </Show>
      <div class="content" style={props.style || {}}>
        {c()}
      </div>
    </div>
  )
}

export function Icon(props) {
  return <Dynamic class="icon" {...props} component={props.src} />
}
