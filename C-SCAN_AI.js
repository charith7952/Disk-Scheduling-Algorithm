var LowerseekSequence=[];
var seekAddressLower=[];

function cscanAlgo3Lower(values, Head){
    var temp=[];
    var lowerNums=[];
    var largeNums=[];
    var numberst=values.length;

    lowerNums.push(0);
    largeNums.push(199);

    for (var a=0; a<numberst; a++){
        values[a]=parseInt(values[a]);
    }
    for(var a=0; a<numberst; a++){
        if(values[a]<Head){
            lowerNums.push(values[a]);
        }
        if(values[a]>Head){
            largeNums.push(values[a]);
        }
    }
    lowerNums.sort(function(x,y){
        return x-y;
    })
    largeNums.sort(function(x,y){
        return x-y;
    })
    var lenLower=lowerNums.length;
    var lenLarge=largeNums.length;
    var head_mov=0;
    var distance=0;

    seekAddressLower.push(parseInt(Head));
    for(var a=lenLower-1; a>=0; a--){
        seekAddressLower.push(lowerNums[a]);
    }
    for(var a=lenLarge-1; a>=0; a--){
        seekAddressLower.push(largeNums[a]);
    }
    var lenSeekAddress=seekAddressLower.length;

    LowerseekSequence.push(0);
    for(var a=lenLower-1; a>=0; a--){
        var track=lowerNums[a];
        distance=Math.abs(track-Head);
        head_mov+=distance;
        LowerseekSequence.push(head_mov);
        Head=track;
    }
    Head=199;
    head_mov+=199;
    if(lenLarge !=0){
        for(var a=lenLarge-1; a>=0; a--){
            var track=largeNums[a];
            distance=Math.abs(track-Head);
            head_mov+=distance;
            LowerseekSequence.push(head_mov);
            Head=track;
        }
    }
    for(var a=1; a<lenSeekAddress; a++){
        if(seekAddressLower[a]===199 || seekAddressLower[a]===0){
            continue;
        }
        temp.push(seekAddressLower[a]);
    }
    Result(head_mov,temp);
    return LowerseekSequence;
}


var LargeseekSequence=[];
var seekAddressLarge=[];

function cscanAlgo3Large(values,Head){
    var temp=[];
    var lowerNums=[];
    var largeNums=[];
    var numberst=values.length;

    lowerNums.push(0);
    largeNums.push(199);

    for (var a=0; a<numberst; a++){
        values[a]=parseInt(values[a]);
    }

    for(var a=0; a<numberst; a++){
        if(values[a]<Head){
            lowerNums.push(values[a]);
        }
        else{
            largeNums.push(values[a]);
        }
    }

    lowerNums.sort(function(x,y){
        return x-y;
    })
    largeNums.sort(function(x,y){
        return x-y;
    })

    var lenLower=lowerNums.length;
    var lenLarge=largeNums.length;
    var head_mov=0;
    var distance=0;

    for(var a=0; a<lenLarge; a++){
        seekAddressLarge.push(largeNums[a]);
    }
    for(var a=0; a<lenLower; a++){
        seekAddressLarge.push(lowerNums[a]);
    }

    var lenSeekAddress = seekAddressLarge.length;
    for (var a=0; a<lenLarge; a++){
        var track=largeNums[a];
        distance=Math.abs(track-Head);
        head_mov+=distance;
        LargeseekSequence.push(head_mov);
        Head=track;
    }
    if(lenLower!=0){
        Head=0;
        head_mov+=199;
        for(var a=0; a<lenLower; a++){
            var track=lowerNums[a];
            distance=Math.abs(track-Head);
            head_mov += distance;
            LargeseekSequence.push(head_mov);
            Head=track;
        }
    }
    for(var a=1; a<lenSeekAddress; a++){
        if(seekAddressLarge[a]===199 || seekAddressLarge[a]===0){
            continue;
        }
        temp.push(seekAddressLarge[a]);
    }
    Result(head_mov,temp);
    return LargeseekSequence;
}

function GenerateQ(){
    for(a=1; a<2; a++){
        var x = document.querySelector("#Queue_vals");
        var i = Math.floor((Math.random() * 199) + 1);
        x.value += i + " ";
    }
}

function GenerateH(){

    var y = document.querySelector("#pos_head");
    var j = Math.floor((Math.random() * 199) + 1);
    y.value += j + " ";
}


function cscanImplement(){
    var Queue_values = document.getElementById('Queue_vals').value;
    Queue_values = Queue_values.trim();
    var Queue_vals = Queue_values.split(" ");
    var Head_position = document.getElementById('pos_head').value;
    var DirectionSelec = document.getElementById('selectDirection').value;

    for (var a = 0; a < Queue_vals.length; a++){
        if (Queue_vals[a] == Head_position){
            Queue_vals.splice(a, 1);
        }
    }
    Queue_vals.unshift(Head_position);
    
    Queue_vals = Queue_vals.filter(function (item, pos){
        return Queue_vals.indexOf(item) == pos;
    });
    

    if (DirectionSelec === "largerValue"){
        var grf = document.getElementById("AlgoGraph")
        var AlgoGraph = new Chart(grf, {
            type: 'line',
            data: {
                labels: cscanAlgo3Large(Queue_vals, Head_position),
                datasets: [
                    {
                        backgroundColor: "rgba(1,1,1,0.8)",
                        borderColor: "rgba(0,0,0,0.3)",
                        data: seekAddressLarge,
                        lineTension: 0,
                        fill: false,
                        label: "C-SCAN Algorithm"
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
    if(DirectionSelec==="lowerValue"){
        var grf = document.getElementById("AlgoGraph")
        var AlgoGraph = new Chart(grf, {
            type: 'line',
            data: {
                labels: cscanAlgo3Lower(Queue_vals, Head_position),
                datasets: [
                    {
                        backgroundColor: "rgba(1,1,1,0.8)",
                        borderColor: "rgba(0,0,0,0.3)",
                        data: seekAddressLower,
                        lineTension: 0,
                        fill: false,
                        label: "C-SCAN Algorithm"
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
}

function Result(count, seekSequence)
{
    var div = document.getElementById('Output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = "<br/>Seek Sequence: <b>[" + seekSequence + "]</b><br><br>Total Seek Count: <b>" + count + "<b><u><br><br>";
}