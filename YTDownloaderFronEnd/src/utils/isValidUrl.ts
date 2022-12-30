const isValidUrl = (url: string) => {
  // validate youtube url
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "(www.)?" + // www
      "(youtube.com|youtu.be)" // domain name
  );
  return !!pattern.test(url);
};

export default isValidUrl;
