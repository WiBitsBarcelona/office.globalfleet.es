import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const iconsAssets = import.meta.globEager(
  `/src/assets/images/icons/*.{jpg,jpeg,png,svg}`
);

const helpers = {
  cutText(text = '', length = 0) {
    if(!text){
      return;
    }
    if (text.split(" ").length > 1) {
      const string = text.substring(0, length);
      const splitText = string.split(" ");
      splitText.pop();
      return splitText.join(" ") + "...";
    } else {
      return text;
    }
  },
  cutFileName( filename, length) {
    if (filename.length > length){
      let nameArray = filename.split(".");
      const cuttedFileName = nameArray[0].slice(0, length -15);
      return cuttedFileName + '...' + nameArray[1];
    }else{
      return filename;
    }
  },
  formatDate(date, format) {
    return dayjs(date).format(format);
  },
  capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "";
    }
  },
  onlyNumber(string) {
    if (string) {
      return string.replace(/\D/g, "");
    } else {
      return "";
    }
  },
  formatCurrency(number) {
    if (number) {
      const formattedNumber = number.toString().replace(/\D/g, "");
      const rest = formattedNumber.length % 3;
      let currency = formattedNumber.substr(0, rest);
      const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
      let separator;

      if (thousand) {
        separator = rest ? "." : "";
        currency += separator + thousand.join(".");
      }

      return currency;
    } else {
      return "";
    }
  },
  timeAgo(time) {
    const date = new Date(
      (time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")
    );
    const diff = (new Date().getTime() - date.getTime()) / 1000;
    const dayDiff = Math.floor(diff / 86400);

    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
      return dayjs(time).format("MMMM DD, YYYY");
    }

    return (
      (dayDiff === 0 &&
        ((diff < 60 && "just now") ||
          (diff < 120 && "1 minute ago") ||
          (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
          (diff < 7200 && "1 hour ago") ||
          (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
      (dayDiff === 1 && "Yesterday") ||
      (dayDiff < 7 && dayDiff + " days ago") ||
      (dayDiff < 31 && Math.ceil(dayDiff / 7) + " weeks ago")
    );
  },
  diffTimeByNow(time) {
    const startDate = dayjs(dayjs().format("YYYY-MM-DD HH:mm:ss").toString());
    const endDate = dayjs(dayjs(time).format("YYYY-MM-DD HH:mm:ss").toString());

    const duration = dayjs.duration(endDate.diff(startDate));
    const milliseconds = Math.floor(duration.asMilliseconds());

    const days = Math.round(milliseconds / 86400000);
    const hours = Math.round((milliseconds % 86400000) / 3600000);
    let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000);
    const seconds = Math.round(
      (((milliseconds % 86400000) % 3600000) % 60000) / 1000
    );

    if (seconds < 30 && seconds >= 0) {
      minutes += 1;
    }

    return {
      days: days.toString().length < 2 ? "0" + days : days,
      hours: hours.toString().length < 2 ? "0" + hours : hours,
      minutes: minutes.toString().length < 2 ? "0" + minutes : minutes,
      seconds: seconds.toString().length < 2 ? "0" + seconds : seconds,
    };
  },
  isset(obj) {
    if (obj !== null && obj !== undefined) {
      if (typeof obj === "object" || Array.isArray(obj)) {
        return Object.keys(obj).length;
      } else {
        return obj.toString().length;
      }
    }

    return false;
  },
  toRaw(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  randomNumbers(from, to, length) {
    const numbers = [0];
    for (let i = 1; i < length; i++) {
      numbers.push(Math.ceil(Math.random() * (from - to) + to));
    }

    return numbers;
  },
  toRGB(colors) {
    const tempColors = Object.assign({}, colors);
    const rgbColors = Object.entries(tempColors);
    for (const [key, value] of rgbColors) {
      if (typeof value === "string") {
        if (value.replace("#", "").length == 6) {
          const aRgbHex = value.replace("#", "").match(/.{1,2}/g);
          tempColors[key] = (opacity = 1) =>
            `rgb(${parseInt(aRgbHex[0], 16)} ${parseInt(
              aRgbHex[1],
              16
            )} ${parseInt(aRgbHex[2], 16)} / ${opacity})`;
        }
      } else {
        tempColors[key] = helpers.toRGB(value);
      }
    }
    return tempColors;
  },
  toKmsHour(metersseg){
    const kmHour = ((parseFloat(metersseg)*18)/5).toFixed(0);
    return kmHour;
  },
  toDate(stamp){
    const currentDate = new Date(parseFloat(stamp));
    
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1; // Months start at 0!
    let dd = currentDate.getDate();
    let hr = currentDate.getHours();
    let min = currentDate.getMinutes();
    let seg = currentDate.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hr < 10 ) hr = '0' + hr;
    if (min < 10 ) min = '0' + min;
    if (seg < 10 ) seg = '0' + seg;

    const formattedDate =  dd + '/' + mm + '/' + yyyy + " " + hr + ":" + min + ":" + seg;

    return formattedDate;
  },
  getDirection(angle) {
    var directions_es = ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste'];
    var directions_en = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    switch(localStorage.getItem('locale')){
      case 'es':
        return directions_es[index];
        break;
      case 'en':
        return directions_en[index];
        break;
      default:
        return directions_es[index];
        break;
    }
  },
  toKms(meters) {
    let accuracy = parseFloat(meters) / 1000;
    return accuracy.toFixed(0);
  },
  getDirectionIcon(direction){
    let icon;
    switch(direction) {
      case "Norte":
      case "North":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/north.svg"].default +  '"/>';
        break;
      case "Noreste":
      case "Northeast":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/north_east.svg"].default +  '"/>';
        break; 
      case "Este":
      case "East":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/east.svg"].default +  '"/>';
        break;
      case "Sureste":
      case "Southeast":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/south_east.svg"].default +  '"/>';
        break;
      case "Sur":
      case "South":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/south.svg"].default +  '"/>';
        break;
      case "Suroeste":
      case "Southwest":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/south_west.svg"].default +  '"/>';
        break;
      case "Oeste":
      case "West":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/west.svg"].default +  '"/>';
        break;
      case "Noroeste":
      case "Northwest":
        icon = '<img class="inline-flex ml-2" src = "' + iconsAssets["/src/assets/images/icons/north_west.svg"].default +  '"/>';
        break;
      default:
        icon = '';           
    }
    return icon;
  },
  nowTimestamp(separator = '/', isViewFormat = false){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hours = today.getHours();
    let min = today.getMinutes();
    let seg = today.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hours < 10) hours = '0' + hours;
    if (min < 10) min = '0' + min;
    if (seg < 10) seg = '0' + seg;


    if(isViewFormat){

      return  dd + separator + mm + separator + yyyy + " " + hours + ":" + min + ":" + seg;

    }else{

      return  yyyy + separator + mm + separator + dd + " " + hours + ":" + min + ":" + seg;
      
    }

  },
  formatBytes(bytes, decimals = 2){
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
};

const install = (app) => {
  app.config.globalProperties.$h = helpers;
};

export { install as default, helpers as helper };
