import { header, Paper, Button } from "../components"

import copyIcon from "../assets/icons/copy-svgrepo-com.svg"

function Advertising() {
  return (
    <>
      <Paper title="توجه فرمایید...">
        <p>
          شما میتوانید با تبلیغ این برنامه و فقط یک بار معرفی کد تخفیف خود به
          دیگران به راحتی تا آخر عمر کسب درآمد کنید.
        </p>
        <p>
          نحوه کسب درآمد به اینصورت است که پس از اینکه کاربر برنامه را نصب کرد
          کافی است که کد تخفیفی که در زیر دریافت کردید را به عنوان کد تخفیف ثبت
          کند از این پس هرگونه تراکنشی که کاربر انجام دهد بسته به نوع کد تخفیف
          درصدی از هزینه تراکنش به حساب شما اضافه میشود.
        </p>
        <p>
          به عنوان مثال اگر شما توانستید به 1000 نفر کد تخفیف نقره ای بدهید و
          این افراد سرویس یک ماهه با قیمت 14000 تومان را تهیه کنند با احتساب
          تخفیف این افراد تراکنشی با مبلغ 12،600 تومان انجام خواهند داد که 20%
          آن یعنی 2،520 تومان از هر فرد که از هزار نفر معادل 2،520،000 تومان به
          حساب شما اضافه میشود.
        </p>
        <p>
          بسته به نوع تلاش شما اگر به ده هزار نفر کد تخفیف معرفی کردید مبلغ
          25،200،000 تومان به حساب شما اضافه میشود.
        </p>
        <p>
          شما میتوانید دریافتی خود را در پنل کاربری مشاهده کنید و هنگام پابان هر
          ماه این مبلغ به شماره شبا در قسمت "حساب شما" که ثبت گردیدانتقال می
          یابد(این قسمت پس از خرید یکی از کدها ظاهر میشود).
        </p>
      </Paper>
      <Paper title="کد ها:" class="codes-prices">
        <div class="codeName">برنزی </div>
        <div class="tip">
          10% تخفیف را میدهد و به ازای هر تراکنش 20% آن را دریافت خواهید کرد
        </div>
        <div class="price">25000 (تومان)</div>
        <div class="cc">
          <Button class="buy">خرید</Button>
        </div>
        <div class="codeName"> نقره‌ای </div>
        <div class="tip">
          10% تخفیف را میدهد و به ازای هر تراکنش 20% آن را دریافت خواهید کرد
        </div>
        <div class="price">25000 (تومان)</div>
        <div class="cc">
          <Button class="buy">خرید</Button>
        </div>
        <div class="codeName"> طلایی </div>
        <div class="tip">
          10% تخفیف را میدهد و به ازای هر تراکنش 20% آن را دریافت خواهید کرد
        </div>
        <div class="price">25000 (تومان)</div>
        <div class="cc">
          <Button class="buy">خرید</Button>
        </div>
      </Paper>
    </>
  )
}
function BankInfo() {
  return (
    <>
      <Paper title="اطلاعات حساب بانکی"></Paper>
    </>
  )
}
function DiscountCode() {
  return (
    <>
      <Paper title="کد تخفیف:" icon={copyIcon}></Paper>
    </>
  )
}
header.menu.push({
  content: "درآمدزایی",
  navsBar: [
    { content: "تبلیغ گری", page: <Advertising />, active: true },
    { content: "شماره شبا", page: <BankInfo /> },
    { content: "کد", page: <DiscountCode /> },
  ],
})
