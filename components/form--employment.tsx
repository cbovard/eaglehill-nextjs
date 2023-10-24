import * as React from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormEmploymentProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching";
  message?: string;
}

export function FormEmployment({ className, ...props }: FormEmploymentProps) {
  const [isCanadianResident, setIsCanadianResident] = React.useState(false);
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [secondEmail, setEmail2] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const router = useRouter();

  // Fetch the user's IP address
  axios
    .get("https://ipinfo.io/json?token=04edb0b53a78d3")
    .then((response) => {
      const data = response.data;
      const countryCode = data.country;

      // Check if the country code is 'CA' (Canada)
      if (countryCode === "CA") {
        setIsCanadianResident(true);
      }
    })
    .catch((error) => {
      console.error("Error fetching IP geolocation data: ", error);
    });

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    if (data.get("secondEmail") !== "") {
      // Form submission is spam redirect to the homepage to mess the bot up.
      router.push("/");
    }

    setFormStatus({ status: "fetching" });

    const response = await fetch("/api/employment", {
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
    setTelephone("");
    setMessage("");

    return setFormStatus({
      status: "success",
      message: "Your message has been sent.",
    });
  };

  return (
    <div
      className="mb-8 text-white prose-h2:mb-3 prose-h2:text-xl prose-p:mb-2
    prose-p:text-base prose-a:text-deep-fir-400 prose-a:underline
    prose-a:underline-offset-2 prose-a:transition-all hover:prose-a:underline-offset-4 prose-h2:lg:text-2xl"
    >
      <div>
        {isCanadianResident ? (
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
              <label htmlFor="telephone" className="text-text font-semibold">
                {"Your Telephone"}
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                maxLength={255}
                value={telephone}
                onChange={(event) => setTelephone(event.target.value)}
                className="border-gray focus:outline-link focus:border-gray border-2 px-2 py-3 text-black focus:outline-dotted focus:outline-offset-2"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-text font-semibold">
                {"Tell us a bit about you"}
                <span className="text-sm text-red-500">*</span>
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
                className="mt-2 inline-block cursor-pointer rounded-md bg-gradient-to-b from-deep-fir-700 to-deep-fir-800 px-6
          py-3 text-xl font-bold text-white shadow-black text-shadow-sm hover:from-deep-fir-800 hover:to-deep-fir-700"
                disabled={formStatus?.status === "fetching"}
                value={
                  formStatus?.status === "fetching"
                    ? "Please Wait"
                    : "Send Message"
                }
              />
            </div>
          </form>
        ) : (
          <h2>
            <strong>Sorry, this form is only for Canadian residents.</strong>
          </h2>
        )}
      </div>
    </div>
  );
}
