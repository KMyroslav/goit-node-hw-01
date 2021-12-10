//consider modificating to not to mutate array
function updateId(arr) {
  arr.forEach((el, i) => {
    el.id = `${i + 1}`;
  });
}

module.exports = { updateId };
