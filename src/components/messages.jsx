import { createEffect, createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import add from "../assets/icons/add-svgrepo-com.svg"
import delIcon from "../assets/icons/delete-svgrepo-com.svg"
import { Icon } from "./tools"
import "./messages.styl"
import { AddBtn } from "./form"

export function MessageList(props) {
  const [messages, setMessages] = createSignal(["خخخخخ"])
  createEffect(() => props.onChange(messages()))
  return (
    <div class="message-list">
      <div class="label">{props.label}</div>
      <ul>
        <For each={messages()}>
          {(message, index) => (
            <li>
              <textarea
                value={message}
                onChange={e => {
                  setMessages(
                    messages().map((m, i) => {
                      if (i === index()) return e.target.value
                      return m
                    })
                  )
                }}
              ></textarea>
              <Icon
                src={delIcon}
                onClick={() =>
                  setMessages(messages().filter((m, i) => i !== index()))
                }
              />
            </li>
          )}
        </For>
      </ul>
      <AddBtn onClick={() => setMessages([...messages(), "پیام جدید"])} />
    </div>
  )
}
