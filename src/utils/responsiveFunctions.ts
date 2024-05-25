import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("screen");

export const screenWidth = width < height ? width : height;

export const screenHeight = width < height ? height : width;

export const responsiveWidth = (size:number) => {
  const responsiveValue = screenWidth / 428;
  return responsiveValue * size;
};

export const responsiveHeight = (size:number) => {
  const responsiveValue = screenHeight / 966;
  return responsiveValue * size;
};

const sizeFactor = 1.25;

export const respFontSize = (size:number) =>
  responsiveWidth(size * sizeFactor) / PixelRatio.getFontScale();
