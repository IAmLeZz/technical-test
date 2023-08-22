const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];
const generateSlides = (rockets: Rocket[]) => {
  const slides = rockets.flatMap((rocket) => {
    return rocket.flickr_images.map((src: string) => {
      const width = 2880;
      const height = 1440;
      return {
        src,
        width,
        height,
        srcSet: breakpoints.map((breakpoint) => {
          const breakpointHeight = Math.round((height / width) * breakpoint);
          return {
            src,
            width: breakpoint,
            height: breakpointHeight,
          };
        }),
      };
    });
  });

  return slides;
};
export default generateSlides;