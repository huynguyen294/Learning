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
