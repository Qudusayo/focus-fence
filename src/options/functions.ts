import toast from "react-hot-toast";

function validateURL(url: string) {
  if (
    /^((http|https):\/\/)[-a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)$/g.test(
      url
    )
  ) {
    console.log("Valid");
  } else {
    console.log("Not Valid");
  }
}

const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

function extractDomain(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}

const notify = (msg: string, type?: "success" | "error") => {
  if (type === "success") {
    toast.success(msg);
  } else if (type === "error") {
    toast.error(msg);
  } else {
    toast(msg);
  }
};

export { validateURL, isValidUrl, extractDomain, notify };
