import { header, Paper } from "../components"

function AboutUs() {
  return (
    <>
      <Paper title="تیم ما">
        <p>
          متن پیام با تبلیغ این برنامه و فقط یک بار معرفی کد تخفیف خود به دیگران
          به راحتی تا آخر عمر .....
        </p>
      </Paper>
      <Paper title="ارتباط با ما">
        <p>
          <span>تلگرام: </span>www.telegram.com
        </p>
      </Paper>
    </>
  )
}

header.menu.push({
  content: "درباره ما",
  page: <AboutUs />,
})
