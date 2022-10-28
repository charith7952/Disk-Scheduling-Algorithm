var CountSequence = [];
var seekAddressed = [];

function SSTFAlgo2(values, Head)
{
    var temp = [];
    var NumberVisited = [];
    var numbers = values.length;
    var head_move = 0;
    var temp1;

    for (var a = 0; a<numbers; a++)
    {
        values[a] = parseInt(values[a]);
    }

    for (var a=0; a<numbers; a++){
        NumberVisited.push(0);
    }
    temp1=parseInt(Head);

    for(var a=0; a<numbers; a++)
    {
        var minimumValue=100000;
        var idx;
        for(var b=0; b<numbers;b++){
            if(Math.abs(temp1-values[b])<minimumValue && (NumberVisited[b]===0)){
                idx=b;
                minimumValue=Math.abs(temp1 - values[b]);
            }
        }
        head_move+=Math.abs(temp1-values[idx]);
        CountSequence.push(head_move);
        NumberVisited[idx]=1;
        temp1=values[idx];
        seekAddressed.push(values[idx])
    }

    for (var a = 1; a < numbers; a++)
    {
        temp.push(seekAddressed[a]);
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


function sstfImplement()
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
    
    var grf = document.getElementById("AlgoGraph")
    var AlgoGraph = new Chart(grf, {
        type: 'line',
        data: {
            labels: SSTFAlgo2(Queue_vals, Head_position),
            datasets: [
                {
                    backgroundColor: "rgba(1,1,1,0.8)",
                    borderColor: "rgba(0,0,0,0.3)",
                    data: seekAddressed,
                    lineTension: 0,
                    fill: false,
                    label: "SSTF Algorithm"
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
    else div.innerHTML = "<br/>Seek Sequence: <b>[" + seekSequence + "]</b><br><br>Total Seek Count: <b>" + count + "<b><u><br><br>";}