//custom form env
export const getMinDateInDateArray = (dates) => {
  const tempDates = removeUndefineInArray(dates);

  if (tempDates.length > 0) {
    let minDate = tempDates[0];

    dates.forEach((date, idx) => {
      if (idx !== 0 && moment(date) > moment(minDate)) {
        minDate = date;
      }
    });

    return moment(minDate);
  }

  return;
};

export const getMaxDateInDateArray = (dates) => {
  const tempDates = removeUndefineInArray(dates);

  if (tempDates.length > 0) {
    let maxDate = tempDates[0];

    dates.forEach((date, idx) => {
      if (idx !== 0 && moment(date) < moment(maxDate)) {
        maxDate = date;
      }
    });

    return moment(maxDate);
  }

  return;
};

export const getDateConstrainRules = (
  dateIds,
  dataValueList,
  defaultMinDate,
  defaultMaxDate
) => {
  const getMinMaxDate = (dateValueList, dateIdx) => {
    let minDate, maxDate;

    for (let i = dateIdx - 1; i >= 0; i--) {
      if (dateValueList[i]) {
        minDate = dateValueList[i];
        break;
      } else {
        if (defaultMinDate) {
          minDate = defaultMinDate;
        }
      }
    }

    for (let i = dateIdx + 1; i < dateValueList.length; i++) {
      if (dateValueList[i]) {
        maxDate = dateValueList[i];
        break;
      } else {
        if (defaultMaxDate) {
          maxDate = defaultMaxDate.format("YYYY-MM-DD");
        }
      }
    }

    if (dateIdx === 0) {
      minDate = defaultMinDate;
    }

    if (dateIdx === dateValueList.length - 1) {
      maxDate = defaultMaxDate.format("YYYY-MM-DD");
    }

    return { minDate, maxDate };
  };

  return dateIds.map((id, idx) => ({
    id: id,
    value: getMinMaxDate(dataValueList, idx),
  }));
};

export const getCustomExpression = (handler, externalData = undefined) => {
  return `(${handler})(${JSON.stringify(externalData)})`;
};
// custom handler example
// const ExpressionHandler = (handleData) => {
//   console.log(handleData, event);
// };

//standard report
const openInNewTab = (href) => {
  const a = Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noopener noreferrer",
    href: href,
  });

  window.parent.document.querySelector("main").appendChild(a);
  a.click();
  window.parent.document.querySelector("main").removeChild(a);
};

//masonry divider
export const divider = (arr, time) => {
  const newArr = [...arr];
  const size = Math.round(newArr.length / time);

  const itemList = [];
  for (let i = 1; i < time; i++) {
    itemList.push(newArr.splice(0, size));
  }

  itemList.push(newArr);

  return itemList;
};

export const horizontalDivider = (data, time) => {
  const itemList = [];
  for (let i = 0; i < time; i++) {
    itemList.push([]);
  }

  for (let j = 0; j < data.length; j += time) {
    for (let i = 0; i < time; i++) {
      if (data[j + i]) {
        itemList[i].push(data[j + i]);
      }
    }
  }

  return itemList;
};

//generate id
const sample = (d, fn = Math.random) => {
  if (d.length === 0) {
    return;
  }
  return d[Math.round(fn() * (d.length - 1))];
};

const generateUid = (limit = 11, fn = Math.random) => {
  const allowedLetters = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ].join("");
  const allowedChars = ["0123456789", allowedLetters].join("");
  const arr = [sample(allowedLetters, fn)]; // sample 1 to make sure it starts with a letter
  for (let i = 0; i < limit - 1; i++) {
    arr.push(sample(allowedChars, fn));
  }
  return arr.join("");
};

export { generateUid };

//table sort
export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0].cellData, b[0].cellData);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
