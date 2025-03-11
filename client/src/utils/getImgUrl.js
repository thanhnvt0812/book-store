/* eslint-disable no-unused-vars */
//Get local image url
export const getImgUrl = (img) => {
  return new URL(`../assets/books/${img}`, import.meta.url).href;
};
