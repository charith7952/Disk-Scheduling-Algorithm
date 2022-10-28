function GenerateQ()
{
    for(a=1; a<2; a++)
    {
        var x = document.querySelector("#Queue_vals");
        var i = Math.floor((Math.random() * 199) + 1);
        x.value += i + " ";
    }
}

function allImplement(){
    var Queue_values = document.getElementById('Queue_vals').value;
    Queue_values = Queue_values.trim();
    var Queue_vals = Queue_values.split(" ");
    var Head_position = document.getElementById('pos_head').value;

    for (var a = 0; a < Queue_vals.length; a++){
        if (Queue_vals[a] == Head_position){
            Queue_vals.splice(a, 1);
        }
    }
    Queue_vals.unshift(Head_position);
    
    Queue_vals = Queue_vals.filter(function (item, pos){
        return Queue_vals.indexOf(item) == pos;
    });
    

        var fcfsCount = FCFSAlgo1(Queue_vals, Head_position);
        var sstfCount = SSTFAlgo2(Queue_vals, Head_position);
        var scanCountLarge = scanAlgo3Large(Queue_vals, Head_position);
        var cscanCountLarge = cscanAlgo3Large(Queue_vals, Head_position);
        var scanCountLower = scanAlgo3Lower(Queue_vals, Head_position);
        var cscanCountLower = cscanAlgo3Lower(Queue_vals, Head_position);

        var grf = document.getElementById("AlgoGraph")
        var AlgoGraph = new Chart(grf, {
            type: 'bar',
            data: {
                labels: ['FCFS', 'SSTF', 'SCAN Large', 'C-SCAN Large','SCAN Lower', 'C-SCAN Lower' ],
                datasets: [
                    {
                        label: 'Comparison Graph',
                        data: [fcfsCount, sstfCount, scanCountLarge, cscanCountLarge, scanCountLower, cscanCountLower],
                        backgroundColor: ['rgba(255, 58, 59, 0.6)',
                        'rgba(41, 207, 152, 0.6)',
                        'rgba(148, 94, 255, 0.6)',
                        'rgba(224, 81,0, 0.6)',
                        'rgba(0, 100, 0, 0.6)',
                        'rgba(255, 144, 255, 0.6)',
                    ],
                        borderColor: "rgba(0,0,0,0.4)"
                    }
                ]
            },
        });

}

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
    document.getElementById("headerout").innerHTML="Here You can Visualize Comparision in Numeric Form"
    document.getElementById("fcfsoutput").innerHTML="FCFS Algorithm: "+head_move;
    return head_move;
}


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
        NumberVisited[idx]=1;
        temp1=values[idx];
        seekAddressed.push(values[idx])
    }
    document.getElementById("sstfoutput").innerHTML="SSTF Algorithm: "+head_move;
    return head_move;
}



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
    document.getElementById("cscanoutput2").innerHTML="C-SCAN Algorithm in Lower value Direction: "+head_mov;
    return head_mov;
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

    document.getElementById("cscanoutput1").innerHTML="C-SCAN Algorithm in Larger value Direction: "+head_mov;
    return head_mov;
    
}


var LowerseekSequence=[];
var seekAddressLower=[];

function scanAlgo3Lower(values, Head){
    var temp=[];
    var lowerNums=[];
    var largeNums=[];
    var numberst=values.length;

    lowerNums.push(0);

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
    for(var a=0; a<lenLarge; a++){
        var track=largeNums[a];
        distance=Math.abs(track-Head);
        head_mov+=distance;
        LowerseekSequence.push(head_mov);
        Head=track;
    }
    for(var a=1; a<lenSeekAddress; a++){
        if(seekAddressLower[a]===0){
            continue;
        }
        temp.push(seekAddressLower[a]);
    }
    document.getElementById("scanoutput2").innerHTML="Elevator SCAN Algorithm in Lower value Direction: "+head_mov;
    return head_mov;
}


var LargeseekSequence=[];
var seekAddressLarge=[];

function scanAlgo3Large(values,Head){
    var temp=[];
    var lowerNums=[];
    var largeNums=[];
    var numberst=values.length;

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
    for(var a=lenLower-1;  a>=0; a--){
        var track=lowerNums[a];
        distance=Math.abs(track-Head);
        head_mov+=distance;
        LargeseekSequence.push(head_mov);
        Head=track;
    }

    for(var a=1; a<lenSeekAddress; a++){
        if(seekAddressLarge[a]===199){
            continue;
        }
        temp.push(seekAddressLarge[a]);
    }
    document.getElementById("scanoutput1").innerHTML="Elevator SCAN Algorithm in Larger value Direction: "+head_mov;
    return head_mov;
}