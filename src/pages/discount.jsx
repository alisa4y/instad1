import { Button, header, Input, Paper } from "../components"

function DiscountCode() {
  return (
    <>
      <Paper title="کد تخفیف فعلی">
        <div class="discountCode">asfqwer234556 s’werjjpoqwuierp-2u;sdfkj</div>
      </Paper>
      <Paper
        title="ثبت کد تخفیف"
        style={{ display: "grid", "place-items": "center", gap: "10px" }}
      >
        <Input label="کد تخفیف:" />
        <Button>ثبت</Button>
      </Paper>
    </>
  )
}

header.menu.push({
  content: "کد تخفیف",
  page: <DiscountCode />,
})
