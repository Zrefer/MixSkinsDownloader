const loadImage = (
  src: string,
  { useCors = false, altSrc }: { useCors?: boolean; altSrc?: string },
): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = useCors ? 'Anonymous' : null;

    image.onload = () => resolve(image);
    image.onerror = (event, soucre, lineNo, colNo, error) => {
      if (altSrc && image.src !== altSrc) image.src = altSrc;
      else {
        reject(
          new Error(`Cannot load image "${image.src}": ${error?.message}`),
        );
      }
    };
    image.src = src;
  });

export default loadImage;
