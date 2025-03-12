/* eslint-disable no-unused-vars */
//Get local image url
export const getBooksImgUrl = (img) => {
  return new URL(`../assets/books/${img}`, import.meta.url).href;
};
export const getNewsImgUrl = (img) => {
  return new URL(`../assets/news/${img}`, import.meta.url).href;
};
