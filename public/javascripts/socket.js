// might need 3000, might not.  Not clear.
var socket = io.connect('http://localhost:3000');
socket.emit('message')
socket.on('time', function(data){
	$('.time').text(data.current_time);
})

$(document).ready(function() {
	var canvas = document.getElementById("drawingCanvas");
	var context = canvas.getContext('2d');
	
	var canvasOffset = $('#drawingCanvas').offset();

	//I am offsetting here so that my x and y coordinated are what I would expect.  They should be 0 for x in the top right and 0 for y there.  However, y is currently starting at 20.  Not sure why.  I have just put a +20 for now to take care of the discrepency
	var offsetX = canvasOffset.left
	var offsetY = canvasOffset.top
	// this variable determines whether we will track where the mouse is moving or not.  When true, tracks. When false, does not.
	var drawingOn = false
	var lineColor = 'black'
	var lineWidth = 3


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
		if (drawingOn === true){
			prevMouseX = curMouseX
			prevMouseY = curMouseY
			curMouseX = parseInt(event.clientX - offsetX);
			curMouseY = parseInt(event.clientY - offsetY);
			console.log('mouse moved to x: '+ curMouseX);
			console.log('mouse moved to y: '+ curMouseY);

			draw();
		}
	}

	function draw(){
		context.beginPath();
		context.lineWidth = lineWidth; //make this a variable set by pressing a button latter on
		context.strokeStyle = lineColor; //make this a variable too
		context.moveTo(prevMouseX, prevMouseY);
		context.lineTo(curMouseX, curMouseY);
		context.stroke();
		context.closePath()
	}


	$('#drawingCanvas').on('mousedown', function(event){
		trackMouseDown(event);
	})

	$('#drawingCanvas').on('mouseup', function(event){
		trackMouseUp(event);
	})

	$('#drawingCanvas').on('mousemove', function(event){
		trackMouseMove(event);
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




});
