
$(document).ready(function() {

	var canvas = document.getElementById("drawingCanvas");
	var context = canvas.getContext('2d');
	var drawingOn = false
	var lineColor = 'black'
	var lineWidth = 3


	var canvasOffset = $('#drawingCanvas').offset();
	//I am offsetting here so that my x and y coordinated are what I would expect.  They should be 0 for x in the top right and 0 for y there.  However, y is currently starting at 20.  Not sure why.  I have just put a +20 for now to take care of the discrepency
	var offsetX = canvasOffset.left
	var offsetY = canvasOffset.top
	// this variable determines whether we will track where the mouse is moving or not.  When true, tracks. When false, does not.

	var canvasInit= function(){

		canvas.addEventListener('mousedown', function(event){
			if (canvas){
				trackMouseDown(event);
			}
		})

		canvas.addEventListener('mouseup', function(event){
			if (canvas){
				trackMouseUp(event);
			}
		})

		canvas.addEventListener('mousemove', function(event){
			if (canvas){
				trackMouseMove(event);
			}
		})

		$(".lineColor").on('click', function(){
			lineColor = $(this).text();
			lineWidth = 3;
		})

		$(".eraser").on('click', function(){
			lineColor = $(this).attr('id');
			lineWidth = 7;
		})

		$(".lineWidth").on('click', function(){
			width = $(this).attr('id')
			lineWidth = parseInt(width)
		})

		$(".clear").on('click', function(){
			if (confirm("Are you sure you want to clear?") === true){
				context.fillStyle = "white";
				context.fillRect(0,0,500,300);
			}
		})

	}

	function trackMouseDown(event){
		// should call start draw

		curMouseX = parseInt(event.clientX - offsetX);
		curMouseY = parseInt(event.clientY - offsetY);
		console.log('mousedown x: '+ curMouseX);
		console.log('mousedown y: '+ curMouseY);


		drawingOn = true;
	}

	function trackMouseUp(event){
		// should call the stop draw 

		//I don't think I care about the coordinates when the user stops drawing, but I kept these here for testing purposes.
		// mouseX = parseInt(event.clientX - offsetX);
		// mouseY = parseInt(event.clientY - offsetY);
		// console.log('mouseup x: '+ curMouseX);
		// console.log('mouseup y: '+ curMouseY);

		drawingOn = false;
	}

	function trackMouseMove(event){
		// draw onto the canvas
		if (drawingOn){
			prevMouseX = curMouseX
			prevMouseY = curMouseY
			curMouseX = parseInt(event.clientX - offsetX);
			curMouseY = parseInt(event.clientY - offsetY);
			console.log('mouse moved to x: '+ curMouseX);
			console.log('mouse moved to y: '+ curMouseY);

			socket.emit('draw', {
				curMouseX: curMouseX,
				curMouseY: curMouseY,
				prevMouseX: prevMouseX,
				prevMouseY: prevMouseY,
				lineWidth: lineWidth,
				lineColor: lineColor,
			})
		}
	}

	function draw(data){
		context.beginPath();
		context.lineWidth = data.lineWidth; 
		context.strokeStyle = data.lineColor; 
		context.moveTo(data.prevMouseX, data.prevMouseY);
		context.lineTo(data.curMouseX, data.curMouseY);
		context.stroke();
		context.closePath()
	}

	canvasInit();

	var socket = io.connect('http://localhost:3000/')


	socket.on('draw', function(data){
		draw(data);
	})

});

