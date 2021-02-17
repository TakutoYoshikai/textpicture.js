const Jimp = require("jimp");

function AsciiArt(url) {
  return new Promise((resolve, reject) => {
    Jimp.read(url, (err, img) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      const width = img.bitmap.width;
      const height = img.bitmap.height;
      const colors = [];
      for (let i = 0; i < height; i++) {
        colors.push([]);
        for (let j = 0; j < width; j++) {
          const pixel = img.getPixelColor(j, i);
          const rgba = Jimp.intToRGBA(pixel);
          colors[i].push([rgba.r, rgba.g, rgba.b]);
        }
      }
      let result = "";
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const rgb = colors[i][j];
          const average = (rgb[0] + rgb[1] + rgb[2]) / 3;
          if (average < 50) {
            result += "00";
          } else if (average < 104) {
            result += "88";
          } else if (average < 180) {
            result += "33";
          } else if (average < 215) {
            result += "11";
          } else {
            result += "  ";
          }
        }
        result += "\n";
      }
      resolve(result);
    });
  });
}

module.exports = AsciiArt;
