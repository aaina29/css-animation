window.onload = function(){
    //get the canvas and the context and store in variables
    var canvas = document.getElementById("sky");
    var ctx = canvas.getContext("2d");
     
    //set canvas dimensions equal to window size(width and height)
    var W= window.innerWidth;
    var H= window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    
    //generate the snowflakes and apply attributes
    var mf = 100; //max flakes
    var flakes = [];

    //loop through the empty flakes(which f=dont have ht andf width and other attributes) and apply attributes
    for(var i = 0; i< mf; i++){
      flakes.push({
          x: Math.random()*W, //METHOD THAT GENERATS RANDOM NO B/W 0 AND 1
          y: Math.random()*H,
          r: Math.random()*5+2,  //min of 2px and max of 7px radius
          d: Math.random() + 1  //how quickly snow flakes fall to the ground(that is density)
        })
    }
     
    //draw flakes on the canvas
    function drawFlakes(){
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(var i=0; i<mf; i++){
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r,0  ,Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
     }

     //animate the flakes
     var angle = 0;
     function moveFlakes(){
         angle += 0.01;
         for(var i=0; i<mf; i++){
             //store current flakes
             var f = flakes[i];
             //update x and y coordinates of each flakes
             f.y += Math.pow(f.d, 2) + 1;
             f.x += Math.sin(angle) *  2;
             //if the snow flakes reaches the bottom , the new snow flake has to come from the top
             if(f.y> H){
                 flakes[i] = {
                     x: Math.random()*W,
                     y: 0,
                     r: f.r,
                     d: f.d
                 }
             }

         }
     }

    setInterval(drawFlakes, 25);

}