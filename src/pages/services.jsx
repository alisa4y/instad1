import { header, Paper, Button } from "../components"

function CurrentService() {
  return (
    <>
      <Paper title="سرویس فعلی:">
        <p>سرویس یک ماهه از تاریخ 1401/01/21 تا تاریخ 1401/01/21 فعال میباشد</p>
      </Paper>
      <Paper title="پیش فاکتور:" class="g3">
        <div class="codeName">یک ماهه</div>
        <div class="price">25000 (تومان)</div>
        <Button class="buy">خرید</Button>
      </Paper>
      <Paper title="تاریخجه سفارشات:" class="g3">
        <div class="codeName">یک ماهه</div>
        <div class="Date"> 1401/01/21 </div>
        <div class="price">25000 (تومان)</div>
        <div class="codeName">یک ماهه</div>
        <div class="Date"> 1401/01/21 </div>
        <div class="price">25000 (تومان)</div>
        <div class="codeName">یک ماهه</div>
        <div class="Date"> 1401/01/21 </div>
        <div class="price">25000 (تومان)</div>
        <div class="codeName">یک ماهه</div>
        <div class="Date"> 1401/01/21 </div>
        <div class="price">25000 (تومان)</div>
      </Paper>
    </>
  )
}
function BuyService() {
  return (
    <>
      <Paper title="تعرفه سرویس ها" class="g3">
        <div class="codeName">یک ماهه</div>
        <div class="price">25000 (تومان)</div>
        <Button class="buy">خرید</Button>
        <div class="codeName">یک ماهه</div>
        <div class="price">25000 (تومان)</div>
        <Button class="buy">خرید</Button>
        <div class="codeName">یک ماهه</div>
        <div class="price">25000 (تومان)</div>
        <Button class="buy">خرید</Button>
        <div class="codeName">یک ماهه</div>
        <div class="price">25000 (تومان)</div>
        <Button class="buy">خرید</Button>
      </Paper>
    </>
  )
}

header.menu.push({
  content: "سرویس ها",
  navsBar: [
    { content: "سرویس کنونی", page: <CurrentService />, active: true },
    { content: "سفارش سرویس", page: <BuyService /> },
  ],
})
