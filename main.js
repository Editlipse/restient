var unirest = require('unirest');

var get = function(options)
{
	var ps = '';
	if (options.data)
	{
		for (var p in options.data)
			ps += '&' + p + '=' + options.data[p];
		if (ps.length > 0)
			ps = '?' + ps.substring(1);
	}
	var request = unirest.get(options.url + ps);
	if (options.headers)
		request.headers(options.headers);
	if (options.jar)
		request.jar(options.jar);
	request.end(function(response)
	{
		if (response.code == 200)
		{
			if (typeof options.success == 'function')
				options.success(response.body);
		}
		else
		{
			if (typeof options.error == 'function')
				options.error(response);
		}
	});
}

var post = function(options)
{
	var request = unirest.post(options.url);
	if (options.headers)
		request.headers(options.headers);
	if (options.jar)
		request.jar(options.jar);
	if (options.data)
		request.send(options.data);
	request.end(function(response)
	{
		if (response.code == 200)
		{
			if (typeof options.success == 'function')
				options.success(response.body);
		}
		else
		{
			if (typeof options.error == 'function')
				options.error(response);
		}
	});
}

var ret = {
	get: get,
	post: post,
	jar: unirest.jar
};

module.exports = ret;