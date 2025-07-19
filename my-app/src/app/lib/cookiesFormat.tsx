export default function cookiesFormat(cookies: string) {
  const cookieFormat: {
    [key: string]: string;
  } = {};
  const cookiesSplit = cookies.split("; ");
  cookiesSplit.forEach((val) => {
    const parsedValue = val.split("=");
    cookieFormat[parsedValue[0]] = parsedValue[1];
  });
  return cookieFormat;
}
