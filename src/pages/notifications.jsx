import { header, Paper } from "../components"

function Notifications() {
  return (
    <>
      <Paper title="دیروز">
        متن پیام با تبلیغ این برنامه و فقط یک بار معرفی کد تخفیف خود به دیگران
        به راحتی تا آخر عمر .....
      </Paper>
      <Paper>
        متن پیام با تبلیغ این برنامه و فقط یک بار معرفی کد تخفیف خود به دیگران
        به راحتی تا آخر عمر .....
      </Paper>
    </>
  )
}
header.notificationPage = <Notifications />
