const a = "aasdsds";

const w = a.split("").map((e) => (e = "lalalla"));

console.log(a, w, "hehe");
console.log('sdskdjsljd;s');

$.post("/api/v1/event/saveEventLog", { name: "John", time: "2pm" }, function (data) {
  alert("Data Loaded: " + data);
});
