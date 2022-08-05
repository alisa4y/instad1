import {
  pageBody,
  header,
  Paper,
  Graph,
  BotProgressList,
  DropDown,
} from "../components"
import TimeAgo from "javascript-time-ago"
import fa from "javascript-time-ago/locale/fa"

TimeAgo.addDefaultLocale(fa)
const botActions = [
  {
    date: Date.now() - 24 * 60 * 60 * 1000,
    bots: [
      {
        botname: "بات جیدد",
        data: [
          "کامنت",
          "13",
          "پاسخ به کامنت",
          "24",
          "لایک کامنت",
          "34",
          "فالو کردن",
          "13",
          "پست گزاری",
          "31",
          "لایک پست",
          "120",
          "پیام دادن",
          "33",
          "آنفالو",
          "13",
        ],
      },
      {
        botname: "بات جیدد",
        data: [
          "کامنت",
          "13",
          "پاسخ به کامنت",
          "24",
          "لایک کامنت",
          "34",
          "فالو کردن",
          "13",
          "پست گزاری",
          "31",
          "لایک پست",
          "120",
          "پیام دادن",
          "33",
          "آنفالو",
          "13",
        ],
      },
    ],
  },
]
function Panel() {
  return (
    <>
      <Paper title="نمودار فالور ها" sub="افزایش یافته" color="green">
        <Graph
          data={[65, 59, 50, 48, 56, 57, 80]}
          labels={[1, 2, 3, 4, 5, 6, 7]}
        />
      </Paper>
      <Paper title="روبات ها" class="bot">
        <BotProgressList />
      </Paper>
      <Paper title="گزارش فعالیت  ها">
        <BotReport data={botActions} />
      </Paper>
    </>
  )
}
const timeAgo = new TimeAgo("fa")
function BotReport(props) {
  const data = props.data
  return (
    <DropDown
      items={botActions.map(bot => ({
        head: timeAgo.format(bot.date),
        body: (
          <For each={bot.bots}>
            {bot => {
              return (
                <>
                  <div class="bot-name">{bot.botname}</div>
                  <Report data={bot.data} />
                </>
              )
            }}
          </For>
        ),
      }))}
    />
  )
}
function Report(props) {
  return (
    <ul class="report">
      <For each={props.data}>{v => <li>{v}</li>}</For>
    </ul>
  )
}
pageBody.main = <Panel />
header.title = "پنل کاربری"
header.menu.push({
  content: "پنل کاربری",
  page: pageBody.main,
})
