$(document).on("pagecreate","#index",function(){
	$('#from-to-search').find('input[value=查询]').on('click',function(){
		$('#train-result div[role=main] table tbody').html("");
		var from = $('#from-to-search').find('input[name=start]').val();
		var end = $('#from-to-search').find('input[name=end]').val();
		var url = "https://bird.ioliu.cn/v1/?url=http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?"
				   + "StartStation=" + from + "&ArriveStation=" + end + "&UserID=";
		var arr = [];
		if(!from)
		{
			alert("请输入发车站");
			return;
		}
		if(!end)
		{
			alert("请输入终点站");
			return;
		}
		$.get(url,function(data){
			console.log(data);
			var ul = $('#index-result ul[data-role=listview]');								//$("#index3 ul[data-role=listview]").clone(true);
		//	ul.html("");
			$(data).find("TimeTable").each(function(){
				var train = {};
				train.TrainCode = $(this).children("TrainCode").text();
				train.FirstStation = $(this).children("FirstStation").text();
				train.LastStation = $(this).children("LastStation").text();
				train.StartTime = $(this).children("StartTime").text();
				if(train.TrainCode == "----")
				{
					alert("未查询到相应车次");
					window.location.href = "#index";
					return;
				}
				arr.push(train);
			});
			for(var i=0;i<arr.length;i++)
			{
				var li = $('<li class="ui-body-inherit ui-last-child"></li>');
				var a = $('<a href="#train-result" class="ui-btn ui-btn-icon-right ui-icon-carat-r"></a>');
				var trainNum = $('<h2></h2>');
				trainNum.attr("trainnum",arr[i].TrainCode);
				trainNum.text(arr[i].TrainCode + "  车次");
				var startPos = $('<p></p>');
				startPos.text("发车站: "+arr[i].FirstStation);
				var endtPos = $('<p></p>');
				endtPos.text("终点站: "+arr[i].LastStation);
				var startTime = $('<p class="ui-li-aside"></p>');
				startTime.text(arr[i].StartTime + "  开");
				a.append(trainNum).append(startPos).append(endtPos).append(startTime);
				li.append(a);
				ul.append(li);
			}
			$('#index-result div[role=main] ul li a').on('click',function(){
				var trainNum = $(this).find('h2').attr("trainnum");
				var trainCodeUrl = "https://bird.ioliu.cn/v1/?url=http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?TrainCode="+trainNum+"&UserID=";
				$('#train-result div[data-role="header"] h1').text(trainNum+"车次详情");
				var trainArr = [];
				$.get(trainCodeUrl,function(data){
					$(data).find("TrainDetailInfo").each(function(){
						var trainPoint = {};
						trainPoint.trainStation = $(this).find("TrainStation").text();
						if(trainPoint.trainStation.indexOf('（') > 0)
						{
							trainPoint.trainStation = trainPoint.trainStation.substr(0,trainPoint.trainStation.indexOf('（'));
						}
						trainPoint.arriveTime = $(this).find("ArriveTime").text();
						trainPoint.startTime = $(this).find("StartTime").text();
						trainPoint.KM = $(this).find("KM").text();
						console.log("1:"+trainPoint.KM);
						trainArr.push(trainPoint);
					});
					for(var i=0;i<trainArr.length;i++)
					{
						var trainPointTr = $('<tr></tr>');
						var trainStationTd = $('<td></td>');
						var arriveTimeTd = $('<td></td>');
						var startTimeTd = $('<td></td>');
						var KMTd = $('<td></td>');
						console.log("2:"+trainArr[i].KM);
						trainStationTd.html("<b class='ui-table-cell-label'>站点</b>"+trainArr[i].trainStation);
						arriveTimeTd.html("<b class='ui-table-cell-label'>到达时间</b>"+trainArr[i].arriveTime);
						startTimeTd.html("<b class='ui-table-cell-label'>发车时间</b>"+trainArr[i].startTime);
						KMTd.html("<b class='ui-table-cell-label'>距发车站距离</b>"+trainArr[i].KM);
						trainPointTr.append(trainStationTd).append(arriveTimeTd).append(startTimeTd).append(KMTd);
						$('#train-result div[role=main] table tbody').append(trainPointTr);
					}
				});
			});
		});
		window.location.href = "#index-result";
	});

	$('#index2').find('input[value=查询]').on('click',function(){
		$('#train-result div[role=main] table tbody').html("");
		var trainNum = $('#index2 input[name=trainnum]').val();
		if(!trainNum)
		{
			alert("请输入车次编码");
			window.location.href = "#index2";
			return;
		}
		var trainNumUrl = "https://bird.ioliu.cn/v1/?url=http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?TrainCode="+trainNum+"&UserID="
		var trainArr = [];
		$.get(trainNumUrl,function(data){
			$(data).find("TrainDetailInfo").each(function(){
				var trainPoint = {};
				trainPoint.trainStation = $(this).find("TrainStation").text();
				if(trainPoint.trainStation.indexOf('（') > 0)
				{
					trainPoint.trainStation = trainPoint.trainStation.substr(0,trainPoint.trainStation.indexOf('（'));
				}
				if(trainPoint.trainStation == "数据没有被发现")
				{
					alert("未查询到相应车次");
					window.location.href = "#index2";
					return;
				}
				trainPoint.arriveTime = $(this).find("ArriveTime").text();
				trainPoint.startTime = $(this).find("StartTime").text();
				trainPoint.KM = $(this).find("KM").text();
			//	console.log("1:"+trainPoint.KM);
				trainArr.push(trainPoint);
			});
			for(var i=0;i<trainArr.length;i++)
			{
				var trainPointTr = $('<tr></tr>');
				var trainStationTd = $('<td></td>');
				var arriveTimeTd = $('<td></td>');
				var startTimeTd = $('<td></td>');
				var KMTd = $('<td></td>');
				console.log("2:"+trainArr[i].KM);
				trainStationTd.html("<b class='ui-table-cell-label'>站点</b>"+trainArr[i].trainStation);
				arriveTimeTd.html("<b class='ui-table-cell-label'>到达时间</b>"+trainArr[i].arriveTime);
				startTimeTd.html("<b class='ui-table-cell-label'>发车时间</b>"+trainArr[i].startTime);
				KMTd.html("<b class='ui-table-cell-label'>距发车站距离</b>"+trainArr[i].KM);
				trainPointTr.append(trainStationTd).append(arriveTimeTd).append(startTimeTd).append(KMTd);
				$('#train-result div[role=main] table tbody').append(trainPointTr);
			}
		});
		window.location.href = "#train-result";
	});
});

$(document).on("pagebeforeshow","#index",function(){
	$('#index div[role=main] form input[type=text]').val("");
});

$(document).on("pagebeforeshow","#index2",function(){
	$('#index2 div[data-role=content] form input[type=text]').val("");
});