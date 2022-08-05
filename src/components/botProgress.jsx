import { children, createSignal } from "solid-js"
import { backPage, Icon } from "./tools"
import bi1 from "../assets/icons/robot-svgrepo-com.svg"
import bi2 from "../assets/icons/robot-svgrepo-com-2.svg"
import bi3 from "../assets/icons/robot-svgrepo-com-3.svg"
import bi4 from "../assets/icons/robot-svgrepo-com-4.svg"
import bi5 from "../assets/icons/robot-svgrepo-com-5.svg"
import play from "../assets/icons/play-svgrepo-com.svg"
import pause from "../assets/icons/pause-svgrepo-com.svg"
import add from "../assets/icons/add-svgrepo-com.svg"
import delIcon from "../assets/icons/delete-svgrepo-com.svg"
import "./botProgress.styl"
import { pageBody, header } from "./tools"
import {
  DualSlider,
  Slider,
  Input,
  Text,
  DateRange,
  CheckBox,
  AddBtn,
} from "./form"
import { DropDown } from "./dropdown"
import { ael, map, reduce } from "js-tools"
import { onM } from "../tools"
import { MessageList } from "./messages"
import { createStore } from "solid-js/store"

const botIcons = [bi1, bi2, bi3, bi4, bi5]
const getBotIcon = (function () {
  let index = 0
  return () => botIcons[index++ % botIcons.length]
})()
export const [bots, setBots] = createStore([])
const genId = (function () {
  let i = 0
  return () => i++
})()
const newBotState = () => ({
  name: "بات جدید",
  likePosts: { times: 10 },
  likeComment: { times: 10 },
  comment: { times: 10 },
  replyComment: { times: 10 },
  follow: { times: 10 },
  unfollow: {},
  messaging: { times: 10 },
  reposting: {},
  id: genId(),
})

export function BotProgressList(props) {
  return (
    <div>
      <ul class="botProgress">
        <For each={bots}>{data => <BotProgressItem data={data} />}</For>
        <AddBtn onClick={() => setBots([...bots, newBotState()])} />
      </ul>
      <Show when={bots.length > 0}>
        <Icon
          src={play}
          class="play-btn"
          onClick={() => {
            // Androud.runBots(JSON.stringify(bots))
          }}
        />
      </Show>
    </div>
  )
}
const calcBotAchievement = state => {
  let total = reduce(
    map(state, v => v.times || 0),
    (a, b) => a + b,
    0
  )
  let done = reduce(
    map(state, v => v.done || 0),
    (a, b) => a + b,
    0
  )
  return (done / total) * 100
}
function BotProgressItem(props) {
  let progress
  const achievement = calcBotAchievement(props.data)
  const config = <BotConfig data={props.data} />
  onM(() => {
    progress.style.width = `${achievement * 1.2}%`
  })
  return (
    <div
      class="progressItem  "
      classList={{ finished: achievement === 100 }}
      onClick={() => {
        pageBody.popup = config
      }}
    >
      <Icon src={getBotIcon()} />
      <div ref={progress} class="progress"></div>
      <div class="name">{props.data.name}</div>
      <div class="achievement">{achievement}%</div>
      <Icon
        src={delIcon}
        onClick={e => {
          e.stopImmediatePropagation()
          setBots(bots.filter(v => v !== props.data))
        }}
      />
      {/* <Icon src={props.status === "play" ? play : pause} /> */}
    </div>
  )
}
function BotConfig(props) {
  const data = props.data

  return (
    <div class="botConfig">
      <Input
        label="نام بات"
        onChange={v => {
          setBots(bot => bot.id === data.id, "name", v)
        }}
        value={props.data.name}
      />
      <Input
        label="نام کاربری"
        onChange={v => {
          setBots(bot => bot.id === data.id, "username", v)
        }}
      />
      <Input
        label="رمز عبور"
        onChange={v => {
          setBots(bot => bot.id === data.id, "password", v)
        }}
      />
      <DropDown
        items={[
          {
            head: "لایک پست",
            body: GenSettings(
              {
                data: data,
                branch: "likePosts",
                name: "لایک پست",
                subject: "پست",
                times: [100, 1000],
              },
              PostFilters()
            ),
          },

          {
            head: "کامنت",
            body: GenSettings(
              {
                data: data,
                branch: "comment",
                name: "کامنت",
                subject: "پست",
                times: [10, 1000],
              },
              [
                props =>
                  MessageList({
                    label: "پیام کامنت ها:",
                    ...handleChange(data, "comment", "messages"),
                    ...props,
                  }),
                ...PostFilters(),
              ]
            ),
          },
          {
            head: "لایک کامنت",
            body: GenSettings(
              {
                data: data,
                branch: "likeComment",
                name: "لایک کامنت",
                subject: "کامنت",
                times: [10, 1000],
              },
              [...CommentFilters()]
            ),
          },
          {
            head: "پاسخ به کامنت",
            body: GenSettings(
              {
                data: data,
                branch: "replyComment",
                name: "پاسخ به کامنت",
                subject: "کامنت",
                times: [10, 1000],
              },
              [
                props =>
                  MessageList({
                    label: "پیام پاسخ ها:",
                    ...handleChange(data, "replyComment", "messages"),
                    ...props,
                  }),
                ...CommentFilters(),
              ]
            ),
          },
          {
            head: "فالو کردن",
            body: GenSettings(
              {
                data: data,
                branch: "follow",
                name: "فالو کردن",
                subject: "کاربر",
                times: [10, 1000],
              },
              AccountFilters()
            ),
          },
          {
            head: "آنفالو",
            body: (
              <div class="bot-settings">
                <CheckBox
                  label="آنفالو کردن کسانی که شما را فالو بک نکرده‌اند"
                  data={data.unfollow}
                />
              </div>
            ),
          },
          {
            head: "پیام دادن",
            body: "",
          },
          {
            head: "پست گذاری",
            body: "",
          },
        ]}
      />
    </div>
  )
}

function GenSettings(props, extra) {
  return (
    <div class="bot-settings">
      <Times {...props} />
      {extra?.map(c => c(props))}
    </div>
  )
}
function Times(props) {
  return (
    <Slider
      label="تعداد:"
      tip={`چند بار می‌ خواهید که ${props.name} را انجام دهد`}
      onChange={v =>
        setBots(
          bot => bot === props.data,
          props.branch,
          b => ({ ...b, times: v })
        )
      }
      min={props.times[0]}
      max={props.times[1]}
    />
  )
}
function Keywrods(props) {
  return (
    <Text
      label="کلمات کلیدی"
      tip={`کلمات کلیدی برای جستجو ${props.subject} در انجام ${props.name}`}
      placeholder="کلمه کلیدی 1\nکلمه کلیدی 2"
      onChange={v => (props.data.keywords = v)}
    />
  )
}
const ViewRange = props => (
  <DualSlider
    {...props}
    label={"بازه بازدید کنندگان " + props.subject}
    tip="بازه بازدیدکنندگان"
    key="viewRange"
  />
)
const LikesRange = props => (
  <DualSlider
    {...props}
    label={"بازه لایک " + props.subject}
    tip="بازه لایک های"
    key="likesRange"
  />
)

const CommentRange = props => (
  <DualSlider
    {...props}
    label={"بازه کامنت  " + props.subject}
    tip="بازه کامنت های"
    key="commentRange"
  />
)
const RepliesRange = props => (
  <DualSlider
    {...props}
    label={"بازه Reply " + props.subject}
    tip="بازه Reply "
    key="repliesRange"
  />
)

const PostsRange = props => (
  <DualSlider
    {...props}
    label={"بازه پست گذاری های " + props.subject}
    tip="بازه پست گذاری های "
    key="postsRange"
  />
)

const FollowerRange = props => (
  <DualSlider
    {...props}
    label={"بازه فالورهای " + props.subject}
    tip="بازه فالورهای "
    key="followerRange"
  />
)

const FollowingRange = props => (
  <DualSlider
    {...props}
    label={"بازه فالو کردن " + props.subject}
    tip="بازه فالو کردن "
    key="followingRange"
  />
)

function PostFilters() {
  return [Keywrods, DateRange, ViewRange, LikesRange, CommentRange]
}
function CommentFilters() {
  return [DateRange, LikesRange, RepliesRange]
}
function AccountFilters() {
  return [PostsRange, FollowerRange, FollowingRange]
}
function handleChange(data, branch, key) {
  return {
    onChange: v =>
      setBots(
        bot => bot === data,
        branch,
        d => (d[key] = v)
      ),
  }
}
