// Google Docs integration - uncomment and configure when ready
// export async function getGoogleDocStructured(
//   fileId: string,
//   accessToken: string
// ) {
//   const auth = new google.auth.OAuth2();
//   auth.setCredentials({ access_token: accessToken });

//   const docs = google.docs({ version: "v1", auth });

//   const res = await docs.documents.get({ documentId: fileId });
//   return res.data;
// }
