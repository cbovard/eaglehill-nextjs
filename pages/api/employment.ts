import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Only accept POST requests.
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    if (req.method === "POST") {
      // The body field will contain the form values.
      // You can make a request to your site with these values.
      const body = JSON.parse(req.body);

      console.log(body);

      // Format the payload for /webform_rest/submit
      const payload = {
        webform_id: "employment",
        your_name: body.name,
        your_email: body.email,
        your_telephone: body.telephone,
        tell_us_a_bit_about_you: body.message,
      };

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
        },
      );

      // An error occured on Drupal.
      // Here you can throw error, or send back the response json with the error.
      if (!response.ok) {
        throw new Error();
      }

      // The form has been submitted. Return success 200.
      res.end();
    }
  } catch (error) {
    return res.status(500).end(error);
  }
}
