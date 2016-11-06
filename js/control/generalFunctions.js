function generalAJAXCall(url, type, async, data, dataType, callback)
{
	$.ajax({
		url: url,
		type: type,
		async: async,
		data: data,
		dataType: dataType,
		success: function (response) {
			callback.call(response);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.status+"\n"+thrownError);
		}
	});
}

function showErrors(errors)
{
	var errorString = "";

	$.each(errors, function (index, error){
		errorString+=error+"\n";
	});
	/*
	for (var i = 0; i < errors.length; i++)
	{
		error+=errors[i]+"\n";
	}
	*/
	alert(errorString);
}

function createDOMElement (tagEle, attrArray, eventsArray, optionsArray)
{
	var elem = $("<"+tagEle+"></"+tagEle+">");

	//~ elem.attr({
		//~ "type":typeElem,
		//~ "id":id
	//~ });

	for (var attr in attrArray)
	{
		elem.attr(attr,attrArray[attr]);
	}

	for (var event in eventsArray)
	{
		elem.bind(event, function (){eval(eventsArray[event])});
	}

	for (var i = 0; i < optionsArray.length; i++)
	{
		var option = $("<option></option>").html(optionsArray[i][1]);

		for (var attr in optionsArray[i][0])
		{
			option.attr(attr,optionsArray[i][0][attr]);
		}

		elem.append(option);
	}

	return elem;
}

/*
 * @name: isDate()
 * @description: This function validate the data that the user introduce.
 * @version: 1.0
 * @params: txtDate
 * 	errors: this is the inistial currency
 * @date: 31/1/2016
 * @author: Jorge Nole
*/

function isDate(txtDate){
    var currVal = txtDate;
    if(currVal == '')
        return false;

    var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/; //Declare Regex
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[3];
    dtDay= dtArray[5];
    dtYear = dtArray[1];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay> 31)
        return false;
    else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
        return false;
    else if (dtMonth == 2)
    {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay> 29 || (dtDay ==29 && !isleap))
                return false;
    }
    return true;
}
