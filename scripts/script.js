$(document).ready(function() {
	var a= 4;
	var moved=true;
	var isStart=isOver=gameOver=false;
	var newArray=[];
	var beforeArray=afterArray=[];
	$(".a").html(a+" x "+a);
	carcase(a);
	var ochki =0;

	$(".before").click(function(event) {
		$(".ok").remove();
		if(a<8){
			a++;
			$(".a").html(a+" x "+a)
		}else{
			a=3;
			$(".a").html(a+" x "+a)
		}
		carcase(a)
	});

	$(".after").click(function(event) {
		$(".ok").remove();
		if(a>3){
			a--;
			$(".a").html(a+" x "+a)
		}else{
			a=8;
			$(".a").html(a+" x "+a)
		}
		carcase(a)
	});

	$(".start").click(function(event) {
		start()
	});

	$("img[alt='back']").click(function(event) {
		if(newArray.length>0 && backBul){;
			backBul=false;
			$(".new").remove();
			backFn()
		}
		if(gameOver){
			$(".gameOver").remove();
			isOver=false
		}
				
	});

	$("img[alt='Rotate']").click(function(event) {
		var reset=confirm("Դուք համոզվա՞ծ եք, որ ուզում եք խաղը սկսել նորից:")
		if(reset){
			$(".new").remove();
			$("main>div").addClass('ok')
			if(gameOver){
				$(".gameOver").remove();
				isOver=false
			}
			newArray=[];
			start()
		}
		
	})

	function carcase(a){
		divSide=(500-8*a)/a;
		arr=[];
		array=[];
		val=0;
		number=0;
		l1 = parseInt($("main").css("marginLeft")) + 4;
		t1 = 54;

		for(var i = 1; i <= a*a; i++){
			var elem=$("<div></div>");
			elem.addClass('ok');
			elem.attr("id",i);
			elem.css({
				width:divSide+"px",
				height:divSide+"px",
				margin:"4px"
			})
			$("main").append(elem)
		}

		for(var i=0; i<a; i++){
			for(var j=0; j<a; j++){
				array.push([t1+i*(divSide+8),l1+j*(divSide+8)])
			}
		}
	}

	function newElem() {
		arr = [];
		num = Math.random()*10;
		(num>1)?num=2:num=4;

		$(".ok").each(function() {
			arr.push($(this).attr("id"));
		});

		var rand = parseInt(Math.random() * arr.length);
		var togg = arr[rand];
		var newTop = array[togg-1][0];
		var newLeft = array[togg-1][1];
		var elemNew=$("<div></div>");
		(num==2)?elemNew.addClass("new val2"):elemNew.addClass("new val4");
		elemNew.attr("data-myId",togg);
		elemNew.html(num);
		elemNew.css({
				width:divSide+"px",
				height:divSide+"px",
				top:newTop+"px",
				left:newLeft+"px",
				fontSize: parseInt(20/a)+"em",
				lineHeight:1.5+"em"
			})
		$("body").append(elemNew);
		$("#" + togg).toggleClass("ok");
		if($(".new")[a*a-1]){
			isGameOver()
		}	
	}

	$("html").keydown(function(e) {
		mov=false
		e.preventDefault();
		key = e.which;
		if(key==13 && !isStart){
			start()
		}
		if(key>=37 && key<=40 && isStart && !isOver){
			if(key == 37) {
				//left
				var x=iStart=jStartArg=jEndArg=jTemp=arraySide=difArg=difference=1;
				var iEnd=a*a;
				var iTemp=difArg=a;
				var jStart=0;
				var jEnd=a+1;
				var side = "left";
				setTimeout(movement(side,x,iStart,iEnd,iTemp,jStartArg,jStart,jEndArg,
					jEnd,jTemp,arraySide,difference,difArg),200)
			}
			else if(key == 38){
				//up
				var x=iStart=iTemp=jStartArg=difference=difArg=1;
				var iEnd=jTemp=a;
				var jStart=jEndArg=arraySide=0;
				var jEnd=a*a+1;
				var side = "top";
				movement(side,x,iStart,iEnd,iTemp,jStartArg,jStart,jEndArg,jEnd,jTemp,
					arraySide,difference,difArg)	
			}else if(key == 39){
				// right
				var side = "left";
				var x=jTemp=-1;
				var iStart=iTemp=arraySide=1;
				var iEnd=jStartArg=jEndArg=difference=difArg=a;
				var jStart=jEnd=0;
				movement(side,x,iStart,iEnd,iTemp,jStartArg,jStart,jEndArg,jEnd,jTemp,
					arraySide,difference,difArg)
			}else{
				// down
				var side = "top";
				var x=-1;
				var iStart=iTemp=jStartArg=jEndArg=difArg=1;
				var iEnd=a;
				var difference=a*a-a+1;
				var jStart=a*(a-1);
				var jEnd=arraySide=0;
				var jTemp=-1*a;
				movement(side,x,iStart,iEnd,iTemp,jStartArg,jStart,jEndArg,jEnd,jTemp,
					arraySide,difference,difArg)
			}
			if(mov){
				newElem()
				backBul=true
			}		
		}
	})

	function movement(side,x,iStart,iEnd,iTemp,jStartArg,jStart,jEndArg,jEnd,jTemp,
		arraySide,difference,difArg){
		end=false;
		back();
		for(var i=iStart; i<=iEnd; i+=iTemp){
			for(var j=jStartArg*i+jStart; x*j<x*(jEndArg*(i-1)+jEnd); j+=jTemp){
				var myElem = $("div[data-myid='"+j+"']");
				if($("#"+j).attr("class")=="ok"){
					number++;
				}else{
					var newJ;
					if(j != difference){
						if(myElem.html()==val){
							newJ=j-jTemp*(number+1);
							myElem.css(side,array[newJ-1][arraySide]+"px");
							$("#"+j).toggleClass("ok");
							$("div[data-myid='"+newJ+"']").remove()
							myElem.html(val*2);
							(val*2<2050)?valClass=val*2:valClass="Big";
							if(val*2>100 && val*2<10000){
								myElem.css({
									fontSize: parseInt(15/a)+"em",
									lineHeight:2.3+"em"
								})
							}else if(val*2>10000){
								myElem.css({
									fontSize: parseInt(10/a)+"em",
									lineHeight:3+"em"
								})
							}
							myElem.removeClass("val"+val);
							myElem.addClass("val"+valClass);
							myElem.attr('data-myid', newJ+"");
							ochki+=val*2;
							if(record<ochki){
								localStorage.setItem(("rec"+a),ochki);
								$(".frameClass").html("Միավոր: "+ochki+"<br />Լավագույն արդյունք: "+ochki);
							}else{
								$(".frameClass").html("Միավոր: "+ochki+"<br />Լավագույն արդյունք: "+record)
							}
							
							val=0;
							number++;
							mov=true
						}else{
							if(number!=0){
								newJ=j-jTemp*number;
								myElem.css(side,array[newJ-1][arraySide]+"px");
								$("#" + (newJ)).toggleClass("ok");
								$("#"+j).toggleClass("ok");
								val=myElem.html();
								myElem.attr('data-myid', newJ+"");
								mov=true
							}
							val=parseInt(myElem.html())
						}
	
					}else{
						val=parseInt(myElem.html())
					}
				}
			}
			difference+=difArg
			number=0;
			val=0 
		}
		end=true;
		back()
	}

	function back(){
		newArray = [];
		$(".new").each( function() {
			var elemObj={
				"html":$(this).html(),
				"dataMyId":$(this).attr("data-myId")
			}
			newArray.push(elemObj)		
		})

		if(!end){
			newOch=ochki;
			newRec=record
			beforeArray=newArray
		}else{
			if(toArrString(newArray)!=toArrString(beforeArray)){	
				newArray=afterArray=beforeArray

			}else{
				newArray=afterArray;
				beforeArray=newArray
			}
		}	

	}

	function backFn(){
		$("main div").each(function(i,val){
			console.log(val,i)
			if($(this).attr("class")!="ok"){
				$(this).addClass('ok')
			}
		})
		newArray.forEach(function(i,val) {
			var backElem = $("<div></div>");
			 backElem.addClass('new val'+i.html);
			 backElem.attr("data-myId",i.dataMyId)
			 backElem.html(i.html);
			 backElem.css({
				width:divSide+"px",
				height:divSide+"px",
				top:array[i.dataMyId-1][0]+"px",
				left:array[i.dataMyId-1][1]+"px"
			})
			 if(i.html<100){
			 	backElem.css({
					fontSize: parseInt(20/a)+"em",
					lineHeight:1.5+"em"
				})
			 }
			if(i.html>100 && i.html<10000){
				backElem.css({
					fontSize: parseInt(15/a)+"em",
					lineHeight:2.3+"em"
				})
			}else if(i.html>10000){
				backElem.css({
					fontSize: parseInt(10/a)+"em",
					lineHeight:3+"em"
				})
			}
			 $("body").append(backElem);
			 if($("#"+i.dataMyId).attr("class")=="ok"){
				$("#"+i.dataMyId).toggleClass("ok");
			}
		});
		ochki=newOch;
		record=newRec;
		if(record<ochki){
			record=ochki
		}
		$(".frameClass").html("Միավոր: "+ochki+"<br />Լավագույն արդյունք: "+record)
	}

	function start(){
		ochki =0;
		record =localStorage.getItem("rec"+a);
		if(!record){
			record=0;
		}
		newElem();
		newElem();
		isStart=true;
		if($(".frame")){
			$(".frame").addClass('frameClass');
			$(".frame").removeClass('frame')
		}
		$(".frameClass").html("Միավոր: "+ochki+"<br />Լավագույն արդյունք: "+record);
		$(".start").remove();
	}

	function toArrString(arr){
		var myString="";
		for(var i=0; i<arr.length; i++) {
			myString+=Object.values(arr[i])+" "
		}
		return myString
	}

	function isGameOver() {
		var sum1=sum2=0;
		var horizontally=vertically=false;
		a:
			for(var i=1; i<a*a; i+=a){
				for(var j=i; j<i+a-1; j++){
					var k=j+1;
					if($("div[data-myid='"+j+"']").html()!=$("div[data-myid='"+k+"']").html()){
						sum1++
					}else{
						break ;
					}
				}
			}

			(sum1==(a-1)*a)?horizontally=true:horizontally=false;

		if(horizontally){
			b:
				for(var i=1; i<=a; i++){
					for(var j=i; j<i+a*(a-1); j+=a){
						var k=j+a;
						if($("div[data-myid='"+j+"']").html()!=$("div[data-myid='"+k+"']").html()){
							sum2++
						}else{
							break b;
						}
					}
					
				}

				(sum2==(a-1)*a)?vertically=true:vertically=false;
			
		}

		if(horizontally && vertically){
			gameOver=true;
			var overDiv = $("<div>");
			overDiv.addClass('gameOver');
			overDiv.html("Խաղի ավարտ");
			overDiv.css({
				color:"red",
				top:50+"px",
				left:l1-4+"px"
			});
			setTimeout(function(){
				$("body").append(overDiv)
			},300)
			isOver=true
		}
	}
})