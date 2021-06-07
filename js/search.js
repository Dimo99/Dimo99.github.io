document.getElementById('button').onclick = function () 
{
    var surchАQ = ["търсене","Търсене:автор", "търсене по автор", "търсене на книга по автор"];
    var surchTQ = ["търсене:заглавие", "търсене по заглавие", "търсене на книга по заглавие"];
    var Login = ["влизане","вход"];
    var Subscription = ["купуване на ваучер","плащане на ваучер", "закупуване на ваучер","регистрация на код", "регистрация на код за ваучер"];
    var input = document.getElementById('myInput');
    var Book = document.getElementsByTagName('figure');

    for (var j = 0; j < surchАQ.length; j++)
     {
        if (input.value == surchАQ[j]) {
            let a = document.createElement('a');
            a.href = "./waitPanels/waitPanelSearch.html";
            a.click();
            input.value = "";
            return false;
        }
        else
            continue;
    }

    for (var j = 0; j < Login.length; j++)
     {
        if (input.value == Login[j]) {
            let a = document.createElement('a');
            a.href = "./waitPanels/waitPanelLogin.html";
            a.click();
            input.value = "";
            return false;
        }
        else
            continue;
    }

    for (var j = 0; j < Subscription.length; j++)
     {
        if (input.value == Subscription[j]) {
            let a = document.createElement('a');
            a.href = "./waitPanels/waitSubsciptiion.html";
            a.click();
            input.value = "";
            return false;
        }
        else
            continue;
    }

    for (var i = 0; i < surchTQ.length; i++) 
    {
        if (input.value == surchTQ[i]) {
            let a = document.createElement('a');
            a.href = "./waitPanels/waitPanelSearch.html";
            a.click();
            input.value = "";
            return false;
        }
        else
            continue;
    }

    for (var i = 0; i < Book.length-1; i++)
    {
        title = document.getElementById(i).value;
        if (input.value === title)
        {
            var id_index = '#';
            let a = document.createElement('a');
            a.href = id_index.concat(input.value);
            a.click();
            input.value = "";
            return false;
        }
            
    }
    alert("Не са намерени резултати от търсенето!");
    input.value = "";
};