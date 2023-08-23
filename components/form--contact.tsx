import * as React from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";

interface FormContactProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching";
  message?: string;
}

export function FormContact({ className, ...props }: FormContactProps) {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [secondEmail, setEmail2] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    if (data.get("secondEmail") !== "") {
      // Form submission is spam redirect to the homepage to mess the bot up.
      router.push("/");
    }

    setFormStatus({ status: "fetching" });

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(data)),
    });

    if (!response.ok) {
      return setFormStatus({
        status: "error",
        message: "An Error Occured Please Try Again!",
      });
    }

    // Clear form.
    setName("");
    setEmail("");
    setEmail2("");
    setSubject("");
    setMessage("");

    return setFormStatus({
      status: "success",
      message: "Your message has been sent.",
    });
  };

  return (
    <div className="rounded border border-deep-fir-900 bg-deep-fir-950 p-4">
      <h1 className="mb-3 text-center font-bebas-neue text-4xl tracking-wide text-deep-fir-100 md:text-4xl lg:mb-5 lg:text-left lg:text-5xl">
        Contact Us
      </h1>
      <div
        className="mb-7 text-white prose-headings:font-bebas-neue prose-headings:tracking-wide prose-headings:text-deep-fir-100
        prose-p:mb-2 prose-p:text-base prose-a:text-deep-fir-400
        prose-a:underline prose-a:underline-offset-2 prose-a:transition-all hover:prose-a:underline-offset-4"
      >
        <form
          className={classNames("grid gap-4", className)}
          onSubmit={onSubmit}
          {...props}
        >
          {formStatus?.message && (
            <p
              className={classNames("border px-4 py-3", {
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
            <label htmlFor="name" className="text-text font-semibold">
              {"Your Name"} <span className="text-sm text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              maxLength={255}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="border-gray focus:outline-link focus:border-gray border-2 px-2 py-3 text-black focus:outline-dotted focus:outline-offset-2 focus:ring-0"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-text font-semibold">
              {"Your Email Address"}
              <span className="text-sm text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={255}
              required
              className="border-gray focus:outline-link focus:border-gray border-2 px-2 py-3 text-black focus:outline-dotted focus:outline-offset-2 focus:ring-0"
            />
          </div>
          <div className="hidden">
            <label htmlFor="secondEmail" className="text-text font-semibold">
              {"Re-enter Email Address"}
              <span className="text-sm text-red-500">*</span>
            </label>
            <input
              type="email"
              id="secondEmail"
              name="secondEmail"
              value={secondEmail}
              onChange={(event) => setEmail2(event.target.value)}
              maxLength={255}
              className="border-gray focus:outline-link focus:border-gray border-2 px-2 py-3 text-black focus:outline-dotted focus:outline-offset-2 focus:ring-0"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="subject" className="text-text font-semibold">
              {"Subject"} <span className="text-sm text-red-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              maxLength={255}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
              className="border-gray focus:outline-link focus:border-gray border-2 px-2 py-3 text-black focus:outline-dotted focus:outline-offset-2"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-text font-semibold">
              {"Message"} <span className="text-sm text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              className="border-gray focus:border-gray focus:outline-link h-48 border-2 px-2 py-3 text-black focus:outline-dotted focus:outline-offset-2 focus:ring-0"
            ></textarea>
          </div>
          <div>
            <input
              type="submit"
              className="bg-link border-link cursor-pointer rounded-sm border-2 px-6 py-3 font-serif text-xl text-white transition-colors hover:bg-white hover:text-black"
              disabled={formStatus?.status === "fetching"}
              value={
                formStatus?.status === "fetching"
                  ? "please-wait"
                  : "send-message"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
