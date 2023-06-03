import { NextApiRequest, NextApiResponse } from "next"
import { drupal } from "lib/drupal"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only accept POST requests.
    if (req.method !== "POST") {
      return res.status(405).end()
    }

    if (req.method === "POST") {
      //const url = drupal.buildUrl("/webform_rest/submit")


      //console.log(JSON.stringify(request.body.name), 'body shit');

      //console.log(url, 'post URL');

      // // Submit to Drupal.
      // const result = await drupal.fetch(url.toString(), {
      //   method: "POST",
      //   body: JSON.stringify({
      //     webform_id: "contact",
      //     name: request.body.name,
      //     email: request.body.email,
      //     subject: request.body.subject,
      //     message: request.body.message,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })

      // The body field will contain the form values.
      // You can make a request to your site with these values.
      const body = JSON.parse(req.body)

      // Format the payload for /webform_rest/submit
      const payload = {
        webform_id: "contact",
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      }

      // Send the payload to Drupal.
      // Ensure you have the /webform_rest/submit resource enabled.
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      // An error occured on Drupal.
      // Here you can throw error, or send back the response json with the error.
      if (!response.ok) {
        throw new Error()
      }

      // The form has been submitted. Return success 200.
      res.end()
    }
  } catch (error) {
    return res.status(500).end(error)
  }
}


