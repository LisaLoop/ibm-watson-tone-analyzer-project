


function deg2rad(deg){
    return deg * Math.PI / 180;
}

function line(ctx,sx,sy,ex,ey,color){
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(sx,sy);
        ctx.lineTo(ex,ey);
        ctx.stroke();
}
function draw_regular_polygon(cx,cy,sideLength,color, sides){
  var c=document.getElementById("news1");
    var ctx=c.getContext("2d");

    var angle = 360 / sides; // 360 / 5

    var prevCornerX = cx + sideLength;
    var prevCornerY = cy;
    var initial = 0; //this may change
    for(var i=0;i<sides+1;i++){
        //draw side
        var theta = deg2rad(initial);
        var cornerX = Math.cos(theta) * sideLength;
        var cornerY = Math.sin(theta) * sideLength;

        var realCornerX = cx + cornerX;
        var realCornerY = cy + cornerY;
        console.log(initial + " : " + theta);


        line(ctx, prevCornerX,prevCornerY , realCornerX,realCornerY,color);
        
        initial += angle;

        // next iteration
        prevCornerX = realCornerX;
        prevCornerY = realCornerY;
    }
}

function draw_polygon(ctx,points){
    var sx,sy,ex,ey;
    for(var p=0;p<points.length;p++){
        sx = points[p].x;
        sy = points[p].y;
        if(p == points.length - 1){
            //go back to start
            ex = points[0].x;
            ey = points[0].y;
        }else{
            ex = points[p+1].x;
            ey = points[p+1].y;
        }
        line(ctx,sx,sy,ex,ey,"#FF0000");
    }
}
function radar_chart(ctx,values, labels){
    values.push(values[0]);// draw complete
    labels.push(labels[0]);// draw complete
    var cx = 200;
    var cy = 200;
    var sides = values.length-1;
    var angle = 360/sides; // 360 / 5
    var sideLength = 100;
    var pCount = 5;
    var part = sideLength / pCount;
    var pLength = part;
    let labelPadding = 20;
    let labelRadius = sideLength + labelPadding //120
    for(var p=0;p<pCount;p++){
        draw_regular_polygon(cx,cy,pLength,'#A0A0A0', sides);
        pLength += part;
    }
    draw_regular_polygon(cx,cy,sideLength,'#000000',sides);


    var prevCornerX = cx + sideLength;
    var prevCornerY = cy;
    var initial = 0; //this may change
        var polyPoints = [];
        for(var i=0;i<sides+1;i++){
        var magnitude = values[i];
        //draw side
        var theta = deg2rad(initial);
        var cornerX = Math.cos(theta) * sideLength;
        var cornerY = Math.sin(theta) * sideLength;

        var magX = Math.cos(theta) * sideLength * magnitude + cx;
        var magY = Math.sin(theta) * sideLength * magnitude + cy;
        polyPoints.push({"x":magX,"y":magY});

        var realCornerX = cx + cornerX;
        var realCornerY = cy + cornerY;
        //console.log(initial + " : " + theta);

        line(ctx, cx,cy , realCornerX,realCornerY,'#000000');
        // draw labels 
        let labelX = labelRadius * Math.cos(theta) + cx - 5;
        let labelY = labelRadius * Math.sin(theta) + cy + 5;
        ctx.font="20px Georgia";
        ctx.fillText(labels[i],labelX, labelY);
        initial += angle;


    }
    draw_polygon(ctx,polyPoints);
    


}
function init(values, labels){
    var c=document.getElementById("news1");
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    
    // var values = [0.9,0.2,0.2,0.8,0.5];
    // var values = [0.9,0.2,0.2,0.8,0.5, 0.9,0.9,0.9,0.9,0.9];
    
    var c1 = {x:10,y:10};
    var c2 = {x:20,y:20};
    var c3 = {x:20,y:10};
    var c4 = {x:5,y:5};
    var points = [c1,c2,c3,c4];
    //draw_polygon(ctx,points);
    radar_chart(ctx,values, labels);
}
// window.onload = init;
