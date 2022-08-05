import { header, Paper, DropDown } from "../components"

function FAQ() {
  return (
    <>
      <Paper title="سوالات" class="faq">
        <DropDown
          items={[
            {
              head: "چطور میتوانیم به شما اعتماد کنیم ؟",
              body: (
                <div>
                  شما میتوانید به طور رایگان این برنامه را دانلود کنید و امتحان
                  کنید سپس پس از راضی بودن از عملکرد آن اقدام به خرید آن دهید
                </div>
              ),
            },
            {
              head: "چطور میتوانیم به شما اعتماد کنیم ؟",
              body: (
                <div>
                  شما میتوانید به طور رایگان این برنامه را دانلود کنید و امتحان
                  کنید سپس پس از راضی بودن از عملکرد آن اقدام به خرید آن دهید
                </div>
              ),
            },
            {
              head: "چطور میتوانیم به شما اعتماد کنیم ؟",
              body: (
                <div>
                  شما میتوانید به طور رایگان این برنامه را دانلود کنید و امتحان
                  کنید سپس پس از راضی بودن از عملکرد آن اقدام به خرید آن دهید
                </div>
              ),
            },
          ]}
        ></DropDown>
      </Paper>
    </>
  )
}

header.menu.push({
  content: "سوالات متداول",
  page: <FAQ />,
})
