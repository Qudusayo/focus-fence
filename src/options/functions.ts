function validateURL(url) {
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

export { validateURL };
