$(document).ready(function(){
    currently_showing = 10;
    html = '<thead><tr class="row100 head">'
      + '<th class="cell100 column2" onclick="sort(1)">Инвестиционни посредници <span class="sorted-order-1">&#9660;</span></th>'
      + '<th class="cell100 column2" onclick="sort(2)">ЕИК <span class="sorted-order-2">&#9660;</span></th>'
      + '<th class="cell100 column3" onclick="sort(3)">Тип ЮЛ <span class="sorted-order-3">&#9660;</span></th>'
      + '<th class="cell100 column4" onclick="sort(4)">Капитал на ЮЛ <span class="sorted-order-4">&#9660;</span></th>'
      + '<th class="cell100 column5" onclick="sort(5)">Адрес <span class="sorted-order-5">&#9660;</span></th>'
    + '</tr></thead><tbody id="my-table-body">';

    for (var key = 0, size = currently_showing; key < size; key++) {

      html += '<tr><td class="cell100 column1">'
                 + data[key]["companyName"]
                 + '</td><td class="cell100 column2">'
                 + data[key]["companyEIK"]
                 + '</td><td class="cell100 column3">'
                 + data[key]["companyType"]
                 + '</td><td class="cell100 column4">'
                 + data[key]["companyCapital"]
                 + '</td><td class="cell100 column5">'
                 + data[key]["companyAddress"]
                 + '</td></tr>';
    }

    html += '</tbody>';

    $('#my-table').html(html);
});

function print(){
  var html = "";
  for (var key = 0, size = currently_showing; key < size; key++) {

    html += '<tr><td class="cell100 column1">'
               + data[key]["companyName"]
               + '</td><td class="cell100 column2">'
               + data[key]["companyEIK"]
               + '</td><td class="cell100 column3">'
               + data[key]["companyType"]
               + '</td><td class="cell100 column4">'
               + data[key]["companyCapital"]
               + '</td><td class="cell100 column5">'
               + data[key]["companyAddress"]
               + '</td></tr>';
  }

  $('#my-table-body').html(html);
}

$('select').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    currently_showing = parseInt(this.value);
    if(currently_showing > data.length)
      currently_showing = data.length;

    print();
});

$(".search-bar").keyup(function(){
  var search_term = $(".search-bar").val();

  html = "";
  for (var key=0, size = data.length; key < size;key++) {
    if(data[key]["companyName"].search(search_term) >= 0){
      html += '<tr><td class="cell100 column1">'
               + data[key]["companyName"]
               + '</td><td class="cell100 column2">'
               + data[key]["companyEIK"]
               + '</td><td class="cell100 column3">'
               + data[key]["companyType"]
               + '</td><td class="cell100 column4">'
               + data[key]["companyCapital"]
               + '</td><td class="cell100 column5">'
               + data[key]["companyAddress"]
               + '</td></tr>';
    }
  }

  $('#my-table-body').html(html);
});

function sort(by){
  var element_name = ".sorted-order-" + by.toString();
  if($(element_name).text().charCodeAt(0) == "9650")
  {
    console.log("1" + $(element_name).html());
    order = 1;
    $(element_name).html("&#9660;");
  }
  else
  {
    console.log("2" + $(element_name).html());
    order = 2;
    $(element_name).html("&#9650;");
  }

  data.sort(function(a, b) {
    var keyA, keyB;
    if(by == 1){
      keyA = a.companyName;
      keyB = b.companyName;
    }
    else if(by == 2){
      keyA = a.companyEIK;
      keyB = b.companyEIK;
    }
    else if(by == 3){
      keyA = a.companyType;
      keyB = b.companyType;
    }
    else if(by == 4){
      keyA = a.companyCapital;
      keyB = b.companyCapital;
    }
    else{
      keyA = a.companyAddress;
      keyB = b.companyAddress;
    }

    if (keyA < keyB){
      if(order == 1) return -1;
      else return 1;
    }
    if (keyA > keyB){
      if(order == 1) return 1;
      else return -1;
    }
    return 0;
  });

  print();
}
