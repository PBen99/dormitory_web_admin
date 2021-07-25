function getTimeSheetRender(data, numShift) {
  let timeSheet = [];
  for (var i = 1; i <= numShift * 7; i++) {
    var shift = {
      title: "",
      content: "",
      shift: i,
      staff: "",
    };
    if (data.length > 0) {
      for (var j = 0; j < data.length; j++) {
        if (data[j].shift.id === i) {
          shift = {
            title: data[j].title,
            content: data[j].content,
            shift: data[j].shift.id,
            staff: data[j].staff.id,
          };
        }
      }
    }
    timeSheet.push(shift);
  }
  return timeSheet;
}
export { getTimeSheetRender };
