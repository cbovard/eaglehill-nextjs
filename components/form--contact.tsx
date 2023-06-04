import * as React from "react"
import classNames from "classnames"
import { useRouter } from 'next/navigation';

interface FormContactProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching"
  message?: string
}

export function FormContact({ className, ...props }: FormContactProps) {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null)
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [secondEmail, setEmail2] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)

    if (data.get('secondEmail') !== "") {
      // Form submission is spam redirect to the homepage to mess the bot up.
      router.push('/')
    }

    setFormStatus({ status: "fetching" })

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(data)),
    })


    if (!response.ok) {
      return setFormStatus({
        status: "error",
        message: "An Error Occured Please Try Again!",
      })
    }

    // Clear form.
    setName('');
    setEmail('');
    setEmail2('');
    setSubject('');
    setMessage('');

    return setFormStatus({
      status: "success",
      message: "Your message has been sent.",
    })
  }

  return (
    <form
      className={classNames("grid gap-4", className)}
      onSubmit={onSubmit}
      {...props}
    >
      {formStatus?.message && (
        <p
          className={classNames("py-3 px-4 border", {
            "border-link bg-link/10 text-link":
              formStatus?.status === "success",
            "border-error bg-error/10 text-error":
              formStatus?.status === "error",
          })}
        >
          {formStatus.message}
        </p>
      )}
      <div className="grid gap-2">
        <label htmlFor="name" className="font-semibold text-text">
          {"Your Name"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          maxLength={255}
          value={name}
          onChange={event => setName(event.target.value)}
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:ring-0 focus:outline-link focus:border-gray"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="font-semibold text-text">
          {"Your Email Address"}
          <span className="text-sm text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          maxLength={255}
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:ring-0 focus:border-gray"
        />
      </div>
      <div className="hidden">
        <label htmlFor="secondEmail" className="font-semibold text-text">
          {"Re-enter Email Address"}
          <span className="text-sm text-red-500">*</span>
        </label>
        <input
          type="email"
          id="secondEmail"
          name="secondEmail"
          value={secondEmail}
          onChange={event => setEmail2(event.target.value)}
          maxLength={255}
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:ring-0 focus:border-gray"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="subject" className="font-semibold text-text">
          {"Subject"} <span className="text-sm text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          maxLength={255}
          value={subject}
          onChange={event => setSubject(event.target.value)}
          required
          className="px-2 py-3 border-2 border-gray focus:outline-dotted focus:outline-offset-2 focus:outline-link focus:border-gray"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="font-semibold text-text">
          {"Message"} <span className="text-sm text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={event => setMessage(event.target.value)}
          required
          className="h-48 px-2 py-3 border-2 border-gray focus:ring-0 focus:outline-dotted focus:outline-offset-2 focus:border-gray focus:outline-link"
        ></textarea>
      </div>
      <div>
        <input
          type="submit"
          className="px-6 py-3 font-serif text-xl text-white transition-colors border-2 rounded-sm cursor-pointer bg-link hover:bg-white hover:text-black border-link"
          disabled={formStatus?.status === "fetching"}
          value={
            formStatus?.status === "fetching"
              ? "please-wait"
              : "send-message"
          }
        />
      </div>
    </form>
  )
}
