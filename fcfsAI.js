function FCFSAlgo1(values, Head)
{
    var temp = [];
    var CountSequence = [];
    var numbersLen = values.length;
    var head_move = 0;
    var distance = 0;

    for (var a = 0; a<numbersLen; a++)
    {
        values[a] = parseInt(values[a]);
    }

    for (var a = 0; a<numbersLen; a++)
    {
        var track = values[a];
        distance = Math.abs(track - Head);
        head_move += distance;
        CountSequence.push(head_move);
        Head = track;
    }
    for (var a = 1; a < numbersLen; a++)
    {
        temp.push(values[a]);
    }
    Result(head_move, temp);
    return CountSequence;
}


function GenerateQ()
{
    for(a=1; a<2; a++)
    {
        var x = document.querySelector("#Queue_vals");
        var i = Math.floor((Math.random() * 299) + 1);
        x.value += i + " ";
    }
}

function GenerateH()
{

    var y = document.querySelector("#pos_head");
    var j = Math.floor((Math.random() * 199) + 1);
    y.value += j + " ";
}


function fcfsImplement()
{
    var Queue_values = document.getElementById('Queue_vals').value;
    Queue_values = Queue_values.trim();
    var Queue_vals = Queue_values.split(" ");
    var Head_position = document.getElementById('pos_head').value;

    for (var a = 0; a < Queue_vals.length; a++)
    {
        if (Queue_vals[a] == Head_position)
        {
            Queue_vals.splice(a, 1);
        }
    }
    Queue_vals.unshift(Head_position);
    
    Queue_vals = Queue_vals.filter(function (item, pos)
    {
        return Queue_vals.indexOf(item) == pos;
    });
    
    var grf = document.getElementById("AlgoGraph");
    var AlgoGraph = new Chart(grf, {
        type: 'line',
        data: {
            labels: FCFSAlgo1(Queue_vals, Head_position),
            datasets: [
                {
                    backgroundColor: "rgba(1,1,1,0.8)",
                    borderColor: "rgba(0,0,0,0.3)",
                    data: Queue_vals,
                    lineTension: 0,
                    fill: false,
                    label: "FCFS Algorithm"
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        labelString: "Seek Sequence"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        labelString: "Seek Count",
                    }
                }]
            }
        }
    });
}

function Result(count, seekSequence)
{
    var div = document.getElementById('Output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = "Seek Sequence: <b>[" + seekSequence + "]</b><br><br>Total Seek Count: <b>" + count + "<b><u><br><br>";
}